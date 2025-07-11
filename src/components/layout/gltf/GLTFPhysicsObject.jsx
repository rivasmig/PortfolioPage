// src/components/layout/gltf/GLTFPhysicsObject.jsx
import React, { useRef, useEffect, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { log, physicsLog, interactionLog, tracker } from '../../../utils/simpleLogging';

/**
 * GLTF Physics Object Component
 * 
 * PURPOSE: Creates fully interactive physics objects from GLTF meshes
 * 
 * RESPONSIBILITIES:
 * 1. Create dynamic RigidBody with full physics simulation
 * 2. Register with interaction controller for mouse/scroll responses
 * 3. Handle user interactions (click, hover, pointer events)
 * 4. Apply physics material properties (bounce, friction, etc.)
 * 5. Log physics events and interactions
 * 6. Manage component lifecycle and cleanup
 * 
 * USE CASE: Interactive objects that users can click, attract with mouse, affected by scroll
 */
export function GLTFPhysicsObject({ physicsObject, interactionController }) {
  // Component refs
  const rigidBodyRef = useRef();
  const meshRef = useRef();
  
  // Component state
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  
  // Component tracking
  const physicsTracker = useRef(null);
  const lastInteractionTime = useRef(0);

  // INITIALIZATION EFFECT: Setup physics object with full validation
  useEffect(() => {
    // Initialize component tracking
    physicsTracker.current = tracker(`GLTFPhysicsObject_${physicsObject.name}`);
    physicsTracker.current.mount({ 
      name: physicsObject.name,
      materialType: physicsObject.material?.type,
      position: physicsObject.position,
      hasController: !!interactionController
    });

    log.debug(`Setting up physics object: ${physicsObject.name}`);

    try {
      // Validate physics object data
      if (!physicsObject.mesh) {
        throw new Error('Physics object missing mesh geometry');
      }

      if (!physicsObject.material) {
        throw new Error('Physics object missing material configuration');
      }

      if (!physicsObject.position || physicsObject.position.length !== 3) {
        throw new Error('Physics object missing valid position');
      }

      // Validate material properties
      const requiredMaterialProps = ['type', 'restitution', 'friction', 'density'];
      const missingProps = requiredMaterialProps.filter(prop => 
        physicsObject.material[prop] === undefined
      );
      
      if (missingProps.length > 0) {
        throw new Error(`Physics material missing properties: ${missingProps.join(', ')}`);
      }

      // Register with interaction controller if available
      if (interactionController) {
        try {
          interactionController.registerRigidBody(physicsObject.name, rigidBodyRef);
          log.physics(`Physics object registered with interaction controller: ${physicsObject.name}`);
        } catch (error) {
          log.error(`Failed to register with interaction controller: ${physicsObject.name}`, error);
        }
      } else {
        log.debug(`No interaction controller provided for: ${physicsObject.name}`);
      }
      
      // Log successful creation with detailed material info
      physicsLog.rigidBodyCreated(`Physics_${physicsObject.name}`, { 
        type: 'dynamic_physics_object',
        purpose: 'full_physics_simulation_with_interactions',
        materialType: physicsObject.material.type,
        physicsProperties: {
          restitution: physicsObject.material.restitution,
          friction: physicsObject.material.friction,
          density: physicsObject.material.density,
          gravityScale: physicsObject.material.gravityScale || 1.0
        },
        interactionCapabilities: {
          mouseEnabled: physicsObject.material.interactions?.mouse?.enabled || false,
          clickEnabled: physicsObject.material.interactions?.click?.enabled || false,
          scrollEnabled: physicsObject.material.interactions?.scroll?.enabled || false
        },
        position: physicsObject.position,
        rotation: physicsObject.rotation || [0, 0, 0],
        scale: physicsObject.scale || [1, 1, 1],
        meshInfo: {
          type: physicsObject.mesh.type,
          geometry: physicsObject.mesh.geometry?.type || 'unknown',
          material: physicsObject.mesh.material?.type || 'unknown'
        }
      });

      setIsReady(true);
      log.debug(`Physics object ready: ${physicsObject.name}`);

    } catch (error) {
      log.error(`Failed to setup physics object: ${physicsObject.name}`, error);
      setHasError(true);
    }

    // Cleanup function
    return () => {
      log.debug(`Cleaning up physics object: ${physicsObject.name}`);
      
      try {
        // Unregister from interaction controller
        if (interactionController && typeof interactionController.unregisterRigidBody === 'function') {
          interactionController.unregisterRigidBody(physicsObject.name);
        }
        
        physicsLog.rigidBodyDestroyed(`Physics_${physicsObject.name}`);
        
        if (physicsTracker.current) {
          physicsTracker.current.unmount();
        }
        
        log.debug(`Physics object cleanup completed: ${physicsObject.name}`);
      } catch (error) {
        log.error(`Error during physics object cleanup: ${physicsObject.name}`, error);
      }
    };
  }, [physicsObject.name, physicsObject.material, interactionController]);

  // RIGID BODY REGISTRATION EFFECT: Log when rigid body is successfully created
  useEffect(() => {
    if (rigidBodyRef.current && isReady) {
      log.physics(`RigidBody successfully created for: ${physicsObject.name}`, {
        hasTranslation: !!rigidBodyRef.current.translation,
        hasRotation: !!rigidBodyRef.current.rotation,
        hasLinvel: !!rigidBodyRef.current.linvel,
        hasAngvel: !!rigidBodyRef.current.angvel,
        rigidBodyType: physicsObject.material.type
      });
    }
  }, [rigidBodyRef.current, isReady]);

  // MESH SETUP EFFECT: Log mesh cloning and positioning
  useEffect(() => {
    if (meshRef.current && isReady) {
      log.render(`Mesh setup completed for physics object: ${physicsObject.name}`, {
        meshPosition: meshRef.current.position?.toArray(),
        meshRotation: meshRef.current.rotation ? 
          [meshRef.current.rotation.x, meshRef.current.rotation.y, meshRef.current.rotation.z] : 
          undefined,
        meshScale: meshRef.current.scale?.toArray(),
        meshVisible: meshRef.current.visible,
        meshLayers: meshRef.current.layers?.mask,
        userData: meshRef.current.userData
      });
    }
  }, [meshRef.current, isReady]);

  // INTERACTION HANDLERS with comprehensive logging
  const handleClick = (event) => {
    event.stopPropagation();
    
    const now = Date.now();
    const timeSinceLastInteraction = now - lastInteractionTime.current;
    
    // Prevent rapid clicking
    if (timeSinceLastInteraction < 100) {
      log.debug(`Click ignored - too rapid: ${physicsObject.name}`);
      return;
    }
    
    lastInteractionTime.current = now;
    setInteractionCount(prev => prev + 1);
    
    interactionLog.clickStart(physicsObject.name, event.button, [event.clientX, event.clientY]);
    
    try {
      if (interactionController) {
        interactionController.handleClick(physicsObject.name);
        log.interaction(`Click handled by controller: ${physicsObject.name}`, {
          interactionCount: interactionCount + 1,
          timeSinceLastInteraction
        });
      } else {
        log.debug(`Click received but no controller available: ${physicsObject.name}`);
      }
    } catch (error) {
      log.error(`Error handling click for: ${physicsObject.name}`, error);
    }
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    
    if (!isHovered) {
      setIsHovered(true);
      
      // Update cursor based on interaction capabilities
      if (physicsObject.material.interactions?.click?.enabled) {
        document.body.style.cursor = 'pointer';
      } else if (physicsObject.material.interactions?.mouse?.enabled) {
        document.body.style.cursor = 'crosshair';
      }
      
      interactionLog.mouseEnter(physicsObject.name, [event.clientX, event.clientY]);
    }
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    
    if (isHovered) {
      setIsHovered(false);
      document.body.style.cursor = 'default';
      interactionLog.mouseLeave(physicsObject.name);
    }
  };

  // ERROR STATE: Component failed to initialize
  if (hasError) {
    log.error(`Physics object in error state: ${physicsObject.name}`);
    return null;
  }

  // LOADING STATE: Still setting up
  if (!isReady) {
    log.debug(`Physics object not ready: ${physicsObject.name}`);
    return null;
  }

  // RENDER: Dynamic physics object with full interaction capabilities
  return (
    <RigidBody
      ref={rigidBodyRef}
      type={physicsObject.material.type}
      position={physicsObject.position}
      rotation={physicsObject.rotation || [0, 0, 0]}
      restitution={physicsObject.material.restitution}
      friction={physicsObject.material.friction}
      density={physicsObject.material.density}
      gravityScale={physicsObject.material.gravityScale || 1.0}
      // Additional physics properties for better simulation
      linearDamping={physicsObject.material.linearDamping || 0.1}
      angularDamping={physicsObject.material.angularDamping || 0.1}
      canSleep={true} // Allow physics objects to sleep for performance
      onCollisionEnter={(e) => {
        if (process.env.NODE_ENV === 'development') {
          physicsLog.collision(
            physicsObject.name,
            e.other?.rigidBody?.userData?.name || 'unknown',
            e.manifold?.contactPoint
          );
        }
      }}
      onSleep={() => {
        if (process.env.NODE_ENV === 'development') {
          log.physics(`Physics object went to sleep: ${physicsObject.name}`);
        }
      }}
      onWake={() => {
        if (process.env.NODE_ENV === 'development') {
          log.physics(`Physics object woke up: ${physicsObject.name}`);
        }
      }}
    >
      <primitive
        ref={meshRef}
        object={physicsObject.mesh.clone()}
        onClick={physicsObject.material.interactions?.click?.enabled ? handleClick : undefined}
        onPointerOver={physicsObject.material.interactions?.mouse?.enabled ? handlePointerOver : undefined}
        onPointerOut={physicsObject.material.interactions?.mouse?.enabled ? handlePointerOut : undefined}
        userData={{ 
          name: physicsObject.name,
          type: 'physics_object',
          materialType: physicsObject.material.type,
          interactionCount: interactionCount,
          isHovered: isHovered
        }}
      />
    </RigidBody>
  );
}

/**
 * Component validation and utilities
 */
GLTFPhysicsObject.validateProps = (physicsObject, interactionController) => {
  const errors = [];
  
  if (!physicsObject) {
    errors.push('physicsObject is required');
    return errors;
  }
  
  // Validate required properties
  const requiredProps = ['name', 'mesh', 'material', 'position'];
  requiredProps.forEach(prop => {
    if (!physicsObject[prop]) {
      errors.push(`physicsObject.${prop} is required`);
    }
  });
  
  // Validate material structure
  if (physicsObject.material) {
    const requiredMaterialProps = ['type', 'restitution', 'friction', 'density'];
    requiredMaterialProps.forEach(prop => {
      if (physicsObject.material[prop] === undefined) {
        errors.push(`physicsObject.material.${prop} is required`);
      }
    });
    
    // Validate interactions structure
    if (physicsObject.material.interactions) {
      ['mouse', 'click', 'scroll'].forEach(interactionType => {
        const interaction = physicsObject.material.interactions[interactionType];
        if (interaction && typeof interaction.enabled !== 'boolean') {
          errors.push(`physicsObject.material.interactions.${interactionType}.enabled must be boolean`);
        }
      });
    }
  }
  
  // Validate interaction controller if provided
  if (interactionController) {
    const requiredMethods = ['registerRigidBody', 'handleClick'];
    requiredMethods.forEach(method => {
      if (typeof interactionController[method] !== 'function') {
        errors.push(`interactionController must have ${method} method`);
      }
    });
  }
  
  return errors;
};

// Development helper
if (process.env.NODE_ENV === 'development') {
  GLTFPhysicsObject.displayName = 'GLTFPhysicsObject';
}

export default GLTFPhysicsObject;