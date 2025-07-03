import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { useTheme } from '../../hooks/useTheme.jsx';
import * as THREE from 'three';

// Theme-based lighting setup with hemisphere, ambient, and directional lights
const ThemeLighting = () => {
  const { getThemeProperty } = useTheme();
  const ambientColor = getThemeProperty('lighting.ambientColor', '#ffffff');
  const ambientIntensity = parseFloat(getThemeProperty('lighting.ambientIntensity', '0.4'));

  const hemiSkyColor = getThemeProperty('lighting.hemiSkyColor', '#ffffff');
  const hemiGroundColor = getThemeProperty('lighting.hemiGroundColor', '#444444');
  const hemiIntensity = parseFloat(getThemeProperty('lighting.hemiIntensity', '0.3'));

  const dirColor = getThemeProperty('lighting.directionalColor', '#ffffff');
  const dirIntensity = parseFloat(getThemeProperty('lighting.directionalIntensity', '0.6'));
  const dirPosition = getThemeProperty('lighting.directionalPosition', [10, 10, 5]);

  return (
    <>
      <hemisphereLight
        skyColor={hemiSkyColor}
        groundColor={hemiGroundColor}
        intensity={hemiIntensity}
      />
      <ambientLight
        color={ambientColor}
        intensity={ambientIntensity}
      />
      <directionalLight
        color={dirColor}
        intensity={dirIntensity}
        position={dirPosition}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  );
};

// Background and fog controlled by theme or CSS variables
const SceneBackground = ({ useCssVars = false }) => {
  const { scene } = useThree();
  const { getThemeProperty } = useTheme();

  useEffect(() => {
    // First try theme property, then CSS var, then default
    let bgColor = getThemeProperty('scene.backgroundColor', null);
    if (!bgColor && useCssVars) {
      const cssBg = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
      bgColor = cssBg || null;
    }
    if (bgColor) scene.background = new THREE.Color(bgColor.trim());

    // Fog
    let fogColor = getThemeProperty('scene.fogColor', null);
    if (!fogColor && useCssVars) {
      const cssFog = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
      fogColor = cssFog || null;
    }
    const fogDensity = parseFloat(getThemeProperty('scene.fogDensity', '0'));
    if (fogColor && fogDensity > 0) {
      scene.fog = new THREE.FogExp2(new THREE.Color(fogColor.trim()), fogDensity);
    } else {
      scene.fog = null;
    }
  }, [scene, getThemeProperty, useCssVars]);

  return null;
};

// Hook to detect mobile for performance tweaks
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(
      window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

/**
 * ThreeCanvas – foundational 3D scene wrapper
 * Props:
 *   disableSceneBackground: skips any background clear to let CSS show
 *   useCssBackground: reads CSS vars for background/fog if theme props absent
 */
const ThreeCanvas = ({
  children,
  camera = { position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 },
  controls = true,
  environment = 'sunset',
  shadows = true,
  skybox = false,
  disableSceneBackground = false,
  useCssBackground = false,
  className = 'w-full h-screen',
  ...props
}) => {
  const isMobile = useIsMobile();
  const { getThemeProperty } = useTheme();

  // Determine environment preset
  const envPreset = getThemeProperty('lighting.environmentPreset', environment);

  // Settings for mobile vs desktop
  const mobileSettings = { dpr: [1, 1.5], shadows: false, antialias: false };
  const desktopSettings = { dpr: [1, 2], shadows, antialias: true };
  const settings = isMobile ? mobileSettings : desktopSettings;

  return (
    <div className={className}>
      <Canvas
        shadows={settings.shadows}
        dpr={settings.dpr}
        gl={{
          antialias: settings.antialias,
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          //physicallyCorrectLights: true,
          outputColorSpace: THREE.sRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
          ...(isMobile && { precision: 'lowp', stencil: false, depth: false }),
        }}
        {...props}
      >
        {/* Scene background, skip if CSS gradient behind */}
        {!disableSceneBackground && (
          <SceneBackground useCssVars={useCssBackground} />
        )}

        {/* Skybox/environment */}
        {skybox ? (
          <Environment preset={envPreset} background />
        ) : (
          <Environment preset={envPreset} />
        )}

        {/* Main camera with adjustable clipping */}
        <PerspectiveCamera
          makeDefault
          position={camera.position}
          fov={camera.fov}
          near={camera.near}
          far={camera.far}
        />

        {/* Lighting */}
        <ThemeLighting />

        {/* Controls */}
        {controls && (
          <OrbitControls
            enablePan={!isMobile}
            enableZoom
            enableRotate
            minDistance={isMobile ? 3 : 2}
            maxDistance={isMobile ? 15 : 20}
            touches={{ ONE: 'rotate', TWO: 'dolly' }}
            rotateSpeed={isMobile ? 0.5 : 1}
            zoomSpeed={isMobile ? 0.8 : 1}
            enableDamping
            dampingFactor={isMobile ? 0.1 : 0.05}
          />
        )}

        {/* 3D content */}
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
