import React, { useMemo } from 'react';
import WireframeComponent from '../base/WireframeComponent';
import * as THREE from 'three';

/**
 * WireframeSphere - A glowing wireframe sphere
 * Great for planets, force fields, or scientific visualizations
 */
const WireframeSphere = ({
  radius = 1,
  widthSegments = 16,  // Lower for more angular wireframe look
  heightSegments = 12, // Lower for more angular wireframe look
  phiStart = 0,
  phiLength = Math.PI * 2,
  thetaStart = 0,
  thetaLength = Math.PI,
  ...props
}) => {
  
  // Create sphere geometry
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength
    );
  }, [radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength]);
  
  return (
    <WireframeComponent
      geometry={geometry}
      {...props}
    />
  );
};

export default WireframeSphere;