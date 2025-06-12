import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // ✅ Swap BrowserRouter → HashRouter
import AppRouter from './Router.jsx';

// Theme engine and themes
import { themeEngine } from './core/ThemeEngine';
import frutigerAero from './content/themes/frutiger-aero';
import minimal from './content/themes/minimal';
import gravityFalls from './content/themes/gravity-falls';

// Global styles
import './styles/globals.css';

// Register themes
themeEngine.registerTheme('frutiger-aero', frutigerAero);
themeEngine.registerTheme('minimal', minimal);
themeEngine.registerTheme('gravity-falls', gravityFalls);

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </React.StrictMode>
);
