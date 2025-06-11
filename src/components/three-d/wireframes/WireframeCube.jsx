import React, { useMemo } from 'react';
import WireframeComponent from '../base/WireframeComponent';
import * as THREE from 'three';

/**
 * WireframeCube - A glowing wireframe cube
 * Perfect for 80s computer graphics, containers, or data visualization
 */
const WireframeCube = ({
  size = 1,
  width = null,
  height = null,
  depth = null,
  ...props
}) => {
  
  // Create cube geometry
  const geometry = useMemo(() => {
    const dimensions = [
      width || size,
      height || size,
      depth || size
    ];
    return new THREE.BoxGeometry(...dimensions);
  }, [size, width, height, depth]);
  
  return (
    <WireframeComponent
      geometry={geometry}
      {...props}
    />
  );
};

export default WireframeCube;