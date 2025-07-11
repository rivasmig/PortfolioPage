// src/core/physics/PhysicsMaterialSystem.js

/**
 * Physics Material Definitions
 * These define how objects behave with physics and user interactions
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
        type: 'attract' // or 'repel'
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
        type: 'orbital', // special orbital behavior
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
 * Physics Material Parser
 * Parses GLTF objects and applies physics materials based on naming conventions
 */
export class PhysicsMaterialParser {
  constructor() {
    this.objectRegistry = new Map();
    this.physicsObjects = [];
  }

  /**
   * Parse GLTF scene and identify physics objects
   * Supports multiple naming conventions:
   * 1. "physics_materialName_objectName" (e.g., "physics_bouncy_ball")
   * 2. "materialName_objectName" (e.g., "floaty_cube")
   * 3. Blender custom properties (if available)
   */
  parseGLTFScene(gltfScene) {
    const physicsObjects = [];
    
    gltfScene.traverse((child) => {
      if (child.isMesh) {
        const physicsMaterial = this.extractPhysicsMaterial(child);
        
        if (physicsMaterial) {
          const physicsObject = {
            mesh: child,
            material: physicsMaterial,
            name: child.name,
            position: child.position.toArray(),
            rotation: child.rotation.toArray(),
            scale: child.scale.toArray()
          };
          
          physicsObjects.push(physicsObject);
          this.objectRegistry.set(child.name, physicsObject);
        }
      }
    });

    this.physicsObjects = physicsObjects;
    return physicsObjects;
  }

  /**
   * Extract physics material from object naming or properties
   */
  extractPhysicsMaterial(meshObject) {
    const name = meshObject.name.toLowerCase();
    
    // Method 1: "physics_materialName_objectName" pattern
    if (name.startsWith('physics_')) {
      const parts = name.split('_');
      if (parts.length >= 2) {
        const materialName = parts[1];
        if (PHYSICS_MATERIALS[materialName]) {
          return PHYSICS_MATERIALS[materialName];
        }
      }
    }
    
    // Method 2: "materialName_objectName" pattern
    for (const materialName of Object.keys(PHYSICS_MATERIALS)) {
      if (name.startsWith(materialName + '_')) {
        return PHYSICS_MATERIALS[materialName];
      }
    }

    // Method 3: Check Blender custom properties (if available)
    if (meshObject.userData && meshObject.userData.physicsMaterial) {
      const materialName = meshObject.userData.physicsMaterial;
      if (PHYSICS_MATERIALS[materialName]) {
        return PHYSICS_MATERIALS[materialName];
      }
    }

    // Method 4: Default static for objects containing "static" or "wall"
    if (name.includes('static') || name.includes('wall') || name.includes('ground')) {
      return PHYSICS_MATERIALS.static;
    }

    return null; // No physics material found
  }

  /**
   * Get all physics objects of a specific material type
   */
  getObjectsByMaterial(materialName) {
    return this.physicsObjects.filter(obj => 
      obj.material === PHYSICS_MATERIALS[materialName]
    );
  }

  /**
   * Get physics object by name
   */
  getObjectByName(name) {
    return this.objectRegistry.get(name);
  }
}

/**
 * Physics Interaction Controller
 * Handles mouse, scroll, and click interactions based on physics materials
 */
export class PhysicsInteractionController {
  constructor(physicsObjects) {
    this.physicsObjects = physicsObjects;
    this.rigidBodyRefs = new Map();
    this.mousePosition = { x: 0, y: 0 };
    this.scrollForce = 0;
    this.lastScrollTime = 0;
  }

  /**
   * Register a rigid body reference for physics interactions
   */
  registerRigidBody(objectName, rigidBodyRef) {
    this.rigidBodyRefs.set(objectName, rigidBodyRef);
  }

  /**
   * Update mouse position for physics interactions
   */
  updateMousePosition(normalizedX, normalizedY, worldPosition) {
    this.mousePosition = { x: normalizedX, y: normalizedY, world: worldPosition };
  }

  /**
   * Handle scroll events for physics
   */
  handleScroll(scrollDelta) {
    this.scrollForce = scrollDelta * 0.1;
    this.lastScrollTime = Date.now();
  }

