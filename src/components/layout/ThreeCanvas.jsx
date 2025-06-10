import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

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
  return (
    <div className={className}>
      <Canvas
        shadows={shadows}
        dpr={[1, 2]} // Device pixel ratio for crisp rendering
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance" 
        }}
        {...props}
      >
        {/* Camera setup */}
        <PerspectiveCamera 
          makeDefault 
          position={camera.position} 
          fov={camera.fov}
        />
        
        {/* Basic lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.6}
          castShadow={shadows}
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Environment for reflections and ambient lighting */}
        <Environment preset={environment} />
        
        {/* Orbit controls for mouse/touch interaction */}
        {controls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
            // Touch-friendly settings
            touches={{
              ONE: 'rotate',
              TWO: 'dolly'
            }}
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