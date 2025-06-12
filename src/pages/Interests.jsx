// src/pages/Interests.jsx
import React, { useEffect } from 'react';
import { useMDXContent } from '../hooks/useMDXContent';
import { InterestCard } from '../components/cards/InterestCard';

function Interests() {
  const { interests, loading, error } = useMDXContent();

  // Set theme on component mount - different theme from Gallery
  useEffect(() => {
    // Assuming you have a setTheme function from your existing theme system
    if (window.setTheme) {
      window.setTheme('interests'); // or whatever interests theme you prefer
    }
    // If no theme system yet, set different CSS custom properties
    document.documentElement.style.setProperty('--primary-color', '#7C3AED');
    document.documentElement.style.setProperty('--secondary-color', '#5B21B6');
    document.documentElement.style.setProperty('--accent-color', '#A78BFA');
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            🔬 Research & Interests
          </h1>
          <p className="text-purple-700 text-lg max-w-2xl mx-auto">
            Thoughts, research, and explorations into the intersection of technology, creativity, and human experience.
          </p>
        </div>

        {/* Quick stats */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
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

        {/* Interest Cards - Simple vertical stack */}
        <div className="space-y-6">
          {interests.map((interest, index) => (
            <div 
              key={interest.slug}
              className="transform transition-all duration-300 hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <InterestCard
                title={interest.title}
                description={interest.description}
                publicTags={interest.publicTags}
                privateTags={interest.privateTags}
                slug={interest.slug}
                date={interest.date}
                className="bg-white/80 backdrop-blur-sm border-purple-200"
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {interests.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              No articles yet
            </h3>
            <p className="text-purple-700">
              Check back soon for research articles and thoughts on technology.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-purple-600 text-sm">
            {interests.length} articles exploring the boundaries of tech and creativity
          </p>
        </div>
      </div>
    </div>
  );
}

export default Interests;