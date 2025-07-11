// src/components/three-d/physics/InvisibleColliders.jsx
import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { physicsLog } from '../../../utils/simpleLogging';

/**
 * Invisible Colliders Component
 * Adds invisible collision surfaces for physics interactions
 * Perfect for creating boundaries without visible geometry
 */
export default function InvisibleColliders() {
  
  React.useEffect(() => {
    physicsLog.rigidBodyCreated('InvisibleColliders', { 
      surfaces: ['ground', 'walls', 'ceiling'],
      purpose: 'ball collision boundaries'
    });
  }, []);

  return (
    <>
      {/* Ground plane - Large invisible floor */}
      <RigidBody type="fixed" position={[0, -5, 0]}>
        <CuboidCollider args={[50, 0.1, 50]} />
        {/* Optional: Visible ground for debugging */}
        {process.env.NODE_ENV === 'development' && (
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[100, 0.2, 100]} />
            <meshBasicMaterial color="#444444" transparent opacity={0.1} />
          </mesh>
        )}
      </RigidBody>

      {/* Invisible walls to contain the balls */}
      {/* Left wall */}
      <RigidBody type="fixed" position={[-15, 5, 0]}>
        <CuboidCollider args={[0.1, 10, 50]} />
      </RigidBody>

      {/* Right wall */}
      <RigidBody type="fixed" position={[15, 5, 0]}>
        <CuboidCollider args={[0.1, 10, 50]} />
      </RigidBody>

      {/* Back wall */}
      <RigidBody type="fixed" position={[0, 5, -15]}>
        <CuboidCollider args={[50, 10, 0.1]} />
      </RigidBody>

      {/* Front wall (optional - might interfere with camera) */}
      <RigidBody type="fixed" position={[0, 5, 25]}>
        <CuboidCollider args={[50, 10, 0.1]} />
      </RigidBody>

      {/* Ceiling (optional - to prevent balls from flying too high) */}
      <RigidBody type="fixed" position={[0, 20, 0]}>
        <CuboidCollider args={[50, 0.1, 50]} />
      </RigidBody>

      {/* Palm tree collision approximation */}
      {/* Simple cylinder colliders around where palm trees might be */}
      <RigidBody type="fixed" position={[3, 0, 2]}>
        <CuboidCollider args={[0.3, 5, 0.3]} />
      </RigidBody>

      <RigidBody type="fixed" position={[-4, 0, -1]}>
        <CuboidCollider args={[0.3, 5, 0.3]} />
      </RigidBody>

      <RigidBody type="fixed" position={[2, 0, -3]}>
        <CuboidCollider args={[0.3, 5, 0.3]} />
      </RigidBody>

      {/* Optional: Floating platform for balls to bounce on */}
      <RigidBody type="fixed" position={[0, 2, 0]}>
        <CuboidCollider args={[2, 0.1, 2]} />
        {/* Visible platform for reference */}
        <mesh>
          <boxGeometry args={[4, 0.2, 4]} />
          <meshStandardMaterial 
            color="#7C3AED" 
            transparent 
            opacity={0.3}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      </RigidBody>
    </>
  );
}