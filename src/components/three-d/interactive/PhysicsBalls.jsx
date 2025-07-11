// src/components/three-d/interactive/PhysicsBalls.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import BasePhysicsObject from '../base/BasePhysicsObject';
import * as THREE from 'three';

/**
 * Individual Physics Ball Component
 * Extends BasePhysicsObject with ball-specific behavior and rendering
 */
const PhysicsBall = React.forwardRef(({ 
  position, 
  color, 
  ballModel = null, 
  onHit,
  physicsMaterial = 'bouncy',
  size = 0.5,
  segments = 32,
  useCustomModel = false,
  ...props 
}, ref) => {
  // Custom geometry renderer for balls
  const renderBallGeometry = ({ color, emissive, emissiveIntensity, isHovered, clickEffect }) => {
    if (useCustomModel && ballModel) {
      // Use GLTF model only if explicitly requested and available
      return <primitive object={ballModel.scene.clone()} />;
    } else {
      // Default to procedural sphere with enhanced materials
      return (
        <>
          <sphereGeometry args={[size, segments, segments]} />
          <meshStandardMaterial 
            color={color}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
            roughness={isHovered ? 0.1 : 0.3}
            metalness={isHovered ? 0.3 : 0.1}
            envMapIntensity={1.0}
            clearcoat={0.1}
            clearcoatRoughness={0.1}
          />
        </>
      );
    }
  };

  return (
    <BasePhysicsObject
      ref={ref}
      position={position}
      color={color}
      physicsMaterial={physicsMaterial}
      onHit={onHit}
      renderGeometry={renderBallGeometry}
      interactionRadius={6}
      attractionStrength={4}
      impulseStrength={15}
      windSensitivity={1.2}
      {...props}
    />
  );
});

PhysicsBall.displayName = 'PhysicsBall';

/**
 * Ball Spawner Component
 * Manages spawning and respawning of physics balls
 */
function BallSpawner({ 
  count, 
  colors, 
  spawnRadius, 
  spawnHeight, 
  ballModel,
  useCustomModel = false,
  onBallHit,
  respawnOnFall = true,
  fallThreshold = -20,
  ballSize = 0.5,
  ballSegments = 32
}) {
  const ballRefs = useRef([]);
  const [ballPositions, setBallPositions] = useState([]);

  // Generate initial ball positions
  const generateBallPositions = () => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = Math.random() * spawnRadius;
      return [
        Math.cos(angle) * radius,
        spawnHeight + Math.random() * 2,
        Math.sin(angle) * radius
      ];
    });
  };

  // Initialize ball positions
  useEffect(() => {
    setBallPositions(generateBallPositions());
    ballRefs.current = Array.from({ length: count }, () => React.createRef());
  }, [count, spawnRadius, spawnHeight]);

  // Check for fallen balls and respawn them
  useFrame(() => {
    if (!respawnOnFall) return;

    ballRefs.current.forEach((ballRef, index) => {
      if (ballRef.current) {
        const position = ballRef.current.getPosition();
        if (position && position.y < fallThreshold) {
          // Respawn ball at original position
          const newPosition = new THREE.Vector3(...ballPositions[index]);
          ballRef.current.setPosition(newPosition);
          
          // Reset velocity
          const rigidBody = ballRef.current.getRigidBody();
          if (rigidBody) {
            rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
            rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
          }
        }
      }
    });
  });

  return (
    <>
      {ballPositions.map((position, index) => (
        <PhysicsBall
          key={index}
          ref={ballRefs.current[index]}
          position={position}
          color={colors[index % colors.length]}
          ballModel={ballModel}
          useCustomModel={useCustomModel}
          size={ballSize}
          segments={ballSegments}
          onHit={onBallHit}
          physicsMaterial={index % 3 === 0 ? 'bouncy' : index % 3 === 1 ? 'floaty' : 'magnetic'}
        />
      ))}
    </>
  );
}

/**
 * Global Physics Effects Component
 * Handles effects that apply to all physics balls
 */
function GlobalPhysicsEffects({ ballRefs, enabled = true }) {
  const windForceRef = useRef(0);
  const lastScrollY = useRef(0);

  // Global scroll wind effect
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      windForceRef.current = scrollDelta * 0.02;
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled]);

  // Apply global effects each frame
  useFrame(() => {
    if (!enabled || Math.abs(windForceRef.current) < 0.1) {
      windForceRef.current *= 0.95; // Decay wind force
      return;
    }

    // Apply wind to all balls
    ballRefs.current.forEach(ballRef => {
      if (ballRef?.current) {
        const wind = new THREE.Vector3(
          windForceRef.current * 3,
          Math.abs(windForceRef.current) * 0.5,
          windForceRef.current * 2
        );
        ballRef.current.addForce(wind);
      }
    });

    // Decay wind force
    windForceRef.current *= 0.95;
  });

  return null;
}

/**
 * Physics Performance Monitor
 * Monitors and optimizes physics performance
 */
