// src/utils/physicsConfig.js

/**
 * Base Physics Materials
 * Core physics material definitions used by the parser
 */
export const PHYSICS_MATERIALS = {
  // Static objects - collisions only, no physics simulation
  static: {
    type: 'fixed',
    restitution: 0.3,
    friction: 0.8,
    density: 1.0,
    interactions: {
      mouse: { enabled: false },
      scroll: { enabled: false },
      click: { enabled: false }
    }
  },

  // Floaty objects - light physics, responds to mouse/scroll
  floaty: {
    type: 'dynamic',
    restitution: 0.9,
    friction: 0.1,
    density: 0.1,
    gravityScale: 0.2,
    interactions: {
      mouse: { 
        enabled: true, 
        strength: 3.0, 
        radius: 5.0,
        type: 'attract'
      },
      scroll: { 
        enabled: true, 
        strength: 2.0,
        windEffect: true 
      },
      click: { 
        enabled: true, 
        impulse: [0, 5, 0],
        randomness: 0.5 
      }
    }
  },

  // Bouncy objects - high restitution, fun interactions
  bouncy: {
    type: 'dynamic',
    restitution: 1.2,
    friction: 0.2,
    density: 0.5,
    gravityScale: 1.0,
    interactions: {
      mouse: { 
        enabled: true, 
        strength: 8.0, 
        radius: 3.0,
        type: 'repel'
      },
      scroll: { 
        enabled: true, 
        strength: 5.0,
        windEffect: false 
      },
      click: { 
        enabled: true, 
        impulse: [0, 15, 0],
        randomness: 1.0 
      }
    }
  },

  // Heavy objects - realistic physics, less responsive to interactions
  heavy: {
    type: 'dynamic',
    restitution: 0.1,
    friction: 0.9,
    density: 3.0,
    gravityScale: 1.5,
    interactions: {
      mouse: { 
        enabled: true, 
        strength: 1.0, 
        radius: 2.0,
        type: 'attract'
      },
      scroll: { 
        enabled: false 
      },
      click: { 
        enabled: true, 
        impulse: [0, 3, 0],
        randomness: 0.1 
      }
    }
  },

  // Magnetic objects - strongly attracted to mouse
  magnetic: {
    type: 'dynamic',
    restitution: 0.5,
    friction: 0.3,
    density: 0.8,
    gravityScale: 0.5,
    interactions: {
      mouse: { 
        enabled: true, 
        strength: 15.0, 
        radius: 10.0,
        type: 'attract'
      },
      scroll: { 
        enabled: true, 
        strength: 1.0,
        windEffect: true 
      },
      click: { 
        enabled: true, 
        impulse: [0, 8, 0],
        randomness: 0.3 
      }
    }
  },

  // Orbiting objects - float around mouse cursor
  orbital: {
    type: 'dynamic',
    restitution: 0.8,
    friction: 0.1,
    density: 0.3,
    gravityScale: 0.1,
    interactions: {
      mouse: { 
        enabled: true, 
        strength: 5.0, 
        radius: 8.0,
        type: 'orbital',
        orbitSpeed: 2.0
      },
      scroll: { 
        enabled: true, 
        strength: 3.0,
        windEffect: true 
      },
      click: { 
        enabled: true, 
        impulse: [0, 10, 0],
        randomness: 0.8 
      }
    }
  }
};

/**
 * Portfolio Website Physics Configuration
 * For interactive portfolio elements
 */
export const PORTFOLIO_PHYSICS_CONFIG = {
  // Floating business cards
  card: {
    type: 'dynamic',
    restitution: 0.8,
    friction: 0.2,
    density: 0.3,
    gravityScale: 0.3,
    interactions: {
      mouse: { enabled: true, strength: 4.0, radius: 6.0, type: 'attract' },
      scroll: { enabled: true, strength: 2.0, windEffect: true },
      click: { enabled: true, impulse: [0, 8, 0], randomness: 0.4 }
    }
  },
  
  // Interactive skill orbs
  skill: {
    type: 'dynamic',
    restitution: 1.0,
    friction: 0.1,
    density: 0.2,
    gravityScale: 0.1,
    interactions: {
      mouse: { enabled: true, strength: 6.0, radius: 8.0, type: 'orbital', orbitSpeed: 3.0 },
      scroll: { enabled: true, strength: 3.0, windEffect: true },
      click: { enabled: true, impulse: [0, 12, 0], randomness: 0.8 }
    }
  }
};

/**
 * Game-like Physics Configuration
 * For more playful interactions
 */
