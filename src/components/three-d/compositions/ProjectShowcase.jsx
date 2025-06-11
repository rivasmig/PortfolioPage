import React from 'react';
import CardContainer3D from '../containers/CardContainer3D';
import TextContainer3D from '../containers/TextContainer3D';

/**
 * ProjectShowcase - Simple project display composition
 * Basic example of combining multiple 3D components
 */
const ProjectShowcase = ({
  title = "Project Title",
  description = "Project description goes here",
  cardColor = '#ffffff',
  textColor = '#000000',
  spacing = 0.6,
  ...baseProps
}) => {
  
  return (
    <group {...baseProps}>
      {/* Background card */}
      <CardContainer3D
        width={3}
        height={2}
        depth={0.1}
        color={cardColor}
        position={[0, 0, 0]}
        interactive={true}
        hoverColor="#f0f0f0"
      />
      
      {/* Title text */}
      <TextContainer3D
        text={title}
        fontSize={0.3}
        color={textColor}
        position={[0, spacing, 0.06]}
        anchorX="center"
        anchorY="center"
      />
      
      {/* Description text */}
      <TextContainer3D
        text={description}
        fontSize={0.15}
        color={textColor}
        position={[0, -spacing, 0.06]}
        anchorX="center"
        anchorY="center"
        maxWidth={2.5}
      />
    </group>
  );
};

export default ProjectShowcase;