// src/core/physics/EnhancedPhysicsMaterialParser.js
import { PHYSICS_MATERIALS } from '../../utils/physicsConfig';

/**
 * Enhanced Physics Material Parser
 * Separates static colliders from dynamic physics objects
 */
export class EnhancedPhysicsMaterialParser {
  constructor() {
    this.physicsObjects = [];
    this.colliderObjects = [];
    this.staticObjects = [];
  }

  /**
   * Parse GLTF scene and identify different types of objects
   */
  parseGLTFScene(gltfScene) {
    const physicsObjects = [];
    const colliderObjects = [];
    const staticObjects = [];
    
    gltfScene.traverse((child) => {
      if (child.isMesh) {
        const objectType = this.classifyObject(child);
        
        if (objectType.type === 'physics') {
          physicsObjects.push({
            mesh: child,
            material: objectType.material,
            name: child.name,
            position: child.position.toArray(),
            rotation: child.rotation.toArray(),
            scale: child.scale.toArray(),
            type: 'physics'
          });
        } else if (objectType.type === 'collider') {
          colliderObjects.push({
            mesh: child,
            name: child.name,
            position: child.position.toArray(),
            rotation: child.rotation.toArray(),
            scale: child.scale.toArray(),
            type: 'collider'
          });
        } else if (objectType.type === 'static') {
          staticObjects.push({
            mesh: child,
            name: child.name,
            position: child.position.toArray(),
            rotation: child.rotation.toArray(),
            scale: child.scale.toArray(),
            type: 'static'
          });
        }
      }
    });

    this.physicsObjects = physicsObjects;
    this.colliderObjects = colliderObjects;
    this.staticObjects = staticObjects;
    
    return {
      physics: physicsObjects,
      colliders: colliderObjects,
      static: staticObjects,
      total: physicsObjects.length + colliderObjects.length + staticObjects.length
    };
  }

  /**
   * Classify object based on naming convention
   */
  classifyObject(meshObject) {
    const name = meshObject.name.toLowerCase();
    
    // Method 1: "physics_materialName_objectName" pattern
    if (name.startsWith('physics_')) {
      const parts = name.split('_');
      if (parts.length >= 2) {
        const materialName = parts[1];
        if (PHYSICS_MATERIALS[materialName]) {
          return {
            type: 'physics',
            material: PHYSICS_MATERIALS[materialName]
          };
        }
      }
    }
    
    // Method 2: "collider_objectName" pattern (static collision only)
    if (name.startsWith('collider_') || name.includes('_collider')) {
      return {
        type: 'collider',
        material: null
      };
    }
    
    // Method 3: "static_objectName" pattern (visible static objects)
    if (name.startsWith('static_') || name.includes('_static')) {
      return {
        type: 'static',
        material: null
      };
    }
    
    // Method 4: Direct material name patterns
    for (const materialName of Object.keys(PHYSICS_MATERIALS)) {
      if (name.startsWith(materialName + '_')) {
        return {
          type: 'physics',
          material: PHYSICS_MATERIALS[materialName]
        };
      }
    }

    // Method 5: Check Blender custom properties (if available)
    if (meshObject.userData) {
      if (meshObject.userData.physicsMaterial) {
        const materialName = meshObject.userData.physicsMaterial;
        if (PHYSICS_MATERIALS[materialName]) {
          return {
            type: 'physics',
            material: PHYSICS_MATERIALS[materialName]
          };
        }
      }
      
      if (meshObject.userData.collider === true || meshObject.userData.collider === 'true') {
        return {
          type: 'collider',
          material: null
        };
      }
      
      if (meshObject.userData.static === true || meshObject.userData.static === 'true') {
        return {
          type: 'static',
          material: null
        };
      }
    }

    // Method 6: Common static object names
    if (name.includes('ground') || name.includes('floor') || name.includes('wall') || 
        name.includes('ceiling') || name.includes('platform')) {
      return {
        type: 'collider',
        material: null
      };
    }

    return {
      type: 'none',
      material: null
    };
  }

  /**
   * Get objects by type
   */
  getPhysicsObjects() {
    return this.physicsObjects;
  }

  getColliderObjects() {
    return this.colliderObjects;
  }

  getStaticObjects() {
    return this.staticObjects;
  }

  /**
   * Get object by name
   */
  getObjectByName(name) {
    const allObjects = [...this.physicsObjects, ...this.colliderObjects, ...this.staticObjects];
    return allObjects.find(obj => obj.name === name);
  }
}

/**
 * Naming Convention Examples for Blender
 */
export const BLENDER_NAMING_CONVENTIONS = {
  // Physics objects (full simulation)
  physics: [
    'physics_bouncy_ball',
    'physics_floaty_cloud', 
    'physics_heavy_rock',
    'physics_magnetic_orb'
  ],
  
  // Static colliders (collision only, no simulation)
  colliders: [
    'collider_wall',
    'collider_floor',
    'collider_tree_trunk',
    'wall_collider',
    'invisible_collider'
  ],
  
  // Static objects (visible but no physics)
  static: [
    'static_decoration',
    'static_building',
    'environment_static',
    'backdrop_static'
  ],
  
  // Custom properties approach
  customProperties: {
    physics: 'Add custom property: physicsMaterial = "bouncy"',
    collider: 'Add custom property: collider = true',
    static: 'Add custom property: static = true'
  }
};

/**
 * Usage Examples
 */
export const USAGE_EXAMPLES = `
// Blender Naming Examples:

// PHYSICS OBJECTS (full simulation + interactions)
physics_bouncy_ball     → Bouncy ball with mouse attraction
physics_floaty_cloud    → Light object affected by scroll wind  
physics_heavy_rock      → Heavy object, less responsive

// COLLIDER OBJECTS (collision boundaries only)
collider_wall          → Invisible wall for ball bouncing
collider_tree_trunk    → Tree collision without physics simulation
floor_collider         → Ground collision surface

// STATIC OBJECTS (visible decoration, no physics)
static_palm_tree       → Visible tree, no collision or physics
static_background      → Decorative background elements
environment_static     → Static environment pieces

// USAGE IN CODE:
const parser = new EnhancedPhysicsMaterialParser();
const result = parser.parseGLTFScene(gltfScene);

console.log('Physics objects:', result.physics.length);
console.log('Collider objects:', result.colliders.length); 
console.log('Static objects:', result.static.length);
`;