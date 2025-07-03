// src/components/layout/GLTFCanvas.jsx
import React, { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera, Environment, Html, useProgress } from '@react-three/drei';

/**
 * Loader overlay using Drei's useProgress
 */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-lg font-medium bg-black bg-opacity-50 p-4 rounded-lg">
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

/**
 * GLTFScene
 * - Loads a GLTF/GLB file via useGLTF
 * - Injects meshes, lights, cameras, background, and optional looping animations
 */
function GLTFScene({ url, animated = false }) {
  const gltf = useGLTF(url);
  const { scene } = useThree();
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    const root = gltf.scene;
    scene.add(root);

    // Apply embedded background if present
    if (root.background) {
      scene.background = root.background;
    }

    // Use any exported camera as the default
    if (gltf.cameras && gltf.cameras.length) {
      const cam = gltf.cameras[0];
      scene.add(cam);
      cam.makeDefault && cam.makeDefault();
    }

    // Start looping animations if requested
    if (animated && actions) {
      Object.values(actions).forEach(action => {
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.fadeIn(0.5);
        action.play();
      });
    }

    return () => {
      // Stop animations
      if (actions) {
        Object.values(actions).forEach(action => action.stop());
      }
      // Remove scene graph
      scene.remove(root);
    };
  }, [gltf, scene, actions, animated]);

  return null;
}

/**
 * GLTFCanvas
 * Props:
 *   url: string path to your exported .gltf or .glb file
 *   animated: boolean, whether to auto-play and loop animations
 *   camera: fallback camera settings
 *   environment: preset name or HDRI file path
 *   children: additional 3D elements atop the GLTF scene
 */
export default function GLTFCanvas({
  url,
  animated = false,
  camera = { position: [0, 1, 8], fov: 60, near: 0.1, far: 1000 },
  environment = 'park',        // default Drei preset
  children,
  className = 'w-full h-screen',
  ...props
}) {
  // Detect if environment is an HDRI file or a preset
  const isFile = typeof environment === 'string' && /\.(hdr|exr|png|jpg|jpeg)$/i.test(environment);
  const envProps = isFile
    ? { files: environment, background: true }
    : { preset: environment, background: true };

  return (
    <div className={className}>
      <Canvas
        camera={camera}
        gl={{ antialias: true, alpha: true }}
        {...props}
      >
        {/* Fallback camera if none in GLTF */}
        <PerspectiveCamera makeDefault {...camera} />

        {/* Basic lighting for visibility */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7.5]} intensity={1} castShadow />

        <Suspense fallback={<Loader />}>
          <GLTFScene url={url} animated={animated} />

          {/* Environment map (preset or custom HDRI) */}
          <Environment {...envProps} />
        </Suspense>

        {/* User-provided additional 3D children */}
        {children}
      </Canvas>
    </div>
  );
}
