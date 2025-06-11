import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../../hooks/useTheme.jsx';

// Mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

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
  const isMobile = useIsMobile();
  const { getThemeProperty } = useTheme();
  
  // Animation frame loop
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Auto rotation (slower on mobile for better performance)
    if (animated && rotationSpeed) {
      const speedMultiplier = isMobile ? 0.5 : 1;
      meshRef.current.rotation.x += rotationSpeed[0] * speedMultiplier;
      meshRef.current.rotation.y += rotationSpeed[1] * speedMultiplier;
      meshRef.current.rotation.z += rotationSpeed[2] * speedMultiplier;
    }
    
    // Oscillation (reduced on mobile)
    if (oscillate) {
      const time = state.clock.elapsedTime;
      const amplitude = isMobile ? oscillateAmount * 0.5 : oscillateAmount;
      meshRef.current.position.y = position[1] + Math.sin(time * oscillateSpeed) * amplitude;
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
    // Disable hover effects on mobile to avoid touch issues
    if (interactive && !isMobile) {
      setIsHovered(true);
      document.body.style.cursor = 'pointer';
    }
  };
  
  const handlePointerOut = (event) => {
    event.stopPropagation();
    if (interactive && !isMobile) {
      setIsHovered(false);
      document.body.style.cursor = 'auto';
    }
  };
  
  // Determine current color based on interaction state
  const getCurrentColor = () => {
    if (interactive && isHovered) return hoverColor;
    return color;
  };
  
  // Check if we should use wireframe mode (theme-controlled or manual)
  const shouldUseWireframe = () => {
    // Manual override first
    if (wireframe !== false) return wireframe;
    
    // Then check theme default
    const themeWireframe = getThemeProperty('scene.defaultWireframe', false);
    return themeWireframe;
  };
  
  // Get material properties
  const getMaterialProps = () => {
    const isWireframe = shouldUseWireframe();
    
    return {
      color: getCurrentColor(),
      wireframe: isWireframe,
      transparent: opacity < 1 || isWireframe,
      opacity: isWireframe ? parseFloat(getThemeProperty('materials.wireframeOpacity', '0.8')) : opacity,
    };
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
        {...getMaterialProps()}
      />
    </mesh>
  );
});

Base3DComponent.displayName = 'Base3DComponent';

export default Base3DComponent;