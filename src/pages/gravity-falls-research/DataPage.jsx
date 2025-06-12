import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

/**
 * DataPage - Interactive data visualization gallery
 * Showcases research visualizations with terminal aesthetics - 6 graphs total
 */
const DataPage = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedViz, setSelectedViz] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  
  // Set theme
  useEffect(() => {
    setTheme('gravity-falls');
  }, [setTheme]);
  
  const visualizations = [
    {
      id: 'imdb-sentiment',
      title: 'IMDB vs Sentiment',
      subtitle: 'Rating Correlation',
      description: 'IMDB episode ratings plotted against average sentiment scores (AFINN) to analyze viewer reception patterns',
      imagePath: 'https://i.ibb.co/9MHvGg9/a409bb8c-a0ff-416f-837c-c36d948ee5de.png',
      icon: '📊',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900 bg-opacity-20',
      borderColor: 'border-cyan-400',
      stats: {
        type: 'ggplot',
        xaxis: 'Sentiment Score',
        yaxis: 'IMDB Rating'
      }
    },
    {
      id: 'imdb-degree',
      title: 'IMDB vs Degree',
      subtitle: 'Connection Impact',
      description: 'IMDB ratings versus degree correlation to determine if highly connected episodes receive better ratings',
      imagePath: 'https://i.ibb.co/rKMwsYQX/GF-Further-Analaysis1.png',
      icon: '📈',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900 bg-opacity-20',
      borderColor: 'border-yellow-400',
      stats: {
        type: 'ggplot',
        xaxis: 'Degree Correlation',
        yaxis: 'IMDB Rating'
      }
    },
    {
      id: 'eigen-centrality',
      title: 'Eigen Centrality',
      subtitle: 'Influence Networks',
      description: 'Eigenvector centrality visualization showing episodes with the highest influence in the narrative network',
      imagePath: 'https://i.ibb.co/7xMZZ6Gn/image2.png',
      icon: '🕸️',
      color: 'text-green-400',
      bgColor: 'bg-green-900 bg-opacity-20',
      borderColor: 'border-green-400',
      stats: {
        type: 'Gephi Nodes',
        metric: 'Eigenvector',
        focus: 'Influence'
      }
    },
    {
      id: 'betweenness-centrality',
      title: 'Betweenness Centrality',
      subtitle: 'Bridge Episodes',
      description: 'Betweenness centrality analysis identifying episodes that serve as crucial bridges in the narrative flow',
      imagePath: 'https://i.ibb.co/wr0VpR7V/image4.png',
      icon: '🌉',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900 bg-opacity-20',
      borderColor: 'border-purple-400',
      stats: {
        type: 'Gephi Nodes',
        metric: 'Betweenness',
        focus: 'Bridge Points'
      }
    },
    {
      id: 'reverse-degree',
      title: 'Reverse Degree',
      subtitle: 'Isolated Episodes',
      description: 'Degree analysis in reverse - emphasizing episodes with the fewest connections to identify standalone content',
      imagePath: 'https://i.ibb.co/XkMwvkv7/image.png',
      icon: '🔻',
      color: 'text-red-400',
      bgColor: 'bg-red-900 bg-opacity-20',
      borderColor: 'border-red-400',
      stats: {
        type: 'Gephi Nodes',
        metric: 'Degree (Reverse)',
        focus: 'Least Connected'
      }
    },
    {
      id: 'out-degree',
      title: 'Out Degree',
      subtitle: 'Foreshadowing Hub',
      description: 'Out-degree analysis showing episodes that reference or foreshadow the most future episodes',
      imagePath: 'https://i.ibb.co/GvtmJmL5/image3.png',
      icon: '➡️',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900 bg-opacity-20',
      borderColor: 'border-orange-400',
      stats: {
        type: 'Gephi Nodes',
        metric: 'Out-Degree',
        focus: 'Future References'
      }
    }
  ];
  
  const handleImageLoad = (vizId) => {
    setLoadingStates(prev => ({ ...prev, [vizId]: false }));
  };
  
  const handleImageError = (vizId) => {
    setLoadingStates(prev => ({ ...prev, [vizId]: 'error' }));
  };
  
  const openModal = (viz) => {
    setSelectedViz(viz);
  };
  
  const closeModal = () => {
    setSelectedViz(null);
  };
  
  return (
    <div className="min-h-screen bg-black theme-ui-text font-mono">
      {/* Header */}
      <div className="border-b-2 border-current p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-green-400">&gt;</span> RESEARCH DATA
            </h1>
            <p className="text-sm opacity-70">
              Network Analysis Visualizations
            </p>
          </div>
          <button 
            onClick={() => navigate('/gravity-falls-research')}
            className="theme-button px-6 py-3 text-sm hover:bg-current hover:text-black transition-all"
          >
            &gt; BACK TO HUB
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Data Overview */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-green-400 mr-3">&gt;&gt;</span>
            COMPREHENSIVE DATA ANALYSIS SUITE
          </h2>
          <p className="text-lg leading-relaxed">
            Our analysis produced <span className="text-yellow-400 font-bold">six key visualizations</span> combining 
            <span className="text-cyan-400 font-bold"> network analysis</span>, 
            <span className="text-green-400 font-bold"> sentiment data</span>, and 
            <span className="text-purple-400 font-bold"> IMDB ratings</span> to provide a comprehensive view of 
            episode connectivity and viewer reception patterns.
          </p>
        </div>
        
        {/* Visualization Grid - 3 columns for 6 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visualizations.map((viz, index) => (
            <div 
              key={viz.id}
              className={`border-2 ${viz.borderColor} ${viz.bgColor} rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer`}
              onClick={() => openModal(viz)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Viz Header */}
              <div className={`${viz.bgColor} p-3 border-b ${viz.borderColor} flex items-center justify-between`}>
                <div className="flex items-center">
                  <span className="text-xl mr-2">{viz.icon}</span>
                  <div>
                    <h3 className={`text-lg font-bold ${viz.color}`}>
                      {viz.title}
                    </h3>
                    <p className="text-xs opacity-70">{viz.subtitle}</p>
                  </div>
                </div>
                <div className="text-xs opacity-70">
                  EXPAND
                </div>
              </div>
              
              {/* Image Container */}
              <div className="relative h-48 bg-black bg-opacity-50 flex items-center justify-center">
                {loadingStates[viz.id] === 'error' ? (
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚠</div>
                    <p className="text-red-400 font-bold text-sm">LOAD FAILED</p>
                    <p className="text-xs opacity-70 mt-1">Graph {index + 1}</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={viz.imagePath}
                      alt={viz.title}
                      className="max-w-full max-h-full object-contain border border-current rounded"
                      onLoad={() => handleImageLoad(viz.id)}
                      onError={() => handleImageError(viz.id)}
                    />
                    {loadingStates[viz.id] !== false && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="text-center">
                          <div className="animate-spin text-xl mb-1">⟳</div>
                          <p className={`${viz.color} font-bold text-sm`}>LOADING...</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                  <span className="text-white font-bold text-sm">▶ VIEW DETAILS</span>
                </div>
              </div>
              
              {/* Stats Footer */}
              <div className="p-3 border-t border-current bg-black bg-opacity-30">
                <p className="text-xs mb-2 opacity-90 leading-tight">{viz.description}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {Object.entries(viz.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={`font-bold ${viz.color} text-xs`}>{value}</div>
                      <div className="opacity-70 text-xs">{key.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Analysis Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-current p-6 bg-black bg-opacity-30">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-blue-400 mr-3">📊</span>
              CORRELATION ANALYSIS
            </h3>
            <div className="space-y-3">
              <div className="border-l-4 border-cyan-400 pl-4 py-2">
                <div className="font-bold text-cyan-400 text-sm">IMDB vs Sentiment</div>
                <div className="text-xs opacity-80">Rating correlation with emotional tone</div>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4 py-2">
                <div className="font-bold text-yellow-400 text-sm">IMDB vs Degree</div>
                <div className="text-xs opacity-80">Connection impact on viewer ratings</div>
              </div>
            </div>
          </div>
          
          <div className="border border-current p-6 bg-black bg-opacity-30">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-purple-400 mr-3">🕸️</span>
              NETWORK CENTRALITY
            </h3>
            <div className="space-y-3">
              <div className="border-l-4 border-green-400 pl-4 py-2">
                <div className="font-bold text-green-400 text-sm">Eigenvector Centrality</div>
                <div className="text-xs opacity-80">Influence within the network</div>
              </div>
              <div className="border-l-4 border-purple-400 pl-4 py-2">
                <div className="font-bold text-purple-400 text-sm">Betweenness Centrality</div>
                <div className="text-xs opacity-80">Bridge episodes in narrative flow</div>
              </div>
              <div className="border-l-4 border-red-400 pl-4 py-2">
                <div className="font-bold text-red-400 text-sm">Reverse Degree</div>
                <div className="text-xs opacity-80">Standalone episode identification</div>
              </div>
              <div className="border-l-4 border-orange-400 pl-4 py-2">
                <div className="font-bold text-orange-400 text-sm">Out-Degree Analysis</div>
                <div className="text-xs opacity-80">Foreshadowing hub episodes</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Summary */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-green-400 mr-3">&gt;&gt;</span>
            DATASET SUMMARY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-cyan-400 p-4 bg-cyan-900 bg-opacity-20 rounded text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">40</div>
              <div className="text-xs">EPISODES</div>
            </div>
            <div className="border border-yellow-400 p-4 bg-yellow-900 bg-opacity-20 rounded text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">157</div>
              <div className="text-xs">CONNECTIONS</div>
            </div>
            <div className="border border-green-400 p-4 bg-green-900 bg-opacity-20 rounded text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">6</div>
              <div className="text-xs">VISUALIZATIONS</div>
            </div>
            <div className="border border-purple-400 p-4 bg-purple-900 bg-opacity-20 rounded text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">4</div>
              <div className="text-xs">METRICS</div>
            </div>
          </div>
        </div>
        
        {/* Analysis Status */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-4 border-2 border-green-400 px-8 py-4 bg-green-900 bg-opacity-20 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-mono font-bold">COMPREHENSIVE DATA ANALYSIS COMPLETE</span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
      </div>
      
      {/* Image Modal */}
      {selectedViz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4">
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            {/* Modal Header */}
            <div className={`flex justify-between items-center mb-4 p-4 border-2 ${selectedViz.borderColor} ${selectedViz.bgColor} rounded-lg`}>
              <div className="flex items-center">
                <span className="text-3xl mr-4">{selectedViz.icon}</span>
                <div>
                  <h2 className={`text-2xl font-bold ${selectedViz.color}`}>
                    {selectedViz.title.toUpperCase()}
                  </h2>
                  <p className="opacity-70">{selectedViz.description}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="theme-button px-4 py-2"
              >
                ✕ CLOSE
              </button>
            </div>
            
            {/* Modal Image */}
            <div className="border-2 border-current bg-black rounded-lg p-4">
              <img
                src={selectedViz.imagePath}
                alt={selectedViz.title}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto border border-current rounded"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="border-t-2 border-current p-6 mt-12 bg-black bg-opacity-50">
        <div className="max-w-7xl mx-auto text-center">
          <button 
            onClick={() => navigate('/gravity-falls-research')}
            className="theme-button px-8 py-4 font-mono text-lg hover:bg-current hover:text-black transition-all"
          >
            &gt; RETURN TO RESEARCH HUB
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPage;