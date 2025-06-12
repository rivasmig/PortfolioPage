// src/components/cards/ProjectCard.jsx
// Specialized card for project content

import React from 'react';
import { BaseCard } from './BaseCard';

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
      className="project-card border-l-4 border-l-blue-500"
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
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="mr-1">📂</span>
                Code
              </a>
            )}
            {privateTags.demo && (
              <a
                href={privateTags.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 text-sm flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="mr-1">🚀</span>
                Demo
              </a>
            )}
          </div>

          {/* Role badge */}
          {privateTags.role && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
              {privateTags.role}
            </span>
          )}
        </div>

        {/* Project duration if available */}
        {privateTags.duration && (
          <div className="mt-2">
            <span className="text-xs text-gray-500">
              📅 Duration: {privateTags.duration}
            </span>
          </div>
        )}
      </div>
    </BaseCard>
  );
};