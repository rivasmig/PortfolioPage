// src/components/cards/BaseCard.jsx
// Universal card component that all other cards extend

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_TAGS } from '../../core/tags/tags.js';

export const BaseCard = ({
  title,
  description,
  publicTags = [],
  privateTags = {},
  slug,
  type,
  className = '',
  children,
  onClick,
  style = {},
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (slug) {
      navigate(`/${type}/${slug}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  // Generate tag elements
  const tagElements = publicTags.map(tag => {
    const tagConfig = PUBLIC_TAGS[tag];
    if (!tagConfig) return null;

    return (
      <span
        key={tag}
        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
        style={{
          backgroundColor: tagConfig.color + '20',
          color: tagConfig.color,
          border: `1px solid ${tagConfig.color}40`
        }}
      >
        {tagConfig.icon && <span className="mr-1">{tagConfig.icon}</span>}
        {tagConfig.label}
      </span>
    );
  }).filter(Boolean);

  // Base card styles
  const baseStyles = {
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ...style
  };

  // Status-based styling
  const statusStyles = {
    'completed': { opacity: 1 },
    'in-progress': { 
      opacity: 0.95,
      animation: 'pulse 2s infinite'
    },
    'prototype': { 
      opacity: 0.9,
      animation: 'flicker 3s infinite'
    },
    'archived': { opacity: 0.7 }
  };

  const status = privateTags.status || 'completed';
  const finalStyles = {
    ...baseStyles,
    ...statusStyles[status]
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200
        p-6 transition-all duration-300 hover:scale-105 cursor-pointer
        ${privateTags.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
        ${className}
      `}
      style={finalStyles}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View ${title}`}
      {...props}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>
        {privateTags.featured && (
          <span className="text-yellow-500 text-xl" title="Featured">⭐</span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      {tagElements.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tagElements}
        </div>
      )}

      {/* Status and metadata */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          {privateTags.year && (
            <span>{privateTags.year}</span>
          )}
          {privateTags.collaborators > 0 && (
            <span className="flex items-center">
              👥 {privateTags.collaborators}
            </span>
          )}
          {privateTags.difficulty && (
            <span className="flex items-center">
              🔥 {privateTags.difficulty}/5
            </span>
          )}
        </div>
        <div className="capitalize">
          {status.replace('-', ' ')}
        </div>
      </div>

      {/* Custom children content */}
      {children}
    </div>
  );
};

// src/components/cards/ProjectCard.jsx
// Specialized card for project content

export const ProjectCard = ({
  title,
  description,
  publicTags,
  privateTags,
  slug,
  ...props
}) => {
  return (
    <BaseCard
      title={title}
      description={description}
      publicTags={publicTags}
      privateTags={privateTags}
      slug={slug}
      type="project"
      className="project-card"
      {...props}
    >
      {/* Project-specific content */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          {/* Links */}
          <div className="flex space-x-3">
            {privateTags.repo && (
              <a
                href={privateTags.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                📂 Code
              </a>
            )}
            {privateTags.demo && (
              <a
                href={privateTags.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                🚀 Demo
              </a>
            )}
          </div>

          {/* Role badge */}
          {privateTags.role && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {privateTags.role}
            </span>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

// src/components/cards/InterestCard.jsx
// Specialized card for blog/interest content

export const InterestCard = ({
  title,
  description,
  publicTags,
  privateTags,
  slug,
  date,
  ...props
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <BaseCard
      title={title}
      description={description}
      publicTags={publicTags}
      privateTags={privateTags}
      slug={slug}
      type="interest"
      className="interest-card"
      {...props}
    >
      {/* Interest-specific content */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {date && formatDate(date)}
          </div>
          
          {/* Research paper link */}
          {privateTags.paper && (
            <a
              href={privateTags.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              📄 Paper
            </a>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

// src/components/cards/CardGrid.jsx
// Layout component for displaying cards in a responsive grid

export const CardGrid = ({ 
  children, 
  className = '',
  spacing = 'gap-6',
  minWidth = '300px'
}) => {
  return (
    <div 
      className={`
        grid auto-fit-grid ${spacing} ${className}
      `}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
      }}
    >
      {children}
    </div>
  );
};
