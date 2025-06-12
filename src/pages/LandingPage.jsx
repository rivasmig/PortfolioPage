import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';

// Rotating wrapper for animation
const Rotating = ({ children, speed = 0.01 }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current && (ref.current.rotation.y += speed);
  });
  return <group ref={ref}>{children}</group>;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  // Apply refined theme colors
  useEffect(() => {
    window.setTheme?.('dark');
    document.documentElement.style.setProperty('--primary-color', '#0f172a');
    document.documentElement.style.setProperty('--secondary-color', '#334155');
    document.documentElement.style.setProperty('--accent-color', '#facc15');
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-800 to-indigo-600">
      {/* 3D Background Elements */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="absolute inset-0">
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />

        <Rotating speed={0.02}>
          <Sphere args={[1.2, 32, 32]} position={[0, 0, -3]}>
            <meshStandardMaterial transparent opacity={0.25} color="var(--accent-color)" />
          </Sphere>
        </Rotating>
        <Rotating speed={-0.015}>
          <Box args={[1.5, 1.5, 1.5]} position={[2, 0, -3]}>
            <meshStandardMaterial transparent opacity={0.2} color="var(--secondary-color)" />
          </Box>
        </Rotating>
        <Rotating speed={0.015}>
          <Box args={[1.5, 1.5, 1.5]} position={[-2, 0, -3]}>
            <meshStandardMaterial transparent opacity={0.2} color="var(--secondary-color)" />
          </Box>
        </Rotating>
      </Canvas>

      {/* Centered Foreground Panel */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="theme-ui-panel bg-white/30 backdrop-blur-xl rounded-3xl p-8 w-80 text-center shadow-lg">
          {/* Photo & Identity */}
          <div className="flex flex-col items-center space-y-2 mb-4">
            <img
              src="https://i.ibb.co/kgvRbVL7/IMG-6016.jpg"
              alt="Miguel Rivas"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <h1 className="text-3xl font-extrabold text-white drop-shadow-md">Miguel Rivas</h1>
            <p className="text-sm text-white opacity-80">rivasmig@oregonstate.edu</p>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <a
              href="https://www.linkedin.com/in/miguel-angel-rivas-a076b1281/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-[#2563EB] text-white font-medium hover:bg-blue-700 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rivasmig"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-[#facc15] text-black font-medium hover:bg-yellow-400 transition"
            >
              GitHub
            </a>
          </div>

          {/* Blurb */}
          <p className="mb-6 text-white text-sm leading-relaxed">
            An OSU Student with a passion for interactive gamified experiences and novel technologies. I like to be informed on the latest AI updates as well as general science and video games. I hope to be creating game-based experiences for as long as I can!
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col items-center space-y-3 mb-6">
            <button
              onClick={() => navigate('/gallery')}
              className="w-full px-4 py-2 rounded-lg bg-[#334155] text-white font-semibold hover:opacity-90 transition"
            >
              View Gallery
            </button>
            <button
              onClick={() => navigate('/interests')}
              className="w-full px-4 py-2 rounded-lg bg-[#2563EB] text-white font-semibold hover:opacity-90 transition"
            >
              View Interests
            </button>
            <button
              onClick={() => navigate('/gravity-falls-research')}
              className="text-xs text-white opacity-70 hover:underline"
            >
              Gravity Falls Archive
            </button>
          </div>

          {/* Status & Info */}
          <div className="flex items-center justify-center space-x-1">
            <span className="text-xs text-white opacity-80">Under Construction</span>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-xs font-bold text-white opacity-80"
            >
              ?
            </button>
          </div>
          {showInfo && (
            <div className="mt-2 p-3 bg-white/20 backdrop-blur-md rounded-lg">
              <p className="text-xs text-white opacity-70">
                Built with React, Three.js, @react-three/fiber, Tailwind CSS
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;