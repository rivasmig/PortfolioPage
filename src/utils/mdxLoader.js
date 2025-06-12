// src/utils/mdxLoader.js
// Loads and processes MDX files, extracting frontmatter and content

import { validateTag, getPublicTags, getPrivateTags } from '../core/tags/tags.js';

// Content type detection
export const CONTENT_TYPES = {
  PROJECT: 'project',
  INTEREST: 'interest'
};

// Parse frontmatter from MDX content
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content };
  }
  
  const frontmatterText = match[1];
  const mainContent = match[2];
  
  // Simple YAML parser for frontmatter
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentValue = '';
  let inArray = false;
  let inObject = false;
  let objectKey = null;
  
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    
    // Handle arrays
    if (line.startsWith('- ')) {
      if (!inArray && currentKey) {
        frontmatter[currentKey] = [];
        inArray = true;
      }
      if (inArray && currentKey) {
        frontmatter[currentKey].push(line.substring(2).trim());
      }
      continue;
    }
    
    // Handle objects (private tags)
    if (line.endsWith(':') && !line.includes(' ')) {
      const key = line.slice(0, -1);
      if (key === 'private') {
        frontmatter[key] = {};
        inObject = true;
        objectKey = key;
        inArray = false;
        continue;
      }
    }
    
    // Handle object properties
    if (inObject && line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      
      // Parse different value types
      let parsedValue = value;
      if (value === 'true') parsedValue = true;
      else if (value === 'false') parsedValue = false;
      else if (value.match(/^\d+$/)) parsedValue = parseInt(value);
      else if (value.startsWith('"') && value.endsWith('"')) {
        parsedValue = value.slice(1, -1);
      }
      
      frontmatter[objectKey][key.trim()] = parsedValue;
      continue;
    }
    
    // Handle regular key-value pairs
    if (line.includes(':')) {
      inArray = false;
      inObject = false;
      const [key, ...valueParts] = line.split(':');
      let value = valueParts.join(':').trim();
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      currentKey = key.trim();
      frontmatter[currentKey] = value;
    }
  }
  
  return { frontmatter, content: mainContent };
}

// Get all MDX files from the pages directory
async function getAllMDXFiles() {
  const mdxFiles = [];
  
  // Import all MDX files dynamically
  // Note: This uses Vite's glob import feature
  try {
    // Import all project MDX files
    const projectModules = import.meta.glob('/src/pages/projects/*.mdx', { 
      as: 'raw',
      eager: false 
    });
    
    for (const [path, modulePromise] of Object.entries(projectModules)) {
      try {
        const content = await modulePromise();
        const fileName = path.split('/').pop();
        mdxFiles.push({
          filePath: `projects/${fileName}`,
          content: content
        });
      } catch (error) {
        console.warn(`Failed to load project file ${path}:`, error);
      }
    }
    
    // Import all interest MDX files
    const interestModules = import.meta.glob('/src/pages/interests/*.mdx', { 
      as: 'raw',
      eager: false 
    });
    
    for (const [path, modulePromise] of Object.entries(interestModules)) {
      try {
        const content = await modulePromise();
        const fileName = path.split('/').pop();
        mdxFiles.push({
          filePath: `interests/${fileName}`,
          content: content
        });
      } catch (error) {
        console.warn(`Failed to load interest file ${path}:`, error);
      }
    }
    
  } catch (error) {
    console.warn('Failed to load MDX files via glob import:', error);
    
    // Fallback: Return empty array, or you could implement a different loading strategy
    console.info('No MDX files found or glob import failed. This is normal if no .mdx files exist yet.');
  }
  
  return mdxFiles;
}

// Parse frontmatter and validate tags
function processFrontmatter(frontmatter, filePath) {
  const errors = [];
  const warnings = [];

  // Validate public tags
  if (frontmatter.tags) {
    frontmatter.tags.forEach(tag => {
      if (!validateTag(tag, true)) {
        warnings.push(`Unknown or invalid public tag: ${tag} in ${filePath}`);
      }
    });
  }

  // Validate private tags
  if (frontmatter.private) {
    Object.entries(frontmatter.private).forEach(([tag, value]) => {
      if (!validateTag(tag, value)) {
        errors.push(`Invalid private tag ${tag}: ${value} in ${filePath}`);
      }
    });
  }

  // Required fields validation
  const requiredFields = ['title', 'description'];
  requiredFields.forEach(field => {
    if (!frontmatter[field]) {
      errors.push(`Missing required field: ${field} in ${filePath}`);
    }
  });

  return { errors, warnings };
}

