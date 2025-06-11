// Import all our 3D components to make them available in MDX
import PyramidComponent from '../../components/three-d/primitives/PyramidComponent';
import CubeComponent from '../../components/three-d/primitives/CubeComponent';
import SphereComponent from '../../components/three-d/primitives/SphereComponent';
import PlaneComponent from '../../components/three-d/primitives/PlaneComponent';

// Wireframe components
import WireframePyramid from '../../components/three-d/wireframes/WireframePyramid';
import WireframeCube from '../../components/three-d/wireframes/WireframeCube';
import WireframeSphere from '../../components/three-d/wireframes/WireframeSphere';
import WireframePlane from '../../components/three-d/wireframes/WireframePlane';

// Enhanced bases
import Interactive3D from '../../components/three-d/base/Interactive3D';
import Animated3D from '../../components/three-d/base/Animated3D';

// Containers
import TextContainer3D from '../../components/three-d/containers/TextContainer3D';
import ImageContainer3D from '../../components/three-d/containers/ImageContainer3D';
import CardContainer3D from '../../components/three-d/containers/CardContainer3D';

// Interactive components
import ClickableCube from '../../components/three-d/interactive/ClickableCube';
import HoverSphere from '../../components/three-d/interactive/HoverSphere';
import DraggablePyramid from '../../components/three-d/interactive/DraggablePyramid';

// Compositions
import ProjectShowcase from '../../components/three-d/compositions/ProjectShowcase';
import ArtGallery3D from '../../components/three-d/compositions/ArtGallery3D';
import BlogPost3D from '../../components/three-d/compositions/BlogPost3D';

// Layout components
import ThreeCanvas from '../../components/layout/ThreeCanvas';

/**
 * MDX Components - Available components in MDX files
 * Maps component names to actual React components for MDX use
 */
export const mdxComponents = {
  // Basic primitives - use simple names in MDX
  Pyramid: PyramidComponent,
  Cube: CubeComponent,
  Sphere: SphereComponent,
  Plane: PlaneComponent,
  
  // Wireframe versions - prefix with "Wireframe"
  WireframePyramid,
  WireframeCube,
  WireframeSphere,
  WireframePlane,
  
  // Enhanced behaviors
  Interactive3D,
  Animated3D,
  
  // Containers for content
  Text3D: TextContainer3D,
  Image3D: ImageContainer3D,
  Card3D: CardContainer3D,
  
  // Interactive elements
  ClickableCube,
  HoverSphere,
  DraggablePyramid,
  
  // Complex compositions
  ProjectShowcase,
  ArtGallery3D,
  BlogPost3D,
  
  // Layout
  ThreeCanvas,
  
  // Utility components for inline 3D
  Scene: ({ children, ...props }) => (
    <div style={{ height: '400px', margin: '2rem 0' }}>
      <ThreeCanvas {...props}>
        {children}
      </ThreeCanvas>
    </div>
  ),
  
  // Inline 3D wrapper for mixing with text
  Inline3D: ({ children, height = '200px', ...props }) => (
    <div style={{ 
      height, 
      margin: '1rem 0',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <ThreeCanvas {...props}>
        {children}
      </ThreeCanvas>
    </div>
  ),
  
  // Override default HTML elements to be theme-aware
  h1: (props) => <h1 className="text-4xl font-bold mb-6 theme-ui-text" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold mb-4 theme-ui-text" {...props} />,
  h3: (props) => <h3 className="text-2xl font-medium mb-3 theme-ui-text" {...props} />,
  p: (props) => <p className="mb-4 theme-ui-text leading-relaxed" {...props} />,
  ul: (props) => <ul className="mb-4 ml-6 list-disc theme-ui-text" {...props} />,
  ol: (props) => <ol className="mb-4 ml-6 list-decimal theme-ui-text" {...props} />,
  li: (props) => <li className="mb-1 theme-ui-text" {...props} />,
  blockquote: (props) => (
    <blockquote 
      className="border-l-4 border-current pl-4 my-4 italic theme-ui-text opacity-80" 
      {...props} 
    />
  ),
  code: (props) => (
    <code 
      className="bg-black bg-opacity-10 px-2 py-1 rounded text-sm font-mono theme-ui-text" 
      {...props} 
    />
  ),
  pre: (props) => (
    <pre 
      className="bg-black bg-opacity-10 p-4 rounded my-4 overflow-x-auto text-sm font-mono theme-ui-text" 
      {...props} 
    />
  ),
  a: (props) => (
    <a 
      className="underline hover:no-underline theme-ui-text opacity-80 hover:opacity-100" 
      {...props} 
    />
  ),
};

export default mdxComponents;