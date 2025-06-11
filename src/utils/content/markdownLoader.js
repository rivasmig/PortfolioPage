/**
 * Generic Markdown Loader Utility
 * Loads .md files from any specified folder and parses them for use in React components
 */

/**
 * Parse frontmatter from markdown content
 * @param {string} content - Raw markdown content
 * @returns {Object} - { metadata, content }
 */
export const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, content: content.trim() };
  }
  
  const [, frontmatter, markdownContent] = match;
  const metadata = {};
  
  // Simple YAML-like parsing
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  });
  
  return { metadata, content: markdownContent.trim() };
};

/**
 * Enhanced markdown to HTML parser with support for images, tables, and rich formatting
 * @param {string} markdown - Markdown content
 * @returns {string} - Processed content ready for display
 */
export const parseMarkdown = (markdown) => {
  let html = markdown;
  
  console.log('Input markdown:', markdown); // Debug log
  
  // Enhanced images with captions and better fallback handling
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]*)")?\)/gim, (match, alt, src, title) => {
    console.log('Image match found:', { match, alt, src, title }); // Debug log
    
    return `<figure class="image-figure my-6 border border-current bg-black bg-opacity-20 p-4 rounded">
      <div class="image-container relative group cursor-pointer">
        <img 
          src="${src}" 
          alt="${alt}" 
          title="${title || alt}" 
          class="w-full h-auto max-h-96 object-contain mx-auto transition-transform group-hover:scale-105 border border-current rounded" 
          onclick="openImageModal('${src}', '${alt}', '${title || alt}')"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          loading="lazy"
        />
        <div class="image-fallback hidden text-center p-8 border border-current bg-red-900 bg-opacity-20 rounded flex-col items-center justify-center min-h-48">
          <p class="theme-ui-text font-mono text-red-400 mb-2">⚠ Image failed to load</p>
          <p class="theme-ui-text font-mono text-xs opacity-70 break-all">${src}</p>
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center rounded">
          <span class="text-white opacity-0 group-hover:opacity-100 text-sm font-mono">Click to expand</span>
        </div>
      </div>
      ${(title || alt) ? `<figcaption class="mt-3 text-center text-sm opacity-75 font-mono theme-ui-text">${title || alt}</figcaption>` : ''}
    </figure>`;
  });
  
  console.log('After image processing:', html); // Debug log
  
  // Enhanced lists with better styling
  html = html.replace(/^\- (.*$)/gim, '<li class="mb-2 pl-6 flex items-start"><span class="text-green-400 mr-2 mt-1 flex-shrink-0">▶</span><span>$1</span></li>');
  html = html.replace(/^\* (.*$)/gim, '<li class="mb-2 pl-6 flex items-start"><span class="text-blue-400 mr-2 mt-1 flex-shrink-0">●</span><span>$1</span></li>');
  
  // Enhanced ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="mb-3 pl-4 border-l-2 border-current flex items-start"><span class="text-yellow-400 font-bold mr-2 flex-shrink-0">&gt;</span><span>$1</span></li>');
  
  // Wrap consecutive list items
  html = html.replace(/(<li class="mb-2 pl-6 flex items-start">[\s\S]*?<\/li>(?:\s*<li class="mb-2 pl-6 flex items-start">[\s\S]*?<\/li>)*)/gim, '<ul class="mb-6 space-y-1">$1</ul>');
  html = html.replace(/(<li class="mb-3 pl-4 border-l-2 border-current flex items-start">[\s\S]*?<\/li>(?:\s*<li class="mb-3 pl-4 border-l-2 border-current flex items-start">[\s\S]*?<\/li>)*)/gim, '<ol class="mb-6 space-y-2">$1</ol>');
  
  // Enhanced blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-green-400 pl-4 py-2 my-4 bg-black bg-opacity-30 italic text-green-300 relative"><span class="absolute -left-2 top-0 text-green-400 text-2xl">"</span>$1</blockquote>');
  
  // Horizontal rules with styling
  html = html.replace(/^---$/gim, '<hr class="border-current my-8 border-t-2 opacity-50" />');
  
  // Math expressions (basic support)
  html = html.replace(/\$\$([^$]+)\$\$/gim, '<div class="math-block my-4 p-4 bg-opacity-20 bg-current text-center font-mono">$1</div>');
  html = html.replace(/\$([^$]+)\$/gim, '<span class="math-inline bg-opacity-20 bg-current px-1 font-mono">$1</span>');
  
  // Callout boxes
  html = html.replace(/:::(\w+)\n([\s\S]*?):::/gim, (match, type, content) => {
    const types = {
      warning: 'border-yellow-400 bg-yellow-900 bg-opacity-20 text-yellow-100',
      error: 'border-red-400 bg-red-900 bg-opacity-20 text-red-100',
      info: 'border-blue-400 bg-blue-900 bg-opacity-20 text-blue-100',
      success: 'border-green-400 bg-green-900 bg-opacity-20 text-green-100'
    };
    const className = types[type] || types.info;
    return `<div class="callout border-2 ${className} p-4 my-4 rounded-lg">
      <div class="callout-type text-xs font-bold uppercase mb-2">${type}</div>
      <div class="callout-content">${content.trim()}</div>
    </div>`;
  });
  
  // Paragraphs (split by double newlines, avoiding already processed elements)
  const paragraphs = html.split(/\n\s*\n/);
  html = paragraphs.map(para => {
    const trimmedPara = para.trim();
    // Don't wrap elements that are already HTML
    if (trimmedPara.match(/^<(h[1-6]|ul|ol|pre|blockquote|hr|img|figure|div|table)/)) {
      return trimmedPara;
    }
    // Don't wrap empty content
    if (!trimmedPara) {
      return '';
    }
    // Don't wrap single line breaks - convert them to proper paragraphs
    return `<p class="theme-ui-text font-mono leading-relaxed mb-4">${trimmedPara.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');
  
  // Clean up extra whitespace and empty paragraphs
  html = html.replace(/\n{3,}/gim, '\n\n');
  html = html.replace(/<p[^>]*><\/p>/gim, '');
  
  return html;
};

/**
 * Load a specific markdown file from a given folder
 * @param {string} folder - Folder path relative to src/content/
 * @param {string} filename - Name of the markdown file (without .md extension)
 * @returns {Object} - { title, content, metadata, isImageSection, rawContent }
 */
export const loadMarkdownFile = async (folder, filename) => {
  try {
    // Dynamic import of the markdown file
    const markdownModule = await import(`../../pages/${folder}/${filename}.md?raw`);
    const rawContent = markdownModule.default;
    
    // Parse frontmatter and content
    const { metadata, content } = parseFrontmatter(rawContent);
    
    return {
      title: metadata.title || filename.charAt(0).toUpperCase() + filename.slice(1),
      content: parseMarkdown(content),
      rawContent: content,
      metadata,
      isImageSection: metadata.isImageSection === 'true',
      hasSpecialFormatting: metadata.hasSpecialFormatting === 'true'
    };
  } catch (error) {
    console.warn(`Could not load ${filename}.md from ${folder}:`, error);
    return null;
  }
};

/**
 * Load all markdown files from a specified folder
 * @param {string} folder - Folder path relative to src/content/
 * @param {Array} files - Array of filenames (without .md extension)
 * @returns {Object} - Object with all loaded markdown content
 */
export const loadMarkdownContent = async (folder, files) => {
  const content = {};
  
  for (const filename of files) {
    const fileContent = await loadMarkdownFile(folder, filename);
    if (fileContent) {
      content[filename] = fileContent;
    } else {
      // Fallback content if file doesn't exist
      content[filename] = {
        title: filename.charAt(0).toUpperCase() + filename.slice(1),
        content: `<p class="theme-ui-text font-mono text-red-400">Content for ${filename} not found. Please create ${folder}/${filename}.md</p>`,
        rawContent: `Content for ${filename} not found.`,
        metadata: {},
        isImageSection: false,
        hasSpecialFormatting: false
      };
    }
  }
  
  return content;
};

/**
 * Convenience function for loading Gravity Falls content (backward compatibility)
 * @returns {Object} - Gravity Falls content
 */
export const loadGravityFallsContent = async () => {
  const files = ['hypothesis', 'background', 'methods', 'data', 'discussion'];
  return await loadMarkdownContent('gravity-falls', files);
};

/**
 * Get all available markdown files in a folder (requires manual specification for now)
 * @param {string} folder - Folder name
 * @returns {Array} - Array of common content types
 */
export const getContentFiles = (folder) => {
  // Common content types - can be extended
  const contentMaps = {
    'gravity-falls': ['hypothesis', 'background', 'methods', 'data', 'discussion'],
    'project-showcase': ['overview', 'features', 'technical', 'challenges', 'results'],
    'research': ['abstract', 'introduction', 'methodology', 'results', 'conclusion'],
    'blog-post': ['introduction', 'main-content', 'conclusion'],
    'portfolio-section': ['about', 'skills', 'experience', 'projects', 'contact']
  };
  
  return contentMaps[folder] || ['content'];
};

export default {
  loadMarkdownFile,
  loadMarkdownContent,
  loadGravityFallsContent,
  parseMarkdown,
  parseFrontmatter,
  getContentFiles
};