import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/content/PageWrapper';
import { useTheme } from '../hooks/useTheme';

// Import 3D components
import TextContainer3D from '../components/three-d/containers/TextContainer3D';
import Interactive3D from '../components/three-d/base/Interactive3D';

// Import markdown components
import MarkdownCard from '../components/three-d/containers/MarkdownCard';
import { loadMarkdownContent } from '../utils/content/markdownLoader';

/**
 * Gravity Falls Research Page - Interactive data analysis presentation
 * Now uses the reusable MarkdownCard component
 */
const GravityFallsResearch = () => {
  const { setTheme, currentTheme } = useTheme();
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Set theme when page loads
  useEffect(() => {
    setTheme('gravity-falls');
  }, [setTheme]);
  
  // Load markdown content on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        const files = ['hypothesis', 'background', 'methods', 'data', 'discussion'];
        const content = await loadMarkdownContent('gravity-falls', files);
        setCardData(content);
        console.log('Loaded Gravity Falls content:', content);
      } catch (error) {
        console.error('Failed to load markdown content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, []);
  
  // Handle shape clicks
  const handleShapeClick = (cardType) => {
    setSelectedCard(cardType);
  };
  
  // Close card
  const closeCard = () => {
    setSelectedCard(null);
  };
  
  // Show loading state
  if (loading) {
    return (
      <PageWrapper
        title="Loading Gravity Falls Research..."
        layout="fullscreen-3d"
        backgroundElements={
          <TextContainer3D
            position={[0, 0, 0]}
            text="LOADING RESEARCH DATA..."
            fontSize={0.5}
            color="#00ff41"
            anchorX="center"
            anchorY="center"
          />
        }
      />
    );
  }
  
  // 3D Scene with locked camera and interactive shapes
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
        position={[0, 1.8, 0]}
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
        position={[-3.2, 1.5, 0]}
        text="HYPOTHESIS"
        fontSize={0.15}
        color="#39ff14"
        anchorX="center"
        rotation={[0, Math.PI / 6, 0]}
      />
      
      <TextContainer3D
        position={[3.2, 1.5, 0]}
        text="BACKGROUND"
        fontSize={0.15}
        color="#39ff14"
        anchorX="center"
        rotation={[0, -Math.PI / 6, 0]}
      />
      
      <TextContainer3D
        position={[-3.2, -1.5, 0]}
        text="DATA"
        fontSize={0.15}
        color="#39ff14"
        anchorX="center"
        rotation={[0, Math.PI / 6, 0]}
      />
      
      <TextContainer3D
        position={[3.2, -1.5, 0]}
        text="DISCUSSION"
        fontSize={0.15}
        color="#39ff14"
        anchorX="center"
        rotation={[0, -Math.PI / 6, 0]}
      />
      
      <TextContainer3D
        position={[0, -0.8, 0]}
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
        showThemeToggle={false} // Hide theme toggle for focused experience
      />
      
      {/* Instructions overlay - OUTSIDE the 3D canvas */}
      <div className="absolute top-4 left-4 z-20 theme-ui-panel p-4 max-w-xs">
        <p className="theme-ui-text font-mono text-sm mb-2">
          &gt; INTERACTIVE ANALYSIS
        </p>
        <p className="theme-ui-text font-mono text-xs opacity-80">
          Click on any shape to view detailed research sections
        </p>
      </div>
      
      {/* Home button - OUTSIDE the 3D canvas */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={() => window.history.back()}
          className="theme-button px-4 py-2 font-mono text-sm"
        >
          &gt; RETURN TO MAIN TERMINAL
        </button>
      </div>
      
      {/* Reusable MarkdownCard component */}
      <MarkdownCard
        cardData={cardData}
        selectedCard={selectedCard}
        onClose={closeCard}
        theme="gravity-falls"
        showSpecialSections={true}
      />
    </>
  );
};

export default GravityFallsResearch;