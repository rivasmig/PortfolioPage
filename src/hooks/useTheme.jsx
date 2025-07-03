// src/hooks/useTheme.jsx
import { useState, useEffect } from 'react';
import { themeEngine } from '../core/ThemeEngine';

/**
 * useTheme Hook - React hook for theme management
 * Provides current theme state and switching capabilities
 */
export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(themeEngine.getCurrentThemeName());
  const [themeConfig, setThemeConfig] = useState(themeEngine.getCurrentTheme());
  
  useEffect(() => {
    // Subscribe to theme changes
    const unsubscribe = themeEngine.subscribe((themeName, config) => {
      setCurrentTheme(themeName);
      setThemeConfig(config);
    });
    
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);
  
  /**
   * Switch to a different theme
   * @param {string} themeName - Name of theme to switch to
   */
  const setTheme = (themeName) => {
    themeEngine.setTheme(themeName);
  };
  
  /**
   * Get a specific theme property with fallback
   * @param {string} path - Dot notation path (e.g., 'colors.primary')
   * @param {*} fallback - Fallback value
   * @returns {*} Theme property value or fallback
   */
  const getThemeProperty = (path, fallback = null) => {
    return themeEngine.getThemeProperty(path, fallback);
  };
  
  /**
   * Get available themes list
   * @returns {Array} Array of theme names
   */
  const getAvailableThemes = () => {
    return themeEngine.getAvailableThemes();
  };
  
  return {
    // Current state
    currentTheme,
    themeConfig,
    
    // Actions
    setTheme,
    getThemeProperty,
    getAvailableThemes,
    
    // Direct access to theme engine
    themeEngine,
  };
};

export default useTheme;