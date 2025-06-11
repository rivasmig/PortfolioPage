import React, { useEffect } from 'react';
import ThreeCanvas from './components/layout/ThreeCanvas';

// Primitives
import PyramidComponent from './components/three-d/PyramidComponent';
import CubeComponent from './components/three-d/primitives/CubeComponent';
import SphereComponent from './components/three-d/primitives/SphereComponent';
import PlaneComponent from './components/three-d/primitives/PlaneComponent';

// Wireframes
import WireframePyramid from './components/three-d/WireframePyramid';
import WireframeCube from './components/three-d/WireframeCube';
import WireframeSphere from './components/three-d/WireframeSphere';
import WireframePlane from './components/three-d/WireframePlane';

// Enhanced bases
import Interactive3D from './components/three-d/base/Interactive3D';
import Animated3D from './components/three-d/base/Animated3D';

// Containers
import TextContainer3D from './components/three-d/containers/TextContainer3D';
import ImageContainer3D from './components/three-d/containers/ImageContainer3D';
import CardContainer3D from './components/three-d/containers/CardContainer3D';

// Interactive components
import ClickableCube from './components/three-d/interactive/ClickableCube';
import HoverSphere from './components/three-d/interactive/HoverSphere';
import DraggablePyramid from './components/three-d/interactive/DraggablePyramid';

// Compositions
import ProjectShowcase from './components/three-d/compositions/ProjectShowcase';
import ArtGallery3D from './components/three-d/compositions/ArtGallery3D';
import BlogPost3D from './components/three-d/compositions/BlogPost3D';

// Theme system
import { themeEngine } from './core/ThemeEngine';
import frutigerAeroTheme from './content/themes/frutiger-aero';
import minimalTheme from './content/themes/minimal';
import gravityFallsTheme from './content/themes/gravity-falls';
import { useTheme } from './hooks/useTheme.jsx';
import './styles/globals.css';

/**
 * App - Main application component
 * Phase 1: Testing basic 3D rendering with our component system
 */
