import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { useTheme } from '../../hooks/useTheme.jsx';
import * as THREE from 'three';

// Component to handle theme-based lighting
const ThemeLighting = () => {
  const { getThemeProperty } = useTheme();
  
  const ambientColor = getThemeProperty('lighting.ambientColor', '#ffffff');
  const ambientIntensity = parseFloat(getThemeProperty('lighting.ambientIntensity', '0.4'));
  const directionalColor = getThemeProperty('lighting.directionalColor', '#ffffff');
  const directionalIntensity = parseFloat(getThemeProperty('lighting.directionalIntensity', '0.6'));
  const directionalPosition = getThemeProperty('lighting.directionalPosition', [10, 10, 5]);
  
  return (
    <>
      {/* Theme-controlled ambient light */}
      <ambientLight color={ambientColor} intensity={ambientIntensity} />
      
      {/* Theme-controlled directional light */}
      <directionalLight 
        color={directionalColor}
        position={directionalPosition} 
        intensity={directionalIntensity}
        castShadow={true}
        shadow-mapSize={[1024, 1024]}
      />
    </>
  );
};
const SceneBackground = () => {
  const { scene } = useThree();
  const { getThemeProperty } = useTheme();
  
  useEffect(() => {
    const backgroundColor = getThemeProperty('scene.backgroundColor', '#667eea');
    const fogColor = getThemeProperty('scene.fogColor', null);
    const fogDensity = getThemeProperty('scene.fogDensity', 0);
    
    // Set scene background
    scene.background = new THREE.Color(backgroundColor);
    
    // Set fog if specified in theme
    if (fogColor && fogDensity > 0) {
      scene.fog = new THREE.FogExp2(new THREE.Color(fogColor), fogDensity);
    } else {
      scene.fog = null;
    }
  }, [scene, getThemeProperty]);
  
  return null;
};
// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

/**
 * ThreeCanvas - The foundation 3D canvas component
 * This wraps all our 3D content and provides the basic R3F setup
 */
const ThreeCanvas = ({ 
  children, 
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  environment = "city",
  shadows = true,
  className = "w-full h-screen",
  ...props 
}) => {
  const isMobile = useIsMobile();
  const { getThemeProperty } = useTheme();
  
  // Get theme-specific scene settings
  const environmentPreset = getThemeProperty('lighting.environmentPreset', environment);
  
  // Mobile-optimized settings
  const mobileSettings = {
    dpr: [1, 1.5], // Lower device pixel ratio for performance
    shadows: false, // Disable shadows on mobile
    environment: "sunset", // Lighter environment
    antialias: false, // Disable antialiasing for performance
  };
  
  const desktopSettings = {
    dpr: [1, 2],
    shadows: shadows,
    environment: environment,
    antialias: true,
  };
  
  const settings = isMobile ? mobileSettings : desktopSettings;
  return (
    <div className={className}>
      <Canvas
        shadows={settings.shadows}
        dpr={settings.dpr}
        gl={{ 
          antialias: settings.antialias,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          // Mobile-specific optimizations
          ...(isMobile && {
            precision: "lowp",
            stencil: false,
            depth: false,
          })
        }}
        {...props}
      >
        {/* Scene background and fog controller */}
        <SceneBackground />
        
        {/* Camera setup */}
        <PerspectiveCamera 
          makeDefault 
          position={camera.position} 
          fov={camera.fov}
        />
        
        {/* Theme-controlled lighting */}
        <ThemeLighting />
        
        {/* Basic lighting setup */}
        {/* Removed static lights - now controlled by theme */}
        
        {/* Environment for reflections and ambient lighting */}
        <Environment preset={environmentPreset} />
        
        {/* Orbit controls for mouse/touch interaction */}
        {controls && (
          <OrbitControls
            enablePan={!isMobile} // Disable pan on mobile to avoid conflicts
            enableZoom={true}
            enableRotate={true}
            minDistance={isMobile ? 3 : 2} // Closer min distance on mobile
            maxDistance={isMobile ? 15 : 20}
            // Mobile-optimized touch settings
            touches={{
              ONE: 'rotate',
              TWO: 'dolly'
            }}
            // Smoother rotation on mobile
            rotateSpeed={isMobile ? 0.5 : 1}
            zoomSpeed={isMobile ? 0.8 : 1}
            // Reduce sensitivity for better mobile experience
            enableDamping={true}
            dampingFactor={isMobile ? 0.1 : 0.05}
          />
        )}
        
        {/* Suspense boundary for loading 3D content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;