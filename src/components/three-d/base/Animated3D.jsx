import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Base3DComponent from './Base3DComponent';

/**
 * Animated3D - Enhanced base class for animated 3D elements
 * Provides complex animation patterns beyond basic rotation
 */
const Animated3D = ({
  children,
  
  // Movement animations
  orbit = false,           // Orbit around a point
  orbitRadius = 2,         // How far to orbit
  orbitSpeed = 1,          // Orbit speed
  orbitAxis = 'y',         // Axis to orbit around
  
  // Scale animations
  pulse = false,           // Pulsing scale effect
  pulseAmount = 0.2,       // How much to pulse
  pulseSpeed = 2,          // Pulse frequency
  
  // Complex rotations
  wobble = false,          // Wobbling motion
  wobbleAmount = 0.1,      // Wobble intensity
  wobbleSpeed = 3,         // Wobble frequency
  
  // Path following
  pathPoints = null,       // Array of points to follow
  pathSpeed = 1,           // Speed along path
  pathLoop = true,         // Loop the path
  
  // Noise-based animations
  noiseIntensity = 0,      // Random movement intensity
  noiseSpeed = 1,          // Noise change speed
  
  ...baseProps
}) => {
  
  const meshRef = useRef();
  const timeRef = useRef(0);
  const pathProgressRef = useRef(0);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    timeRef.current += delta;
    const time = timeRef.current;
    
    // Orbit animation
    if (orbit) {
      const angle = time * orbitSpeed;
      if (orbitAxis === 'y') {
        meshRef.current.position.x = Math.cos(angle) * orbitRadius;
        meshRef.current.position.z = Math.sin(angle) * orbitRadius;
      } else if (orbitAxis === 'x') {
        meshRef.current.position.y = Math.cos(angle) * orbitRadius;
        meshRef.current.position.z = Math.sin(angle) * orbitRadius;
      } else if (orbitAxis === 'z') {
        meshRef.current.position.x = Math.cos(angle) * orbitRadius;
        meshRef.current.position.y = Math.sin(angle) * orbitRadius;
      }
    }
    
    // Pulse animation
    if (pulse) {
      const pulseScale = 1 + Math.sin(time * pulseSpeed) * pulseAmount;
      meshRef.current.scale.setScalar(pulseScale);
    }
    
    // Wobble animation
    if (wobble) {
      meshRef.current.rotation.x += Math.sin(time * wobbleSpeed) * wobbleAmount * delta;
      meshRef.current.rotation.z += Math.cos(time * wobbleSpeed * 0.7) * wobbleAmount * delta;
    }
    
    // Path following
    if (pathPoints && pathPoints.length > 1) {
      pathProgressRef.current += pathSpeed * delta;
      
      if (pathLoop && pathProgressRef.current >= pathPoints.length - 1) {
        pathProgressRef.current = 0;
      } else if (!pathLoop && pathProgressRef.current >= pathPoints.length - 1) {
        pathProgressRef.current = pathPoints.length - 1;
      }
      
      const currentIndex = Math.floor(pathProgressRef.current);
      const nextIndex = Math.min(currentIndex + 1, pathPoints.length - 1);
      const t = pathProgressRef.current - currentIndex;
      
      const currentPoint = pathPoints[currentIndex];
      const nextPoint = pathPoints[nextIndex];
      
      // Linear interpolation between path points
      meshRef.current.position.x = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * t;
      meshRef.current.position.y = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * t;
      meshRef.current.position.z = currentPoint[2] + (nextPoint[2] - currentPoint[2]) * t;
    }
    
    // Noise-based movement
    if (noiseIntensity > 0) {
      const noiseX = (Math.sin(time * noiseSpeed + 0) * 0.5 + 0.5 - 0.5) * noiseIntensity;
      const noiseY = (Math.sin(time * noiseSpeed + 100) * 0.5 + 0.5 - 0.5) * noiseIntensity;
      const noiseZ = (Math.sin(time * noiseSpeed + 200) * 0.5 + 0.5 - 0.5) * noiseIntensity;
      
      meshRef.current.position.x += noiseX * delta;
      meshRef.current.position.y += noiseY * delta;
      meshRef.current.position.z += noiseZ * delta;
    }
    
    // Call original animation if provided
    if (baseProps.onBeforeRender) {
      baseProps.onBeforeRender(meshRef.current, state, delta);
    }
  });
  
  return (
    <Base3DComponent
      {...baseProps}
      ref={meshRef}
      animated={true} // Always animated
      onBeforeRender={null} // We handle this internally
    >
      {children}
    </Base3DComponent>
  );
};

export default Animated3D;