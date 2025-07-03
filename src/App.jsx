// src/App.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { themeEngine } from './core/ThemeEngine';
import { useTheme } from './hooks/useTheme.jsx';

import frutigerAeroTheme from './content/themes/frutiger-aero';
import minimalTheme from './content/themes/minimal';
import gravityFallsTheme from './content/themes/gravity-falls';

import './styles/globals.css';

const App = () => {
  const { currentTheme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    themeEngine.registerTheme('frutiger-aero', frutigerAeroTheme);
    themeEngine.registerTheme('minimal', minimalTheme);
    themeEngine.registerTheme('gravity-falls', gravityFallsTheme);
    themeEngine.setTheme('frutiger-aero');
  }, []);

  const handleClick = () => {
    setTheme('gravity-falls');
    setTimeout(() => {
      navigate('/gravity-falls-research');
    }, 200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 theme-ui-panel">
      <div className="max-w-lg w-full text-center space-y-6">
        <h1 className="text-4xl font-bold theme-ui-text">Welcome to My Portfolio</h1>
        <p className="text-lg theme-ui-text opacity-80">
          Click below to explore my Gravity Falls Research project.
        </p>

        <button
          onClick={handleClick}
          className="w-full theme-button py-4 text-xl hover:scale-105 transition-transform"
        >
          🔍 Gravity Falls Research
        </button>

        <div className="text-sm theme-ui-text opacity-60 mt-4">
          Current theme: {currentTheme}
        </div>
      </div>
    </div>
  );
};

export default App;
