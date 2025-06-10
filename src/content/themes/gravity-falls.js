/**
 * Gravity Falls Theme - Stanford Pines' Laptop
 * Retro-futuristic 80s computing aesthetic with wireframes and CRT glow
 * Inspired by Ford's interdimensional research equipment
 */

const gravityFallsTheme = {
  name: 'gravity-falls',
  displayName: 'Stanford\'s Laptop',
  
  // Classic 80s computer terminal color palette
  colors: {
    // Primary brand colors - classic green CRT
    primary: '#00ff41',        // Bright matrix green
    secondary: '#39ff14',      // Electric lime green
    accent: '#ffff00',         // Warning yellow
    
    // UI colors - dark computer terminal
    background: '#000000',     // Pure black (CRT background)
    surface: '#001100',        // Very dark green tint
    surfaceAlt: 'rgba(0, 255, 65, 0.1)', // Translucent green glow
    
    // Text colors - classic terminal
    text: '#00ff41',           // Bright green text
    textSecondary: '#39ff14',  // Slightly different green
    textMuted: '#006600',      // Darker green
    
    // State colors - 80s computer warnings
    success: '#00ff41',        // Green (same as primary)
    warning: '#ffff00',        // Bright yellow
    error: '#ff0000',          // Bright red (classic error color)
    
    // Special effects
    glass: 'rgba(0, 255, 65, 0.15)',     // Green glow effect
    glassBorder: 'rgba(0, 255, 65, 0.4)', // Bright green border
    
    // Gradients - CRT screen effects
    gradientPrimary: 'linear-gradient(135deg, #00ff41 0%, #39ff14 100%)',
    gradientBackground: 'radial-gradient(ellipse at center, #001100 0%, #000000 70%, #000000 100%)', // CRT curve effect
    gradientChrome: 'linear-gradient(135deg, #003300 0%, #006600 50%, #00ff41 100%)', // Wireframe gradient
    
    // Special Ford's laptop colors
    portalBlue: '#0099ff',     // Interdimensional portal blue
    anomalyPurple: '#9900ff',  // Weirdness indicator
    scanlineGreen: '#00cc33',  // Scanline effect
  },
  
  // 3D Material properties - wireframe and glowing
  materials: {
    // Glass material settings - glowing screens
    glassOpacity: '0.3',
    glassRoughness: '0.9',
    glassMetalness: '0.0',
    glassTransmission: '0.8',
    glassThickness: '0.1',
    
    // Chrome material settings - wireframe look
    chromeRoughness: '1.0',    // Completely matte
    chromeMetalness: '0.0',    // No metallic reflection
    chromeColor: '#00ff41',    // Green wireframe
    
    // Standard material settings - CRT plastic
    standardRoughness: '0.9',
    standardMetalness: '0.0',
    
    // Glow effects - MAXIMUM GLOW
    glowIntensity: '2.5',
    glowColor: '#00ff41',
    
    // Wireframe specific
    wireframeOpacity: '0.8',
    wireframeLinewidth: '2',
    
    // Scanline effects
    scanlineOpacity: '0.3',
    scanlineSpeed: '2.0',
  },
  
  // Lighting configuration - dramatic CRT lighting
  lighting: {
    // Ambient light - very low (dark room)
    ambientColor: '#001100',
    ambientIntensity: '0.2',
    
    // Directional light - simulated screen glow
    directionalColor: '#00ff41',
    directionalIntensity: '1.2',
    directionalPosition: [0, 0, 10], // Coming from screen
    
    // Environment lighting - none (we're in Ford's basement lab)
    environmentPreset: 'night',
    environmentIntensity: '0.1',
    
    // Additional accent lights - green glow everywhere
    accentLightColor: '#00ff41',
    accentLightIntensity: '1.5',
    
    // Point lights for dramatic effect
    pointLightColor: '#39ff14',
    pointLightIntensity: '2.0',
  },
  
  // Animation settings - 80s computer feel
  animations: {
    // Global animation speeds - slightly glitchy
    rotationSpeed: '0.8',
    hoverTransition: '0.1s',   // Snappy like old computers
    colorTransition: '0.2s',
    
    // Specific animation types
    floatAmount: '0.2',        // More dramatic floating
    floatSpeed: '0.6',         // Slower, more ominous
    pulseAmount: '1.5',        // Strong pulsing glow
    pulseSpeed: '3.0',         // Faster pulse (like heartbeat)
    
    // Special effects
    glitchChance: '0.05',      // 5% chance of glitch per frame
    scanlineSpeed: '1.5',      // Moving scanlines
    flickerIntensity: '0.1',   // Subtle screen flicker
  },
  
  // UI specific settings - retro terminal
  ui: {
    // Border radius - angular, 80s style
    borderRadius: '0px',       // Sharp corners only!
    borderRadiusSmall: '0px',
    borderRadiusLarge: '2px',  // Tiny bit for large elements
    
    // Shadows - glowing green
    shadowPrimary: '0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 60px #00ff41',
    shadowSecondary: '0 0 10px #39ff14, 0 0 20px #39ff14',
    shadowGlass: '0 0 30px rgba(0, 255, 65, 0.8)',
    
    // Backdrop blur - none (sharp CRT pixels)
    backdropBlur: '0px',
    
    // Font settings - monospace terminal
    fontFamily: '"Courier New", "Lucida Console", monospace',
    fontSizeSmall: '0.75rem',
    fontSizeBase: '0.875rem',  // Smaller for terminal feel
    fontSizeLarge: '1rem',
    fontSizeXL: '1.25rem',
    fontSizeDisplay: '2rem',
    
    // Terminal-specific
    lineHeight: '1.2',
    letterSpacing: '0.05em',   // Spaced out like old terminals
    textTransform: 'uppercase', // ALL CAPS for that computer feel
  },
  
  // 3D Scene settings - Ford's basement lab
  scene: {
    backgroundColor: '#000000', // Pure black void
    fogColor: '#001100',        // Dark green fog
    fogDensity: '0.05',         // Mysterious atmosphere
    
    // Camera settings - closer for dramatic effect
    cameraPosition: [0, 0, 6],
    cameraFov: 80,              // Wider FOV for paranoia feel
    
    // Performance settings
    enableShadows: true,
    enableReflections: false,   // CRT screens don't reflect much
    shadowMapSize: 512,         // Lower res for retro feel
    
    // Special effects
    enableScanlines: true,
    enableGlitch: true,
    enableCRTCurvature: true,
    
    // Wireframe defaults
    defaultWireframe: true,     // Everything wireframe by default!
    wireframeLinewidth: 1.5,
  },
  
  // Special Gravity Falls elements
  mystery: {
    // Bill Cipher colors (if we want to add them later)
    billYellow: '#ffff00',
    billBlue: '#0099ff',
    
    // Journal colors
    journalBrown: '#8b4513',
    journalGold: '#ffd700',
    
    // Anomaly indicators
    anomalyColors: ['#ff0000', '#ffff00', '#00ff41', '#0099ff', '#9900ff'],
    
    // Weirdness levels
    weirdnessLow: '#006600',
    weirdnessMedium: '#ffff00',
    weirdnessHigh: '#ff0000',
    weirdnessMAXIMUM: '#ff00ff',
  }
};

export { gravityFallsTheme };
export default gravityFallsTheme;