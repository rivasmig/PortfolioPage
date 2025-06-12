// src/pages/Gallery.jsx
import React, { useEffect, useState } from 'react';
import { useMDXContent } from '../hooks/useMDXContent';
import { ProjectCard } from '../components/cards/ProjectCard';
import { PUBLIC_TAGS } from '../core/tags/tags';

function Gallery() {
  const { projects, loading, error } = useMDXContent();
  const [selectedTags, setSelectedTags] = useState([]);

  // Set theme on component mount
  useEffect(() => {
    // Assuming you have a setTheme function from your existing theme system
    if (window.setTheme) {
      window.setTheme('gallery'); // or whatever gallery theme you prefer
    }
    // If no theme system yet, just set some CSS custom properties
    document.documentElement.style.setProperty('--primary-color', '#3B82F6');
    document.documentElement.style.setProperty('--secondary-color', '#1E40AF');
    document.documentElement.style.setProperty('--accent-color', '#60A5FA');
  }, []);

  // Filter projects by selected tags
  const filteredProjects = selectedTags.length > 0 
    ? projects.filter(project => 
        selectedTags.some(tag => project.publicTags.includes(tag))
      )
    : projects;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-600 font-medium">Error loading projects:</p>
          <p className="text-red-500 text-sm mt-2">{error.join(', ')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            🚀 Project Gallery
          </h1>
          <p className="text-blue-700 text-lg max-w-2xl mx-auto">
            A collection of creative coding projects, from embedded hardware to web experiences.
          </p>
        </div>

        {/* Tag Filter Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            🏷️ Filter by Technology:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PUBLIC_TAGS).map(([tag, config]) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-blue-100 hover:text-blue-800 shadow-sm'
                }`}
                style={{
                  borderColor: selectedTags.includes(tag) ? config.color : 'transparent',
                  borderWidth: '2px'
                }}
              >
                {config.icon} {config.label}
              </button>
            ))}
          </div>
          
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Project Cards - Simple vertical stack */}
        <div className="space-y-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.slug}
              className="transform transition-all duration-300 hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                publicTags={project.publicTags}
                privateTags={project.privateTags}
                slug={project.slug}
                className="bg-white/80 backdrop-blur-sm border-blue-200"
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              No projects found
            </h3>
            <p className="text-blue-700">
              Try adjusting your filters to see more projects.
            </p>
          </div>
        )}

        {/* Footer stats */}
        <div className="mt-12 text-center">
          <p className="text-blue-600 text-sm">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;