// src/content/themes
/**
 * Frutiger Aero Theme - Primary aesthetic
 * Clean, glossy, futuristic with glass and chrome effects
 */

export const frutigerAeroTheme = {
  name: 'frutiger-aero',
  displayName: 'Frutiger Aero',
  
  // Color palette - bright, clean, technological
  colors: {
    // Primary brand colors
    primary: '#00b4d8',        // Bright cyan
    secondary: '#90e0ef',      // Light cyan
    accent: '#0077b6',         // Deep blue
    
    // UI colors
    background: '#caf0f8',     // Very light cyan
    surface: '#ffffff',        // Pure white
    surfaceAlt: 'rgba(255, 255, 255, 0.8)', // Translucent white
    
    // Text colors
    text: '#023047',           // Dark blue-gray
    textSecondary: '#219ebc',  // Medium cyan
    textMuted: '#8ecae6',      // Light cyan
    
    // State colors
    success: '#06ffa5',        // Bright green
    warning: '#ffb700',        // Bright orange
    error: '#ff006e',          // Bright pink
    
    // Glass effects
    glass: 'rgba(255, 255, 255, 0.25)',
    glassBorder: 'rgba(255, 255, 255, 0.3)',
    
    // Gradients (as CSS strings)
    gradientPrimary: 'linear-gradient(135deg, #00b4d8 0%, #90e0ef 100%)',
    gradientBackground: 'linear-gradient(135deg, #caf0f8 0%, #e0f7ff 50%, #f0fbff 100%)',
    gradientChrome: 'linear-gradient(135deg, #e8f4f8 0%, #d1ecf1 50%, #bee9e8 100%)',
  },
  
  // 3D Material properties
  materials: {
    // Glass material settings
    glassOpacity: '0.8',
    glassRoughness: '0.1',
    glassMetalness: '0.1',
    glassTransmission: '0.9',
    glassThickness: '0.5',
    
    // Chrome material settings
    chromeRoughness: '0.05',
    chromeMetalness: '1.0',
    chromeColor: '#e8f4f8',
    
    // Standard material settings
    standardRoughness: '0.3',
    standardMetalness: '0.2',
    
    // Glow effects
    glowIntensity: '1.5',
    glowColor: '#00b4d8',
  },
  
  // Lighting configuration
  lighting: {
    // Ambient light
    ambientColor: '#ffffff',
    ambientIntensity: '0.6',
    
    // Directional light (sun)
    directionalColor: '#ffffff',
    directionalIntensity: '0.8',
    directionalPosition: [10, 10, 5],
    
    // Environment lighting
    environmentPreset: 'city',
    environmentIntensity: '1.0',
    
    // Additional accent lights
    accentLightColor: '#00b4d8',
    accentLightIntensity: '0.4',
  },
  
  // Animation settings
  animations: {
    // Global animation speeds
    rotationSpeed: '1.0',
    hoverTransition: '0.3s',
    colorTransition: '0.5s',
    
    // Specific animation types
    floatAmount: '0.1',
    floatSpeed: '1.0',
    pulseAmount: '1.2',
    pulseSpeed: '2.0',
  },
  
  // UI specific settings
  ui: {
    // Border radius
    borderRadius: '12px',
    borderRadiusSmall: '6px',
    borderRadiusLarge: '20px',
    
    // Shadows
    shadowPrimary: '0 4px 20px rgba(0, 180, 216, 0.25)',
    shadowSecondary: '0 2px 10px rgba(0, 119, 182, 0.15)',
    shadowGlass: '0 8px 32px rgba(31, 38, 135, 0.37)',
    
    // Backdrop blur
    backdropBlur: '10px',
    
    // Font sizes
    fontSizeSmall: '0.875rem',
    fontSizeBase: '1rem',
    fontSizeLarge: '1.25rem',
    fontSizeXL: '1.5rem',
    fontSizeDisplay: '2.5rem',
  },
  
  // 3D Scene settings
  scene: {
    backgroundColor: '#caf0f8',
    fogColor: '#e0f7ff',
    fogDensity: '0.02',
    
    // Camera settings
    cameraPosition: [0, 0, 8],
    cameraFov: 75,
    
    // Performance settings for this theme
    enableShadows: true,
    enableReflections: true,
    shadowMapSize: 1024,
  }
};

export default frutigerAeroTheme;