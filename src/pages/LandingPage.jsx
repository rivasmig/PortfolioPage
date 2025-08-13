// src/pages/LandingPage.jsx
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { themeEngine } from '../core/ThemeEngine';
import funDesktop from '../content/themes/fun-desktop';

import EnhancedGLTFStage from '../components/layout/gltf/EnhancedGLTFStage';
import { EnhancedGLTFScene } from '../components/layout/gltf/EnhancedGLTFScene';

import Window, { useWindowContentSize } from '../components/desktop/Window';
import Taskbar from '../components/desktop/Taskbar';
import useWindowManager, { windowManager } from '../components/desktop/useWindowManager';

import { ProjectCard } from '../components/cards/ProjectCard';
import { useMDXContent } from '../hooks/useMDXContent';

/* ---------------------------
   Content: Main (responsive)
---------------------------- */
function MainWindowContent() {
  const navigate = useNavigate();
  const { isNarrow } = useWindowContentSize(); // from Window.jsx context

  return (
    <div
      className="h-full w-full p-6"
      style={{
        display: 'grid',
        gridTemplateColumns: isNarrow ? '1fr' : 'auto 1fr',
        gap: isNarrow ? '14px' : '22px',
        alignItems: 'center',
      }}
    >
      {/* Left: avatar */}
      <div className="flex justify-center">
        <img
          src="https://i.ibb.co/dRX7fCc/Screenshot-20250810-125618-Gallery-1.jpg"
          alt="Miguel Rivas"
          className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/70 shadow-md"
          draggable="false"
        />
      </div>

      {/* Right: text & actions */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--window-title)' }}>
          Miguel Rivas
        </h1>
        <p className="text-sm opacity-80 mb-4">rivasmig@oregonstate.edu</p>

        <div className="flex gap-3 flex-wrap justify-center md:justify-start">
          <button
            onClick={() => navigate('/gallery')}
            className="px-4 py-2 rounded-lg font-semibold"
            style={{ background: 'var(--color-primary)', color: '#000' }}
          >
            View Gallery
          </button>
          <button
            onClick={() => navigate('/interests')}
            className="px-4 py-2 rounded-lg font-semibold"
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--window-border)',
            }}
          >
            View Interests
          </button>
        </div>

        <button
          onClick={() => navigate('/gravity-falls-research')}
          className="mt-3 text-xs opacity-70 hover:underline"
          style={{ color: 'var(--window-title)' }}
        >
          Gravity Falls Archive
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------
   Content: Highlight Project (MDX card)
-------------------------------------- */
function HighlightWindowContent() {
  const { projects } = useMDXContent();
  const project = useMemo(() => projects?.find((p) => p.slug === 'before-after'), [projects]);

  return (
    <div className="h-full w-full p-4 flex items-center justify-center">
      {project ? (
        <div className="max-w-xl w-full">
          <ProjectCard
            title={project.title}
            description={project.description}
            publicTags={project.publicTags}
            privateTags={project.privateTags}
            slug={project.slug}
            className="bg-white/30 backdrop-blur-md border border-white/50"
          />
        </div>
      ) : (
        <div className="p-6 text-center opacity-80">
          <div className="text-3xl mb-2">🤔</div>
          <p>
            Highlight project not found. Make sure the slug is <code>before-after</code>.
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------------------
   Landing Page
---------------------------- */
export default function LandingPage() {
  const { selectors } = useWindowManager();

  // Ensure theme exists even when deep-linking here first
  useEffect(() => {
    if (!themeEngine.getAvailableThemes().includes('fun-desktop')) {
      themeEngine.registerTheme('fun-desktop', funDesktop);
    }
    themeEngine.setTheme('fun-desktop');
  }, []);

  // Bootstrap windows once
  useEffect(() => {
    if (windowManager.getWindows().length === 0) {
      windowManager.initWindows([
        {
          id: 'main',
          title: 'Miguel Rivas', // this shows in the taskbar/minimized state
          icon: '👤',
          // Center-ish top window
          rect: { x: 0.19, y: 0.02, w: 0.62, h: 0.4 },
          state: 'normal',
          content: <MainWindowContent />,
        },
        {
          id: 'highlight',
          title: 'Highlight Project',
          icon: '⭐',
          // Slight offset below for flavor (kept friendly for mobile)
          rect: { x: 0.22, y: 0.45, w: 0.56, h: 0.4 },
          state: 'normal',
          content: <HighlightWindowContent />,
        },
      ]);
    }
  }, []);

  // Free orbit controls when no visible windows
  const controlsEnabled = useMemo(() => !selectors.hasVisibleWindow(), [selectors]);

  // Assets for background
  const base = import.meta.env.BASE_URL || '/';
  const gltfUrl = `${base}assets/scenes/palmtree02.gltf`;
  const hdrUrl = `${base}assets/hdri/industrial_sunset_02_puresky_4k.hdr`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D background stage */}
      <EnhancedGLTFStage className="absolute inset-0" environment={hdrUrl} controlsEnabled={controlsEnabled}>
        <EnhancedGLTFScene url={gltfUrl} animated enablePhysics={false} enableColliders={false} />
      </EnhancedGLTFStage>

      {/* Desktop windows */}
      <div className="desktop-layer">
        {selectors
          .getWindowsSorted()
          .filter((w) => w.state === 'normal' || w.state === 'maximized')
          .map((w) => (
            <Window key={w.id} win={w} />
          ))}
      </div>

      {/* Taskbar at bottom */}
      <Taskbar />
    </div>
  );
}
