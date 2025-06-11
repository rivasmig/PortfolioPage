import React from 'react';
import { useTexture } from '@react-three/drei';
import PlaneComponent from '../primitives/PlaneComponent';

/**
 * ImageContainer3D - Simple 3D image display
 * Basic container for displaying images on 3D planes
 */
const ImageContainer3D = ({
  src = null,
  width = 2,
  height = 2,
  fit = 'cover', // 'cover', 'contain', 'fill'
  transparent = true,
  ...baseProps
}) => {
  
  // Load texture if src provided
  const texture = src ? useTexture(src) : null;
  
  // Configure texture fitting
  if (texture && fit === 'cover') {
    const imageAspect = texture.image.width / texture.image.height;
    const planeAspect = width / height;
    
    if (imageAspect > planeAspect) {
      texture.repeat.set(planeAspect / imageAspect, 1);
    } else {
      texture.repeat.set(1, imageAspect / planeAspect);
    }
    texture.offset.set(
      (1 - texture.repeat.x) / 2,
      (1 - texture.repeat.y) / 2
    );
  }
  
  return (
    <PlaneComponent
      width={width}
      height={height}
      transparent={transparent}
      {...baseProps}
    >
      {texture && (
        <meshBasicMaterial 
          map={texture} 
          transparent={transparent}
          alphaTest={0.1}
        />
      )}
    </PlaneComponent>
  );
};

export default ImageContainer3D;