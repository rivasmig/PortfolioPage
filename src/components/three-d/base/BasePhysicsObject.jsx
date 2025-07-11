// src/components/three-d/base/BasePhysicsObject.jsx
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

/**
 * BasePhysicsObject
 * 
 * Base class for all physics-enabled 3D objects in the system.
 * Provides common physics behaviors, interactions, and lifecycle management.
 * 
 * Features:
 * - Mouse interaction (attraction/repulsion/orbital)
 * - Click handling with impulse forces
 * - Scroll-based wind effects
 * - Visual feedback (hover, click effects)
 * - Physics material system integration
 * - Automatic cleanup and optimization
 */
const BasePhysicsObject = forwardRef(({
  // Transform props
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  
  // Physics props
  physicsMaterial = 'bouncy',
  customPhysicsProps = {},
  
  // Interaction props
  enableMouseInteraction = true,
  enableClickInteraction = true,
  enableScrollInteraction = true,
  
  // Visual props
  color = '#FF6B6B',
  hoverColor = null,
  showHoverEffect = true,
  showClickEffect = true,
  
  // Callbacks
  onHit = null,
  onHover = null,
  onUnhover = null,
  onClick = null,
  
  // Children and rendering
  children,
  renderGeometry = null, // Function to render custom geometry
  
  // Advanced props
  interactionRadius = 8,
  attractionStrength = 3,
  impulseStrength = 10,
  windSensitivity = 1,
  
  ...otherProps
}, ref) => {
  
  // Refs for physics and visual components
  const rigidBodyRef = useRef();
  const meshRef = useRef();
  
  // Component state
  const [isHovered, setIsHovered] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  
  // Three.js hooks
  const { pointer, viewport } = useThree();
  
  // Physics material properties (this would come from your physics material system)
  const getPhysicsProps = () => {
    // Default physics properties - in real implementation, this would
    // pull from your PHYSICS_MATERIALS system
    const defaultProps = {
      restitution: 0.8,
      friction: 0.3,
      density: 0.5,
      gravityScale: 1.0,
    };
    
    return { ...defaultProps, ...customPhysicsProps };
  };
  
  const physicsProps = getPhysicsProps();
  
  // Expose rigid body methods to parent components
  useImperativeHandle(ref, () => ({
    getRigidBody: () => rigidBodyRef.current,
    getMesh: () => meshRef.current,
    applyImpulse: (impulse, wake = true) => {
      if (rigidBodyRef.current) {
        rigidBodyRef.current.applyImpulse(impulse, wake);
      }
    },
    addForce: (force, wake = true) => {
      if (rigidBodyRef.current) {
        rigidBodyRef.current.addForce(force, wake);
      }
    },
    getPosition: () => {
      return rigidBodyRef.current ? rigidBodyRef.current.translation() : new THREE.Vector3(...position);
    },
    setPosition: (newPosition) => {
      if (rigidBodyRef.current) {
        rigidBodyRef.current.setTranslation(newPosition, true);
      }
    }
  }));
  
  // Mouse interaction handler
  useFrame(() => {
    if (!enableMouseInteraction || !rigidBodyRef.current || !isHovered) return;
    
    // Convert mouse position to world coordinates
    const mouseWorldPos = new THREE.Vector3(
      pointer.x * viewport.width / 2,
      pointer.y * viewport.height / 2,
      0
    );
    
    // Get object position
    const objectPos = rigidBodyRef.current.translation();
    const distance = objectPos.distanceTo(mouseWorldPos);
    
    // Apply interaction force if within radius
    if (distance < interactionRadius) {
      const direction = mouseWorldPos.clone().sub(objectPos).normalize();
      const force = direction.multiplyScalar(attractionStrength * (1 - distance / interactionRadius));
      
      // Apply different interaction types based on physics material
      if (physicsMaterial === 'magnetic' || physicsMaterial === 'orbital') {
        rigidBodyRef.current.addForce(force, true);
      } else if (physicsMaterial === 'bouncy') {
        // Repulsion for bouncy objects
        rigidBodyRef.current.addForce(force.negate(), true);
      } else {
        // Default attraction
        rigidBodyRef.current.addForce(force, true);
      }
    }
  });
  
  // Scroll wind effect
  useEffect(() => {
    if (!enableScrollInteraction) return;
    
    let lastScrollY = window.scrollY;
    let windForce = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      windForce = scrollDelta * 0.02 * windSensitivity;
      lastScrollY = currentScrollY;
      
      // Apply wind force
      if (rigidBodyRef.current && Math.abs(windForce) > 0.1) {
        const wind = new THREE.Vector3(
          windForce * 2,
          Math.abs(windForce) * 0.5,
          windForce * 1.5
        );
        rigidBodyRef.current.addForce(wind, true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableScrollInteraction, windSensitivity]);
  
  // Click interaction handler
  const handleClick = (event) => {
    if (!enableClickInteraction) return;
    
    event.stopPropagation();
    
    // Prevent rapid clicking
    const now = Date.now();
    if (now - lastClickTime < 200) return;
    setLastClickTime(now);
    
    if (rigidBodyRef.current) {
      // Apply random impulse force
      const impulse = new THREE.Vector3(
        (Math.random() - 0.5) * impulseStrength,
        Math.random() * impulseStrength * 0.5 + impulseStrength * 0.5,
        (Math.random() - 0.5) * impulseStrength
      );
      rigidBodyRef.current.applyImpulse(impulse, true);
      
      // Visual click effect
      if (showClickEffect) {
        setClickEffect(true);
        setTimeout(() => setClickEffect(false), 200);
      }
      
      // Callbacks
      if (onHit) onHit();
      if (onClick) onClick(event);
    }
  };
  
  // Hover handlers
  const handlePointerOver = (event) => {
    event.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = enableClickInteraction ? 'pointer' : 'default';
    if (onHover) onHover(event);
  };
  
  const handlePointerOut = (event) => {
    event.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = 'default';
    if (onUnhover) onUnhover(event);
  };
  
  // Calculate visual effects
  const getScale = () => {
    let baseScale = Array.isArray(scale) ? scale : [scale, scale, scale];
    
    if (clickEffect) {
      return baseScale.map(s => s * 1.2);
    } else if (isHovered && showHoverEffect) {
      return baseScale.map(s => s * 1.1);
    }
    
    return baseScale;
  };
  
  const getColor = () => {
    if (isHovered && hoverColor) {
      return hoverColor;
    }
    return color;
  };
  
  const getEmissive = () => {
    if (isHovered) {
      return color;
    }
    return '#000000';
  };
  
  const getEmissiveIntensity = () => {
    if (clickEffect) return 0.5;
    if (isHovered) return 0.2;
    return 0;
  };
  
  // Default geometry renderer
  const defaultGeometry = () => (
    <>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={getColor()}
        emissive={getEmissive()}
        emissiveIntensity={getEmissiveIntensity()}
        roughness={0.3}
        metalness={0.1}
      />
    </>
  );
  
  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      rotation={rotation}
      restitution={physicsProps.restitution}
      friction={physicsProps.friction}
      density={physicsProps.density}
      gravityScale={physicsProps.gravityScale}
      {...otherProps}
    >
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={getScale()}
      >
        {/* Render custom geometry if provided, otherwise use default */}
        {renderGeometry ? renderGeometry({
          color: getColor(),
          emissive: getEmissive(),
          emissiveIntensity: getEmissiveIntensity(),
          isHovered,
          clickEffect
        }) : defaultGeometry()}
        
        {/* Render children if provided */}
        {children}
      </mesh>
    </RigidBody>
  );
});

BasePhysicsObject.displayName = 'BasePhysicsObject';

export default BasePhysicsObject;