  /**
   * Handle click events on physics objects
   */
  handleClick(objectName) {
    const rigidBodyRef = this.rigidBodyRefs.get(objectName);
    const physicsObject = this.physicsObjects.find(obj => obj.name === objectName);
    
    if (rigidBodyRef && physicsObject && physicsObject.material.interactions.click.enabled) {
      const clickProps = physicsObject.material.interactions.click;
      
      // Apply base impulse
      const impulse = new THREE.Vector3(...clickProps.impulse);
      
      // Add randomness if specified
      if (clickProps.randomness > 0) {
        impulse.add(new THREE.Vector3(
          (Math.random() - 0.5) * clickProps.randomness * 10,
          (Math.random() - 0.5) * clickProps.randomness * 10,
          (Math.random() - 0.5) * clickProps.randomness * 10
        ));
      }
      
      rigidBodyRef.current?.applyImpulse(impulse, true);
    }
  }

  /**
   * Apply physics interactions each frame
   */
  applyFrameInteractions() {
    const currentTime = Date.now();
    
    this.physicsObjects.forEach(physicsObject => {
      const rigidBodyRef = this.rigidBodyRefs.get(physicsObject.name);
      if (!rigidBodyRef?.current) return;

      const material = physicsObject.material;
      const rigidBody = rigidBodyRef.current;

      // Mouse interactions
      if (material.interactions.mouse.enabled && this.mousePosition.world) {
        const mouseProps = material.interactions.mouse;
        const objectPos = rigidBody.translation();
        const distance = objectPos.distanceTo(this.mousePosition.world);

        if (distance < mouseProps.radius) {
          const direction = this.mousePosition.world.clone().sub(objectPos).normalize();
          let force = direction.multiplyScalar(mouseProps.strength);

          // Apply interaction type
          if (mouseProps.type === 'repel') {
            force.negate();
          } else if (mouseProps.type === 'orbital') {
            // Create orbital motion
            const perpendicular = new THREE.Vector3(-direction.z, direction.y, direction.x);
            force = perpendicular.multiplyScalar(mouseProps.orbitSpeed || 2.0);
          }

          rigidBody.addForce(force, true);
        }
      }

      // Scroll interactions
      if (material.interactions.scroll.enabled && Math.abs(this.scrollForce) > 0.1) {
        const scrollProps = material.interactions.scroll;
        
        if (scrollProps.windEffect) {
          // Wind-like effect
          const windForce = new THREE.Vector3(
            Math.sin(currentTime * 0.001) * this.scrollForce * scrollProps.strength,
            this.scrollForce * scrollProps.strength * 0.5,
            Math.cos(currentTime * 0.001) * this.scrollForce * scrollProps.strength
          );
          rigidBody.addForce(windForce, true);
        } else {
          // Direct upward force
          const scrollForceVec = new THREE.Vector3(0, this.scrollForce * scrollProps.strength, 0);
          rigidBody.addForce(scrollForceVec, true);
        }
      }
    });

    // Decay scroll force
    if (currentTime - this.lastScrollTime > 100) {
      this.scrollForce *= 0.95;
    }
  }
}

/**
 * Utility function to create a physics material configuration
 */
export function createCustomPhysicsMaterial(config) {
  return {
    type: config.type || 'dynamic',
    restitution: config.restitution || 0.5,
    friction: config.friction || 0.5,
    density: config.density || 1.0,
    gravityScale: config.gravityScale || 1.0,
    interactions: {
      mouse: {
        enabled: config.mouse?.enabled || false,
        strength: config.mouse?.strength || 1.0,
        radius: config.mouse?.radius || 3.0,
        type: config.mouse?.type || 'attract',
        orbitSpeed: config.mouse?.orbitSpeed || 2.0
      },
      scroll: {
        enabled: config.scroll?.enabled || false,
        strength: config.scroll?.strength || 1.0,
        windEffect: config.scroll?.windEffect || false
      },
      click: {
        enabled: config.click?.enabled || false,
        impulse: config.click?.impulse || [0, 5, 0],
        randomness: config.click?.randomness || 0.3
      }
    }
  };
}