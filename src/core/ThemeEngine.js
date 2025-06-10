/**
 * ThemeEngine - Manages dynamic theme switching for the entire site
 * Handles both 2D UI styles and 3D material/lighting properties
 */

class ThemeEngine {
  constructor() {
    this.currentTheme = 'frutiger-aero';
    this.themes = new Map();
    this.listeners = new Set();
    
    // Initialize with default theme
    this.init();
  }
  
  /**
   * Initialize the theme engine
   */
  init() {
    // Set default theme from localStorage or fallback
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && this.themes.has(savedTheme)) {
      this.currentTheme = savedTheme;
    }
    
    // Apply theme on init
    this.applyTheme();
  }
  
  /**
   * Register a new theme
   * @param {string} name - Theme identifier
   * @param {Object} themeConfig - Theme configuration object
   */
  registerTheme(name, themeConfig) {
    this.themes.set(name, themeConfig);
  }
  
  /**
   * Switch to a different theme
   * @param {string} themeName - Name of theme to switch to
   */
  setTheme(themeName) {
    if (!this.themes.has(themeName)) {
      console.warn(`Theme "${themeName}" not found. Available themes:`, Array.from(this.themes.keys()));
      return;
    }
    
    this.currentTheme = themeName;
    localStorage.setItem('portfolio-theme', themeName);
    this.applyTheme();
    this.notifyListeners();
  }
  
  /**
   * Get current theme configuration
   * @returns {Object} Current theme config
   */
  getCurrentTheme() {
    return this.themes.get(this.currentTheme) || {};
  }
  
  /**
   * Get current theme name
   * @returns {string} Current theme name
   */
  getCurrentThemeName() {
    return this.currentTheme;
  }
  
  /**
   * Get list of available themes
   * @returns {Array} Array of theme names
   */
  getAvailableThemes() {
    return Array.from(this.themes.keys());
  }
  
  /**
   * Apply current theme to the document
   */
  applyTheme() {
    const theme = this.getCurrentTheme();
    if (!theme.colors) return;
    
    const root = document.documentElement;
    
    // Apply CSS custom properties for colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Apply 3D-specific properties
    if (theme.materials) {
      Object.entries(theme.materials).forEach(([key, value]) => {
        root.style.setProperty(`--material-${key}`, value);
      });
    }
    
    if (theme.lighting) {
      Object.entries(theme.lighting).forEach(([key, value]) => {
        root.style.setProperty(`--lighting-${key}`, value);
      });
    }
    
    // Set theme class on body for CSS targeting
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${this.currentTheme}`);
  }
  
  /**
   * Subscribe to theme changes
   * @param {Function} callback - Function to call when theme changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }
  
  /**
   * Notify all listeners of theme change
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentTheme, this.getCurrentTheme());
      } catch (error) {
        console.error('Error in theme listener:', error);
      }
    });
  }
  
  /**
   * Get a specific theme property with fallback
   * @param {string} path - Dot notation path to property (e.g., 'colors.primary')
   * @param {*} fallback - Fallback value if property not found
   * @returns {*} Theme property value or fallback
   */
  getThemeProperty(path, fallback = null) {
    const theme = this.getCurrentTheme();
    const keys = path.split('.');
    
    let value = theme;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return fallback;
      }
    }
    
    return value;
  }
}

// Create global theme engine instance
export const themeEngine = new ThemeEngine();

// Export for direct use
export default ThemeEngine;