import React from 'react';
import ImageContainer3D from '../containers/ImageContainer3D';
import PlaneComponent from '../primitives/PlaneComponent';

/**
 * ArtGallery3D - Simple art gallery layout
 * Basic example of arranging multiple images in 3D space
 */
const ArtGallery3D = ({
  images = [], // Array of image src URLs
  frameColor = '#8B4513',
  spacing = 3,
  wallColor = '#f5f5f5',
  ...baseProps
}) => {
  
  return (
    <group {...baseProps}>
      {/* Gallery wall */}
      <PlaneComponent
        width={spacing * Math.max(images.length, 3)}
        height={4}
        color={wallColor}
        position={[0, 0, -0.5]}
        rotation={[0, 0, 0]}
      />
      
      {/* Display images */}
      {images.map((imageSrc, index) => (
        <group key={index} position={[(index - (images.length - 1) / 2) * spacing, 0, 0]}>
          {/* Frame */}
          <PlaneComponent
            width={2.2}
            height={2.2}
            color={frameColor}
            position={[0, 0, -0.05]}
          />
          
          {/* Image */}
          <ImageContainer3D
            src={imageSrc}
            width={2}
            height={2}
            position={[0, 0, 0]}
            interactive={true}
            hoverScale={1.05}
          />
        </group>
      ))}
      
      {/* Placeholder if no images */}
      {images.length === 0 && (
        <PlaneComponent
          width={2}
          height={2}
          color="#cccccc"
          position={[0, 0, 0]}
        >
          <meshBasicMaterial color="#cccccc" />
        </PlaneComponent>
      )}
    </group>
  );
};

export default ArtGallery3D;