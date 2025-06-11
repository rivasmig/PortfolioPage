import React, { useState, useEffect } from 'react';

/**
 * MarkdownCard - Enhanced reusable component for displaying markdown content
 * Now supports images, tables, code blocks, and rich formatting
 */
const MarkdownCard = ({ 
  cardData, 
  selectedCard, 
  onClose, 
  theme = 'default',
  customRenderers = {},
  showSpecialSections = true 
}) => {
  const [imageModal, setImageModal] = useState(null);
  
  // Set up global image modal function - ALWAYS call this hook
  useEffect(() => {
    window.openImageModal = (src, alt, title) => {
      setImageModal({ src, alt, title });
    };
    
    return () => {
      delete window.openImageModal;
    };
  }, []);

  // Add CSS to document head once
  useEffect(() => {
    const styleId = 'markdown-card-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .markdown-content table {
          border-color: currentColor !important;
          width: 100%;
          margin: 1.5rem 0;
        }
        
        .markdown-content .table-container {
          border: 2px solid currentColor;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .markdown-content th {
          background-color: rgba(255, 255, 255, 0.1) !important;
          font-weight: bold !important;
          text-align: left !important;
        }
        
        .markdown-content td {
          border-color: currentColor !important;
        }
        
        .markdown-content img {
          transition: all 0.3s ease;
          max-width: 100%;
          height: auto;
        }
        
        .markdown-content img:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .markdown-content .image-figure {
          margin: 2rem 0;
        }
        
        .markdown-content .image-fallback {
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .markdown-content {
          scroll-behavior: smooth;
        }
        
        .markdown-content tbody tr:hover {
          background-color: rgba(255,255,255,0.05) !important;
        }
        
        .markdown-content a {
          position: relative;
        }
        
        .markdown-content a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        
        .markdown-content a:hover::after {
          width: 100%;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  // Early return AFTER all hooks have been called
  if (!selectedCard || !cardData[selectedCard]) return null;
  
  const card = cardData[selectedCard];
  
  // Theme-specific styling
  const getThemeClasses = () => {
    const themes = {
      'gravity-falls': {
        overlay: 'bg-black bg-opacity-90',
        panel: 'theme-ui-panel border-2 border-current',
        title: 'text-4xl font-bold theme-ui-text font-mono tracking-wider',
        button: 'theme-button px-6 py-3 text-lg font-mono hover:bg-current hover:text-black transition-colors',
        content: 'border border-current p-6 bg-black bg-opacity-30',
        text: 'theme-ui-text font-mono leading-relaxed',
        codeBlock: 'border border-current bg-black',
        table: 'border-current theme-ui-text'
      },
      'frutiger-aero': {
        overlay: 'bg-cyan-900 bg-opacity-95',
        panel: 'bg-white bg-opacity-95 backdrop-blur-lg border border-cyan-200 rounded-lg shadow-2xl',
        title: 'text-4xl font-bold text-cyan-900 tracking-wide',
        button: 'bg-cyan-600 text-white px-6 py-3 text-lg rounded hover:bg-cyan-700 transition-colors',
        content: 'border border-cyan-200 p-6 bg-cyan-50 bg-opacity-50 rounded-lg',
        text: 'text-gray-800 leading-relaxed',
        codeBlock: 'border border-cyan-300 bg-gray-100',
        table: 'border-cyan-300 text-gray-800'
      },
      'minimal': {
        overlay: 'bg-gray-900 bg-opacity-95',
        panel: 'bg-white border border-gray-300 shadow-xl',
        title: 'text-4xl font-bold text-gray-900',
        button: 'bg-gray-800 text-white px-6 py-3 text-lg hover:bg-gray-700 transition-colors',
        content: 'border border-gray-200 p-6 bg-gray-50',
        text: 'text-gray-800 leading-relaxed',
        codeBlock: 'border border-gray-300 bg-gray-100',
        table: 'border-gray-300 text-gray-800'
      },
      default: {
        overlay: 'bg-black bg-opacity-90',
        panel: 'bg-white border border-gray-300 shadow-xl',
        title: 'text-4xl font-bold text-gray-900',
        button: 'bg-blue-600 text-white px-6 py-3 text-lg rounded hover:bg-blue-700 transition-colors',
        content: 'border border-gray-200 p-6 bg-gray-50',
        text: 'text-gray-800 leading-relaxed',
        codeBlock: 'border border-gray-300 bg-gray-100',
        table: 'border-gray-300 text-gray-800'
      }
    };
    
    return themes[theme] || themes.default;
  };
  
  const themeClasses = getThemeClasses();
  
  // Image modal component
  const renderImageModal = () => {
    if (!imageModal) return null;
    
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-95 p-4">
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <button
            onClick={() => setImageModal(null)}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold z-10"
          >
            ✕ Close
          </button>
          <img
            src={imageModal.src}
            alt={imageModal.alt}
            title={imageModal.title}
            className="max-w-full max-h-full object-contain"
          />
          {imageModal.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
              <p className="text-center font-mono text-sm">{imageModal.title}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Enhanced special sections renderer
  const renderSpecialSections = () => {
    if (!showSpecialSections) return null;
    
    // Gravity Falls specific sections
    if (theme === 'gravity-falls' && selectedCard === 'discussion') {
      return (
        <div className="mt-8 space-y-6">
          <div className="border-2 border-green-400 p-6 bg-green-900 bg-opacity-20 rounded-lg">
            <h4 className="text-xl font-bold text-green-400 font-mono mb-4 flex items-center">
              <span className="mr-2">✓</span> CORRECTLY PREDICTED EPISODES
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Tourist Trapped", "Society of the Blind Eye",
                "Not What He Seems", "Weirdmageddon Part 3",
                "Double Dipper", "Dreamscaperers"
              ].map((episode, i) => (
                <div key={i} className="border border-green-400 p-3 bg-black bg-opacity-50 rounded">
                  <p className="text-green-400 font-mono text-sm flex items-center">
                    <span className="mr-2">✓</span> {episode}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-2 border-red-400 p-6 bg-red-900 bg-opacity-20 rounded-lg">
            <h4 className="text-xl font-bold text-red-400 font-mono mb-4 flex items-center">
              <span className="mr-2">✗</span> INCORRECTLY PREDICTED EPISODES
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "The Time-Traveler's Pig", "A Tale of Two Stans",
                "Gideon Rises", "Northwest Mansion Mystery",
                "Roadside Attraction", "The Golf War",
                "The Deep End", "Dipper and Mabel vs. The Future",
                "Scary-oke", "Sock Opera"
              ].map((episode, i) => (
                <div key={i} className="border border-red-400 p-3 bg-black bg-opacity-50 rounded">
                  <p className="text-red-400 font-mono text-sm flex items-center">
                    <span className="mr-2">✗</span> {episode}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-2 border-yellow-400 p-6 bg-yellow-900 bg-opacity-20 rounded-lg">
            <h4 className="text-xl font-bold text-yellow-400 font-mono mb-4 flex items-center">
              <span className="mr-2">📊</span> ACCURACY ANALYSIS
            </h4>
            <div className="text-center">
              <p className="text-6xl font-bold text-yellow-400 font-mono mb-2">
                37.5%
              </p>
              <p className="text-yellow-400 font-mono">
                Overall Prediction Accuracy
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // Enhanced data visualization section for any research content
    if (card.isImageSection) {
      return (
        <div className="space-y-8">
          <h3 className={`text-2xl font-bold mb-6 flex items-center ${theme === 'gravity-falls' ? 'theme-ui-text font-mono' : 'text-gray-900'}`}>
            <span className="mr-2">📊</span>
            {theme === 'gravity-falls' ? '> VISUALIZATIONS' : 'Visualizations'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { title: "Network Analysis", icon: "🕸️" },
              { title: "Comparative Data", icon: "📈" }, 
              { title: "Distribution Map", icon: "🗺️" },
              { title: "Timeline View", icon: "⏱️" }
            ].map((viz, i) => (
              <div key={i} className={`${themeClasses.content} p-6 hover:shadow-lg transition-shadow`}>
                <h4 className={`text-lg mb-4 text-center flex items-center justify-center ${theme === 'gravity-falls' ? 'theme-ui-text font-mono' : 'text-gray-800'}`}>
                  <span className="mr-2">{viz.icon}</span>
                  {theme === 'gravity-falls' ? `> ${viz.title.toUpperCase()}` : viz.title}
                </h4>
                <div className={`w-full h-72 border-2 flex items-center justify-center relative overflow-hidden ${
                  theme === 'gravity-falls' ? 'bg-black border-current' : 'bg-gray-100 border-gray-300'
                } rounded-lg`}>
                  {theme === 'gravity-falls' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500 to-transparent opacity-10 animate-pulse"></div>
                  )}
                  <div className="text-center z-10">
                    <div className="text-4xl mb-4">{viz.icon}</div>
                    <p className={`text-sm mb-2 ${theme === 'gravity-falls' ? 'theme-ui-text font-mono' : 'text-gray-600'}`}>
                      {theme === 'gravity-falls' ? '> LOADING GRAPH DATA...' : 'Loading visualization...'}
                    </p>
                    <div className={`border p-3 mt-4 rounded ${theme === 'gravity-falls' ? 'border-current' : 'border-gray-300'}`}>
                      <p className={`text-xs ${theme === 'gravity-falls' ? 'theme-ui-text font-mono' : 'text-gray-500'}`}>
                        [VISUALIZATION PLACEHOLDER]<br/>
                        Replace with actual data viz
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 border-t pt-4 ${theme === 'gravity-falls' ? 'border-current' : 'border-gray-300'}`}>
                  <p className={`text-sm opacity-80 flex items-center ${theme === 'gravity-falls' ? 'theme-ui-text font-mono' : 'text-gray-600'}`}>
                    <span className="mr-2">📊</span>
                    {theme === 'gravity-falls' ? `> Analysis Chart ${i + 1} - Data visualization` : `Chart ${i + 1} - Data analysis`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  // Allow custom renderers for specific content types
  const renderCustomContent = () => {
    if (customRenderers[selectedCard]) {
      return customRenderers[selectedCard](card, themeClasses);
    }
    return null;
  };
  
  return (
    <>
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${themeClasses.overlay}`}>
        <div className={`${themeClasses.panel} max-w-6xl max-h-[85vh] overflow-y-auto p-8 m-4 relative`}>
          {/* Header */}
          <div className={`flex justify-between items-center mb-8 border-b pb-4 ${theme === 'gravity-falls' ? 'border-current' : 'border-gray-300'}`}>
            <h2 className={`${themeClasses.title} flex items-center`}>
              <span className="mr-3">📄</span>
              {theme === 'gravity-falls' ? `> ${card.title.toUpperCase()}` : card.title}
            </h2>
            <button 
              onClick={onClose}
              className={`${themeClasses.button} flex items-center`}
            >
              <span className="mr-2">✕</span>
              {theme === 'gravity-falls' ? '> CLOSE' : 'Close'}
            </button>
          </div>
          
          {/* Main Content */}
          <div className="space-y-6">
            {/* Enhanced markdown content with theme styling */}
            <div 
              className={`${themeClasses.content} markdown-content`}
              style={{
                '--code-bg': theme === 'gravity-falls' ? '#000000' : '#f5f5f5',
                '--code-border': theme === 'gravity-falls' ? 'currentColor' : '#d1d5db',
                '--table-border': theme === 'gravity-falls' ? 'currentColor' : '#d1d5db'
              }}
            >
              <div 
                className={`${themeClasses.text} prose prose-invert max-w-none`}
                dangerouslySetInnerHTML={{ __html: card.content }}
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75'
                }}
              />
            </div>
            
            {/* Custom content */}
            {renderCustomContent()}
            
            {/* Special sections */}
            {renderSpecialSections()}
          </div>
          
          {/* Footer */}
          <div className={`mt-8 pt-6 border-t text-center ${theme === 'gravity-falls' ? 'border-current' : 'border-gray-300'}`}>
            <button 
              onClick={onClose}
              className={`${themeClasses.button} px-8 py-4 flex items-center mx-auto`}
            >
              <span className="mr-2">←</span>
              {theme === 'gravity-falls' ? '> RETURN TO INTERFACE' : 'Return'}
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-50">
            <div className="w-1 h-20 bg-current rounded-full">
              <div className="w-full h-4 bg-current bg-opacity-50 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      {renderImageModal()}
      
      
    </>
  );
};

export default MarkdownCard;