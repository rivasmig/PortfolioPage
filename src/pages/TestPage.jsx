// src/pages/TestPage.jsx (relevant bits)
import React, { useEffect, useMemo } from 'react';
import { themeEngine } from '../core/ThemeEngine';
import funDesktop from '../content/themes/fun-desktop';

import EnhancedGLTFStage from '../components/layout/gltf/EnhancedGLTFStage';
import { EnhancedGLTFScene } from '../components/layout/gltf/EnhancedGLTFScene';

import Window from '../components/desktop/Window';
import Taskbar from '../components/desktop/Taskbar';
import useWindowManager, { windowManager } from '../components/desktop/useWindowManager';
import { useNavigate } from 'react-router-dom';

function MainWindowContent() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center select-none">
      <img
        src="https://i.ibb.co/dRX7fCc/Screenshot-20250810-125618-Gallery-1.jpg"
        alt="Miguel Rivas"
        className="w-28 h-28 rounded-full border-4 border-white/70 shadow-md mb-3"
        draggable="false"
      />
      <h1 className="text-2xl font-extrabold" style={{ color: 'var(--window-title)' }}>Miguel Rivas</h1>
      <p className="text-sm opacity-80 mb-5">rivasmig@oregonstate.edu</p>
      <div className="flex gap-3">
        <button onClick={() => navigate('/gallery')} className="px-4 py-2 rounded-lg font-semibold" style={{ background: 'var(--color-primary)', color: '#000' }}>View Gallery</button>
        <button onClick={() => navigate('/interests')} className="px-4 py-2 rounded-lg font-semibold" style={{ background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--window-border)' }}>View Interests</button>
      </div>
    </div>
  );
}

export default function TestPage() {
  const { selectors } = useWindowManager();
  const base = import.meta.env.BASE_URL || '/';
  const gltfUrl = `${base}assets/scenes/palmtree02.gltf`;
  const hdrUrl = `${base}assets/hdri/industrial_sunset_02_puresky_4k.hdr`;

  // Ensure theme exists even when deep-linking to /#/test
  useEffect(() => {
    if (!themeEngine.getAvailableThemes().includes('fun-desktop')) {
      themeEngine.registerTheme('fun-desktop', funDesktop);
    }
    window.setTheme?.('fun-desktop');
  }, []);

  // Bootstrap windows once
  useEffect(() => {
    if (windowManager.getWindows().length === 0) {
      windowManager.initWindows([
        {
          id: 'main',
          title: 'Main',
          icon: '👤',
          rect: { x: 0.2, y: 0.12, w: 0.6, h: 0.66 },
          state: 'normal',
          content: <MainWindowContent />,
        },
        {
          id: 'about',
          title: 'About This Site',
          icon: 'ℹ️',
          rect: { x: 0.06, y: 0.15, w: 0.32, h: 0.42 },
          state: 'normal',
          content: (
            <div className="h-full w-full p-5">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--window-title)' }}>About</h2>
              <p className="opacity-80 text-sm mt-2">
                React + Three.js desktop UI. Close all windows to freely look around the 3D scene.
              </p>
            </div>
          ),
        },
      ]);
    }
  }, []);

  // Free camera when no visible windows
  const controlsEnabled = useMemo(() => !selectors.hasVisibleWindow(), [selectors]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D background */}
      <EnhancedGLTFStage
        className="absolute inset-0"
        environment={hdrUrl}
        controlsEnabled={controlsEnabled}
      >
        <EnhancedGLTFScene
          url={gltfUrl}
          animated
          enablePhysics={false}     // flip on when your physics code is ready on this scene
          enableColliders={false}   // flip on as needed
        />
      </EnhancedGLTFStage>

      {/* Desktop windows */}
      <div className="desktop-layer">
        {selectors.getWindowsSorted()
          .filter(w => w.state === 'normal' || w.state === 'maximized')
          .map(w => <Window key={w.id} win={w} />)}
      </div>

      <Taskbar />
    </div>
  );
}
