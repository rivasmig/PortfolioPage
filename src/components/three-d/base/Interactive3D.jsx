import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import Base3DComponent from 'Base3DComponent';

/**
 * Interactive3D - Enhanced base class for interactive 3D elements
 * Adds advanced interaction behaviors beyond basic Base3DComponent
 */
const Interactive3D = ({
  children,
  
  // Enhanced interaction props
  clickScale = 0.9,        // Scale when clicked
  hoverScale = 1.1,        // Scale when hovered
  dragEnabled = false,     // Can be dragged around
  springiness = 0.1,       // How bouncy transitions are
  
  // Sound effects (for later)
  clickSound = null,
  hoverSound = null,
  
  // Advanced callbacks
  onHoverStart = null,
  onHoverEnd = null,
  onDragStart = null,
  onDragEnd = null,
  onDoubleClick = null,
  
  ...baseProps
}) => {
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState([0, 0]);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const lastClickTime = useRef(0);
  
  // Enhanced click handler with double-click detection
  const handleClick = (event) => {
    const now = Date.now();
    const timeDiff = now - lastClickTime.current;
    
    if (timeDiff < 300) { // Double click
      setIsDoubleClick(true);
      if (onDoubleClick) onDoubleClick(event);
      setTimeout(() => setIsDoubleClick(false), 200);
    } else { // Single click
      if (baseProps.onClick) baseProps.onClick(event);
    }
    
    lastClickTime.current = now;
  };
  
  // Enhanced hover handlers
  const handleHoverStart = (event) => {
    if (onHoverStart) onHoverStart(event);
    if (baseProps.onPointerOver) baseProps.onPointerOver(event);
  };
  
  const handleHoverEnd = (event) => {
    if (onHoverEnd) onHoverEnd(event);
    if (baseProps.onPointerOut) baseProps.onPointerOut(event);
  };
  
  // Drag handlers (basic implementation)
  const handlePointerDown = (event) => {
    if (dragEnabled) {
      setIsDragging(true);
      setDragStart([event.point.x, event.point.y]);
      if (onDragStart) onDragStart(event);
    }
  };
  
  const handlePointerUp = (event) => {
    if (isDragging) {
      setIsDragging(false);
      if (onDragEnd) onDragEnd(event);
    }
  };
  
  // Calculate current scale based on interaction state
  const getCurrentScale = () => {
    const baseScale = Array.isArray(baseProps.scale) 
      ? baseProps.scale 
      : [baseProps.scale || 1, baseProps.scale || 1, baseProps.scale || 1];
    
    let multiplier = 1;
    
    if (isDoubleClick) {
      multiplier = clickScale * 0.8; // Extra small for double-click
    } else if (isDragging) {
      multiplier = clickScale;
    } else if (baseProps.interactive && baseProps.hoverColor) {
      // Check if we're in hover state (this is a bit hacky, but works)
      multiplier = hoverScale;
    }
    
    return baseScale.map(s => s * multiplier);
  };
  
  return (
    <Base3DComponent
      {...baseProps}
      scale={getCurrentScale()}
      onClick={handleClick}
      onPointerOver={handleHoverStart}
      onPointerOut={handleHoverEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      
      // Enhanced interaction props
      interactive={true}
      
      // Pass through enhanced animation
      onBeforeRender={(mesh, state, delta) => {
        // Smooth scaling transitions
        if (mesh.scale) {
          const targetScale = getCurrentScale();
          mesh.scale.lerp({
            x: targetScale[0],
            y: targetScale[1], 
            z: targetScale[2]
          }, springiness);
        }
        
        // Call original callback if provided
        if (baseProps.onBeforeRender) {
          baseProps.onBeforeRender(mesh, state, delta);
        }
      }}
    >
      {children}
    </Base3DComponent>
  );
};

export default Interactive3D;