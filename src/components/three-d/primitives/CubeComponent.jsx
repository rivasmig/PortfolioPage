import React from 'react';
import Base3DComponent from '../base/Base3DComponent';

/**
 * CubeComponent - A 3D cube that inherits from Base3DComponent
 * Perfect for displaying rectangular/cubic content
 */
const CubeComponent = ({
  size = 1,
  width = null,  // Optional: different width
  height = null, // Optional: different height
  depth = null,  // Optional: different depth
  ...baseProps
}) => {
  
  // Use individual dimensions if provided, otherwise use size for all
  const dimensions = [
    width || size,
    height || size,
    depth || size
  ];
  
  return (
    <Base3DComponent {...baseProps}>
      {/* Cube geometry using BoxGeometry */}
      <boxGeometry 
        args={dimensions}
      />
    </Base3DComponent>
  );
};

export default CubeComponent;