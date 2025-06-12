// src/core/tags/tags.js
// Central registry of all valid tags with types and metadata

export const TAG_TYPES = {
  STRING: 'string',
  INTEGER: 'integer', 
  BOOLEAN: 'boolean',
  URL: 'url',
  ARRAY: 'array'
};

export const TAG_CATEGORIES = {
  TECHNOLOGY: 'technology',
  DOMAIN: 'domain',
  COLLABORATION: 'collaboration',
  STATUS: 'status',
  MEDIA: 'media'
};

// Public tags - displayed on cards and used for filtering
export const PUBLIC_TAGS = {
  // Technology Tags
  javascript: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.TECHNOLOGY,
    label: 'JavaScript',
    color: '#F7DF1E',
    icon: '⚡'
  },
  react: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.TECHNOLOGY,
    label: 'React',
    color: '#61DAFB',
    icon: '⚛️'
  },
  unity: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.TECHNOLOGY,
    label: 'Unity',
    color: '#000000',
    icon: '🎮'
  },
  audio: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.DOMAIN,
    label: 'Audio',
    color: '#FF6B6B',
    icon: '🎵'
  },
  hardware: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.DOMAIN,
    label: 'Hardware',
    color: '#4ECDC4',
    icon: '🔧'
  },
  embedded: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.DOMAIN,
    label: 'Embedded',
    color: '#45B7D1',
    icon: '💾'
  },
  esp32: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.TECHNOLOGY,
    label: 'ESP32',
    color: '#E74C3C',
    icon: '📡'
  },
  '3d': {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.DOMAIN,
    label: '3D Graphics',
    color: '#9B59B6',
    icon: '📐'
  },
  physics: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.DOMAIN,
    label: 'Physics',
    color: '#F39C12',
    icon: '🌌'
  },
  ai: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.DOMAIN,
    label: 'AI/ML',
    color: '#2ECC71',
    icon: '🤖'
  },
  research: {
    type: TAG_TYPES.BOOLEAN,
    category: TAG_CATEGORIES.DOMAIN,
    label: 'Research',
    color: '#8E44AD',
    icon: '🔬'
  }
};

// Private tags - used for filtering, sorting, PDF generation, not displayed publicly
export const PRIVATE_TAGS = {
  collaborators: {
    type: TAG_TYPES.INTEGER,
    label: 'Number of Collaborators',
    min: 0,
    max: 20
  },
  duration: {
    type: TAG_TYPES.STRING,
    label: 'Project Duration',
    validation: /^\d+\s+(days?|weeks?|months?|years?)$/
  },
  featured: {
    type: TAG_TYPES.BOOLEAN,
    label: 'Featured Project'
  },
  status: {
    type: TAG_TYPES.STRING,
    label: 'Project Status',
    options: ['completed', 'in-progress', 'archived', 'prototype']
  },
  difficulty: {
    type: TAG_TYPES.INTEGER,
    label: 'Technical Difficulty',
    min: 1,
    max: 5
  },
  role: {
    type: TAG_TYPES.STRING,
    label: 'Primary Role',
    options: ['developer', 'researcher', 'designer', 'lead', 'contributor']
  },
  year: {
    type: TAG_TYPES.INTEGER,
    label: 'Year Completed',
    min: 2015,
    max: new Date().getFullYear() + 1
  },
  repo: {
    type: TAG_TYPES.URL,
    label: 'Repository URL'
  },
  demo: {
    type: TAG_TYPES.URL,
    label: 'Demo URL'
  },
  paper: {
    type: TAG_TYPES.URL,
    label: 'Research Paper URL'
  },
  media: {
    type: TAG_TYPES.ARRAY,
    label: 'Media URLs',
    itemType: TAG_TYPES.URL
  }
};

// Combined registry for validation and lookup
export const ALL_TAGS = {
  ...PUBLIC_TAGS,
  ...PRIVATE_TAGS
};

// Utility functions
export function validateTag(tagName, value) {
  const tagConfig = ALL_TAGS[tagName];
  if (!tagConfig) {
    console.warn(`Unknown tag: ${tagName}`);
    return false;
  }

  switch (tagConfig.type) {
    case TAG_TYPES.BOOLEAN:
      return typeof value === 'boolean';
    
    case TAG_TYPES.INTEGER:
      const isInt = Number.isInteger(value);
      const inRange = (!tagConfig.min || value >= tagConfig.min) && 
                     (!tagConfig.max || value <= tagConfig.max);
      return isInt && inRange;
    
    case TAG_TYPES.STRING:
      if (tagConfig.options) {
        return tagConfig.options.includes(value);
      }
      if (tagConfig.validation) {
        return tagConfig.validation.test(value);
      }
      return typeof value === 'string';
    
    case TAG_TYPES.URL:
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    
    case TAG_TYPES.ARRAY:
      if (!Array.isArray(value)) return false;
      if (tagConfig.itemType === TAG_TYPES.URL) {
        return value.every(item => {
          try {
            new URL(item);
            return true;
          } catch {
            return false;
          }
        });
      }
      return true;
    
    default:
      return true;
  }
}

export function getPublicTags(tags) {
  return Object.keys(tags).filter(tag => PUBLIC_TAGS[tag]);
}

export function getPrivateTags(tags) {
  return Object.keys(tags).filter(tag => PRIVATE_TAGS[tag]);
}

export function getTagsByCategory(category) {
  return Object.entries(PUBLIC_TAGS)
    .filter(([_, config]) => config.category === category)
    .map(([tag, _]) => tag);
}