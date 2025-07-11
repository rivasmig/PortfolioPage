// src/components/layout/gltf/GLTFLoader.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { canvasLog, log, tracker } from '../../../utils/simpleLogging';

/**
 * GLTF Loader Component
 * 
 * PURPOSE: Provides loading state feedback during GLTF file loading
 * 
 * RESPONSIBILITIES:
 * 1. Track loading progress from Drei's useProgress hook
 * 2. Display user-friendly loading interface
 * 3. Log loading milestones and performance
 * 4. Handle loading errors and timeouts
 * 5. Provide loading analytics and insights
 * 
 * USE CASE: User feedback during 3D asset loading
 */
export function GLTFLoader({ 
  showPercentage = true,
  showDetails = false,
  timeout = 30000, // 30 second timeout
  customMessage = null,
  theme = 'dark' // 'dark' | 'light' | 'purple'
}) {
  // Drei's loading progress hook
  const { progress, active, loaded, total, item, errors } = useProgress();
  
  // Component state
  const [loadingStartTime] = useState(Date.now());
  const [hasTimeout, setHasTimeout] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('initializing');
  const lastProgressUpdate = useRef(0);
  const progressHistory = useRef([]);
  
  // Component tracking
  const loaderTracker = useRef(null);

  // INITIALIZATION EFFECT: Setup loading tracking
  useEffect(() => {
    loaderTracker.current = tracker('GLTFLoader');
    loaderTracker.current.mount({ 
      showPercentage, 
      showDetails, 
      timeout,
      theme 
    });

    canvasLog.created('GLTF Loader initialized', {
      startTime: loadingStartTime,
      timeout: timeout,
      theme: theme
    });

    return () => {
      const loadingDuration = Date.now() - loadingStartTime;
      canvasLog.created('GLTF Loader cleanup', {
        totalLoadingTime: `${loadingDuration}ms`,
        finalProgress: progress,
        completed: progress >= 100
      });
      
      if (loaderTracker.current) {
        loaderTracker.current.unmount();
      }
    };
  }, []);

  // PROGRESS TRACKING EFFECT: Monitor loading progress and performance
  useEffect(() => {
    const now = Date.now();
    const loadingDuration = now - loadingStartTime;
    
    // Track progress history for analytics
    progressHistory.current.push({
      progress,
      timestamp: now,
      duration: loadingDuration,
      active,
      loaded,
      total
    });

    // Keep only last 50 progress updates for memory efficiency
    if (progressHistory.current.length > 50) {
      progressHistory.current.shift();
    }

    // Log significant progress milestones
    if (progress !== lastProgressUpdate.current) {
      const milestones = [0, 25, 50, 75, 90, 95, 100];
      const currentMilestone = milestones.find(m => 
        lastProgressUpdate.current < m && progress >= m
      );

      if (currentMilestone !== undefined) {
        canvasLog.created(`Loading progress: ${currentMilestone}%`, {
          progress: progress,
          duration: `${loadingDuration}ms`,
          loaded: loaded,
          total: total,
          currentItem: item,
          estimatedTimeRemaining: currentMilestone < 100 ? 
            `${Math.round((loadingDuration / progress) * (100 - progress))}ms` : '0ms'
        });
      }

      lastProgressUpdate.current = progress;
    }

    // Update loading phase based on progress
    if (progress === 0 && active) {
      setLoadingPhase('starting');
    } else if (progress > 0 && progress < 50) {
      setLoadingPhase('loading');
    } else if (progress >= 50 && progress < 90) {
      setLoadingPhase('processing');
    } else if (progress >= 90 && progress < 100) {
      setLoadingPhase('finalizing');
    } else if (progress >= 100) {
      setLoadingPhase('complete');
    }

  }, [progress, active, loaded, total, item]);

  // TIMEOUT EFFECT: Handle loading timeout
  useEffect(() => {
    if (!active || progress >= 100) return;

    const timeoutId = setTimeout(() => {
      const loadingDuration = Date.now() - loadingStartTime;
      
      if (progress < 100) {
        setHasTimeout(true);
        log.error('GLTF loading timeout', {
          progress: progress,
          duration: `${loadingDuration}ms`,
          timeout: `${timeout}ms`,
          loaded: loaded,
          total: total,
          lastItem: item
        });
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [active, progress, timeout]);

  // ERROR TRACKING EFFECT: Monitor loading errors
  useEffect(() => {
    if (errors && errors.length > 0) {
      log.error('GLTF loading errors detected', {
        errorCount: errors.length,
        errors: errors,
        progress: progress,
        currentItem: item
      });
    }
  }, [errors]);

  // PERFORMANCE ANALYSIS: Calculate loading speed
  const getLoadingSpeed = () => {
    if (progressHistory.current.length < 2) return null;
    
    const recent = progressHistory.current.slice(-10);
    const timeSpan = recent[recent.length - 1].timestamp - recent[0].timestamp;
    const progressSpan = recent[recent.length - 1].progress - recent[0].progress;
    
    return timeSpan > 0 ? (progressSpan / timeSpan * 1000).toFixed(2) : null; // progress per second
  };

  // THEME CONFIGURATION
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'text-gray-800 bg-white bg-opacity-90';
      case 'purple':
        return 'text-white bg-purple-600 bg-opacity-90';
      case 'dark':
      default:
        return 'text-white bg-black bg-opacity-50';
    }
  };

  // LOADING PHASE MESSAGES
  const getPhaseMessage = () => {
    switch (loadingPhase) {
      case 'starting': return 'Initializing...';
      case 'loading': return 'Loading assets...';
      case 'processing': return 'Processing geometry...';
      case 'finalizing': return 'Finalizing scene...';
      case 'complete': return 'Ready!';
      default: return 'Loading...';
    }
  };

  // ERROR STATE: Loading timeout or errors
  if (hasTimeout) {
    return (
      <Html center>
        <div className="text-red-400 text-lg font-medium bg-red-900 bg-opacity-80 p-4 rounded-lg border border-red-500">
          <div className="mb-2">⚠️ Loading Timeout</div>
          <div className="text-sm text-red-300">
            Stuck at {progress.toFixed(0)}% - Check network connection
          </div>
        </div>
      </Html>
    );
  }

  if (errors && errors.length > 0) {
    return (
      <Html center>
        <div className="text-red-400 text-lg font-medium bg-red-900 bg-opacity-80 p-4 rounded-lg border border-red-500">
          <div className="mb-2">❌ Loading Error</div>
          <div className="text-sm text-red-300">
            {errors[0]?.message || 'Failed to load 3D scene'}
          </div>
        </div>
      </Html>
    );
  }

  // MAIN LOADING STATE
  return (
    <Html center>
      <div className={`text-lg font-medium p-4 rounded-lg shadow-lg transition-all duration-300 ${getThemeClasses()}`}>
        {/* Main loading message */}
        <div className="flex items-center justify-center mb-2">
          <div className="animate-spin mr-2">
            ⏳
          </div>
          <span>
            {customMessage || getPhaseMessage()}
          </span>
        </div>

        {/* Progress percentage */}
        {showPercentage && (
          <div className="text-center mb-2">
            <span className="text-xl font-bold">
              {progress.toFixed(0)}%
            </span>
          </div>
        )}

        {/* Progress bar */}
        <div className="w-48 h-2 bg-gray-300 bg-opacity-30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Detailed information */}
        {showDetails && (
          <div className="mt-3 text-xs text-center opacity-75 space-y-1">
            {item && (
              <div>Loading: {item.split('/').pop()}</div>
            )}
            {loaded > 0 && total > 0 && (
              <div>{loaded} of {total} items</div>
            )}
            {getLoadingSpeed() && (
              <div>Speed: {getLoadingSpeed()}%/s</div>
            )}
            <div>
              {Math.round((Date.now() - loadingStartTime) / 1000)}s elapsed
            </div>
          </div>
        )}

        {/* Development info */}
        {process.env.NODE_ENV === 'development' && showDetails && (
          <div className="mt-2 text-xs text-center opacity-50">
            Phase: {loadingPhase} | Active: {active ? 'Yes' : 'No'}
          </div>
        )}
      </div>
    </Html>
  );
}

/**
 * Component utilities and presets
 */
GLTFLoader.presets = {
  minimal: { showPercentage: false, showDetails: false },
  standard: { showPercentage: true, showDetails: false },
  detailed: { showPercentage: true, showDetails: true },
  purple: { showPercentage: true, showDetails: false, theme: 'purple' }
};

// Development helper
if (process.env.NODE_ENV === 'development') {
  GLTFLoader.displayName = 'GLTFLoader';
}

export default GLTFLoader;