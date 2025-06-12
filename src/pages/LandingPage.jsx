import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  // Set a neutral theme for the landing page
  useEffect(() => {
    if (window.setTheme) {
      window.setTheme('default'); // or whatever your default theme is
    }
    // Fallback theme colors for landing
    document.documentElement.style.setProperty('--primary-color', '#1F2937');
    document.documentElement.style.setProperty('--secondary-color', '#374151');
    document.documentElement.style.setProperty('--accent-color', '#6366F1');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center theme-ui-panel bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="text-center max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-6 theme-ui-text bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Creative Developer Portfolio
          </h1>
          <p className="text-2xl mb-4 theme-ui-text opacity-80 text-gray-700">
            Interactive experiences at the intersection of code, creativity, and curiosity
          </p>
          <p className="text-lg theme-ui-text opacity-60 text-gray-600">
            Building games, tools, research, and experimental digital experiences
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Gallery Button */}
          <div 
            onClick={() => navigate('/gallery')}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="theme-ui-panel bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-blue-200 hover:border-blue-400 transition-all">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-3 theme-ui-text text-blue-900">
                Project Gallery
              </h3>
              <p className="theme-ui-text opacity-75 text-gray-700 text-sm">
                Interactive showcase of coding projects, from embedded hardware to web experiences
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Interactive Portfolio
                </span>
              </div>
            </div>
          </div>

          {/* Interests Button */}
          <div 
            onClick={() => navigate('/interests')}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="theme-ui-panel bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-purple-200 hover:border-purple-400 transition-all">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                🔬
              </div>
              <h3 className="text-xl font-bold mb-3 theme-ui-text text-purple-900">
                Research & Interests
              </h3>
              <p className="theme-ui-text opacity-75 text-gray-700 text-sm">
                Thoughts and explorations into AI, creativity, embedded systems, and digital art
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Articles & Research
                </span>
              </div>
            </div>
          </div>

          {/* Gravity Falls Button */}
          <div 
            onClick={() => navigate('/gravity-falls-research')}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="theme-ui-panel bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl border border-green-200 hover:border-green-400 transition-all">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                🌲
              </div>
              <h3 className="text-xl font-bold mb-3 theme-ui-text text-green-900">
                Gravity Falls Research
              </h3>
              <p className="theme-ui-text opacity-75 text-gray-700 text-sm">
                Academic analysis of cryptographic elements and narrative structure in Gravity Falls
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Research Project
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 inline-block">
          <div className="flex items-center">
            <div className="text-amber-600 text-lg mr-3">⚡</div>
            <div className="text-left">
              <p className="text-amber-800 font-medium text-sm">
                Portfolio v0.0.3 - MDX Integration in Progress
              </p>
              <p className="text-amber-700 text-xs mt-1">
                Building a modular, tag-driven content system for seamless project showcase
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Built with React, Three.js, and creative curiosity
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;