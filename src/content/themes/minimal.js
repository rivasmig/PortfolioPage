/**
 * Minimal Theme - Clean, simple, monochromatic
 * For when you want a more professional/subdued look
 */

export const minimalTheme = {
  name: 'minimal',
  displayName: 'Minimal',
  
  // Monochromatic color palette
  colors: {
    // Primary brand colors
    primary: '#2d3748',        // Dark gray
    secondary: '#4a5568',      // Medium gray
    accent: '#1a202c',         // Very dark gray
    
    // UI colors
    background: '#f7fafc',     // Very light gray
    surface: '#ffffff',        // Pure white
    surfaceAlt: '#edf2f7',     // Light gray
    
    // Text colors
    text: '#1a202c',           // Very dark gray
    textSecondary: '#4a5568',  // Medium gray
    textMuted: '#a0aec0',      // Light gray
    
    // State colors
    success: '#48bb78',        // Muted green
    warning: '#ed8936',        // Muted orange
    error: '#f56565',          // Muted red
    
    // Glass effects (subtle)
    glass: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(0, 0, 0, 0.1)',
    
    // Gradients (subtle)
    gradientPrimary: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
    gradientBackground: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
    gradientChrome: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)',
  },
  
  // 3D Material properties - matte, simple
  materials: {
    // Glass material settings (subtle)
    glassOpacity: '0.9',
    glassRoughness: '0.3',
    glassMetalness: '0.0',
    glassTransmission: '0.1',
    glassThickness: '0.1',
    
    // Chrome material settings (matte)
    chromeRoughness: '0.8',
    chromeMetalness: '0.1',
    chromeColor: '#e2e8f0',
    
    // Standard material settings
    standardRoughness: '0.7',
    standardMetalness: '0.0',
    
    // Glow effects (disabled)
    glowIntensity: '0.0',
    glowColor: '#2d3748',
  },
  
  // Lighting configuration - soft, even
  lighting: {
    // Ambient light
    ambientColor: '#ffffff',
    ambientIntensity: '0.8',
    
    // Directional light
    directionalColor: '#ffffff',
    directionalIntensity: '0.4',
    directionalPosition: [5, 5, 5],
    
    // Environment lighting
    environmentPreset: 'warehouse',
    environmentIntensity: '0.6',
    
    // Additional accent lights
    accentLightColor: '#4a5568',
    accentLightIntensity: '0.2',
  },
  
  // Animation settings - slower, subtle
  animations: {
    // Global animation speeds
    rotationSpeed: '0.5',
    hoverTransition: '0.2s',
    colorTransition: '0.3s',
    
    // Specific animation types
    floatAmount: '0.05',
    floatSpeed: '0.8',
    pulseAmount: '1.05',
    pulseSpeed: '1.5',
  },
  
  // UI specific settings
  ui: {
    // Border radius (minimal)
    borderRadius: '4px',
    borderRadiusSmall: '2px',
    borderRadiusLarge: '8px',
    
    // Shadows (subtle)
    shadowPrimary: '0 2px 8px rgba(0, 0, 0, 0.1)',
    shadowSecondary: '0 1px 4px rgba(0, 0, 0, 0.05)',
    shadowGlass: '0 4px 16px rgba(0, 0, 0, 0.1)',
    
    // Backdrop blur (minimal)
    backdropBlur: '2px',
    
    // Font sizes
    fontSizeSmall: '0.875rem',
    fontSizeBase: '1rem',
    fontSizeLarge: '1.25rem',
    fontSizeXL: '1.5rem',
    fontSizeDisplay: '2rem',
  },
  
  // 3D Scene settings
  scene: {
    backgroundColor: '#f7fafc',
    fogColor: '#edf2f7',
    fogDensity: '0.01',
    
    // Camera settings
    cameraPosition: [0, 0, 8],
    cameraFov: 75,
    
    // Performance settings
    enableShadows: false,
    enableReflections: false,
    shadowMapSize: 512,
  }
};

export default minimalTheme;