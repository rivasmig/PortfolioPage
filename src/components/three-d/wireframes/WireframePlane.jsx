import React, { useMemo } from 'react';
import WireframeComponent from '../base/WireframeComponent';
import * as THREE from 'three';

/**
 * WireframePlane - A glowing wireframe plane
 * Perfect for screens, grids, or interface panels in 80s aesthetic
 */
const WireframePlane = ({
  width = 1,
  height = 1,
  widthSegments = 8,  // More segments for grid effect
  heightSegments = 8, // More segments for grid effect
  ...props
}) => {
  
  // Create plane geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(
      width,
      height,
      widthSegments,
      heightSegments
    );
  }, [width, height, widthSegments, heightSegments]);
  
  return (
    <WireframeComponent
      geometry={geometry}
      {...props}
    />
  );
};

export default WireframePlane;