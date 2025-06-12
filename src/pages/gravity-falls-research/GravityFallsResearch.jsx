import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/content/PageWrapper';
import { useTheme } from '../../hooks/useTheme';

// Import 3D components
import TextContainer3D from '../../components/three-d/containers/TextContainer3D';
import Interactive3D from '../../components/three-d/base/Interactive3D';

/**
 * Gravity Falls Research Page - Navigation Interface
 * Click shapes to navigate to individual pages
 */
const GravityFallsResearch = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  
  // Set theme when page loads
  useEffect(() => {
    setTheme('gravity-falls');
  }, [setTheme]);
  
  // Handle shape clicks - navigate to individual pages
  const handleShapeClick = (slug) => {
    navigate(`./${slug}`);
  };

  // 3D Scene with interactive navigation shapes
  const backgroundElements = (
    <>
      {/* Central upside-down pyramid */}
      <Interactive3D
        position={[0, 0, 0]}
        rotation={[Math.PI, 0, 0]} // Upside down
        color="#00ff41"
        hoverColor="#ffff00"
        onClick={() => handleShapeClick('methods')}
        hoverScale={1.1}
        springiness={0.1}
      >
        <coneGeometry args={[1.2, 2, 4]} />
      </Interactive3D>
      
      {/* Four corner spheres in X formation */}
      <Interactive3D
        position={[-2.5, 1.5, 0]}
        color="#39ff14"
        hoverColor="#ffff00"
        onClick={() => handleShapeClick('hypothesis')}
        hoverScale={1.2}
        springiness={0.1}
        animated={true}
        oscillate={true}
        oscillateAmount={0.1}
        oscillateSpeed={1.5}
      >
        <sphereGeometry args={[0.6, 16, 16]} />
      </Interactive3D>
      
      <Interactive3D
        position={[2.5, 1.5, 0]}
        color="#39ff14"
        hoverColor="#ffff00"
        onClick={() => handleShapeClick('background')}
        hoverScale={1.2}
        springiness={0.1}
        animated={true}
        oscillate={true}
        oscillateAmount={0.1}
        oscillateSpeed={1.3}
      >
        <sphereGeometry args={[0.6, 16, 16]} />
      </Interactive3D>
      
      <Interactive3D
        position={[-2.5, -1.5, 0]}
        color="#39ff14"
        hoverColor="#ffff00"
        onClick={() => handleShapeClick('data')}
        hoverScale={1.2}
        springiness={0.1}
        animated={true}
        oscillate={true}
        oscillateAmount={0.1}
        oscillateSpeed={1.7}
      >
        <sphereGeometry args={[0.6, 16, 16]} />
      </Interactive3D>
      
      <Interactive3D
        position={[2.5, -1.5, 0]}
        color="#39ff14"
        hoverColor="#ffff00"
        onClick={() => handleShapeClick('discussion')}
        hoverScale={1.2}
        springiness={0.1}
        animated={true}
        oscillate={true}
        oscillateAmount={0.1}
        oscillateSpeed={1.1}
      >
        <sphereGeometry args={[0.6, 16, 16]} />
      </Interactive3D>
      
      {/* Floating title text */}
      <TextContainer3D
        position={[0, 2.5, 0]}
        text="GRAVITY FALLS DATA ANALYSIS"
        fontSize={0.35}
        color="#00ff41"
        anchorX="center"
        anchorY="center"
      />
      
      <TextContainer3D
        position={[0, 2, -0.5]}
        text="BY: GEORDYN, CAM, ZARIAN, AND MIGUEL"
        fontSize={0.2}
        color="#39ff14"
        anchorX="center"
        anchorY="center"
      />
      
      {/* Subtle background grid */}
      <mesh position={[0, -4, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshBasicMaterial color="#00ff41" wireframe opacity={0.1} transparent />
      </mesh>
      
      {/* Corner markers for reference */}
      <TextContainer3D
        position={[-3.2, 1.5, 1]}
        text="HYPOTHESIS"
        fontSize={0.15}
        color="#39ff14"
        anchorX="center"
        rotation={[0, Math.PI / 6, 0]}
      />
      
      <TextContainer3D
        position={[3.2, 1.5, 1]}
        text="BACKGROUND"
        fontSize={0.15}
        color="#39ff14"
        anchorX="center"
        rotation={[0, -Math.PI / 6, 0]}
      />
      
      <TextContainer3D
        position={[-3.2, -1.5, 1]}
        text="DATA"
        fontSize={0.15}
        color="#39ff14"
        anchorX="center"
        rotation={[0, Math.PI / 6, 0]}
      />
      
      <TextContainer3D
        position={[3.2, -1.5, 1]}
        text="DISCUSSION"
        fontSize={0.15}
        color="#39ff14"
        anchorX="center"
        rotation={[0, -Math.PI / 6, 0]}
      />
      
      <TextContainer3D
        position={[0, -0.8, 1.4]}
        text="METHODS"
        fontSize={0.15}
        color="#00ff41"
        anchorX="center"
      />
    </>
  );
  
  return (
    <>
      <PageWrapper
        title="Gravity Falls Research Project"
        layout="fullscreen-3d"
        backgroundElements={backgroundElements}
        showThemeToggle={false}
      />
      
      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 z-20 theme-ui-panel p-4 max-w-xs">
        <p className="theme-ui-text font-mono text-sm mb-2">
          &gt; INTERACTIVE RESEARCH NAVIGATION
        </p>
        <p className="theme-ui-text font-mono text-xs opacity-80">
          Click on any shape to view that research section
        </p>
      </div>
      
      {/* Home button */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={() => navigate('/')}
          className="theme-button px-4 py-2 font-mono text-sm"
        >
          &gt; RETURN TO MAIN TERMINAL
        </button>
      </div>
    </>
  );
};

export default GravityFallsResearch;