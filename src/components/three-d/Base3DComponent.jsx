import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Base3DComponent - Parent class for all 3D elements
 * Provides common props and behaviors that all 3D components can use
 */
const Base3DComponent = React.forwardRef(({
  // Transform props
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  
  // Visual props
  color = "#3b82f6", // Default blue
  opacity = 1,
  wireframe = false,
  
  // Animation props
  animated = false,
  rotationSpeed = [0, 0.01, 0],
  oscillate = false,
  oscillateAmount = 0.1,
  oscillateSpeed = 1,
  
  // Interaction props
  interactive = false,
  hoverColor = "#ef4444", // Red on hover
  onClick = null,
  
  // Performance props
  castShadow = true,
  receiveShadow = true,
  
  // Custom props
  children,
  onBeforeRender = null,
  
  ...props
}, ref) => {
  
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Animation frame loop
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Auto rotation
    if (animated && rotationSpeed) {
      meshRef.current.rotation.x += rotationSpeed[0];
      meshRef.current.rotation.y += rotationSpeed[1];
      meshRef.current.rotation.z += rotationSpeed[2];
    }
    
    // Oscillation (floating effect)
    if (oscillate) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * oscillateSpeed) * oscillateAmount;
    }
    
    // Custom before render callback
    if (onBeforeRender) {
      onBeforeRender(meshRef.current, state, delta);
    }
  });
  
  // Event handlers
  const handleClick = (event) => {
    event.stopPropagation();
    setIsClicked(!isClicked);
    if (onClick) onClick(event);
  };
  
  const handlePointerOver = (event) => {
    event.stopPropagation();
    if (interactive) {
      setIsHovered(true);
      document.body.style.cursor = 'pointer';
    }
  };
  
  const handlePointerOut = (event) => {
    event.stopPropagation();
    if (interactive) {
      setIsHovered(false);
      document.body.style.cursor = 'auto';
    }
  };
  
  // Determine current color based on interaction state
  const getCurrentColor = () => {
    if (interactive && isHovered) return hoverColor;
    return color;
  };
  
  // Determine current scale based on interaction state
  const getCurrentScale = () => {
    const baseScale = Array.isArray(scale) ? scale : [scale, scale, scale];
    if (interactive && isHovered) {
      return baseScale.map(s => s * 1.1); // 10% bigger on hover
    }
    if (isClicked) {
      return baseScale.map(s => s * 0.95); // Slightly smaller when clicked
    }
    return baseScale;
  };
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={getCurrentScale()}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      onClick={interactive ? handleClick : undefined}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...props}
    >
      {children}
      <meshStandardMaterial 
        color={getCurrentColor()}
        transparent={opacity < 1}
        opacity={opacity}
        wireframe={wireframe}
      />
    </mesh>
  );
});

Base3DComponent.displayName = 'Base3DComponent';

export default Base3DComponent;