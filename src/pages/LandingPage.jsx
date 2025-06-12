import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Sphere, Box, Plane, ambientLight, pointLight } from '@react-three/drei';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  // Apply neutral theme and colors for landing
  useEffect(() => {
    if (window.setTheme) window.setTheme('default');
    document.documentElement.style.setProperty('--primary-color', '#1F2937');
    document.documentElement.style.setProperty('--secondary-color', '#374151');
    document.documentElement.style.setProperty('--accent-color', '#6366F1');
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-100">
      {/* 3D Background Elements */}
      <Canvas className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Sphere args={[1.5, 32, 32]} position={[-2, 0, -5]}>
          <meshStandardMaterial transparent opacity={0.6} />
        </Sphere>
        <Box args={[1.2, 1.2, 1.2]} position={[2, 1, -4]}>
          <meshStandardMaterial transparent opacity={0.6} />
        </Box>
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -8]}>
          <meshBasicMaterial wireframe opacity={0.1} transparent />
        </Plane>
      </Canvas>

      {/* Foreground Panel */}
      <div className="relative z-10 theme-ui-panel bg-white/30 backdrop-blur-lg rounded-2xl p-6 max-w-sm w-full mx-4 text-center">
        {/* Photo & Identity */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <img
            src="https://i.ibb.co/kgvRbVL7/IMG-6016.jpg"
            alt="Miguel Rivas"
            className="w-24 h-24 rounded-full border-2 border-white"
          />
          <h1 className="text-2xl font-bold text-gray-900">Miguel Rivas</h1>
          <p className="text-sm text-gray-800">rivasmig@oregonstate.edu</p>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/miguel-angel-rivas-a076b1281/"
              target="_blank"
              rel="noreferrer"
              className="theme-button px-4 py-2"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rivasmig"
              target="_blank"
              rel="noreferrer"
              className="theme-button px-4 py-2"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Blurb */}
        <p className="mb-6 text-gray-900 text-sm">
          "An OSU Student with a passion for interactive gamified experiences and novel
          technologies. I like to be informed on the latest AI updates as well as general
          science and video games. I hope to be creating game-based experiences for as long
          as I can!"
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center space-y-4 mb-6">
          <button
            onClick={() => navigate('/gallery')}
            className="theme-button w-full"
          >
            View Gallery
          </button>
          <button
            onClick={() => navigate('/interests')}
            className="theme-button w-full"
          >
            View Interests
          </button>
          <button
            onClick={() => navigate('/gravity-falls-research')}
            className="text-xs text-gray-800 opacity-75"
          >
            Gravity Falls Archive
          </button>
        </div>

        {/* Status & Info */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-800">Under Construction</span>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-sm font-bold text-gray-800"
          >
            ?
          </button>
        </div>
        {showInfo && (
          <div className="mt-2 p-2 bg-white/50 backdrop-blur-md rounded-lg">
            <p className="text-xs text-gray-700">
              Built with React, Three.js, @react-three/fiber, Tailwind CSS, and creative
              curiosity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
