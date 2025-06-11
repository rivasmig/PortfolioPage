import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

/**
 * DataPage - Interactive data visualization gallery
 * Showcases research visualizations with terminal aesthetics
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
      id: 'network',
      title: 'Episode Network',
      subtitle: 'Connection Topology',
      description: 'Complete network visualization showing all episode connections and their relative strengths',
      imagePath: '/GravityFallsResearchAssets/GF_Degree.png',
      icon: '🕸️',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900 bg-opacity-20',
      borderColor: 'border-cyan-400',
      stats: {
        nodes: '40 Episodes',
        edges: '157 Connections', 
        density: '0.203'
      }
    },
    {
      id: 'centrality',
      title: 'Centrality Analysis',
      subtitle: 'Importance Metrics',
      description: 'Centrality scores for each episode showing their relative importance in the network',
      imagePath: '/GravityFallsResearchAssets/GF_Degree.png',
      icon: '📈',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900 bg-opacity-20',
      borderColor: 'border-yellow-400',
      stats: {
        metric: 'Betweenness',
        highest: 'Not What He Seems',
        score: '0.847'
      }
    },
    {
      id: 'distribution',
      title: 'Degree Distribution',
      subtitle: 'Connection Patterns',
      description: 'Distribution of incoming and outgoing connections across all episodes',
      imagePath: '/GravityFallsResearchAssets/GF_Degree.png',
      icon: '📊',
      color: 'text-green-400',
      bgColor: 'bg-green-900 bg-opacity-20',
      borderColor: 'border-green-400',
      stats: {
        avgDegree: '7.85',
        maxIn: '12',
        maxOut: '15'
      }
    },
    {
      id: 'timeline',
      title: 'Timeline Connectivity',
      subtitle: 'Temporal Flow',
      description: 'Episode connections mapped across the series timeline showing narrative flow',
      imagePath: '/GravityFallsResearchAssets/GF_Degree.png',
      icon: '⏱️',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900 bg-opacity-20',
      borderColor: 'border-purple-400',
      stats: {
        timespan: '2 Seasons',
        peaks: '3 Major Arcs',
        flow: 'Forward-Heavy'
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
            DATA VISUALIZATION SUITE
          </h2>
          <p className="text-lg leading-relaxed">
            Our analysis produced several key visualizations showing the 
            <span className="text-cyan-400 font-bold"> network structure</span> of Gravity Falls episodes and their 
            <span className="text-yellow-400 font-bold"> interconnections</span>. Each visualization reveals different aspects 
            of the narrative connectivity within the series.
          </p>
        </div>
        
        {/* Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {visualizations.map((viz, index) => (
            <div 
              key={viz.id}
              className={`border-2 ${viz.borderColor} ${viz.bgColor} rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer`}
              onClick={() => openModal(viz)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Viz Header */}
              <div className={`${viz.bgColor} p-4 border-b ${viz.borderColor} flex items-center justify-between`}>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{viz.icon}</span>
                  <div>
                    <h3 className={`text-xl font-bold ${viz.color}`}>
                      {viz.title.toUpperCase()}
                    </h3>
                    <p className="text-sm opacity-70">{viz.subtitle}</p>
                  </div>
                </div>
                <div className="text-sm opacity-70">
                  CLICK TO EXPAND
                </div>
              </div>
              
              {/* Image Container */}
              <div className="relative h-64 bg-black bg-opacity-50 flex items-center justify-center">
                {loadingStates[viz.id] === 'error' ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚠</div>
                    <p className="text-red-400 font-bold">IMAGE FAILED TO LOAD</p>
                    <p className="text-xs opacity-70 mt-1">GF_Degree.png</p>
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
                          <div className="animate-spin text-2xl mb-2">⟳</div>
                          <p className={`${viz.color} font-bold`}>LOADING...</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                  <span className="text-white font-bold text-lg">▶ VIEW DETAILS</span>
                </div>
              </div>
              
              {/* Stats Footer */}
              <div className="p-4 border-t border-current bg-black bg-opacity-30">
                <p className="text-sm mb-3 opacity-90">{viz.description}</p>
                <div className="flex justify-between text-xs">
                  {Object.entries(viz.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={`font-bold ${viz.color}`}>{value}</div>
                      <div className="opacity-70">{key.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Data Summary */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-blue-400 mr-3">&gt;&gt;</span>
            DATASET SUMMARY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-cyan-400 p-6 bg-cyan-900 bg-opacity-20 rounded text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">40</div>
              <div className="text-sm">EPISODES ANALYZED</div>
            </div>
            <div className="border border-yellow-400 p-6 bg-yellow-900 bg-opacity-20 rounded text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">157</div>
              <div className="text-sm">CONNECTIONS MAPPED</div>
            </div>
            <div className="border border-green-400 p-6 bg-green-900 bg-opacity-20 rounded text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">4</div>
              <div className="text-sm">ANALYSIS DIMENSIONS</div>
            </div>
          </div>
        </div>
        
        {/* Analysis Status */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-4 border-2 border-green-400 px-8 py-4 bg-green-900 bg-opacity-20 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-mono font-bold">DATA VISUALIZATION COMPLETE</span>
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