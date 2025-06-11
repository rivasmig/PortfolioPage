import React from 'react';
import CardContainer3D from '../containers/CardContainer3D';
import TextContainer3D from '../containers/TextContainer3D';
import ImageContainer3D from '../containers/ImageContainer3D';

/**
 * BlogPost3D - Simple 3D blog post layout
 * Basic example of a content composition with text and images
 */
const BlogPost3D = ({
  title = "Blog Post Title",
  excerpt = "This is a brief excerpt of the blog post content...",
  featuredImage = null,
  cardColor = '#ffffff',
  textColor = '#333333',
  ...baseProps
}) => {
  
  return (
    <group {...baseProps}>
      {/* Main content card */}
      <CardContainer3D
        width={4}
        height={3}
        depth={0.2}
        color={cardColor}
        position={[0, 0, 0]}
        interactive={true}
        hoverScale={1.02}
      />
      
      {/* Featured image (if provided) */}
      {featuredImage && (
        <ImageContainer3D
          src={featuredImage}
          width={3.5}
          height={1.5}
          position={[0, 0.6, 0.11]}
          interactive={true}
        />
      )}
      
      {/* Title */}
      <TextContainer3D
        text={title}
        fontSize={0.25}
        color={textColor}
        position={[0, featuredImage ? -0.3 : 0.5, 0.11]}
        anchorX="center"
        anchorY="center"
        maxWidth={3.5}
      />
      
      {/* Excerpt */}
      <TextContainer3D
        text={excerpt}
        fontSize={0.12}
        color={textColor}
        position={[0, featuredImage ? -0.8 : 0, 0.11]}
        anchorX="center"
        anchorY="center"
        maxWidth={3.5}
        lineHeight={1.2}
      />
    </group>
  );
};

export default BlogPost3D;