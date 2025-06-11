import React from 'react';
import Base3DComponent from '../base/Base3DComponent';

/**
 * PlaneComponent - A 3D plane that inherits from Base3DComponent
 * Perfect for screens, panels, images, or flat surfaces
 */
const PlaneComponent = ({
  width = 1,
  height = 1,
  widthSegments = 1,  // Subdivisions for more detail
  heightSegments = 1, // Subdivisions for more detail
  ...baseProps
}) => {
  
  return (
    <Base3DComponent {...baseProps}>
      {/* Plane geometry using PlaneGeometry */}
      <planeGeometry 
        args={[
          width,
          height,
          widthSegments,
          heightSegments
        ]} 
      />
    </Base3DComponent>
  );
};

export default PlaneComponent;