export const GAME_PHYSICS_CONFIG = {
  // Bouncy balls
  ball: {
    type: 'dynamic',
    restitution: 1.5,
    friction: 0.1,
    density: 0.5,
    gravityScale: 1.0,
    interactions: {
      mouse: { enabled: true, strength: 10.0, radius: 4.0, type: 'repel' },
      scroll: { enabled: true, strength: 8.0, windEffect: false },
      click: { enabled: true, impulse: [0, 20, 0], randomness: 1.0 }
    }
  },
  
  // Floating platforms
  platform: {
    type: 'kinematic', // Moves but not affected by physics
    restitution: 0.3,
    friction: 0.8,
    interactions: {
      mouse: { enabled: false },
      scroll: { enabled: false },
      click: { enabled: false }
    }
  }
};

/**
 * Artistic/Exhibition Physics Configuration
 * For subtle, elegant interactions
 */
export const ARTISTIC_PHYSICS_CONFIG = {
  // Gentle floating elements
  gentle: {
    type: 'dynamic',
    restitution: 0.6,
    friction: 0.3,
    density: 0.1,
    gravityScale: 0.1,
    interactions: {
      mouse: { enabled: true, strength: 2.0, radius: 10.0, type: 'attract' },
      scroll: { enabled: true, strength: 1.0, windEffect: true },
      click: { enabled: true, impulse: [0, 3, 0], randomness: 0.2 }
    }
  },
  
  // Magnetic attraction elements
  magnetic: {
    type: 'dynamic',
    restitution: 0.4,
    friction: 0.2,
    density: 0.2,
    gravityScale: 0.2,
    interactions: {
      mouse: { enabled: true, strength: 8.0, radius: 12.0, type: 'attract' },
      scroll: { enabled: false },
      click: { enabled: true, impulse: [0, 5, 0], randomness: 0.1 }
    }
  }
};

/**
 * Usage Examples for Blender Naming Convention
 */
export const BLENDER_NAMING_EXAMPLES = {
  // Method 1: physics_materialName_objectName
  examples: [
    'physics_floaty_cloud',
    'physics_bouncy_ball',
    'physics_heavy_rock',
    'physics_magnetic_orb',
    'physics_static_wall'
  ],
  
  // Method 2: materialName_objectName (shorter)
  shortExamples: [
    'floaty_cloud',
    'bouncy_ball',
    'heavy_rock',
    'magnetic_orb',
    'static_wall'
  ],
  
  // Method 3: Using custom properties in Blender
  customPropertyExample: `
    // In Blender, add a custom property to your object:
    // Property Name: physicsMaterial
    // Property Value: "floaty" (or any material name)
  `
};

/**
 * Advanced Physics Configuration
 * For complex scenarios
 */
export const ADVANCED_PHYSICS_CONFIG = {
  // Wind-affected light objects
  windLeaf: {
    type: 'dynamic',
    restitution: 0.9,
    friction: 0.05,
    density: 0.05,
    gravityScale: 0.1,
    interactions: {
      mouse: { enabled: true, strength: 1.0, radius: 15.0, type: 'attract' },
      scroll: { enabled: true, strength: 5.0, windEffect: true },
      click: { enabled: true, impulse: [0, 15, 0], randomness: 1.5 }
    }
  },
  
  // Pendulum-like objects
  pendulum: {
    type: 'dynamic',
    restitution: 0.1,
    friction: 0.8,
    density: 2.0,
    gravityScale: 1.2,
    interactions: {
      mouse: { enabled: true, strength: 3.0, radius: 5.0, type: 'attract' },
      scroll: { enabled: true, strength: 2.0, windEffect: false },
      click: { enabled: true, impulse: [0, 8, 0], randomness: 0.3 }
    }
  },
  
  // Bubble-like floating objects
  bubble: {
    type: 'dynamic',
    restitution: 1.2,
    friction: 0.01,
    density: 0.01,
    gravityScale: -0.1, // Negative gravity = floating upward
    interactions: {
      mouse: { enabled: true, strength: 2.0, radius: 8.0, type: 'repel' },
      scroll: { enabled: true, strength: 4.0, windEffect: true },
      click: { enabled: true, impulse: [0, 10, 0], randomness: 1.0 }
    }
  }
};

/**
 * Environment-specific Physics Presets
 * Different physics behaviors for different environments
 */
