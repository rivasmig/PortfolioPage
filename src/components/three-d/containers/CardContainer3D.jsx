import React from 'react';
import { RoundedBox } from '@react-three/drei';
import Base3DComponent from '../base/Base3DComponent';

/**
 * CardContainer3D - Simple 3D card/panel
 * Basic container for creating card-like 3D objects
 */
const CardContainer3D = ({
  width = 2,
  height = 1.5,
  depth = 0.1,
  radius = 0.1,
  smoothness = 4,
  children,
  ...baseProps
}) => {
  
  return (
    <Base3DComponent {...baseProps}>
      <RoundedBox
        args={[width, height, depth]}
        radius={radius}
        smoothness={smoothness}
      >
        {/* Default card material if no children provided */}
        {!children && (
          <meshStandardMaterial 
            color={baseProps.color || '#ffffff'}
            transparent={true}
            opacity={0.9}
          />
        )}
        {children}
      </RoundedBox>
    </Base3DComponent>
  );
};

export default CardContainer3D;