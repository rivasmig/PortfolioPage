import React, { useState } from 'react';
import ThreeCanvas from '../layout/ThreeCanvas';
import { useTheme } from '../../hooks/useTheme';

/**
 * PageWrapper - Smart container for MDX pages with 3D integration
 * Provides both 2D content area and 3D canvas for mixed content
 */
const PageWrapper = ({ 
  children, 
  title = "Untitled Page",
  layout = "split", // "split", "overlay", "fullscreen-3d", "fullscreen-2d"
  showThemeToggle = true,
  backgroundElements = null, // 3D elements to show behind content
  className = "",
  ...props 
}) => {
  
  const { currentTheme, setTheme, getAvailableThemes } = useTheme();
  const [show3D, setShow3D] = useState(layout === "split" || layout === "overlay");
  
  const renderThemeToggle = () => (
    showThemeToggle && (
      <div className="fixed top-4 right-4 z-50 theme-ui-panel p-3">
        <p className="text-xs opacity-60 theme-ui-text mb-2">Theme:</p>
        <div className="space-y-1">
          {getAvailableThemes().map((theme) => (
            <button
              key={theme}
              onClick={() => setTheme(theme)}
              className={`block px-2 py-1 text-xs theme-button ${
                theme === currentTheme ? 'active' : ''
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    )
  );
  
  const renderLayoutToggle = () => (
    <div className="fixed top-4 left-4 z-50 theme-ui-panel p-2">
      <button
        onClick={() => setShow3D(!show3D)}
        className="text-xs theme-button px-2 py-1"
      >
        {show3D ? 'Hide 3D' : 'Show 3D'}
      </button>
    </div>
  );
  
  // Split layout: 3D on left, content on right
  if (layout === "split") {
    return (
      <div className="flex h-screen" {...props}>
        {renderThemeToggle()}
        {renderLayoutToggle()}
        
        {/* 3D Canvas Side */}
        {show3D && (
          <div className="w-1/2 h-full">
            <ThreeCanvas>
              {backgroundElements}
            </ThreeCanvas>
          </div>
        )}
        
        {/* Content Side */}
        <div className={`${show3D ? 'w-1/2' : 'w-full'} h-full overflow-y-auto bg-opacity-90 theme-ui-panel ${className}`}>
          <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 theme-ui-text">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    );
  }
  
  // Overlay layout: 3D background with floating content
  if (layout === "overlay") {
    return (
      <div className="relative h-screen overflow-hidden" {...props}>
        {renderThemeToggle()}
        {renderLayoutToggle()}
        
        {/* 3D Background */}
        {show3D && (
          <div className="absolute inset-0">
            <ThreeCanvas>
              {backgroundElements}
            </ThreeCanvas>
          </div>
        )}
        
        {/* Floating Content */}
        <div className="absolute inset-0 overflow-y-auto p-8 z-10">
          <div className="max-w-2xl mx-auto">
            <div className="theme-ui-panel p-8 mb-8">
              <h1 className="text-4xl font-bold mb-8 theme-ui-text">{title}</h1>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Fullscreen 3D: Just the 3D canvas
  if (layout === "fullscreen-3d") {
    return (
      <div className="h-screen" {...props}>
        {renderThemeToggle()}
        <ThreeCanvas>
          {backgroundElements}
          {/* Only 3D elements go here - NO HTML! */}
        </ThreeCanvas>
      </div>
    );
  }
  
  // Fullscreen 2D: Traditional webpage
  return (
    <div className="min-h-screen theme-ui-panel" {...props}>
      {renderThemeToggle()}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 theme-ui-text">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;