export const ENVIRONMENT_PHYSICS_PRESETS = {
  // Underwater environment
  underwater: {
    globalGravity: [0, -2.0, 0], // Reduced gravity
    defaultMaterial: {
      type: 'dynamic',
      restitution: 0.8,
      friction: 0.9, // High friction for water resistance
      density: 0.3,
      gravityScale: 0.3,
      interactions: {
        mouse: { enabled: true, strength: 2.0, radius: 12.0, type: 'attract' },
        scroll: { enabled: true, strength: 1.0, windEffect: true },
        click: { enabled: true, impulse: [0, 5, 0], randomness: 0.5 }
      }
    }
  },
  
  // Space environment
  space: {
    globalGravity: [0, 0, 0], // No gravity
    defaultMaterial: {
      type: 'dynamic',
      restitution: 1.0,
      friction: 0.0, // No friction in space
      density: 1.0,
      gravityScale: 0.0,
      interactions: {
        mouse: { enabled: true, strength: 5.0, radius: 15.0, type: 'attract' },
        scroll: { enabled: true, strength: 3.0, windEffect: false },
        click: { enabled: true, impulse: [0, 10, 0], randomness: 0.8 }
      }
    }
  },
  
  // Windy environment
  windy: {
    globalGravity: [0, -9.81, 0], // Normal gravity
    windForce: { x: 2.0, y: 0, z: 1.0 }, // Constant wind
    defaultMaterial: {
      type: 'dynamic',
      restitution: 0.6,
      friction: 0.3,
      density: 0.5,
      gravityScale: 1.0,
      interactions: {
        mouse: { enabled: true, strength: 4.0, radius: 8.0, type: 'attract' },
        scroll: { enabled: true, strength: 6.0, windEffect: true },
        click: { enabled: true, impulse: [0, 12, 0], randomness: 0.7 }
      }
    }
  }
};

/**
 * Utility Functions for Physics Configuration
 */
export const PhysicsConfigUtils = {
  /**
   * Merge custom physics config with existing materials
   */
  mergePhysicsConfig: (baseMaterials, customConfig) => {
    return { ...baseMaterials, ...customConfig };
  },
  
  /**
   * Create a physics material variation
   */
  createVariation: (baseMaterial, overrides) => {
    return {
      ...baseMaterial,
      ...overrides,
      interactions: {
        ...baseMaterial.interactions,
        ...overrides.interactions
      }
    };
  },
  
  /**
   * Scale physics properties for performance
   */
  scaleForPerformance: (material, scaleFactor = 0.8) => {
    return {
      ...material,
      interactions: {
        mouse: {
          ...material.interactions.mouse,
          strength: material.interactions.mouse.strength * scaleFactor,
          radius: material.interactions.mouse.radius * scaleFactor
        },
        scroll: {
          ...material.interactions.scroll,
          strength: material.interactions.scroll.strength * scaleFactor
        },
        click: {
          ...material.interactions.click,
          impulse: material.interactions.click.impulse.map(val => val * scaleFactor)
        }
      }
    };
  }
};

/**
 * Example Usage in React Components
 */
export const USAGE_EXAMPLES = `
// Basic usage with automatic physics detection
<EnhancedGLTFCanvas
  url="/models/portfolio-scene.gltf"
  animated={true}
  enablePhysics={true}
  environment="sunset"
/>

// With custom physics configuration
import { PORTFOLIO_PHYSICS_CONFIG } from '../utils/physicsConfig';

<EnhancedGLTFCanvas
  url="/models/interactive-scene.gltf"
  enablePhysics={true}
  onPhysicsObjectsParsed={(objects, controller) => {
    console.log('Found physics objects:', objects);
    // Custom setup logic here
  }}
/>

// Blender naming examples:
// - "physics_floaty_cloud" -> uses floaty physics material
// - "bouncy_ball" -> uses bouncy physics material  
// - "static_wall" -> uses static physics material
// - Object with custom property "physicsMaterial" = "magnetic"
`;

/**
 * Performance Optimization Guidelines
 */
export const PERFORMANCE_GUIDELINES = {
  recommendations: [
    "Limit physics objects to 20-30 for mobile devices",
    "Use 'static' or 'kinematic' for non-interactive objects",
    "Reduce interaction radius for better performance",
    "Use lower density values for lighter simulation",
    "Disable physics interactions for objects outside viewport",
    "Consider LOD (Level of Detail) for complex models"
  ],
  
  mobileOptimizations: {
    // Reduced physics materials for mobile
    mobileFloaty: {
      type: 'dynamic',
      restitution: 0.8,
      friction: 0.2,
      density: 0.2,
      gravityScale: 0.5,
      interactions: {
        mouse: { enabled: true, strength: 2.0, radius: 4.0, type: 'attract' },
        scroll: { enabled: false }, // Disable scroll on mobile
        click: { enabled: true, impulse: [0, 5, 0], randomness: 0.3 }
      }
    }
  }
};

/**
 * Debugging and Development Tools
 */
export const DEBUG_CONFIG = {
  // Enable physics debug rendering
  enableDebugRenderer: false,
  
  // Log physics interactions
  logInteractions: false,
  
  // Performance monitoring
  performanceMonitoring: {
    enabled: false,
    logInterval: 5000, // Log every 5 seconds
    maxObjects: 50
  },
  
  // Visual indicators for physics materials
  materialColors: {
    static: '#808080',
    floaty: '#87CEEB',
    bouncy: '#FF6B6B',
    heavy: '#8B4513',
    magnetic: '#FF1493',
    orbital: '#9370DB'
  }
};