import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMDXContent } from '../hooks/useMDXContent';
import { ProjectCard } from '../components/cards/ProjectCard';
import { PUBLIC_TAGS } from '../core/tags/tags';
import GLTFCanvas from '../components/layout/GLTFCanvas';

const Gallery = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useMDXContent();
  const [selectedTags, setSelectedTags] = useState([]);

  // Apply gallery theme colors
  useEffect(() => {
    window.setTheme?.('gallery');
    document.documentElement.style.setProperty('--primary-color', '#3B82F6');
    document.documentElement.style.setProperty('--secondary-color', '#1E40AF');
    document.documentElement.style.setProperty('--accent-color', '#60A5FA');
  }, []);

  // Filter by tag
  const filtered = selectedTags.length
    ? projects.filter(p => selectedTags.some(tag => p.publicTags.includes(tag)))
    : projects;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Loading projects…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading projects: {error.join(', ')}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D animated background */}
      <GLTFCanvas
        url="/assets/scenes/littleTest2.gltf"
        animated={true}
        environment="/assets/hdri/autumn_field_puresky_4k.hdr"
        className="absolute inset-0"
      />

      {/* UI Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-sm font-medium text-white hover:underline"
        >
          &larr; Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🚀 Project Gallery</h1>
          <p className="text-white/80">Explore my creative coding work.</p>
        </div>

        {/* Tag Filters */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            🏷️ Filter by Technology:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PUBLIC_TAGS).map(([tag, cfg]) => (
              <button
                key={tag}
                onClick={() => setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                )}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-white/40 text-white shadow-md scale-105'
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
                style={{ border: selectedTags.includes(tag) ? `2px solid ${cfg.color}` : '2px solid transparent' }}
              >
                {cfg.icon} {cfg.label}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-4 py-2 text-sm text-white/80 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Project Cards */}
        <div className="space-y-6">
          {filtered.map((project, idx) => (
            <div key={project.slug} className="animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
              <ProjectCard
                title={project.title}
                description={project.description}
                publicTags={project.publicTags}
                privateTags={project.privateTags}
                slug={project.slug}
                className="bg-white/20 backdrop-blur-sm border border-white/30"
              />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/80">
              <div className="text-6xl mb-4">🔍</div>
              <p>No projects match those filters.</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 text-center">
          <p className="text-white/80 text-sm">
            Showing {filtered.length} / {projects.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
