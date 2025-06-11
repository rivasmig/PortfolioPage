import React from 'react';
import Base3DComponent from '../base/Base3DComponent';

/**
 * SphereComponent - A 3D sphere that inherits from Base3DComponent
 * Great for planets, particles, or organic shapes
 */
const SphereComponent = ({
  radius = 1,
  widthSegments = 32,  // Higher = smoother sphere
  heightSegments = 16, // Higher = smoother sphere
  phiStart = 0,        // Start angle for partial spheres
  phiLength = Math.PI * 2, // How much of sphere to show
  thetaStart = 0,      // Vertical start angle
  thetaLength = Math.PI, // Vertical sweep angle
  ...baseProps
}) => {
  
  return (
    <Base3DComponent {...baseProps}>
      {/* Sphere geometry using SphereGeometry */}
      <sphereGeometry 
        args={[
          radius,
          widthSegments,
          heightSegments,
          phiStart,
          phiLength,
          thetaStart,
          thetaLength
        ]} 
      />
    </Base3DComponent>
  );
};

export default SphereComponent;