// src/components/cards/InterestCard.jsx
// Specialized card for blog/interest content

import React from 'react';
import { BaseCard } from './BaseCard';

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
      className="interest-card border-l-4 border-l-purple-500"
      {...props}
    >
      {/* Interest-specific content */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          {/* Date */}
          <div className="text-sm text-gray-500 flex items-center">
            {date && (
              <>
                <span className="mr-1">📅</span>
                {formatDate(date)}
              </>
            )}
          </div>
          
          {/* Research paper link */}
          {privateTags.paper && (
            <a
              href={privateTags.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="mr-1">📄</span>
              Paper
            </a>
          )}
        </div>

        {/* Reading time estimate (simple calculation) */}
        {description && (
          <div className="mt-2">
            <span className="text-xs text-gray-500">
              ⏱️ ~{Math.max(1, Math.ceil(description.split(' ').length / 200))} min read
            </span>
          </div>
        )}
      </div>
    </BaseCard>
  );
};