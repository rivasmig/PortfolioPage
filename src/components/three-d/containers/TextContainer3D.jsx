import React from 'react';
import { Text } from '@react-three/drei';
import Base3DComponent from '../base/Base3DComponent';

/**
 * TextContainer3D - Simple 3D text display
 * Basic container for floating text in 3D space
 */
const TextContainer3D = ({
  text = "Hello World",
  fontSize = 1,
  font = undefined, // Uses default font
  maxWidth = 10,
  lineHeight = 1,
  letterSpacing = 0,
  textAlign = 'left',
  anchorX = 'center',
  anchorY = 'middle',
  ...baseProps
}) => {
  
  return (
    <Base3DComponent {...baseProps}>
      <Text
        fontSize={fontSize}
        font={font}
        maxWidth={maxWidth}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        textAlign={textAlign}
        anchorX={anchorX}
        anchorY={anchorY}
      >
        {text}
      </Text>
    </Base3DComponent>
  );
};

export default TextContainer3D;