import React from 'react';
import ThreeCanvas from './components/layout/ThreeCanvas';
import PyramidComponent from './components/three-d/PyramidComponent';
import './styles/globals.css';

/**
 * App - Main application component
 * Phase 1: Testing basic 3D rendering with our component system
 */
function App() {
  
  return (
    <div className="App">
      <ThreeCanvas 
        className="w-full h-screen"
        camera={{ position: [0, 0, 8], fov: 75 }}
        environment="city"
        shadows={true}
      >
        {/* Test our pyramid system with different configurations */}
        
        {/* Animated rotating pyramid */}
        <PyramidComponent 
          position={[0, 0, 0]}
          color="#3b82f6"
          size={1.5}
          height={2}
          animated={true}
          rotationSpeed={[0, 0.02, 0]}
          interactive={true}
          hoverColor="#ef4444"
          onClick={() => console.log('Pyramid clicked!')}
        />
        
        {/* Static pyramid to the left */}
        <PyramidComponent 
          position={[-3, 0, 0]}
          color="#10b981"
          size={1}
          height={1.5}
          interactive={true}
          oscillate={true}
          oscillateAmount={0.2}
          oscillateSpeed={2}
        />
        
        {/* Small pyramid to the right */}
        <PyramidComponent 
          position={[3, 1, -1]}
          color="#f59e0b"
          size={0.8}
          height={1.2}
          animated={true}
          rotationSpeed={[0.01, 0, 0.01]}
          wireframe={false}
        />
        
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
      
      {/* UI Overlay for testing */}
      <div className="absolute top-4 left-4 text-white z-10">
        <h1 className="text-2xl font-bold mb-2">Portfolio 3D Engine</h1>
        <p className="text-sm opacity-80">Phase 1: Basic 3D System Test</p>
        <div className="mt-4 text-xs opacity-60">
          <p>• Click pyramids to interact</p>
          <p>• Drag to orbit camera</p>
          <p>• Scroll to zoom</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;