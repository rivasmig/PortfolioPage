import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../hooks/useTheme.jsx';

/**
 * WireframeComponent - Simple, stable wireframe with glow
 * Fixed version to avoid Three.js uniform errors
 */
const WireframeComponent = ({
  geometry,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color = '#00ff41',
  animated = false,
  rotationSpeed = [0, 0.01, 0],
  glowIntensity = 1.0,
  opacity = 0.8,
  ...props
}) => {
  const meshRef = useRef();
  const { getThemeProperty } = useTheme();
  
  // Get theme-based wireframe settings
  const themeColor = getThemeProperty('colors.primary', color);
  const themeGlowIntensity = parseFloat(getThemeProperty('materials.glowIntensity', glowIntensity));
  const themeOpacity = parseFloat(getThemeProperty('materials.wireframeOpacity', opacity));
  
  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current || !animated) return;
    
    meshRef.current.rotation.x += rotationSpeed[0];
    meshRef.current.rotation.y += rotationSpeed[1];
    meshRef.current.rotation.z += rotationSpeed[2];
  });
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      rotation={rotation} 
      scale={scale} 
      geometry={geometry}
      {...props}
    >
      {/* Simple wireframe material - more stable */}
      <meshBasicMaterial
        color={themeColor}
        wireframe={true}
        transparent={true}
        opacity={themeOpacity}
      />
    </mesh>
  );
};

export default WireframeComponent;