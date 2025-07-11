// src/components/layout/gltf/EnhancedGLTFScene.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { EnhancedPhysicsMaterialParser } from '../../../core/physics/EnhancedPhysicsMaterialParser';
import { PhysicsInteractionController } from '../../../core/physics/PhysicsMaterialSystem';
import { GLTFPhysicsObject } from './GLTFPhysicsObject';
import { GLTFColliderObject } from './GLTFColliderObject';
import { GLTFInteractionHandler } from './GLTFInteractionHandler';
import { log, canvasLog, physicsLog, tracker } from '../../../utils/simpleLogging';

/**
 * Enhanced GLTF Scene Component
 * 
 * PURPOSE: Scene orchestrator that loads GLTF files and coordinates physics/collider systems
 * 
 * RESPONSIBILITIES:
 * 1. Load and mount GLTF scene
 * 2. Parse objects into physics/colliders/static categories
 * 3. Setup animations if requested
 * 4. Create interaction controllers
 * 5. Coordinate rendering of different object types
 * 6. Handle cleanup on unmount
 */
export function EnhancedGLTFScene({ 
  url, 
  animated = false, 
  enablePhysics = true,
  enableColliders = true,
  onObjectsParsed = null
}) {
  // GLTF loading and animation hooks
  const gltf = useGLTF(url);
  const { scene } = useThree();
  const { actions } = useAnimations(gltf.animations, gltf.scene);
  
  // Component state
  const [parsedObjects, setParsedObjects] = useState(null);
  const [interactionController, setInteractionController] = useState(null);
  const [isReady, setIsReady] = useState(false);
  
  // Persistent references
  const parserRef = useRef(null);
  const sceneTracker = useRef(null);

  // MAIN EFFECT: Scene setup and orchestration
  useEffect(() => {
    // Initialize component tracking
    sceneTracker.current = tracker('EnhancedGLTFScene');
    sceneTracker.current.mount({ url, animated, enablePhysics, enableColliders });
    
    canvasLog.sceneLoaded(url, 'Starting GLTF scene setup');
    
    // STEP 1: Mount GLTF scene
    const root = gltf.scene;
    scene.add(root);
    canvasLog.created('GLTF scene mounted', { 
      meshCount: root.children.length,
      hasBackground: !!root.background,
      hasCameras: gltf.cameras?.length > 0
    });

    // STEP 2: Apply embedded background if present
    if (root.background) {
      scene.background = root.background;
      canvasLog.created('Background applied from GLTF');
    }

    // STEP 3: Use exported camera as default if available
    if (gltf.cameras && gltf.cameras.length > 0) {
      const cam = gltf.cameras[0];
      scene.add(cam);
      if (cam.makeDefault) cam.makeDefault();
      canvasLog.created('Camera applied from GLTF', { 
        cameraCount: gltf.cameras.length,
        cameraType: cam.type 
      });
    }

    // STEP 4: Setup animations if requested
    if (animated && actions && Object.keys(actions).length > 0) {
      let animationsStarted = 0;
      
      Object.entries(actions).forEach(([name, action]) => {
        try {
          action.reset();
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.fadeIn(0.5);
          action.play();
          animationsStarted++;
          log.debug(`Animation started: ${name}`);
        } catch (error) {
          log.error(`Failed to start animation: ${name}`, error);
        }
      });
      
      canvasLog.created('Animations configured', { 
        total: Object.keys(actions).length,
        started: animationsStarted,
        names: Object.keys(actions)
      });
    } else if (animated) {
      log.debug('Animation requested but no actions found');
    }

    // STEP 5: Parse objects for physics and colliders
    if (enablePhysics || enableColliders) {
      log.physics('Starting object parsing for physics/colliders');
      
      try {
        // Initialize parser if needed
        if (!parserRef.current) {
          parserRef.current = new EnhancedPhysicsMaterialParser();
          log.physics('Enhanced physics material parser created');
        }
        
        // Parse the scene
        const result = parserRef.current.parseGLTFScene(root);
        setParsedObjects(result);
        
        physicsLog.rigidBodyCreated('GLTF_Scene_Analysis', {
          totalObjects: result.total,
          breakdown: {
            physics: result.physics.length,
            colliders: result.colliders.length,
            static: result.static.length
          },
          physicsObjects: result.physics.map(obj => ({ name: obj.name, material: obj.material?.type })),
          colliderObjects: result.colliders.map(obj => obj.name),
          staticObjects: result.static.map(obj => obj.name)
        });
        
        // STEP 6: Create interaction controller for physics objects
        if (enablePhysics && result.physics.length > 0) {
          const controller = new PhysicsInteractionController(result.physics);
          setInteractionController(controller);
          
          physicsLog.rigidBodyCreated('InteractionController', { 
            managedObjects: result.physics.length,
            objectNames: result.physics.map(obj => obj.name)
          });
        } else if (enablePhysics) {
          log.debug('Physics enabled but no physics objects found in scene');
        }
        
        // STEP 7: External callback with parsed results
        if (onObjectsParsed) {
          try {
            log.debug('Calling onObjectsParsed callback with results');
            onObjectsParsed(result, interactionController);
          } catch (error) {
            log.error('Error in onObjectsParsed callback', error);
          }
        }
        
        // STEP 8: Hide original meshes that now have physics bodies or colliders
        let hiddenCount = 0;
        [...result.physics, ...result.colliders].forEach(obj => {
          obj.mesh.visible = false;
          hiddenCount++;
          log.debug(`Hidden original mesh: ${obj.name} (${obj.type})`);
        });
        
        // Keep static objects visible (they're decorative only)
        result.static.forEach(obj => {
          log.debug(`Keeping static object visible: ${obj.name}`);
        });
        
        log.physics('Object visibility configured', {
          hidden: hiddenCount,
          visible: result.static.length
        });
        
      } catch (error) {
        log.error('Failed to parse scene objects', error);
        // Continue without physics/colliders
        setParsedObjects({ physics: [], colliders: [], static: [], total: 0 });
      }
    } else {
      log.debug('Physics and colliders disabled for this scene');
      setParsedObjects({ physics: [], colliders: [], static: [], total: 0 });
    }

    // STEP 9: Mark scene as ready
    setIsReady(true);
    canvasLog.created('Enhanced GLTF Scene ready', {
      url,
      animated: animated && actions && Object.keys(actions).length > 0,
      enablePhysics,
      enableColliders,
      totalParsedObjects: parsedObjects?.total || 0
    });

    // CLEANUP FUNCTION
    return () => {
      log.debug('Enhanced GLTF Scene cleanup starting');
      
      // Stop animations
      if (actions) {
        let stoppedAnimations = 0;
        Object.entries(actions).forEach(([name, action]) => {
          try {
            action.stop();
            stoppedAnimations++;
          } catch (error) {
            log.error(`Failed to stop animation: ${name}`, error);
          }
        });
        log.debug(`Stopped ${stoppedAnimations} animations`);
      }
      
      // Remove scene graph
      try {
        scene.remove(root);
        canvasLog.sceneLoaded(url, 'GLTF scene removed from Three.js scene');
      } catch (error) {
        log.error('Failed to remove GLTF scene', error);
      }
      
      // Component lifecycle cleanup
      if (sceneTracker.current) {
        sceneTracker.current.unmount();
      }
      
      log.debug('Enhanced GLTF Scene cleanup completed');
    };
  }, [gltf, scene, actions, animated, enablePhysics, enableColliders, url]);

  // Log state changes for debugging
  useEffect(() => {
    if (parsedObjects) {
      log.debug('Parsed objects state updated', {
        physics: parsedObjects.physics.length,
        colliders: parsedObjects.colliders.length,
        static: parsedObjects.static.length
      });
    }
  }, [parsedObjects]);

  useEffect(() => {
    if (interactionController) {
      log.debug('Interaction controller state updated');
    }
  }, [interactionController]);

  // EARLY RETURN: Wait for parsing if physics/colliders are enabled
  if (!isReady || (!parsedObjects && (enablePhysics || enableColliders))) {
    log.debug('Scene not ready - waiting for parsing to complete');
    return null;
  }

  // RENDER: Coordinate all object types
  return (
    <>
      {/* PHYSICS OBJECTS: Full simulation with interactions */}
      {enablePhysics && parsedObjects && interactionController && parsedObjects.physics.length > 0 && (
        <>
          {log.render('Rendering physics objects', { count: parsedObjects.physics.length })}
          {parsedObjects.physics.map((physicsObject, index) => (
            <GLTFPhysicsObject
              key={`physics-${physicsObject.name}-${index}`}
              physicsObject={physicsObject}
              interactionController={interactionController}
            />
          ))}
        </>
      )}
      
      {/* COLLIDER OBJECTS: Static collision boundaries only */}
      {enableColliders && parsedObjects && parsedObjects.colliders.length > 0 && (
        <>
          {log.render('Rendering collider objects', { count: parsedObjects.colliders.length })}
          {parsedObjects.colliders.map((colliderObject, index) => (
            <GLTFColliderObject
              key={`collider-${colliderObject.name}-${index}`}
              colliderObject={colliderObject}
            />
          ))}
        </>
      )}
      
      {/* INTERACTION HANDLER: Mouse and scroll management for physics objects */}
      {enablePhysics && interactionController && (
        <>
          {log.render('Rendering interaction handler')}
          <GLTFInteractionHandler interactionController={interactionController}>
            {/* Additional physics-aware components can be added here */}
          </GLTFInteractionHandler>
        </>
      )}
      
      {/* DEBUG INFO: Development-only object count display */}
      {process.env.NODE_ENV === 'development' && isReady && parsedObjects && (
        <mesh position={[0, 15, 0]} visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="white" />
        </mesh>
      )}
    </>
  );
}