function PhysicsPerformanceMonitor({ ballRefs, maxObjects = 20, onOptimization = null }) {
  const [activeObjects, setActiveObjects] = useState(0);
  const [averageFrameTime, setAverageFrameTime] = useState(0);
  const frameTimeHistory = useRef([]);

  useFrame((_, deltaTime) => {
    // Track frame times
    frameTimeHistory.current.push(deltaTime);
    if (frameTimeHistory.current.length > 60) {
      frameTimeHistory.current.shift();
    }

    // Calculate average frame time every 60 frames
    if (frameTimeHistory.current.length === 60) {
      const avgTime = frameTimeHistory.current.reduce((a, b) => a + b) / 60;
      setAverageFrameTime(avgTime);

      // Performance optimization
      if (avgTime > 0.02 && activeObjects > 10) { // 50fps threshold
        if (onOptimization) {
          onOptimization('reduce_objects', { currentObjects: activeObjects, avgFrameTime: avgTime });
        }
      }
    }

    // Count active objects
    const active = ballRefs.current.filter(ref => ref?.current).length;
    setActiveObjects(active);
  });

  // Log debug info to console instead of rendering text
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Physics Debug - Active Objects: ${activeObjects}, Avg Frame Time: ${(averageFrameTime * 1000).toFixed(1)}ms`);
    }
  }, [activeObjects, averageFrameTime]);

  return null; // No visual component needed
}

/**
 * Main Physics Balls Component
 * High-level component that orchestrates all ball-related physics
 */
export default function PhysicsBalls({ 
  ballUrl = null,
  useCustomModel = false, // New prop to explicitly enable GLTF models
  count = 5,
  colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  spawnRadius = 3,
  spawnHeight = 5,
  ballSize = 0.5,
  ballSegments = 32, // Quality of procedural spheres
  enableGlobalEffects = true,
  enablePerformanceMonitoring = true,
  respawnFallenBalls = true,
  onBallHit = null,
  onPerformanceOptimization = null
}) {
  const ballRefs = useRef([]);
  const [ballModel, setBallModel] = useState(null);
  const [hitCount, setHitCount] = useState(0);

  // Only load ball model if explicitly requested and URL provided
  const gltf = (useCustomModel && ballUrl) ? useGLTF(ballUrl) : null;
  
  useEffect(() => {
    if (useCustomModel && gltf) {
      setBallModel(gltf);
    }
  }, [gltf, useCustomModel]);

  // Handle ball hits
  const handleBallHit = () => {
    setHitCount(prev => prev + 1);
    if (onBallHit) onBallHit(hitCount + 1);
  };

  // Handle performance optimization
  const handlePerformanceOptimization = (type, data) => {
    console.log('Physics performance optimization:', type, data);
    if (onPerformanceOptimization) {
      onPerformanceOptimization(type, data);
    }
  };

  return (
    <>
      {/* Ball spawner */}
      <BallSpawner
        count={count}
        colors={colors}
        spawnRadius={spawnRadius}
        spawnHeight={spawnHeight}
        ballModel={ballModel}
        useCustomModel={useCustomModel}
        ballSize={ballSize}
        ballSegments={ballSegments}
        onBallHit={handleBallHit}
        respawnOnFall={respawnFallenBalls}
        ballRefs={ballRefs}
      />
      
      {/* Global physics effects */}
      {enableGlobalEffects && (
        <GlobalPhysicsEffects 
          ballRefs={ballRefs}
          enabled={enableGlobalEffects}
        />
      )}
      
      {/* Performance monitoring */}
      {enablePerformanceMonitoring && (
        <PhysicsPerformanceMonitor 
          ballRefs={ballRefs}
          onOptimization={handlePerformanceOptimization}
        />
      )}
    </>
  );
}

// Preload the ball model only if needed
function preloadBallModel(ballUrl, useCustomModel = false) {
  if (useCustomModel && ballUrl) {
    useGLTF.preload(ballUrl);
  }
}

// Export individual components for advanced usage
export { PhysicsBall, BallSpawner, GlobalPhysicsEffects, PhysicsPerformanceMonitor, preloadBallModel };

/**
 * Usage Examples:
 * 
 * // Default procedural spheres (recommended)
 * <PhysicsBalls 
 *   count={5}
 *   ballSize={0.5}
 *   ballSegments={32}
 *   colors={['#FF6B6B', '#4ECDC4']}
 * />
 * 
 * // Custom GLTF model spheres (only if you have a special ball model)
 * <PhysicsBalls 
 *   ballUrl="/assets/models/fancy-ball.gltf"
 *   useCustomModel={true}
 *   count={3}
 * />
 * 
 * // Performance optimized (lower quality for mobile)
 * <PhysicsBalls 
 *   count={3}
 *   ballSize={0.4}
 *   ballSegments={16} // Lower quality for better performance
 *   enablePerformanceMonitoring={true}
 * />
 * 
 * // Custom colors and physics materials
 * <PhysicsBalls 
 *   colors={['#7C3AED', '#5B21B6', '#A78BFA']}
 *   spawnRadius={2}
 *   spawnHeight={8}
 * />
 */