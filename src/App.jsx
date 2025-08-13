// src/App.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { themeEngine } from './core/ThemeEngine';
import { useTheme } from './hooks/useTheme.jsx';

import frutigerAeroTheme from './content/themes/frutiger-aero';
import minimalTheme from './content/themes/minimal';
import gravityFallsTheme from './content/themes/gravity-falls';
import darkDesktop from './content/themes/dark-desktop';
import funDesktop from './content/themes/fun-desktop';

import './styles/globals.css';

const App = () => {
  const { currentTheme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Register all themes (order doesn't matter)
    themeEngine.registerTheme('frutiger-aero', frutigerAeroTheme);
    themeEngine.registerTheme('minimal', minimalTheme);
    themeEngine.registerTheme('gravity-falls', gravityFallsTheme);
    themeEngine.registerTheme('dark-desktop', darkDesktop);
    themeEngine.registerTheme('fun-desktop', funDesktop);

    // Prefer persisted theme; otherwise default to dark-desktop
    const saved = window.getTheme?.();
    themeEngine.setTheme(saved || 'fun-desktop');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 theme-ui-panel">
      <div className="max-w-lg w-full text-center space-y-6">
        <h1 className="text-4xl font-bold theme-ui-text">Welcome to My Portfolio</h1>
        <p className="text-lg theme-ui-text opacity-80">
          Choose a theme and jump into the 3D landing experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setTheme('dark-desktop')}
            className="theme-button py-3 hover:scale-105 transition-transform"
          >
            🌙 Dark Desktop
          </button>
          <button
            onClick={() => setTheme('frutiger-aero')}
            className="theme-button py-3 hover:scale-105 transition-transform"
          >
            💎 Frutiger Aero
          </button>
          <button
            onClick={() => setTheme('minimal')}
            className="theme-button py-3 hover:scale-105 transition-transform"
          >
            🧼 Minimal
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full theme-button py-4 text-lg hover:scale-105 transition-transform"
          >
            🚀 Open Landing Page
          </button>
          <button
            onClick={() => navigate('/gallery')}
            className="w-full theme-button py-4 text-lg hover:scale-105 transition-transform"
          >
            🖼️ View Gallery
          </button>
        </div>

        <div className="text-sm theme-ui-text opacity-60 mt-4">
          Current theme: {currentTheme}
        </div>
      </div>
    </div>
  );
};

export default App;
