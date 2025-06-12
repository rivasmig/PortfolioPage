// src/Router.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import GravityFallsResearch from './pages/gravity-falls-research/GravityFallsResearch';
import HypothesisPage from './pages/gravity-falls-research/HypothesisPage';
import BackgroundPage from './pages/gravity-falls-research/BackgroundPage';
import MethodsPage from './pages/gravity-falls-research/MethodsPage';
import DataPage from './pages/gravity-falls-research/DataPage';
import DiscussionPage from './pages/gravity-falls-research/DiscussionPage';

export default function AppRouter() {
  useEffect(() => {
    // Optional: theme setup or other global init
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Gravity Falls Pages */}
      <Route path="/gravity-falls-research" element={<GravityFallsResearch />} />
      <Route path="/gravity-falls-research/hypothesis" element={<HypothesisPage />} />
      <Route path="/gravity-falls-research/background" element={<BackgroundPage />} />
      <Route path="/gravity-falls-research/methods" element={<MethodsPage />} />
      <Route path="/gravity-falls-research/data" element={<DataPage />} />
      <Route path="/gravity-falls-research/discussion" element={<DiscussionPage />} />

      {/* TODO: Add more routes here when new pages are added */}
    </Routes>
  );
}
