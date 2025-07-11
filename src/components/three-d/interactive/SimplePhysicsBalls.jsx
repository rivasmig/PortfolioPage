// src/components/three-d/interactive/SimplePhysicsBalls.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { log, physicsLog, interactionLog, tracker } from '../../../utils/simpleLogging';

/**
 * Simple Physics Ball - No inheritance, minimal complexity for debugging
 */
function SimplePhysicsBall({ position, color, onHit, size = 0.5, index }) {
  const rigidBodyRef = useRef();
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const ballName = `Ball_${index}`;
  
  const { pointer, viewport } = useThree();

  // Component lifecycle logging
  useEffect(() => {
    const ballTracker = tracker(`SimplePhysicsBall_${index}`);
    ballTracker.mount({ position, color, size });
    
    log.physics(`Attempting to create RigidBody for ${ballName}`);
    
    return () => {
      physicsLog.rigidBodyDestroyed(ballName);
      ballTracker.unmount();
    };
  }, [ballName, position, color, size, index]);

  // Log successful RigidBody creation
  useEffect(() => {
    if (rigidBodyRef.current) {
      physicsLog.rigidBodyCreated(ballName, { position, color, size });
    }
  }, [rigidBodyRef.current]);

  // Mouse attraction effect
  useFrame(() => {
    if (rigidBodyRef.current && isHovered) {
      try {
        const mouseWorldPos = new THREE.Vector3(
          pointer.x * viewport.width / 2,
          pointer.y * viewport.height / 2,
          0
        );
        
        const ballPos = rigidBodyRef.current.translation();
        const distance = ballPos.distanceTo(mouseWorldPos);
        
        if (distance < 8) {
          const attraction = mouseWorldPos.clone().sub(ballPos).normalize().multiplyScalar(3);
          rigidBodyRef.current.addForce(attraction, true);
          
          // Log force application (throttled)
          if (Math.random() < 0.01) { // Log ~1% of frames to avoid spam
            physicsLog.forceApplied(ballName, attraction.toArray(), ballPos.toArray());
          }
        }
      } catch (error) {
        log.error(`Error in mouse attraction for ${ballName}`, error);
      }
    }
  });

  const handleClick = (event) => {
    event.stopPropagation();
    
    interactionLog.clickStart(ballName, event.button, [event.clientX, event.clientY]);
    
    if (rigidBodyRef.current) {
      try {
        const impulse = new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          Math.random() * 10 + 5,
          (Math.random() - 0.5) * 15
        );
        rigidBodyRef.current.applyImpulse(impulse, true);
        
        physicsLog.impulseApplied(ballName, impulse.toArray(), rigidBodyRef.current.translation().toArray());
        
        setClickEffect(true);
        setTimeout(() => setClickEffect(false), 200);
        
        if (onHit) {
          log.debug(`Ball ${index} hit callback triggered`);
          onHit(index);
        }
      } catch (error) {
        log.error(`Error applying impulse to ${ballName}`, error);
      }
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
    interactionLog.mouseEnter(ballName, [e.clientX, e.clientY]);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = 'default';
    interactionLog.mouseLeave(ballName);
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      restitution={0.8}
      friction={0.3}
      density={0.5}
    >
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={clickEffect ? 1.2 : isHovered ? 1.1 : 1.0}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={color}
          emissive={isHovered ? color : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </RigidBody>
  );
}

/**
 * Simple Physics Balls Container - Minimal version for debugging
 */
export default function SimplePhysicsBalls({ 
  count = 5,
  colors = ['#7C3AED', '#5B21B6', '#A78BFA', '#DDD6FE', '#EDE9FE'],
  spawnRadius = 3,
  spawnHeight = 5,
  ballSize = 0.6
}) {
  const [hitCount, setHitCount] = useState(0);
  const componentTracker = useRef(null);

  // Component lifecycle logging
  useEffect(() => {
    componentTracker.current = tracker('SimplePhysicsBalls');
    componentTracker.current.mount({ count, colors, spawnRadius, spawnHeight, ballSize });
    
    log.physics(`SimplePhysicsBalls initialized with ${count} balls`);
    
    return () => {
      componentTracker.current?.unmount();
    };
  }, []);

  // Generate ball positions
  const ballPositions = React.useMemo(() => {
    const positions = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = Math.random() * spawnRadius;
      return [
        Math.cos(angle) * radius,
        spawnHeight + Math.random() * 2,
        Math.sin(angle) * radius
      ];
    });
    
    log.debug('Ball positions generated', { count, positions });
    return positions;
  }, [count, spawnRadius, spawnHeight]);

  const handleBallHit = (ballIndex) => {
    const newHitCount = hitCount + 1;
    setHitCount(newHitCount);
    
    log.interaction(`Ball ${ballIndex} hit! Total hits: ${newHitCount}`);
    
    // Log hit statistics every 5 hits
    if (newHitCount % 5 === 0) {
      log.performance(`Hit milestone: ${newHitCount} total hits`);
    }
  };

  // Performance monitoring
  useEffect(() => {
    const performanceTimer = setInterval(() => {
      log.performance('SimplePhysicsBalls performance check', {
        totalBalls: count,
        totalHits: hitCount,
        memoryUsage: performance.memory ? {
          used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)
        } : 'unavailable'
      });
    }, 10000); // Every 10 seconds

    return () => clearInterval(performanceTimer);
  }, [count, hitCount]);

  return (
    <>
      {ballPositions.map((position, index) => (
        <SimplePhysicsBall
          key={index}
          index={index}
          position={position}
          color={colors[index % colors.length]}
          size={ballSize}
          onHit={handleBallHit}
        />
      ))}
    </>
  );
}