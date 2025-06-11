import React, { useState } from 'react';
import Interactive3D from '../base/Interactive3D';

/**
 * ClickableCube - Simple interactive cube
 * Basic example of enhanced interaction capabilities
 */
const ClickableCube = ({
  size = 1,
  activeColor = '#ff4444',
  inactiveColor = '#4444ff',
  onToggle = null,
  ...baseProps
}) => {
  
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = (event) => {
    const newState = !isActive;
    setIsActive(newState);
    
    if (onToggle) {
      onToggle(newState, event);
    }
    
    console.log(`Cube ${newState ? 'activated' : 'deactivated'}`);
  };
  
  return (
    <Interactive3D
      color={isActive ? activeColor : inactiveColor}
      hoverScale={1.2}
      clickScale={0.8}
      springiness={0.2}
      onClick={handleClick}
      interactive={true}
      {...baseProps}
    >
      <boxGeometry args={[size, size, size]} />
    </Interactive3D>
  );
};

export default ClickableCube;