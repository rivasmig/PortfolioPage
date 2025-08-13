// src/components/layout/gltf/EnhancedGLTFStage.jsx
import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Read theme CSS vars safely
function useTheme3D() {
  return useMemo(() => {
    const cs = getComputedStyle(document.documentElement);
    // lighting
    const envIntensity = parseFloat(cs.getPropertyValue('--lighting-env') || '1');
    const exposure = parseFloat(cs.getPropertyValue('--lighting-exposure') || '1');
    // tone mapping
    const tm = (cs.getPropertyValue('--lighting-tonemapping') || 'ACESFilmic').trim();
    const toneMapping = tm === 'ACESFilmic' ? THREE.ACESFilmicToneMapping : THREE.NoToneMapping;
    return { envIntensity, exposure, toneMapping };
  }, []);
}

/**
 * Props:
 *  - environment?: HDR path
 *  - controlsEnabled?: boolean (default true)
 *  - children: your scene nodes (e.g., <EnhancedGLTFScene .../>)
 */
export default function EnhancedGLTFStage({
  environment,
  controlsEnabled = true,
  className,
  children,
}) {
  const { envIntensity, exposure, toneMapping } = useTheme3D();

  return (
    <div className={className}>
      <Canvas
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = toneMapping;
          gl.toneMappingExposure = exposure;
        }}
      >
        <Suspense fallback={null}>
          {environment && <Environment files={environment} background={false} intensity={envIntensity} />}
          {/* Lights are optional; HDR handles a lot already */}
          {/* <ambientLight intensity={parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--lighting-ambient')||'0.5')} /> */}
          {children}
        </Suspense>

        <OrbitControls enabled={controlsEnabled} />
      </Canvas>
    </div>
  );
}
