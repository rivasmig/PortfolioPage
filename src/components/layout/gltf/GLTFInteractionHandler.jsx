// src/components/layout/gltf/GLTFInteractionHandler.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { log, interactionLog, physicsLog, tracker } from '../../../utils/simpleLogging';

/**
 * GLTF Interaction Handler Component
 * 
 * PURPOSE: Manages all user interactions for physics objects
 * 
 * RESPONSIBILITIES:
 * 1. Track mouse position and convert to world coordinates
 * 2. Handle scroll events and convert to physics forces
 * 3. Coordinate frame-by-frame interaction updates
 * 4. Log interaction events for debugging
 * 5. Manage interaction state and performance
 * 
 * USE CASE: Bridge between user input and physics object responses
 */
export function GLTFInteractionHandler({ interactionController, children }) {
  // Three.js hooks for mouse and viewport data
  const { viewport, pointer, camera } = useThree();
  
  // Interaction state tracking
  const lastScrollY = useRef(0);
  const lastMouseUpdate = useRef(0);
  const frameCount = useRef(0);
  const performanceMetrics = useRef({
    averageFrameTime: 0,
    frameTimeHistory: [],
    interactionCount: 0,
    scrollEventCount: 0
  });
  
  // Component state
  const [isActive, setIsActive] = useState(false);
  const [currentMouseWorldPos, setCurrentMouseWorldPos] = useState(null);
  
  // Component tracking
  const handlerTracker = useRef(null);

  // INITIALIZATION EFFECT: Setup interaction tracking
  useEffect(() => {
    handlerTracker.current = tracker('GLTFInteractionHandler');
    handlerTracker.current.mount({ 
      hasController: !!interactionController,
      hasChildren: !!children
    });

    if (interactionController) {
      log.interaction('Interaction handler initialized', {
        controllerType: interactionController.constructor.name,
        managedObjects: interactionController.physicsObjects?.length || 0
      });
      setIsActive(true);
    } else {
      log.interaction('Interaction handler initialized without controller');
      setIsActive(false);
    }

    return () => {
      log.interaction('Interaction handler cleanup');
      if (handlerTracker.current) {
        handlerTracker.current.unmount();
      }
    };
  }, [interactionController, children]);

  // FRAME EFFECT: Handle mouse position updates every frame
  useFrame((state, deltaTime) => {
    if (!interactionController || !isActive) return;

    const frameStartTime = performance.now();
    frameCount.current++;

    try {
      // Convert normalized mouse coordinates to world position
      const mouseWorldPos = new THREE.Vector3(
        pointer.x * viewport.width / 2,
        pointer.y * viewport.height / 2,
        0
      );

      // Only update if mouse position changed significantly
      const now = Date.now();
      if (now - lastMouseUpdate.current > 16) { // ~60fps throttling
        interactionController.updateMousePosition(pointer.x, pointer.y, mouseWorldPos);
        setCurrentMouseWorldPos(mouseWorldPos);
        lastMouseUpdate.current = now;

        // Log mouse updates occasionally for debugging
        if (frameCount.current % 300 === 0) { // Every 5 seconds at 60fps
          interactionLog.mouseMove(
            [pointer.x, pointer.y], 
            interactionController.physicsObjects?.map(obj => obj.name) || []
          );
        }
      }

      // Apply physics interactions
      interactionController.applyFrameInteractions();
      performanceMetrics.current.interactionCount++;

      // Track performance metrics
      const frameTime = performance.now() - frameStartTime;
      const metrics = performanceMetrics.current;
      metrics.frameTimeHistory.push(frameTime);
      
      // Keep only last 60 frames for rolling average
      if (metrics.frameTimeHistory.length > 60) {
        metrics.frameTimeHistory.shift();
      }
      
      // Calculate average frame time
      metrics.averageFrameTime = metrics.frameTimeHistory.reduce((a, b) => a + b, 0) / metrics.frameTimeHistory.length;

      // Log performance every 10 seconds
      if (frameCount.current % 600 === 0) {
        log.performance('Interaction handler performance', {
          averageFrameTime: metrics.averageFrameTime.toFixed(3) + 'ms',
          totalInteractions: metrics.interactionCount,
          totalScrollEvents: metrics.scrollEventCount,
          framesProcessed: frameCount.current
        });
      }

    } catch (error) {
      log.error('Error in frame interaction processing', error);
    }
  });

  // SCROLL EFFECT: Handle scroll events for wind/force effects
  useEffect(() => {
    if (!interactionController || !isActive) {
      log.debug('Scroll handler not registered - no active controller');
      return;
    }

    const handleScroll = (event) => {
      try {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY.current;
        
        // Only process significant scroll changes
        if (Math.abs(scrollDelta) > 1) {
          interactionController.handleScroll(scrollDelta);
          performanceMetrics.current.scrollEventCount++;
          
          // Log scroll events occasionally
          if (performanceMetrics.current.scrollEventCount % 10 === 0) {
            interactionLog.scroll(scrollDelta, 
              interactionController.physicsObjects?.map(obj => obj.name) || []
            );
          }
          
          lastScrollY.current = currentScrollY;
        }
      } catch (error) {
        log.error('Error handling scroll event', error);
      }
    };

    log.interaction('Scroll event listener registered');
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      log.interaction('Scroll event listener removed');
      window.removeEventListener('scroll', handleScroll);
    };
  }, [interactionController, isActive]);

  // LOG CONTROLLER CHANGES
  useEffect(() => {
    if (interactionController) {
      log.interaction('Interaction controller updated', {
        objectCount: interactionController.physicsObjects?.length || 0,
        controllerMethods: Object.getOwnPropertyNames(Object.getPrototypeOf(interactionController))
      });
    }
  }, [interactionController]);

  // LOG ACTIVITY STATE CHANGES
  useEffect(() => {
    log.interaction(`Interaction handler ${isActive ? 'activated' : 'deactivated'}`, {
      hasController: !!interactionController,
      reason: !interactionController ? 'no_controller' : 'controller_available'
    });
  }, [isActive]);

  // DEVELOPMENT ONLY: Keyboard shortcuts for debugging
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const handleKeyPress = (event) => {
      if (!interactionController) return;

      // Debug shortcuts
      switch (event.key.toLowerCase()) {
        case 'i':
          if (event.ctrlKey) {
            log.interaction('Debug: Interaction controller info', {
              objectCount: interactionController.physicsObjects?.length,
              mousePosition: currentMouseWorldPos?.toArray(),
              performanceMetrics: performanceMetrics.current
            });
          }
          break;
        case 'p':
          if (event.ctrlKey) {
            log.performance('Debug: Performance metrics', performanceMetrics.current);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [interactionController, currentMouseWorldPos]);

  // INACTIVE STATE: No controller available
  if (!isActive || !interactionController) {
    log.debug('Interaction handler inactive - returning children only');
    return <>{children}</>;
  }

  // ACTIVE STATE: Managing interactions
  return (
    <>
      {/* Debug visualization in development */}
      {process.env.NODE_ENV === 'development' && currentMouseWorldPos && (
        <mesh position={currentMouseWorldPos.toArray()}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial 
            color="#ff0000" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      )}
      
      {/* Performance monitor mesh (invisible) */}
      <mesh 
        position={[0, 20, 0]} 
        visible={false}
        userData={{
          component: 'GLTFInteractionHandler',
          frameCount: frameCount.current,
          performanceMetrics: performanceMetrics.current
        }}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial />
      </mesh>
      
      {children}
    </>
  );
}

/**
 * Component utilities and validation
 */
GLTFInteractionHandler.validateProps = (props) => {
  const errors = [];
  
  if (props.interactionController && typeof props.interactionController.updateMousePosition !== 'function') {
    errors.push('interactionController must have updateMousePosition method');
  }
  
  if (props.interactionController && typeof props.interactionController.handleScroll !== 'function') {
    errors.push('interactionController must have handleScroll method');
  }
  
  if (props.interactionController && typeof props.interactionController.applyFrameInteractions !== 'function') {
    errors.push('interactionController must have applyFrameInteractions method');
  }
  
  return errors;
};

// Development helper
if (process.env.NODE_ENV === 'development') {
  GLTFInteractionHandler.displayName = 'GLTFInteractionHandler';
  
  // Debug keyboard shortcuts info
  console.log('GLTFInteractionHandler Debug Shortcuts:');
  console.log('  Ctrl+I: Show interaction controller info');
  console.log('  Ctrl+P: Show performance metrics');
}

export default GLTFInteractionHandler;