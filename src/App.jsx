import React, { useEffect } from 'react';
import ThreeCanvas from './components/layout/ThreeCanvas';
import PyramidComponent from './components/three-d/PyramidComponent';
import WireframePyramid from './components/three-d/WireframePyramid';
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
  
  // Check if we should use wireframe mode
  const useWireframe = currentTheme === 'gravity-falls';
  
  return (
    <div className="App">
      <ThreeCanvas 
        className="w-full h-screen"
        camera={{ position: [0, 0, 8], fov: 75 }}
        environment="city"
        shadows={true}
      >
        {/* Test our pyramid system with theme-based rendering */}
        
        {useWireframe ? (
          // Gravity Falls wireframe pyramids
          <>
            <WireframePyramid 
              position={[0, 0, 0]}
              color={primaryColor}
              size={1.5}
              height={2}
              animated={true}
              rotationSpeed={[0, 0.02, 0]}
              glowIntensity={2.0}
            />
            
            <WireframePyramid 
              position={[-3, 0, 0]}
              color={secondaryColor}
              size={1}
              height={1.5}
              animated={true}
              rotationSpeed={[0.01, 0, 0]}
              glowIntensity={1.5}
            />
            
            <WireframePyramid 
              position={[3, 1, -1]}
              color={accentColor}
              size={0.8}
              height={1.2}
              animated={true}
              rotationSpeed={[0.01, 0.02, 0.01]}
              glowIntensity={1.8}
            />
          </>
        ) : (
          // Standard solid pyramids for other themes
          <>
            <PyramidComponent 
              position={[0, 0, 0]}
              color={primaryColor}
              size={1.5}
              height={2}
              animated={true}
              rotationSpeed={[0, 0.02, 0]}
              interactive={true}
              hoverColor={accentColor}
              onClick={() => console.log('Pyramid clicked!')}
            />
            
            <PyramidComponent 
              position={[-3, 0, 0]}
              color={secondaryColor}
              size={1}
              height={1.5}
              interactive={true}
              oscillate={true}
              oscillateAmount={0.2}
              oscillateSpeed={2}
            />
            
            <PyramidComponent 
              position={[3, 1, -1]}
              color={accentColor}
              size={0.8}
              height={1.2}
              animated={true}
              rotationSpeed={[0.01, 0, 0.01]}
              wireframe={false}
            />
          </>
        )}
        
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
        <p className="text-sm opacity-80 theme-ui-text">Phase 2: Theme System - Current: {currentTheme}</p>
        
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
          <p className="theme-ui-text">• Click pyramids to interact</p>
          <p className="theme-ui-text">• Drag to orbit camera</p>
          <p className="theme-ui-text">• Switch themes above</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;