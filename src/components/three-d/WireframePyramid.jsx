import React, { useMemo } from 'react';
import WireframeComponent from './WireframeComponent';
import * as THREE from 'three';

/**
 * WireframePyramid - A glowing wireframe pyramid
 * Perfect for 80s computer graphics aesthetic
 */
const WireframePyramid = ({
  size = 1,
  height = 1.5,
  segments = 4,
  ...props
}) => {
  
  // Create pyramid geometry
  const geometry = useMemo(() => {
    return new THREE.ConeGeometry(size, height, segments);
  }, [size, height, segments]);
  
  return (
    <WireframeComponent
      geometry={geometry}
      {...props}
    />
  );
};

export default WireframePyramid;