// src/pages/Interests.jsx
import React, { useEffect, useState } from 'react';
import { useMDXContent } from '../hooks/useMDXContent';
import { InterestCard } from '../components/cards/InterestCard';
import EnhancedGLTFCanvas from '../components/layout/EnhancedGLTFCanvas';
import SimplePhysicsBalls from '../components/three-d/interactive/SimplePhysicsBalls';
import InvisibleColliders from '../components/three-d/physics/InvisibleColliders';
import { log } from '../utils/simpleLogging';

function Interests() {
  const { interests, loading, error } = useMDXContent();
  const [showPhysicsDemo, setShowPhysicsDemo] = useState(true);

  // Set theme on component mount - different theme from Gallery
  useEffect(() => {
    log.debug('Interests page initializing', { 
      interestCount: interests.length,
      showPhysicsDemo 
    });

    // Assuming you have a setTheme function from your existing theme system
    if (window.setTheme) {
      window.setTheme('interests'); // or whatever interests theme you prefer
    }
    // If no theme system yet, set different CSS custom properties
    document.documentElement.style.setProperty('--primary-color', '#7C3AED');
    document.documentElement.style.setProperty('--secondary-color', '#5B21B6');
    document.documentElement.style.setProperty('--accent-color', '#A78BFA');
  }, [interests.length, showPhysicsDemo]);

  // Compute asset URLs
  const base = import.meta.env.BASE_URL;
  const envUrl = `${base}assets/scenes/palmtree.gltf`;
  const hdrUrl = `${base}assets/hdri/industrial_sunset_02_puresky_4k.hdr`;

  // Handle physics objects detection from GLTF scene
  const handlePhysicsObjectsParsed = (parsedObjects, controller) => {
    log.physics('GLTF physics objects parsed in Interests page', {
      physics: parsedObjects.physics.length,
      colliders: parsedObjects.colliders.length,
      static: parsedObjects.static.length,
      hasController: !!controller
    });
    
    // Log individual objects for debugging
    parsedObjects.physics.forEach(obj => {
      log.debug(`GLTF Physics object: ${obj.name}`, { 
        material: obj.material?.type,
        position: obj.position 
      });
    });
    
    parsedObjects.colliders.forEach(obj => {
      log.debug(`GLTF Collider object: ${obj.name}`, { 
        position: obj.position 
      });
    });
  };

  // Handle canvas readiness
  const handleCanvasReady = (state) => {
    log.canvas('Interests page canvas ready', {
      renderer: state.gl.constructor.name,
      canvasSize: [state.size.width, state.size.height]
    });
  };

  // Handle physics world readiness
  const handlePhysicsReady = () => {
    log.physics('Interests page physics world ready');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-800 font-medium">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-600 font-medium">Error loading content:</p>
          <p className="text-red-500 text-sm mt-2">{error.join(', ')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 3D Physics Demo Background - Always visible */}
      <div className="fixed inset-0 z-0">
        <EnhancedGLTFCanvas
          // Core GLTF properties
          url={envUrl}
          animated={true}
          
          // Physics system configuration
          enablePhysics={true}
          enableColliders={true}
          physicsGround={true}
          physicsDebug={false}
          
          // Environment and rendering
          camera={{ position: [0, 5, 10], fov: 60 }}
          environment={hdrUrl}
          performanceMode="auto"
          
          // Loading customization
          loaderTheme="purple"
          loaderDetails={false}
          customLoadingMessage="Loading interactive environment..."
          
          // Event handlers
          onObjectsParsed={handlePhysicsObjectsParsed}
          onCanvasReady={handleCanvasReady}
          onPhysicsReady={handlePhysicsReady}
          onError={(error) => log.error('Canvas error in Interests page', error)}
          
          className="w-full h-full"
        >
          {/* Interactive physics spheres */}
          <SimplePhysicsBalls 
            count={6}
            ballSize={0.6}
            spawnRadius={4}
            spawnHeight={6}
            colors={['#7C3AED', '#5B21B6', '#A78BFA', '#DDD6FE', '#EDE9FE', '#F3F4F6']}
            enableGlobalEffects={true}
            respawnFallenBalls={true}
            onBallHit={(ballIndex) => log.interaction(`Ball ${ballIndex} hit in Interests page`)}
          />
          
          {/* Invisible collision boundaries for better ball interactions */}
          <InvisibleColliders />
        </EnhancedGLTFCanvas>
      </div>

      {/* Content Overlay - Always on top */}
      <div className="relative z-10">
        {/* Physics Demo Controls (only show when demo UI is visible) */}
        {showPhysicsDemo && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-2">Interactive Physics</h3>
              <p className="text-sm text-purple-700 mb-3">
                🖱️ Move mouse to attract spheres<br/>
                🖱️ Click spheres to apply forces<br/>
                📜 Scroll to create wind effects
              </p>
              <button
                onClick={() => {
                  setShowPhysicsDemo(false);
                  log.interaction('Physics demo UI hidden');
                }}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition"
              >
                Hide UI
              </button>
            </div>
          </div>
        )}

        {/* Main Content Section */}
        <div className={`min-h-screen ${showPhysicsDemo ? 'pt-20' : 'pt-8'}`}>
          {/* Show/Hide Physics Demo Button */}
          {!showPhysicsDemo && (
            <div className="text-center mb-8">
              <button
                onClick={() => {
                  setShowPhysicsDemo(true);
                  log.interaction('Physics demo UI shown');
                }}
                className="px-4 py-2 bg-purple-600/80 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-purple-700/80 transition border border-purple-300"
              >
                ↑ Show Physics UI ↑
              </button>
            </div>
          )}

          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-200">
                <h1 className="text-4xl font-bold text-purple-900 mb-4">
                  🔬 Research & Interests
                </h1>
                <p className="text-purple-700 text-lg max-w-2xl mx-auto">
                  Thoughts, research, and explorations into the intersection of technology, creativity, and human experience.
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white/85 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-purple-200">
              <div className="flex justify-center items-center space-x-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-900">{interests.length}</div>
                  <div className="text-sm text-purple-700">Articles</div>
                </div>
                <div className="w-px h-8 bg-purple-300"></div>
                <div>
                  <div className="text-2xl font-bold text-purple-900">
                    {new Set(interests.flatMap(i => i.publicTags)).size}
                  </div>
                  <div className="text-sm text-purple-700">Topics</div>
                </div>
                <div className="w-px h-8 bg-purple-300"></div>
                <div>
                  <div className="text-2xl font-bold text-purple-900">
                    {interests.length > 0 ? new Date().getFullYear() - Math.min(...interests.map(i => i.year)) + 1 : 0}
                  </div>
                  <div className="text-sm text-purple-700">Years</div>
                </div>
              </div>
            </div>

            {/* Interest Cards - Enhanced with backdrop blur */}
            <div className="space-y-6">
              {interests.map((interest, index) => (
                <div 
                  key={interest.slug}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200/50 hover:shadow-xl transition-shadow">
                    <InterestCard
                      title={interest.title}
                      description={interest.description}
                      publicTags={interest.publicTags}
                      privateTags={interest.privateTags}
                      slug={interest.slug}
                      date={interest.date}
                      className="bg-transparent border-0"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {interests.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-purple-200">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">
                    No articles yet
                  </h3>
                  <p className="text-purple-700">
                    Check back soon for research articles and thoughts on technology.
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-12 text-center">
              <div className="bg-white/75 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-purple-200">
                <p className="text-purple-600 text-sm">
                  {interests.length} articles exploring the boundaries of tech and creativity
                </p>
                <p className="text-purple-500 text-xs mt-1">
                  Interactive 3D environment powered by physics simulation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development info overlay */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-30">
          <div className="bg-black/80 text-white text-xs p-2 rounded border">
            <div>Enhanced GLTF Canvas: Active</div>
            <div>Physics Objects: {interests.length > 0 ? 'Loaded' : 'Loading'}</div>
            <div>Environment: Sunset HDR</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Interests;