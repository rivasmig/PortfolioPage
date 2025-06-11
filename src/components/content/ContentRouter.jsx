import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageWrapper from './PageWrapper';

/**
 * ContentRouter - Dynamic routing for MDX content
 * Automatically creates routes based on content structure
 */
const ContentRouter = ({ 
  pages = [],
  defaultLayout = "split",
  ...props 
}) => {
  
  // Demo pages - replace with dynamic loading later
  const DemoHomePage = () => (
    <PageWrapper 
      title="Welcome to My Portfolio" 
      layout="overlay"
      backgroundElements={
        <>
          {/* Demo 3D background */}
          <mesh position={[-2, 0, 0]} rotation={[0, 1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#3b82f6" wireframe />
          </mesh>
          <mesh position={[2, 0, 0]} rotation={[0, -1, 0]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color="#10b981" wireframe />
          </mesh>
        </>
      }
    >
      <div className="prose theme-ui-text">
        <p>This is a demo of our MDX content system with integrated 3D elements!</p>
        
        <h2>Features</h2>
        <ul>
          <li>MDX content with 3D components</li>
          <li>Multiple layout options</li>
          <li>Theme-aware styling</li>
          <li>Responsive design</li>
        </ul>
        
        <p>You can embed 3D elements directly in your content using our custom components.</p>
      </div>
    </PageWrapper>
  );
  
  const DemoProjectPage = () => (
    <PageWrapper 
      title="Sample Project" 
      layout="split"
      backgroundElements={
        <>
          {/* Project-specific 3D elements */}
          <mesh position={[0, 0, 0]} rotation={[0.5, 0.5, 0]}>
            <coneGeometry args={[1, 2, 4]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        </>
      }
    >
      <div className="prose theme-ui-text">
        <h2>Project Overview</h2>
        <p>This is a sample project page demonstrating the split layout.</p>
        
        <h3>Technologies Used</h3>
        <ul>
          <li>React Three Fiber</li>
          <li>MDX</li>
          <li>Three.js</li>
          <li>Tailwind CSS</li>
        </ul>
        
        <h3>3D Element</h3>
        <p>The 3D pyramid on the left represents the project's core architecture.</p>
        
        <h3>Features</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </PageWrapper>
  );
  
  const DemoArtPage = () => (
    <PageWrapper 
      title="Art & Experiments" 
      layout="fullscreen-3d"
    >
      {/* Full 3D experience */}
      <mesh position={[-2, 0, 0]}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1]} />
        <meshStandardMaterial color="#8b5cf6" wireframe />
      </mesh>
      
      <mesh position={[2, 0, 0]}>
        <icosahedronGeometry args={[1]} />
        <meshStandardMaterial color="#06b6d4" />
      </mesh>
      
      {/* Floating text in 3D space */}
      <mesh position={[0, 2, 0]}>
        <planeGeometry args={[4, 1]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
    </PageWrapper>
  );
  
  return (
    <Routes {...props}>
      <Route path="/" element={<DemoHomePage />} />
      <Route path="/home" element={<DemoHomePage />} />
      <Route path="/projects/demo" element={<DemoProjectPage />} />
      <Route path="/art/demo" element={<DemoArtPage />} />
      
      {/* Fallback route */}
      <Route path="*" element={
        <PageWrapper title="Page Not Found" layout="fullscreen-2d">
          <div className="prose theme-ui-text">
            <h2>404 - Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        </PageWrapper>
      } />
    </Routes>
  );
};

export default ContentRouter;