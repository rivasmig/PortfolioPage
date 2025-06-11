import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '../../utils/content/mdx-components.jsx';

/**
 * MDXRenderer - Renders MDX content with custom 3D components
 * Provides all our 3D elements as available MDX components
 */
const MDXRenderer = ({ 
  children, 
  components = {},
  className = "mdx-content",
  ...props 
}) => {
  
  // Merge custom components with our 3D components
  const allComponents = {
    ...mdxComponents,
    ...components
  };
  
  return (
    <div className={className} {...props}>
      <MDXProvider components={allComponents}>
        {children}
      </MDXProvider>
    </div>
  );
};

export default MDXRenderer;