/**
 * Content Loader - Dynamic loading and processing of MDX content
 * Handles content discovery, metadata extraction, and route generation
 */

// Content registry - will be populated dynamically later
const contentRegistry = new Map();

/**
 * Register a content page
 * @param {string} path - URL path for the page
 * @param {Object} page - Page component and metadata
 */
export const registerPage = (path, page) => {
  contentRegistry.set(path, page);
};

/**
 * Get a registered page
 * @param {string} path - URL path
 * @returns {Object|null} Page data or null if not found
 */
export const getPage = (path) => {
  return contentRegistry.get(path) || null;
};

/**
 * Get all registered pages
 * @returns {Array} Array of page objects with paths
 */
export const getAllPages = () => {
  const pages = [];
  for (const [path, page] of contentRegistry.entries()) {
    pages.push({ path, ...page });
  }
  return pages;
};

/**
 * Extract metadata from MDX frontmatter
 * @param {string} mdxContent - Raw MDX content string
 * @returns {Object} Parsed metadata
 */
export const extractMetadata = (mdxContent) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = mdxContent.match(frontmatterRegex);
  
  if (!match) {
    return {};
  }
  
  const frontmatter = match[1];
  const metadata = {};
  
  // Simple YAML-like parsing (extend as needed)
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = value.replace(/^["']|["']$/g, ''); // Remove quotes
    }
  });
  
  return metadata;
};

/**
 * Generate routes from content structure
 * @param {string} basePath - Base content directory path
 * @returns {Array} Route configuration array
 */
export const generateRoutes = (basePath = '/content') => {
  const routes = [];
  
  // This would be populated by scanning content directory
  // For now, we'll use static demo routes
  const demoRoutes = [
    {
      path: '/',
      component: 'HomePage',
      title: 'Home',
      layout: 'overlay'
    },
    {
      path: '/projects/demo',
      component: 'DemoProject',
      title: 'Demo Project',
      layout: 'split'
    },
    {
      path: '/art/demo',
      component: 'DemoArt',
      title: 'Art Demo',
      layout: 'fullscreen-3d'
    }
  ];
  
  demoRoutes.forEach(route => {
    registerPage(route.path, route);
    routes.push(route);
  });
  
  return routes;
};

/**
 * Load content file dynamically
 * @param {string} filePath - Path to content file
 * @returns {Promise<Object>} Loaded content with metadata
 */
export const loadContent = async (filePath) => {
  try {
    // In a real implementation, this would fetch/import the MDX file
    // For now, return demo content
    const demoContent = {
      metadata: {
        title: 'Demo Page',
        layout: 'split',
        theme: 'frutiger-aero'
      },
      content: `
# Demo Content

This is a demo MDX page with 3D elements!

<Pyramid 
  position={[0, 0, 0]} 
  color="#3b82f6" 
  size={1.5} 
  animated={true} 
  interactive={true} 
/>

## Features

- MDX content parsing
- 3D component integration
- Theme-aware styling
- Multiple layout options

<Scene>
  <Cube position={[-1, 0, 0]} color="#10b981" />
  <Sphere position={[1, 0, 0]} color="#f59e0b" />
</Scene>

More content here...
      `
    };
    
    return demoContent;
  } catch (error) {
    console.error('Failed to load content:', error);
    return null;
  }
};

/**
 * Build navigation structure from content
 * @returns {Array} Navigation menu structure
 */
export const buildNavigation = () => {
  const pages = getAllPages();
  const navigation = [];
  
  // Group pages by section
  const sections = {};
  
  pages.forEach(page => {
    const pathParts = page.path.split('/').filter(part => part);
    const section = pathParts[0] || 'home';
    
    if (!sections[section]) {
      sections[section] = [];
    }
    
    sections[section].push({
      title: page.title || page.path,
      path: page.path,
      layout: page.layout
    });
  });
  
  // Convert to navigation structure
  Object.entries(sections).forEach(([section, pages]) => {
    navigation.push({
      section: section.charAt(0).toUpperCase() + section.slice(1),
      pages
    });
  });
  
  return navigation;
};

// Initialize with demo content
generateRoutes();

export default {
  registerPage,
  getPage,
  getAllPages,
  extractMetadata,
  generateRoutes,
  loadContent,
  buildNavigation
};