import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router.jsx';

// Theme engine and themes
import { themeEngine } from './core/ThemeEngine';
import frutigerAero from './content/themes/frutiger-aero';
import minimal from './content/themes/minimal';
import gravityFalls from './content/themes/gravity-falls';

// Global styles
import './styles/globals.css';

// Register themes before rendering
themeEngine.registerTheme('frutiger-aero', frutigerAero);
themeEngine.registerTheme('minimal', minimal);
themeEngine.registerTheme('gravity-falls', gravityFalls);

// React DOM render with basename for GitHub Pages
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/PortfolioPage">
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
