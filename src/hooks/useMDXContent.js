// src/hooks/useMDXContent.js
// React hook for loading and managing MDX content

import { useState, useEffect, useMemo } from 'react';
import { 
  loadMDXContent, 
  filterContentByType, 
  filterContentByTags,
  getFeaturedContent,
  searchContent,
  getContentBySlug,
  getRelatedContent,
  CONTENT_TYPES
} from '../utils/mdxLoader.js';

export function useMDXContent() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadMDXContent()
      .then(result => {
        if (result.errors.length > 0) {
          console.error('MDX Content Errors:', result.errors);
          setError(result.errors);
        }
        setContent(result.content);
        setStats(result.stats);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load MDX content:', err);
        setError([err.message]);
        setLoading(false);
      });
  }, []);

  // Memoized filtered content
  const projects = useMemo(() => 
    filterContentByType(content, CONTENT_TYPES.PROJECT), 
    [content]
  );

  const interests = useMemo(() => 
    filterContentByType(content, CONTENT_TYPES.INTEREST), 
    [content]
  );

  const featured = useMemo(() => 
    getFeaturedContent(content), 
    [content]
  );

  // Helper functions
  const getBySlug = (slug) => getContentBySlug(content, slug);
  
  const getRelated = (currentItem, limit = 3) => 
    getRelatedContent(content, currentItem, limit);

  const filterByTags = (tags) => filterContentByTags(content, tags);

  const search = (query) => searchContent(content, query);

  return {
    // Data
    content,
    projects,
    interests,
    featured,
    stats,
    
    // State
    loading,
    error,
    
    // Helper functions
    getBySlug,
    getRelated,
    filterByTags,
    search
  };
}

// Hook for specific content type with filtering
export function useFilteredContent(type = null, tags = [], searchQuery = '') {
  const { content, loading, error } = useMDXContent();
  
  const filteredContent = useMemo(() => {
    let filtered = content;
    
    // Filter by type
    if (type) {
      filtered = filterContentByType(filtered, type);
    }
    
    // Filter by tags
    if (tags.length > 0) {
      filtered = filterContentByTags(filtered, tags);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = searchContent(filtered, searchQuery);
    }
    
    return filtered;
  }, [content, type, tags, searchQuery]);

  return {
    content: filteredContent,
    loading,
    error
  };
}

// Hook for single content item
export function useContentItem(slug) {
  const { content, loading, error, getBySlug, getRelated } = useMDXContent();
  
  const item = useMemo(() => 
    getBySlug(slug), 
    [content, slug, getBySlug]
  );

  const related = useMemo(() => 
    item ? getRelated(item) : [], 
    [item, getRelated]
  );

  return {
    item,
    related,
    loading,
    error: error || (!loading && !item ? [`Content not found: ${slug}`] : null)
  };
}

// Hook for content statistics and analytics
export function useContentStats() {
  const { content, stats } = useMDXContent();

  const analytics = useMemo(() => {
    if (!content.length) return null;

    // Tag frequency analysis
    const tagFrequency = {};
    content.forEach(item => {
      item.publicTags.forEach(tag => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
      });
    });

    // Popular tags (top 5)
    const popularTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count }));

    // Yearly distribution
    const yearlyDistribution = {};
    content.forEach(item => {
      const year = item.year;
      yearlyDistribution[year] = (yearlyDistribution[year] || 0) + 1;
    });

    // Status distribution
    const statusDistribution = {};
    content.forEach(item => {
      const status = item.status;
      statusDistribution[status] = (statusDistribution[status] || 0) + 1;
    });

    // Collaboration analysis
    const collaborationStats = {
      solo: content.filter(item => (item.privateTags.collaborators || 0) === 0).length,
      team: content.filter(item => (item.privateTags.collaborators || 0) > 0).length,
      averageTeamSize: content.reduce((sum, item) => 
        sum + (item.privateTags.collaborators || 0), 0) / content.length
    };

    return {
      popularTags,
      yearlyDistribution,
      statusDistribution,
      collaborationStats,
      totalProjects: stats?.projects || 0,
      totalInterests: stats?.interests || 0,
      featuredCount: stats?.featured || 0
    };
  }, [content, stats]);

  return analytics;
}