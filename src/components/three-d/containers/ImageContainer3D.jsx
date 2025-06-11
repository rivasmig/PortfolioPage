import React, { useState, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import PlaneComponent from '../primitives/PlaneComponent';
import TextContainer3D from './TextContainer3D';

/**
 * Enhanced ImageContainer3D - 3D image display with loading states and interactions
 * Builds upon the existing PlaneComponent architecture
 */
const ImageContainer3D = ({
  src = null,
  alt = '',
  title = '',
  width = 2,
  height = 2,
  fit = 'cover', // 'cover', 'contain', 'fill'
  transparent = true,
  showLoadingText = true,
  showErrorText = true,
  interactive = false,
  onClick = null,
  hoverScale = 1.05,
  loadingColor = '#666666',
  errorColor = '#ff4444',
  frameStyle = 'none', // 'none', 'simple', 'modern'
  frameColor = '#333333',
  frameThickness = 0.1,
  ...baseProps
}) => {
  const meshRef = useRef();
  const [loading, setLoading] = useState(!!src);
  const [error, setError] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  // Load texture with error handling
  let texture = null;
  if (src) {
    try {
      texture = useTexture(src, 
        // onLoad callback
        (loadedTexture) => {
          setLoading(false);
          setError(false);
        },
        // onError callback
        (err) => {
          console.warn(`Failed to load image: ${src}`, err);
          setLoading(false);
          setError(true);
        }
      );
    } catch (err) {
      console.warn(`Texture loading error for: ${src}`, err);
      setError(true);
      setLoading(false);
    }
  }
  
  // Configure texture fitting (enhanced)
  if (texture && !loading && !error) {
    const imageAspect = texture.image.width / texture.image.height;
    const planeAspect = width / height;
    
    switch (fit) {
      case 'cover':
        if (imageAspect > planeAspect) {
          texture.repeat.set(planeAspect / imageAspect, 1);
        } else {
          texture.repeat.set(1, imageAspect / planeAspect);
        }
        texture.offset.set(
          (1 - texture.repeat.x) / 2,
          (1 - texture.repeat.y) / 2
        );
        break;
      case 'contain':
        if (imageAspect > planeAspect) {
          texture.repeat.set(1, imageAspect / planeAspect);
        } else {
          texture.repeat.set(planeAspect / imageAspect, 1);
        }
        texture.offset.set(
          (1 - texture.repeat.x) / 2,
          (1 - texture.repeat.y) / 2
        );
        break;
      case 'fill':
        texture.repeat.set(1, 1);
        texture.offset.set(0, 0);
        break;
    }
  }
  
  // Hover animation
  useFrame((state) => {
    if (meshRef.current && interactive) {
      const targetScale = hovered ? hoverScale : 1;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });
  
  // Handle interactions
  const handleClick = (event) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    } else if (typeof window !== 'undefined' && window.openImageModal && src) {
      window.openImageModal(src, alt, title);
    }
  };
  
  const handlePointerOver = (event) => {
    if (interactive) {
      setHovered(true);
      document.body.style.cursor = 'pointer';
    }
  };
  
  const handlePointerOut = (event) => {
    if (interactive) {
      setHovered(false);
      document.body.style.cursor = 'default';
    }
  };
  
  // Render frame if requested
  const renderFrame = () => {
    if (frameStyle === 'none') return null;
    
    const frameWidth = width + frameThickness * 2;
    const frameHeight = height + frameThickness * 2;
    
    return (
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        <meshStandardMaterial 
          color={frameColor}
          metalness={frameStyle === 'modern' ? 0.8 : 0.1}
          roughness={frameStyle === 'modern' ? 0.2 : 0.8}
        />
      </mesh>
    );
  };
  
  // Render loading state
  if (loading && src) {
    return (
      <group ref={meshRef} {...baseProps}>
        {renderFrame()}
        <PlaneComponent
          width={width}
          height={height}
          transparent={transparent}
          onClick={interactive ? handleClick : undefined}
          onPointerOver={interactive ? handlePointerOver : undefined}
          onPointerOut={interactive ? handlePointerOut : undefined}
        >
          <meshBasicMaterial 
            color={loadingColor} 
            transparent={transparent}
            opacity={0.7}
          />
        </PlaneComponent>
        {showLoadingText && (
          <TextContainer3D
            position={[0, 0, 0.01]}
            text="Loading..."
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="center"
          />
        )}
      </group>
    );
  }
  
  // Render error state
  if (error && src) {
    return (
      <group ref={meshRef} {...baseProps}>
        {renderFrame()}
        <PlaneComponent
          width={width}
          height={height}
          transparent={transparent}
          onClick={interactive ? handleClick : undefined}
          onPointerOver={interactive ? handlePointerOver : undefined}
          onPointerOut={interactive ? handlePointerOut : undefined}
        >
          <meshBasicMaterial 
            color={errorColor} 
            transparent={transparent}
            opacity={0.7}
          />
        </PlaneComponent>
        {showErrorText && (
          <group>
            <TextContainer3D
              position={[0, 0.2, 0.01]}
              text="Image Failed"
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="center"
            />
            <TextContainer3D
              position={[0, -0.2, 0.01]}
              text="to Load"
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="center"
            />
          </group>
        )}
      </group>
    );
  }
  
  // Render image (successful load or no src)
  return (
    <group ref={meshRef} {...baseProps}>
      {renderFrame()}
      <PlaneComponent
        width={width}
        height={height}
        transparent={transparent}
        onClick={interactive ? handleClick : undefined}
        onPointerOver={interactive ? handlePointerOver : undefined}
        onPointerOut={interactive ? handlePointerOut : undefined}
      >
        {texture ? (
          <meshBasicMaterial 
            map={texture} 
            transparent={transparent}
            alphaTest={0.1}
            opacity={hovered && interactive ? 0.9 : 1}
          />
        ) : (
          <meshBasicMaterial 
            color="#cccccc" 
            transparent={transparent}
            opacity={0.5}
          />
        )}
      </PlaneComponent>
      
      {/* Title text (optional) */}
      {title && (
        <TextContainer3D
          position={[0, height/2 + 0.3, 0.01]}
          text={title}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="center"
        />
      )}
    </group>
  );
};

export default ImageContainer3D;