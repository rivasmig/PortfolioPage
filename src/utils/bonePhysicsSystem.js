// src/utils/bonePhysicsSystem.js
import * as THREE from 'three';

/**
 * Bone Physics Materials
 * Define how bones should behave with physics
 */
export const BONE_PHYSICS_MATERIALS = {
  // Animated bones that affect physics objects but aren't affected by physics
  kinematic: {
    type: 'kinematic',
    trackAnimation: true,
    affectPhysics: true,
    constraintType: null
  },
  
  // Physics-driven bones (ragdoll style)
  ragdoll: {
    type: 'dynamic',
    trackAnimation: false,
    affectPhysics: true,
    constraintType: 'ball-socket',
    limitRotation: true,
    angularDamping: 0.8
  },
  
  // Springy bones that follow animation but add physics wobble
  springy: {
    type: 'dynamic',
    trackAnimation: true,
    affectPhysics: true,
    constraintType: 'spring',
    springStrength: 10.0,
    dampening: 0.5,
    maxDeviation: 30 // degrees
  },
  
  // Chain physics (like hair, rope, cloth)
  chain: {
    type: 'dynamic',
    trackAnimation: false,
    affectPhysics: true,
    constraintType: 'point',
    chainLength: 5,
    segmentMass: 0.1
  }
};

/**
 * Bone Physics Parser
 * Extends the main physics parser to handle bones/armatures
 */
export class BonePhysicsParser {
  constructor() {
    this.boneObjects = [];
    this.armatures = [];
    this.boneConstraints = [];
  }

  /**
   * Parse GLTF scene for bone physics
   * Looks for bones with physics naming conventions
   */
  parseGLTFBones(gltfScene) {
    const boneObjects = [];
    
    gltfScene.traverse((child) => {
      // Check for armatures
      if (child.type === 'SkinnedMesh') {
        this.parseSkinnedMesh(child, boneObjects);
      }
      
      // Check for bone objects (empty objects representing bones)
      if (child.type === 'Object3D' && child.name.includes('bone')) {
        const bonePhysics = this.extractBonePhysicsMaterial(child);
        if (bonePhysics) {
          boneObjects.push({
            bone: child,
            material: bonePhysics,
            name: child.name,
            parent: child.parent
          });
        }
      }
    });

    this.boneObjects = boneObjects;
    return boneObjects;
  }

  /**
   * Parse skinned mesh for bone physics
   */
  parseSkinnedMesh(skinnedMesh, boneObjects) {
    if (!skinnedMesh.skeleton) return;

    skinnedMesh.skeleton.bones.forEach((bone, index) => {
      const bonePhysics = this.extractBonePhysicsMaterial(bone);
      if (bonePhysics) {
        boneObjects.push({
          bone: bone,
          material: bonePhysics,
          name: bone.name,
          skinnedMesh: skinnedMesh,
          boneIndex: index
        });
      }
    });
  }

  /**
   * Extract bone physics material from naming
   */
  extractBonePhysicsMaterial(boneObject) {
    const name = boneObject.name.toLowerCase();
    
    // Method 1: "bone_physics_materialName_boneName"
    if (name.includes('bone_physics_')) {
      const parts = name.split('_');
      const materialIndex = parts.indexOf('physics') + 1;
      if (materialIndex < parts.length) {
        const materialName = parts[materialIndex];
        if (BONE_PHYSICS_MATERIALS[materialName]) {
          return BONE_PHYSICS_MATERIALS[materialName];
        }
      }
    }
    
    // Method 2: Check for specific bone physics keywords
    for (const materialName of Object.keys(BONE_PHYSICS_MATERIALS)) {
      if (name.includes(`bone_${materialName}`) || name.includes(`${materialName}_bone`)) {
        return BONE_PHYSICS_MATERIALS[materialName];
      }
    }

    return null;
  }
}

/**
 * Bone Physics Controller
 * Manages physics simulation for bones
 */
export class BonePhysicsController {
  constructor(boneObjects) {
    this.boneObjects = boneObjects;
    this.boneRigidBodies = new Map();
    this.boneConstraints = new Map();
    this.animationMixers = new Map();
  }

  /**
   * Register bone rigid body
   */
  registerBoneRigidBody(boneName, rigidBodyRef) {
    this.boneRigidBodies.set(boneName, rigidBodyRef);
  }

  /**
   * Update bone physics each frame
   */
  updateBonePhysics(deltaTime) {
    this.boneObjects.forEach(boneObject => {
      const rigidBody = this.boneRigidBodies.get(boneObject.name);
      if (!rigidBody?.current) return;

      const material = boneObject.material;
      
      // Handle different bone physics types
      switch (material.type) {
        case 'kinematic':
          this.updateKinematicBone(boneObject, rigidBody.current);
          break;
          
        case 'dynamic':
          if (material.trackAnimation) {
            this.updateSpringyBone(boneObject, rigidBody.current, deltaTime);
          }
          break;
      }
    });
  }

