import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ThreeCanvas from './components/layout/ThreeCanvas';
import { themeEngine } from './core/ThemeEngine';
import frutigerAeroTheme from './content/themes/frutiger-aero';
import minimalTheme from './content/themes/minimal';
import gravityFallsTheme from './content/themes/gravity-falls';
import { useTheme } from './hooks/useTheme.jsx';

// Import page components
import GravityFallsResearch from './pages/GravityFallsResearch';
import HypothesisPage from './pages/HypothesisPage';
import BackgroundPage from './pages/BackgroundPage';
import MethodsPage from './pages/MethodsPage';
import DataPage from './pages/DataPage';
import DiscussionPage from './pages/DiscussionPage';

// Import 3D components for the landing page
import WireframePyramid from './components/three-d/wireframes/WireframePyramid';
import Interactive3D from './components/three-d/base/Interactive3D';
import Animated3D from './components/three-d/base/Animated3D';
import TextContainer3D from './components/three-d/containers/TextContainer3D';

import './styles/globals.css';

/**
 * Landing Page Component - Cool 3D background with navigation
 */
const LandingPage = () => {
  const { currentTheme, setTheme, getAvailableThemes } = useTheme();
  const navigate = useNavigate();
  
  // Demo pages - replace with dynamic scanning later
  const pages = [
    { 
      name: "Gravity Falls Research", 
      path: "/gravity-falls-research",
      theme: "gravity-falls",
      description: "Anomaly investigation project"
    },
    { 
      name: "Interactive Demo", 
      path: "/interactive-demo",
      theme: "frutiger-aero",
      description: "3D interaction showcase"
    },
    { 
      name: "Minimal Gallery", 
      path: "/minimal-gallery",
      theme: "minimal",
      description: "Clean design portfolio"
    },
    { 
      name: "About Me", 
      path: "/about",
      theme: "frutiger-aero",
      description: "Personal information"
    }
  ];
  
  const handlePageNavigation = (page) => {
    // Set theme for the page
    setTheme(page.theme);
    // Navigate after a short delay to see theme change
    setTimeout(() => {
      navigate(page.path);
    }, 300);
  };
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* 3D Background Scene */}
      <ThreeCanvas
        camera={{ position: [0, 2, 8], fov: 75 }}
        environment="city"
      >
        {/* Floating geometric elements */}
        <Animated3D
          position={[-4, 1, -2]}
          color="#3b82f6"
          orbit={true}
          orbitRadius={1}
          orbitSpeed={0.5}
          orbitAxis="y"
        >
          <dodecahedronGeometry args={[0.8]} />
        </Animated3D>
        
        <Interactive3D
          position={[4, 1, -2]}
          color="#10b981"
          hoverScale={1.4}
          springiness={0.1}
        >
          <icosahedronGeometry args={[0.8]} />
        </Interactive3D>
        
        <WireframePyramid
          position={[0, 0, -5]}
          size={2}
          height={3}
          color="#f59e0b"
          animated={true}
          rotationSpeed={[0, 0.01, 0]}
          opacity={0.6}
        />
        
        {/* Floating particles */}
        <Animated3D
          position={[-2, 3, 0]}
          color="#ef4444"
          pulse={true}
          pulseAmount={0.3}
          pulseSpeed={3}
        >
          <sphereGeometry args={[0.2, 8, 8]} />
        </Animated3D>
        
        <Animated3D
          position={[2, 3, 0]}
          color="#8b5cf6"
          pulse={true}
          pulseAmount={0.3}
          pulseSpeed={2.5}
        >
          <sphereGeometry args={[0.2, 8, 8]} />
        </Animated3D>
        
        <Animated3D
          position={[0, 4, 1]}
          color="#06b6d4"
          pulse={true}
          pulseAmount={0.3}
          pulseSpeed={2}
        >
          <sphereGeometry args={[0.2, 8, 8]} />
        </Animated3D>
        
        {/* Background grid */}
        <mesh position={[0, -2, -8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20, 20, 20]} />
          <meshBasicMaterial color="#333333" wireframe opacity={0.2} transparent />
        </mesh>
        
        {/* 3D Title */}
        <TextContainer3D
          position={[0, 5, 0]}
          text="PORTFOLIO"
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="center"
        />
      </ThreeCanvas>
      
      {/* UI Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="theme-ui-panel p-8 max-w-2xl w-full mx-4">
          <h1 className="text-5xl font-bold text-center mb-4 theme-ui-text">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-center mb-8 theme-ui-text opacity-80">
            Exploring the intersection of code, design, and 3D experiences
          </p>
          
          {/* Page Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {pages.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageNavigation(page)}
                className="theme-button p-6 text-left hover:scale-105 transition-transform duration-200"
              >
                <h3 className="text-xl font-semibold mb-2 theme-ui-text">
                  {page.name}
                </h3>
                <p className="text-sm opacity-70 theme-ui-text">
                  {page.description}
                </p>
                <div className="mt-2 text-xs opacity-50 theme-ui-text">
                  Theme: {page.theme}
                </div>
              </button>
            ))}
          </div>
          
          {/* Theme Selector */}
          <div className="text-center">
            <p className="text-sm opacity-60 theme-ui-text mb-3">Current Theme:</p>
            <div className="flex justify-center space-x-2">
              {getAvailableThemes().map((theme) => (
                <button
                  key={theme}
                  onClick={() => setTheme(theme)}
                  className={`px-3 py-1 text-xs theme-button ${
                    theme === currentTheme ? 'active' : ''
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating theme indicator */}
      <div className="absolute top-4 right-4 z-20 theme-ui-panel p-3">
        <p className="text-xs theme-ui-text">
          {currentTheme}
        </p>
      </div>
    </div>
  );
};

// Simple redirect component
const RedirectToHome = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);
  
  return <div>Redirecting...</div>;
};

const ComingSoonPage = ({ title }) => {
  const { setTheme } = useTheme();
  
  useEffect(() => {
    setTheme('frutiger-aero');
  }, [setTheme]);
  
  return (
    <div className="min-h-screen flex items-center justify-center theme-ui-panel">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 theme-ui-text">{title}</h1>
        <p className="text-xl mb-8 theme-ui-text opacity-80">Coming Soon!</p>
        <button 
          onClick={() => window.history.back()}
          className="theme-button px-6 py-3"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

/**
 * App - Main application with routing
 * Updated with individual Gravity Falls research pages
 */
function App() {
  
  // Register themes on app init
  useEffect(() => {
    themeEngine.registerTheme('frutiger-aero', frutigerAeroTheme);
    themeEngine.registerTheme('minimal', minimalTheme);
    themeEngine.registerTheme('gravity-falls', gravityFallsTheme);
    
    // Set initial theme
    themeEngine.setTheme('frutiger-aero');
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/gravity-falls-research" element={<GravityFallsResearch />} />
        
        {/* Gravity Falls research sub-pages */}
        <Route path="/gravity-falls-research/HypothesisPage" element={<HypothesisPage />} />
        <Route path="/gravity-falls-research/BackgroundPage" element={<BackgroundPage />} />
        <Route path="/gravity-falls-research/MethodsPage" element={<MethodsPage />} />
        <Route path="/gravity-falls-research/DataPage" element={<DataPage />} />
        <Route path="/gravity-falls-research/DiscussionPage" element={<DiscussionPage />} />
        
        {/* Other portfolio pages */}
        <Route path="/interactive-demo" element={<ComingSoonPage title="Interactive Demo" />} />
        <Route path="/minimal-gallery" element={<ComingSoonPage title="Minimal Gallery" />} />
        <Route path="/about" element={<ComingSoonPage title="About Me" />} />
        
        {/* Development redirects - handle /PortfolioPage/ URLs */}
        <Route path="/PortfolioPage/" element={<RedirectToHome />} />
        <Route path="/PortfolioPage" element={<RedirectToHome />} />
        <Route path="/PortfolioPage/*" element={<RedirectToHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;