import React from 'react';
import Base3DComponent from './base/Base3DComponent';

/**
 * PyramidComponent - A 3D pyramid that inherits from Base3DComponent
 * This is our first test primitive to verify the base system works
 */
const PyramidComponent = ({
  size = 1,
  segments = 4, // Number of sides for the base
  height = 1.5,
  ...baseProps
}) => {
  
  return (
    <Base3DComponent {...baseProps}>
      {/* Pyramid geometry using ConeGeometry */}
      <coneGeometry 
        args={[
          size,      // radius
          height,    // height
          segments   // radial segments (4 = pyramid, more = cone)
        ]} 
      />
    </Base3DComponent>
  );
};

export default PyramidComponent;