  /**
   * Update kinematic bone (follows animation, affects physics)
   */
  updateKinematicBone(boneObject, rigidBody) {
    if (boneObject.bone && boneObject.material.trackAnimation) {
      // Copy bone transform to rigid body
      const worldMatrix = new THREE.Matrix4();
      boneObject.bone.getWorldMatrix(worldMatrix);
      
      const position = new THREE.Vector3();
      const rotation = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      worldMatrix.decompose(position, rotation, scale);
      
      rigidBody.setTranslation(position, true);
      rigidBody.setRotation(rotation, true);
    }
  }

  /**
   * Update springy bone (follows animation with physics wobble)
   */
  updateSpringyBone(boneObject, rigidBody, deltaTime) {
    if (!boneObject.bone || !boneObject.material.trackAnimation) return;

    const material = boneObject.material;
    
    // Get target position from animation
    const targetWorldMatrix = new THREE.Matrix4();
    boneObject.bone.getWorldMatrix(targetWorldMatrix);
    
    const targetPosition = new THREE.Vector3();
    const targetRotation = new THREE.Quaternion();
    targetWorldMatrix.decompose(targetPosition, targetRotation, new THREE.Vector3());
    
    // Get current physics position
    const currentPosition = rigidBody.translation();
    const currentRotation = rigidBody.rotation();
    
    // Apply spring force toward target
    const springForce = targetPosition.clone().sub(currentPosition).multiplyScalar(material.springStrength);
    rigidBody.addForce(springForce, true);
    
    // Apply rotational spring (simplified)
    const rotationDiff = targetRotation.clone().multiply(currentRotation.clone().invert());
    const torque = new THREE.Vector3(rotationDiff.x, rotationDiff.y, rotationDiff.z).multiplyScalar(material.springStrength * 0.5);
    rigidBody.addTorque(torque, true);
  }

  /**
   * Create bone chain physics (for hair, cloth, ropes)
   */
  createBoneChain(rootBone, chainLength, segmentMass) {
    const chainBones = [];
    let currentBone = rootBone;
    
    // Collect chain bones
    for (let i = 0; i < chainLength && currentBone; i++) {
      chainBones.push(currentBone);
      currentBone = currentBone.children[0]; // Assume linear chain
    }
    
    // Create physics bodies for each segment
    return chainBones.map((bone, index) => ({
      bone: bone,
      mass: segmentMass,
      constraintToParent: index > 0 ? chainBones[index - 1] : null
    }));
  }
}

/**
 * Bone Physics React Component
 * Renders physics bodies for bones
 */
export function BonePhysicsBody({ boneObject, controller }) {
  const rigidBodyRef = useRef();

  useEffect(() => {
    controller.registerBoneRigidBody(boneObject.name, rigidBodyRef);
  }, [boneObject.name, controller]);

  // Don't render visible geometry for bone physics bodies
  return (
    <RigidBody
      ref={rigidBodyRef}
      type={boneObject.material.type}
      position={boneObject.bone.position.toArray()}
      rotation={boneObject.bone.rotation.toArray()}
      mass={boneObject.material.chainLength ? 0.1 : 1.0}
    >
      {/* Invisible collider for bone physics */}
      <CuboidCollider args={[0.1, 0.1, 0.1]} sensor />
    </RigidBody>
  );
}

/**
 * Example Blender Naming Conventions for Bones
 */
export const BONE_NAMING_EXAMPLES = {
  // Ragdoll bones (physics-driven)
  ragdoll: [
    'bone_physics_ragdoll_head',
    'bone_physics_ragdoll_spine',
    'bone_physics_ragdoll_arm_l',
    'bone_physics_ragdoll_arm_r'
  ],
  
  // Springy bones (animation + physics wobble)
  springy: [
    'bone_physics_springy_hair',
    'bone_physics_springy_tail',
    'bone_physics_springy_antenna'
  ],
  
  // Chain bones (for hair, cloth, ropes)
  chain: [
    'bone_physics_chain_hair_01',
    'bone_physics_chain_hair_02',
    'bone_physics_chain_rope_01'
  ],
  
  // Kinematic bones (drive physics but aren't affected)
  kinematic: [
    'bone_physics_kinematic_hand',
    'bone_physics_kinematic_foot'
  ]
};

/**
 * Utility Functions for Bone Physics
 */
export const BonePhysicsUtils = {
  /**
   * Get all bones in a chain starting from root
   */
  getBoneChain: (rootBone, maxDepth = 10) => {
    const chain = [];
    let current = rootBone;
    let depth = 0;
    
    while (current && depth < maxDepth) {
      chain.push(current);
      current = current.children.find(child => child.type === 'Bone');
      depth++;
    }
    
    return chain;
  },
  
  /**
   * Calculate bone length
   */
  getBoneLength: (bone) => {
    if (bone.children.length > 0) {
      return bone.position.distanceTo(bone.children[0].position);
    }
    return 1.0; // Default length
  },
  
  /**
   * Create bone constraint between two bones
   */
  createBoneConstraint: (parentBone, childBone, constraintType = 'ball-socket') => {
    return {
      parent: parentBone,
      child: childBone,
      type: constraintType,
      anchor: childBone.position.clone()
    };
  }
};