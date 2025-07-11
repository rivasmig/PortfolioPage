// src/components/layout/EnhancedGLTFCanvas.jsx
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { GLTFLoader } from './gltf/GLTFLoader';
import { EnhancedGLTFScene } from './gltf/EnhancedGLTFScene';
import { canvasLog, physicsLog, log, tracker } from '../../utils/simpleLogging';

/**
 * Enhanced GLTF Canvas Component
 * 
 * PURPOSE: Main entry point for loading GLTF scenes with optional physics and collision systems
 * 
 * FEATURES:
 * - Automatic physics object detection (objects named physics_*)
 * - Static collider boundaries (objects named collider_*)
 * - Interactive mouse and scroll responses
 * - Comprehensive loading states and error handling
 * - Flexible environment and lighting options
 * - Performance monitoring and logging
 * 
 * ARCHITECTURE:
 * - Coordinates multiple focused sub-components
 * - Separates physics from colliders for flexibility
 * - Provides clean API for parent components
 * - Handles all edge cases and error states
 */
export default function EnhancedGLTFCanvas({
  // Core GLTF properties
  url,
  animated = false,
  
  // Physics system controls
  enablePhysics = true,          // Enable dynamic physics objects (physics_*)
  enableColliders = true,        // Enable static collision boundaries (collider_*)
  physicsGround = true,          // Add invisible ground plane
  physicsDebug = false,          // Show physics wireframes (dev only)
  
  // Camera and environment
  camera = { position: [0, 1, 8], fov: 60, near: 0.1, far: 1000 },
  environment = 'park',          // HDRI file or Drei preset
  
  // Loading customization
  loaderTheme = 'dark',          // 'dark' | 'light' | 'purple'
  loaderDetails = false,         // Show detailed loading info
  customLoadingMessage = null,   // Override loading message
  
  // Callbacks and advanced options
  onObjectsParsed = null,        // Callback when objects are parsed
  onPhysicsReady = null,         // Callback when physics world is ready
  onCanvasReady = null,          // Callback when canvas is ready
  onError = null,                // Error handling callback
  
  // Rendering options
  children,                      // Additional 3D elements
  className = 'w-full h-screen',
  performanceMode = 'auto',      // 'auto' | 'high' | 'low'
  
  // Pass-through props for Canvas component
  ...canvasProps
}) {
  
  // Component state
  const [canvasReady, setCanvasReady] = useState(false);
  const [physicsReady, setPhysicsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Component tracking
  const canvasTracker = useRef(null);

  // INITIALIZATION EFFECT: Setup canvas tracking and validation
  useEffect(() => {
    canvasTracker.current = tracker('EnhancedGLTFCanvas');
    canvasTracker.current.mount({ 
      url, 
      animated, 
      enablePhysics, 
      enableColliders,
      physicsGround,
      environment,
      performanceMode
    });

    // Validate required props
    if (!url) {
      const error = 'EnhancedGLTFCanvas requires a url prop';
      log.error(error);
      setHasError(true);
      setErrorMessage(error);
      return;
    }

    canvasLog.created('EnhancedGLTFCanvas initializing', { 
      url, 
      animated, 
      enablePhysics, 
      enableColliders,
      physicsGround, 
      environment,
      camera,
      performanceMode,
      hasChildren: !!children
    });

    return () => {
      canvasLog.created('EnhancedGLTFCanvas cleanup');
      if (canvasTracker.current) {
        canvasTracker.current.unmount();
      }
    };
  }, [url, animated, enablePhysics, enableColliders, environment]);

  // ENVIRONMENT CONFIGURATION: Detect HDRI vs preset
  const environmentConfig = React.useMemo(() => {
    if (!environment) {
      return { preset: 'park', background: true };
    }
    
    const isFile = typeof environment === 'string' && 
      /\.(hdr|exr|png|jpg|jpeg)$/i.test(environment);
    
    const config = isFile
      ? { files: environment, background: true }
      : { preset: environment, background: true };
      
    log.debug('Environment configuration', { 
      environment, 
      isFile, 
      config 
    });
    
    return config;
  }, [environment]);

  // PERFORMANCE CONFIGURATION: Adjust settings based on performance mode
  const performanceConfig = React.useMemo(() => {
    const configs = {
      high: {
        antialias: true,
        alpha: true,
        shadowMapEnabled: true,
        shadowMapType: 'PCFSoftShadowMap',
        toneMapping: 'ACESFilmicToneMapping'
      },
      low: {
        antialias: false,
        alpha: false,
        shadowMapEnabled: false,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5)
      },
      auto: {
        antialias: true,
        alpha: true,
        shadowMapEnabled: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
      }
    };
    
    const config = configs[performanceMode] || configs.auto;
    log.debug('Performance configuration', { performanceMode, config });
    return config;
  }, [performanceMode]);

  // CANVAS READY HANDLER: Called when WebGL context is created
  const handleCanvasCreated = (state) => {
    try {
      canvasLog.created('Canvas WebGL context created', {
        renderer: state.gl.getParameter ? state.gl.getParameter(state.gl.VERSION) : 'Unknown',
        vendor: state.gl.getParameter ? state.gl.getParameter(state.gl.VENDOR) : 'Unknown',
        maxTextureSize: state.gl.getParameter ? state.gl.getParameter(state.gl.MAX_TEXTURE_SIZE) : 'Unknown',
        extensions: state.gl.getSupportedExtensions ? state.gl.getSupportedExtensions().length : 'Unknown'
      });
      
      setCanvasReady(true);
      
      if (onCanvasReady) {
        onCanvasReady(state);
      }
      
    } catch (error) {
      canvasLog.canvasError('Canvas WebGL context creation failed', error);
      setHasError(true);
      setErrorMessage('Failed to create WebGL context');
      
      if (onError) {
        onError(error);
      }
    }
  };

  // PHYSICS READY HANDLER: Called when physics world is initialized
  const handlePhysicsReady = () => {
    physicsLog.worldCreated([0, -9.81, 0], { 
      enablePhysics, 
      enableColliders,
      physicsGround,
      debug: physicsDebug,
      ready: true 
    });
    
    setPhysicsReady(true);
    
    if (onPhysicsReady) {
      onPhysicsReady();
    }
  };

  // CANVAS ERROR HANDLER: Called on canvas errors
  const handleCanvasError = (error) => {
    canvasLog.canvasError('Canvas error occurred', error);
    setHasError(true);
    setErrorMessage(error.message || 'Canvas rendering error');
    
    if (onError) {
      onError(error);
    }
  };

  // OBJECTS PARSED HANDLER: Called when GLTF objects are parsed
  const handleObjectsParsed = (parsedObjects, interactionController) => {
    log.debug('Objects parsed in canvas', {
      physics: parsedObjects.physics.length,
      colliders: parsedObjects.colliders.length,
      static: parsedObjects.static.length,
      hasController: !!interactionController
    });
    
    if (onObjectsParsed) {
      onObjectsParsed(parsedObjects, interactionController);
    }
  };

  // ERROR STATE: Show error message
  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-red-50 border border-red-200`}>
        <div className="text-center p-8">
          <div className="text-red-600 text-lg font-semibold mb-2">
            ⚠️ Canvas Error
          </div>
          <div className="text-red-500 text-sm">
            {errorMessage || 'Failed to initialize 3D canvas'}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // MAIN RENDER: Canvas with physics or non-physics scene
  return (
    <div className={className}>
      <Canvas
        camera={camera}
        gl={performanceConfig}
        shadows={performanceConfig.shadowMapEnabled}
        onCreated={handleCanvasCreated}
        onError={handleCanvasError}
        {...canvasProps}
      >
        {/* Fallback camera if none in GLTF */}
        <PerspectiveCamera makeDefault {...camera} />

        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 10, 7.5]} 
          intensity={1} 
          castShadow={performanceConfig.shadowMapEnabled}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense 
          fallback={
            <GLTFLoader 
              theme={loaderTheme}
              showDetails={loaderDetails}
              customMessage={customLoadingMessage}
            />
          }
        >
          {/* Physics-enabled scene */}
          {(enablePhysics || enableColliders) ? (
            <Physics 
              gravity={[0, -9.81, 0]} 
              debug={physicsDebug && process.env.NODE_ENV === 'development'}
              onReady={handlePhysicsReady}
            >
              <EnhancedGLTFScene
                url={url}
                animated={animated}
                enablePhysics={enablePhysics}
                enableColliders={enableColliders}
                onObjectsParsed={handleObjectsParsed}
              />
              
              {/* Physics ground plane */}
              {physicsGround && (
                <RigidBody type="fixed" position={[0, -10, 0]}>
                  <CuboidCollider args={[50, 0.1, 50]} />
                </RigidBody>
              )}

              {/* Physics-enabled children */}
              {children}
            </Physics>
          ) : (
            /* Non-physics scene */
            <>
              <EnhancedGLTFScene
                url={url}
                animated={animated}
                enablePhysics={false}
                enableColliders={false}
                onObjectsParsed={handleObjectsParsed}
              />
              
              {/* Non-physics children */}
              {children}
            </>
          )}

          {/* Environment lighting and background */}
          <Environment {...environmentConfig} />
        </Suspense>

        {/* Development helpers */}
        {process.env.NODE_ENV === 'development' && (
          <mesh position={[0, 25, 0]} visible={false}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial />
          </mesh>
        )}
      </Canvas>
      
      {/* Canvas status overlay (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs bg-black bg-opacity-50 text-white p-2 rounded">
          Canvas: {canvasReady ? '✓' : '⏳'} | 
          Physics: {physicsReady ? '✓' : enablePhysics || enableColliders ? '⏳' : '➖'}
        </div>
      )}
    </div>
  );
}

/**
 * Component configuration presets for common use cases
 */
EnhancedGLTFCanvas.presets = {
  // Simple scene with just GLTF, no physics
  simple: {
    enablePhysics: false,
    enableColliders: false,
    physicsGround: false,
    loaderTheme: 'light'
  },
  
  // Full physics with interactions
  interactive: {
    enablePhysics: true,
    enableColliders: true,
    physicsGround: true,
    loaderDetails: true
  },
  
  // Static colliders only (no dynamic physics)
  colliders: {
    enablePhysics: false,
    enableColliders: true,
    physicsGround: true
  },
  
  // High performance mode
  performance: {
    enablePhysics: true,
    enableColliders: true,
    performanceMode: 'high',
    loaderDetails: true
  }
};

/**
 * Prop validation and documentation
 */
EnhancedGLTFCanvas.propTypes = {
  // Required
  url: 'string (required) - Path to GLTF/GLB file',
  
  // Physics system
  enablePhysics: 'boolean - Enable dynamic physics objects (physics_*)',
  enableColliders: 'boolean - Enable static collision boundaries (collider_*)',
  physicsGround: 'boolean - Add invisible ground plane',
  
  // Rendering
  animated: 'boolean - Auto-play GLTF animations',
  environment: 'string - HDRI file path or Drei preset name',
  camera: 'object - Camera configuration',
  
  // Loading
  loaderTheme: 'string - Loading overlay theme (dark|light|purple)',
  loaderDetails: 'boolean - Show detailed loading information',
  
  // Callbacks
  onObjectsParsed: 'function - Called when objects are parsed',
  onPhysicsReady: 'function - Called when physics is ready',
  onCanvasReady: 'function - Called when canvas is ready'
};

// Export helper components for advanced usage
export { EnhancedGLTFScene } from './gltf/EnhancedGLTFScene';
export { GLTFLoader } from './gltf/GLTFLoader';
export { GLTFPhysicsObject } from './gltf/GLTFPhysicsObject';
export { GLTFColliderObject } from './gltf/GLTFColliderObject';
export { GLTFInteractionHandler } from './gltf/GLTFInteractionHandler';

// Development helper
if (process.env.NODE_ENV === 'development') {
  EnhancedGLTFCanvas.displayName = 'EnhancedGLTFCanvas';
}