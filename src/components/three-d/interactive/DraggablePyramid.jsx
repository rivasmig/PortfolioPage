import React from 'react';
import Interactive3D from '../base/Interactive3D';

/**
 * DraggablePyramid - Simple draggable pyramid
 * Basic example of drag interaction (placeholder for now)
 */
const DraggablePyramid = ({
  size = 1,
  height = 1.5,
  segments = 4,
  dragColor = '#ff44ff',
  normalColor = '#44ffff',
  onDrag = null,
  ...baseProps
}) => {
  
  const handleDragStart = (event) => {
    console.log('Pyramid drag started!');
    if (onDrag) {
      onDrag('start', event);
    }
  };
  
  const handleDragEnd = (event) => {
    console.log('Pyramid drag ended!');
    if (onDrag) {
      onDrag('end', event);
    }
  };
  
  return (
    <Interactive3D
      color={normalColor}
      hoverColor={dragColor}
      dragEnabled={true}
      hoverScale={1.1}
      clickScale={0.9}
      springiness={0.1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      interactive={true}
      {...baseProps}
    >
      <coneGeometry args={[size, height, segments]} />
    </Interactive3D>
  );
};

export default DraggablePyramid;