function App() {
  const { currentTheme, setTheme, getAvailableThemes, getThemeProperty } = useTheme();
  
  // Register themes on app init
  useEffect(() => {
    themeEngine.registerTheme('frutiger-aero', frutigerAeroTheme);
    themeEngine.registerTheme('minimal', minimalTheme);
    themeEngine.registerTheme('gravity-falls', gravityFallsTheme);
    
    // Apply initial theme
    themeEngine.setTheme('frutiger-aero');
  }, []);
  
  // Get theme-based colors for 3D elements
  const primaryColor = getThemeProperty('colors.primary', '#3b82f6');
  const secondaryColor = getThemeProperty('colors.secondary', '#10b981');
  const accentColor = getThemeProperty('colors.accent', '#f59e0b');
  
  // Render different showcases based on current theme
  const renderThemeShowcase = () => {
    switch (currentTheme) {
      case 'gravity-falls':
        return renderGravityFallsShowcase();
      case 'minimal':
        return renderMinimalShowcase();
      case 'frutiger-aero':
      default:
        return renderFrutigerAeroShowcase();
    }
  };
  
  // Frutiger Aero: Modern, clean, interactive showcase
  const renderFrutigerAeroShowcase = () => (
    <>
      {/* Front row - Modern primitives with interactions */}
      <Interactive3D
        position={[-3, 0, 1]}
        color={primaryColor}
        hoverScale={1.3}
        clickScale={0.8}
        springiness={0.15}
      >
        <sphereGeometry args={[1, 32, 16]} />
      </Interactive3D>
      
      <ClickableCube
        position={[-1, 0, 1]}
        size={1.2}
        activeColor={accentColor}
        inactiveColor={secondaryColor}
        onToggle={(active) => console.log(`Cube ${active ? 'ON' : 'OFF'}`)}
      />
      
      <HoverSphere
        position={[1, 0, 1]}
        radius={0.9}
        baseColor={primaryColor}
        hoverColor={accentColor}
      />
      
      <Animated3D
        position={[3, 0, 1]}
        color={secondaryColor}
        pulse={true}
        pulseAmount={0.3}
        pulseSpeed={1.5}
      >
        <octahedronGeometry args={[1]} />
      </Animated3D>
      
      {/* Back row - Advanced compositions */}
      <ProjectShowcase
        position={[-2, 2, -2]}
        title="Frutiger Aero"
        description="Clean, modern, futuristic design"
        cardColor={primaryColor}
        textColor="#ffffff"
        scale={[0.8, 0.8, 0.8]}
      />
      
      <CardContainer3D
        position={[2, 2, -2]}
        width={2.5}
        height={1.8}
        color={secondaryColor}
        interactive={true}
        hoverColor={accentColor}
      />
      
      {/* Floating text */}
      <TextContainer3D
        position={[0, 3.5, 0]}
        text="Interactive & Modern"
        fontSize={0.4}
        color={accentColor}
        animated={true}
        oscillate={true}
        oscillateAmount={0.1}
        oscillateSpeed={1}
      />
    </>
  );
  
  // Minimal: Simple, geometric, clean showcase
  const renderMinimalShowcase = () => (
    <>
      {/* Grid layout - very organized */}
      <CubeComponent
        position={[-2, 0, 1]}
        size={1}
        color={primaryColor}
        interactive={true}
      />
      
      <SphereComponent
        position={[0, 0, 1]}
        radius={0.8}
        color={secondaryColor}
        interactive={true}
      />
      
      <PlaneComponent
        position={[2, 0, 1]}
        width={1.5}
        height={1.5}
        color={accentColor}
        interactive={true}
        rotation={[0, 0, Math.PI / 4]}
      />
      
      {/* Simple compositions */}
      <BlogPost3D
        position={[0, 2.5, -1]}
        title="Minimal Design"
        excerpt="Less is more. Clean and simple."
        cardColor="#ffffff"
        textColor={primaryColor}
        scale={[0.6, 0.6, 0.6]}
      />
      
      {/* Geometric text */}
      <TextContainer3D
        position={[0, -2, 0]}
        text="MINIMAL AESTHETIC"
        fontSize={0.3}
        color={primaryColor}
        anchorX="center"
      />
    </>
  );
  
  // Gravity Falls: Wireframe, retro, mysterious showcase
  const renderGravityFallsShowcase = () => (
    <>
      {/* Wireframe primitives arranged mysteriously */}
      <WireframePyramid
        position={[0, 0, 2]}
        size={1.5}
        height={2}
        color={primaryColor}
        animated={true}
        rotationSpeed={[0, 0.02, 0]}
      />
      
      <WireframeCube
        position={[-2.5, 0, 0]}
        size={1.2}
        color={secondaryColor}
        animated={true}
        rotationSpeed={[0.01, 0.01, 0]}
      />
      
      <WireframeSphere
        position={[2.5, 0, 0]}
        radius={1}
        widthSegments={12}
        heightSegments={8}
        color={accentColor}
        animated={true}
        rotationSpeed={[0, 0, 0.015]}
      />
      
      <WireframePlane
        position={[0, -1.5, -1]}
        width={6}
        height={4}
        widthSegments={8}
        heightSegments={6}
        color={primaryColor}
        opacity={0.3}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      
      {/* Mysterious interactive elements */}
      <DraggablePyramid
        position={[-1.5, 2, -0.5]}
        size={0.8}
        height={1.2}
        normalColor={secondaryColor}
        dragColor={accentColor}
      />
      
      <Animated3D
        position={[1.5, 2, -0.5]}
        color={accentColor}
        orbit={true}
        orbitRadius={0.8}
        orbitSpeed={2}
        orbitAxis="y"
      >
        <tetrahedronGeometry args={[0.6]} />
      </Animated3D>
      
      {/* Terminal-style text */}
      <TextContainer3D
        position={[0, 3, 1]}
        text="> ANOMALY DETECTED"
        fontSize={0.3}
        color={primaryColor}
        anchorX="center"
      />
      
      <TextContainer3D
        position={[0, -3, 1]}
        text="GRAVITY FALLS RESEARCH LAB"
        fontSize={0.2}
        color={secondaryColor}
        anchorX="center"
      />
      
      {/* Floating wireframe showcase */}
      <ArtGallery3D
        position={[0, 0, -4]}
        images={[]} // No images, just frames
        frameColor={primaryColor}
        spacing={2}
        wallColor="#001100"
        scale={[0.5, 0.5, 0.5]}
      />
    </>
  );
  
  return (
    <div className="App">
      <ThreeCanvas 
        className="w-full h-screen"
        camera={{ position: [0, 0, 8], fov: 75 }}
        environment="city"
        shadows={true}
      >
        {/* Theme-specific showcases */}
        {renderThemeShowcase()}
        
        {/* Floor plane to show shadows */}
        <mesh 
          position={[0, -2, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#e5e7eb" 
            transparent 
            opacity={0.3}
          />
        </mesh>
        
      </ThreeCanvas>
      
      {/* UI Overlay with theme controls */}
      <div className="absolute top-4 left-4 z-10 theme-ui-panel">
        <h1 className="text-2xl font-bold mb-2 theme-ui-text">Portfolio 3D Engine</h1>
        <p className="text-sm opacity-80 theme-ui-text">Phase 3: Multiple Primitives - Current: {currentTheme}</p>
        
        {/* Theme Switcher */}
        <div className="mt-4 space-y-2">
          <p className="text-xs opacity-60 theme-ui-text">Themes:</p>
          {getAvailableThemes().map((theme) => (
            <button 
              key={theme}
              onClick={() => setTheme(theme)}
              className={`block px-3 py-1 text-xs theme-button ${
                theme === currentTheme ? 'active' : ''
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-xs opacity-60">
          <p className="theme-ui-text">• {currentTheme === 'gravity-falls' ? 'Wireframe terminal mode' : currentTheme === 'minimal' ? 'Clean geometric layout' : 'Interactive modern design'}</p>
          <p className="theme-ui-text">• {currentTheme === 'gravity-falls' ? 'Mysterious anomaly detection' : currentTheme === 'minimal' ? 'Simple & organized' : 'Hover, click & pulse effects'}</p>
          <p className="theme-ui-text">• Switch themes to see different showcases</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;