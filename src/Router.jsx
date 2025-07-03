// src/Router.jsx
import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';

import LandingPage from './pages/LandingPage';
import Gallery from './pages/Gallery';
import Interests from './pages/Interests';
import GravityFallsResearch from './pages/gravity-falls-research/GravityFallsResearch';
import HypothesisPage from './pages/gravity-falls-research/HypothesisPage';
import BackgroundPage from './pages/gravity-falls-research/BackgroundPage';
import MethodsPage from './pages/gravity-falls-research/MethodsPage';
import DataPage from './pages/gravity-falls-research/DataPage';
import DiscussionPage from './pages/gravity-falls-research/DiscussionPage';

// Loading component for MDX files using your theme system
function MDXLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
      <div className="theme-ui-panel text-center">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
          style={{ borderColor: 'var(--color-primary)' }}
        ></div>
        <p className="theme-ui-text font-medium">Loading content...</p>
      </div>
    </div>
  );
}

// Error component using your theme system with React Router navigation
function MDXError({ slug, type }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
      <div className="theme-ui-panel text-center">
        <div className="text-6xl mb-4">📄</div>
        <h1 className="text-2xl font-bold theme-ui-text mb-4">Content Not Found</h1>
        <p className="theme-ui-text mb-6 opacity-80">
          The {type} "{slug}" doesn't exist or couldn't be loaded.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(type === 'project' ? '/gallery' : '/interests')}
            className="theme-button inline-block px-6 py-2 rounded-lg transition-colors"
          >
            Back to {type === 'project' ? 'Gallery' : 'Interests'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="theme-button inline-block px-6 py-2 rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// Navigation component for MDX pages with React Router navigation
function MDXNavigation({ type, slug }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        onClick={() => navigate(type === 'projects' ? '/gallery' : '/interests')}
        className="theme-button inline-flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
        style={{ textDecoration: 'none' }}
      >
        <span className="mr-2">←</span>
        Back to {type === 'projects' ? 'Gallery' : 'Interests'}
      </button>
    </div>
  );
}

// Dynamic MDX component loader with your theme styling
function DynamicMDXPage({ type }) {
  const { slug } = useParams();
  const [MDXComponent, setMDXComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadMDX = async () => {
      setLoading(true);
      setError(false);
      
      try {
        // Dynamic import of MDX file
        const module = await import(`./pages/${type}/${slug}.mdx`);
        setMDXComponent(() => module.default);
      } catch (error) {
        console.error(`Failed to load ${type}/${slug}.mdx:`, error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadMDX();
    }
  }, [slug, type]);

  if (loading) {
    return <MDXLoader />;
  }

  if (error || !MDXComponent) {
    return <MDXError slug={slug} type={type} />;
  }

  // MDX components that will be available in all MDX files
  const mdxComponents = {
    // Custom components available in all MDX files
    // You can add video players, code blocks, etc. here
    
    // Example: Wrapper for images to make them responsive
    img: (props) => (
      <img 
        {...props} 
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          borderRadius: '8px',
          margin: '1rem 0',
          ...props.style 
        }} 
      />
    ),
    
    // Example: Custom link styling with external link handling
    a: (props) => {
      // If it's an external link, use regular anchor tag
      if (props.href && (props.href.startsWith('http') || props.href.startsWith('mailto'))) {
        return (
          <a 
            {...props} 
            style={{ 
              color: 'var(--color-primary)', 
              textDecoration: 'none',
              ...props.style 
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            target="_blank"
            rel="noopener noreferrer"
          />
        );
      }
      
      // For internal links, you could use navigate here if needed
      return (
        <a 
          {...props} 
          style={{ 
            color: 'var(--color-primary)', 
            textDecoration: 'none',
            ...props.style 
          }}
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
        />
      );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Navigation */}
        <MDXNavigation type={type} slug={slug} />
        
        {/* MDX Content */}
        <MDXProvider components={mdxComponents}>
          <Suspense fallback={<MDXLoader />}>
            <article className="theme-ui-panel prose-style">
              <MDXComponent />
            </article>
          </Suspense>
        </MDXProvider>
        
        {/* Footer for MDX pages */}
        <div className="mt-8 text-center">
          <p className="theme-ui-text opacity-60 text-sm">
            Powered by MDX • Interactive Markdown
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AppRouter() {
  useEffect(() => {
    // Set default theme on app load
    if (window.setTheme && !document.body.className.includes('theme-')) {
      window.setTheme('default');
    }
  }, []);

  return (
    <Routes>
      {/* Main portfolio routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/interests" element={<Interests />} />
      
      {/* Dynamic MDX content routes */}
      <Route path="/project/:slug" element={<DynamicMDXPage type="projects" />} />
      <Route path="/interest/:slug" element={<DynamicMDXPage type="interests" />} />
      
      {/* Gravity Falls Research (preserved existing routes) */}
      <Route path="/gravity-falls-research" element={<GravityFallsResearch />} />
      <Route path="/gravity-falls-research/hypothesis" element={<HypothesisPage />} />
      <Route path="/gravity-falls-research/background" element={<BackgroundPage />} />
      <Route path="/gravity-falls-research/methods" element={<MethodsPage />} />
      <Route path="/gravity-falls-research/data" element={<DataPage />} />
      <Route path="/gravity-falls-research/discussion" element={<DiscussionPage />} />
      
      {/* Fallback route for 404 (optional) */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}