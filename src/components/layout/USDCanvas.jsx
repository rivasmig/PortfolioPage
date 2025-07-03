// src/components/layout/USDCanvas.jsx
import React, { Suspense, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * USDScene
 * - Loads a .usdz/.usdc file via USDZLoader
 * - Injects meshes, lights, cameras, and background into the scene
 */
const USDScene = ({ url }) => {
  const asset = useLoader(USDZLoader, url);
  const { scene } = useThree();

  useEffect(() => {
    // Add the USD root (scene graph of meshes, lights, etc.)
    const root = asset.scene || asset;
    scene.add(root);

    // Apply background/environment if baked into USD
    if (root.background) {
      scene.background = root.background;
    }
    if (root.environment) {
      scene.environment = root.environment;
    }

    // Use any embedded USD camera as default
    if (asset.cameras && asset.cameras.length) {
      const usdCam = asset.cameras[0];
      scene.add(usdCam);
      usdCam.makeDefault && usdCam.makeDefault();
    }

    // Cleanup on unmount
    return () => {
      scene.remove(root);
      if (asset.cameras) asset.cameras.forEach(cam => scene.remove(cam));
    };
  }, [asset, scene]);

  return null;
};

/**
 * USDCanvas
 * - url: path to .usdz or .usdc file in public/
 * - camera: fallback camera settings
 * - className: CSS class for container
 * - children: additional 3D elements to render on top of the USD scene
 */
const USDCanvas = ({
  url,
  children,
  camera = { position: [0, 0, 5], fov: 50, near: 0.1, far: 1000 },
  className = 'w-full h-screen',
  ...props
}) => (
  <div className={className}>
    <Canvas camera={camera} {...props}>
      {/* Fallback camera if USD has none */}
      <PerspectiveCamera makeDefault {...camera} />

      <Suspense fallback={null}>
        <USDScene url={url} />
      </Suspense>

      {/* Additional 3D children (e.g., cards, overlays) */}
      {children}
    </Canvas>
  </div>
);

export default USDCanvas;

/** USAGE **/
// Place palmtree.usdc in public/assets/scenes/
// <USDCanvas url="/assets/scenes/palmtree.usdc">
//   <Your3DComponent position={[...]} />
// </USDCanvas>
