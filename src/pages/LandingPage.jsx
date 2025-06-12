import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center theme-ui-panel">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 theme-ui-text">🚧 Under Construction</h1>
        <p className="text-xl mb-8 theme-ui-text opacity-80">
          The interactive portfolio homepage is coming soon!
        </p>
        <button
          onClick={() => navigate('/gravity-falls-research')}
          className="theme-button px-6 py-3"
        >
          Visit Gravity Falls Project
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
