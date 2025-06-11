import React from 'react';
import Interactive3D from '../base/Interactive3D';

/**
 * HoverSphere - Simple hover-responsive sphere
 * Basic example of hover interactions
 */
const HoverSphere = ({
  radius = 0.8,
  baseColor = '#44ff44',
  hoverColor = '#ffff44',
  segments = 32,
  onHover = null,
  ...baseProps
}) => {
  
  const handleHoverStart = (event) => {
    console.log('Sphere hovered!');
    if (onHover) {
      onHover(true, event);
    }
  };
  
  const handleHoverEnd = (event) => {
    console.log('Sphere unhovered!');
    if (onHover) {
      onHover(false, event);
    }
  };
  
  return (
    <Interactive3D
      color={baseColor}
      hoverColor={hoverColor}
      hoverScale={1.3}
      springiness={0.15}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      interactive={true}
      {...baseProps}
    >
      <sphereGeometry args={[radius, segments, segments / 2]} />
    </Interactive3D>
  );
};

export default HoverSphere;