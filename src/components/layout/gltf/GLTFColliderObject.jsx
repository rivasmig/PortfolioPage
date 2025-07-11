// src/components/layout/gltf/GLTFColliderObject.jsx
import React, { useRef, useEffect, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { log, physicsLog, tracker } from '../../../utils/simpleLogging';

/**
 * GLTF Collider Object Component
 * 
 * PURPOSE: Creates static collision boundaries from GLTF objects
 * 
 * RESPONSIBILITIES:
 * 1. Create fixed RigidBody for collision detection
 * 2. Clone and position the mesh geometry
 * 3. Provide collision boundaries without physics simulation
 * 4. Handle component lifecycle and cleanup
 * 5. Log collision boundary creation and status
 * 
 * USE CASE: Invisible walls, floors, obstacles that things bounce off but don't move
 */
export function GLTFColliderObject({ colliderObject }) {
  // Component refs
  const rigidBodyRef = useRef();
  const meshRef = useRef();
  
  // Component state
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Component tracking
  const colliderTracker = useRef(null);

  // MAIN EFFECT: Create static collision boundary
  useEffect(() => {
    // Initialize component tracking
    colliderTracker.current = tracker(`GLTFColliderObject_${colliderObject.name}`);
    colliderTracker.current.mount({ 
      name: colliderObject.name,
      position: colliderObject.position,
      rotation: colliderObject.rotation,
      scale: colliderObject.scale
    });

    log.debug(`Setting up collider object: ${colliderObject.name}`);

    try {
      // Validate collider object data
      if (!colliderObject.mesh) {
        throw new Error('Collider object missing mesh geometry');
      }

      if (!colliderObject.position || colliderObject.position.length !== 3) {
        throw new Error('Collider object missing valid position');
      }

      // Log successful creation
      physicsLog.rigidBodyCreated(`Collider_${colliderObject.name}`, { 
        type: 'static_collider',
        purpose: 'collision_boundary_only',
        position: colliderObject.position,
        rotation: colliderObject.rotation || [0, 0, 0],
        scale: colliderObject.scale || [1, 1, 1],
        meshType: colliderObject.mesh.type,
        meshGeometry: colliderObject.mesh.geometry?.type || 'unknown'
      });

      setIsReady(true);
      log.debug(`Collider object ready: ${colliderObject.name}`);

    } catch (error) {
      log.error(`Failed to setup collider object: ${colliderObject.name}`, error);
      setHasError(true);
    }

    // Cleanup function
    return () => {
      log.debug(`Cleaning up collider object: ${colliderObject.name}`);
      
      try {
        physicsLog.rigidBodyDestroyed(`Collider_${colliderObject.name}`);
        
        if (colliderTracker.current) {
          colliderTracker.current.unmount();
        }
        
        log.debug(`Collider cleanup completed: ${colliderObject.name}`);
      } catch (error) {
        log.error(`Error during collider cleanup: ${colliderObject.name}`, error);
      }
    };
  }, [colliderObject.name, colliderObject.position, colliderObject.rotation]);

  // Log rigid body registration
  useEffect(() => {
    if (rigidBodyRef.current && isReady) {
      log.physics(`RigidBody registered for collider: ${colliderObject.name}`, {
        rigidBodyType: 'fixed',
        hasTranslation: !!rigidBodyRef.current.translation,
        hasRotation: !!rigidBodyRef.current.rotation
      });
    }
  }, [rigidBodyRef.current, isReady]);

  // Log mesh cloning and setup
  useEffect(() => {
    if (meshRef.current && isReady) {
      log.render(`Mesh cloned and positioned for collider: ${colliderObject.name}`, {
        meshPosition: meshRef.current.position?.toArray(),
        meshRotation: meshRef.current.rotation ? 
          [meshRef.current.rotation.x, meshRef.current.rotation.y, meshRef.current.rotation.z] : 
          undefined,
        meshScale: meshRef.current.scale?.toArray(),
        meshVisible: meshRef.current.visible
      });
    }
  }, [meshRef.current, isReady]);

  // ERROR STATE: Component failed to initialize
  if (hasError) {
    log.error(`Collider object in error state: ${colliderObject.name}`);
    return null;
  }

  // LOADING STATE: Still setting up
  if (!isReady) {
    log.debug(`Collider object not ready: ${colliderObject.name}`);
    return null;
  }

  // RENDER: Static collision boundary
  return (
    <RigidBody
      ref={rigidBodyRef}
      type="fixed" // Always fixed - no physics simulation, just collision
      position={colliderObject.position}
      rotation={colliderObject.rotation || [0, 0, 0]}
      friction={0.8} // Good default friction for collision boundaries
      restitution={0.3} // Slight bounce for natural feel
      onCollisionEnter={(e) => {
        // Log collisions in development
        if (process.env.NODE_ENV === 'development') {
          log.physics(`Collision with collider: ${colliderObject.name}`, {
            colliderName: colliderObject.name,
            otherObject: e.other?.rigidBody?.userData?.name || 'unknown',
            collisionPoint: e.manifold?.contactPoint
          });
        }
      }}
    >
      <primitive
        ref={meshRef}
        object={colliderObject.mesh.clone()}
        userData={{ 
          name: colliderObject.name,
          type: 'collider',
          isStatic: true 
        }}
      />
    </RigidBody>
  );
}

/**
 * Component validation and utilities
 */
GLTFColliderObject.validateProps = (colliderObject) => {
  const errors = [];
  
  if (!colliderObject) {
    errors.push('colliderObject is required');
    return errors;
  }
  
  if (!colliderObject.name) {
    errors.push('colliderObject.name is required');
  }
  
  if (!colliderObject.mesh) {
    errors.push('colliderObject.mesh is required');
  }
  
  if (!colliderObject.position || !Array.isArray(colliderObject.position) || colliderObject.position.length !== 3) {
    errors.push('colliderObject.position must be an array of 3 numbers');
  }
  
  return errors;
};

// Development helper for debugging
if (process.env.NODE_ENV === 'development') {
  GLTFColliderObject.displayName = 'GLTFColliderObject';
}

export default GLTFColliderObject;