// Determine content type from file path
function getContentType(filePath) {
  if (filePath.includes('/projects/') || filePath.startsWith('projects/')) return CONTENT_TYPES.PROJECT;
  if (filePath.includes('/interests/') || filePath.startsWith('interests/')) return CONTENT_TYPES.INTEREST;
  return CONTENT_TYPES.PROJECT; // default
}

// Generate slug from file path
function generateSlug(filePath) {
  return filePath
    .split('/')
    .pop()
    .replace('.mdx', '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-');
}

// Main loader function
export async function loadMDXContent() {
  const content = [];
  const errors = [];
  const warnings = [];

  try {
    const mdxFiles = await getAllMDXFiles();
    
    if (mdxFiles.length === 0) {
      console.info('No MDX files found in projects/ or interests/ directories');
      return {
        content: [],
        errors: [],
        warnings: [],
        stats: {
          total: 0,
          projects: 0,
          interests: 0,
          featured: 0
        }
      };
    }

    for (const { filePath, content: rawContent } of mdxFiles) {
      try {
        const { frontmatter, content: mdxContent } = parseFrontmatter(rawContent);
        
        const validation = processFrontmatter(frontmatter, filePath);
        errors.push(...validation.errors);
        warnings.push(...validation.warnings);

        // Skip if there are critical errors
        if (validation.errors.length > 0) {
          console.error(`Skipping ${filePath} due to validation errors:`, validation.errors);
          continue;
        }

        const processed = {
          filePath,
          slug: generateSlug(filePath),
          type: getContentType(filePath),
          title: frontmatter.title,
          description: frontmatter.description,
          date: frontmatter.date,
          publicTags: frontmatter.tags || [],
          privateTags: frontmatter.private || {},
          content: mdxContent,
          // Additional computed fields
          featured: frontmatter.private?.featured || false,
          status: frontmatter.private?.status || 'unknown',
          year: frontmatter.private?.year || new Date().getFullYear(),
          // For routing
          route: `/${getContentType(filePath)}/${generateSlug(filePath)}`
        };

        content.push(processed);
      } catch (error) {
        errors.push(`Error processing ${filePath}: ${error.message}`);
        console.error(`Error processing ${filePath}:`, error);
      }
    }

    // Log warnings if any
    if (warnings.length > 0) {
      console.warn('MDX Content Warnings:', warnings);
    }

    // Sort content by date (newest first)
    content.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.info(`Successfully loaded ${content.length} MDX files`);

    return {
      content,
      errors,
      warnings,
      stats: {
        total: content.length,
        projects: content.filter(c => c.type === CONTENT_TYPES.PROJECT).length,
        interests: content.filter(c => c.type === CONTENT_TYPES.INTEREST).length,
        featured: content.filter(c => c.featured).length
      }
    };
    
  } catch (error) {
    console.error('Failed to load MDX content:', error);
    return {
      content: [],
      errors: [`Failed to load MDX files: ${error.message}`],
      warnings: [],
      stats: { total: 0, projects: 0, interests: 0, featured: 0 }
    };
  }
}

// Filter content by type
export function filterContentByType(content, type) {
  return content.filter(item => item.type === type);
}

// Filter content by tags
export function filterContentByTags(content, tags) {
  if (!tags || tags.length === 0) return content;
  
  return content.filter(item => 
    tags.some(tag => item.publicTags.includes(tag))
  );
}

// Get featured content
export function getFeaturedContent(content) {
  return content.filter(item => item.featured);
}

// Search content by title or description
export function searchContent(content, query) {
  if (!query) return content;
  
  const lowercaseQuery = query.toLowerCase();
  return content.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.publicTags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Get content by slug
export function getContentBySlug(content, slug) {
  return content.find(item => item.slug === slug);
}

// Get related content based on shared tags
export function getRelatedContent(content, currentItem, limit = 3) {
  const related = content
    .filter(item => item.slug !== currentItem.slug)
    .map(item => {
      const sharedTags = item.publicTags.filter(tag => 
        currentItem.publicTags.includes(tag)
      );
      return {
        ...item,
        relevanceScore: sharedTags.length
      };
    })
    .filter(item => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return related;
}