import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router.jsx';
import { themeEngine } from './core/ThemeEngine';
import frutigerAero from './content/themes/frutiger-aero';
import minimal from './content/themes/minimal';
import gravityFalls from './content/themes/gravity-falls';

themeEngine.registerTheme('frutiger-aero', frutigerAero);
themeEngine.registerTheme('minimal', minimal);
themeEngine.registerTheme('gravity-falls', gravityFalls);
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
