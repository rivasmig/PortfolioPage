import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

/**
 * HypothesisPage - Pure JSX research hypothesis page
 * Terminal-styled with interactive elements
 */
const HypothesisPage = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  
  // Set theme
  useEffect(() => {
    setTheme('gravity-falls');
  }, [setTheme]);
  
  // Episode data for the table
  const episodeData = [
    {
      prerequisites: "Tourist Trapped",
      reliants: "Not What He Seems",
      independents: "Roadside Attraction", 
      centrals: "Dipper and Mabel vs. The Future"
    },
    {
      prerequisites: "Time Traveler's Pig",
      reliants: "Weirdmageddon Part 3",
      independents: "The Golf War",
      centrals: "Dreamscaperers"
    },
    {
      prerequisites: "A Tale of Two Stans", 
      reliants: "Gideon Rises",
      independents: "Double Dipper",
      centrals: "Scary-oke"
    },
    {
      prerequisites: "Society of the Blind Eye",
      reliants: "Northwest Mansion Mystery", 
      independents: "The Deep End",
      centrals: "Sock Opera"
    }
  ];
  
  const categories = [
    {
      title: "Prerequisites",
      description: "Episodes with the most connections to later episodes and would need to be watched first to fully appreciate later episodes.",
      color: "text-cyan-400",
      bgColor: "bg-cyan-900 bg-opacity-20",
      borderColor: "border-cyan-400"
    },
    {
      title: "Reliants", 
      description: "Episodes that have the most connections to previous episodes and would require having watched previous episodes to understand.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-900 bg-opacity-20", 
      borderColor: "border-yellow-400"
    },
    {
      title: "Independents",
      description: "Episodes with few connections and could be watched independently.",
      color: "text-green-400",
      bgColor: "bg-green-900 bg-opacity-20",
      borderColor: "border-green-400"
    },
    {
      title: "Centrals",
      description: "Episodes with many connections to past and future episodes and could not easily be watched alone.",
      color: "text-red-400", 
      bgColor: "bg-red-900 bg-opacity-20",
      borderColor: "border-red-400"
    }
  ];
  
  return (
    <div className="min-h-screen bg-black theme-ui-text font-mono">
      {/* Animated header */}
      <div className="border-b-2 border-current p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold mb-2 animate-pulse">
              <span className="text-green-400">&gt;</span> RESEARCH HYPOTHESIS
            </h1>
            <p className="text-sm opacity-70">
              Episode Connectivity Analysis Framework
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
        
        {/* Introduction */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-green-400 mr-3">&gt;&gt;</span>
            ANALYSIS METHODOLOGY
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            For our analysis, we watched the show <span className="text-yellow-400 font-bold">Gravity Falls</span>, 
            well-known for its mysteries and continuity. We studied the foreshadowing within the episodes to split 
            the episodes into four main categories:
          </p>
        </div>
        
        {/* Category definitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className={`border-2 ${category.borderColor} p-6 ${category.bgColor} rounded-lg hover:scale-105 transition-transform duration-300`}
            >
              <h3 className={`text-xl font-bold mb-3 ${category.color} flex items-center`}>
                <span className="mr-2">{index + 1}.</span>
                {category.title.toUpperCase()}
              </h3>
              <p className="text-sm leading-relaxed opacity-90">
                {category.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Prediction section header */}
        <div className="border-t-2 border-current pt-8">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <span className="text-green-400">&gt;&gt;&gt;</span> EPISODE PREDICTIONS <span className="text-green-400">&lt;&lt;&lt;</span>
          </h2>
          <p className="text-center text-lg mb-8 opacity-80">
            Based on our familiarity with the show, we predicted the following episodes as the strongest 
            representatives of their respective categories.
          </p>
        </div>
        
        {/* Enhanced episode table */}
        <div className="border-2 border-current bg-black bg-opacity-50 rounded-lg overflow-hidden">
          <div className="bg-current bg-opacity-20 p-4 border-b border-current">
            <h3 className="text-xl font-bold text-center">
              &gt; EPISODE CLASSIFICATION MATRIX &lt;
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-current bg-current bg-opacity-10">
                  {categories.map((category) => (
                    <th 
                      key={category.title}
                      className={`px-6 py-4 text-left font-bold ${category.color} border-r border-current last:border-r-0`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">▶</span>
                        {category.title.toUpperCase()}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {episodeData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-current hover:bg-current hover:bg-opacity-5 transition-colors ${
                      index % 2 === 0 ? 'bg-current bg-opacity-5' : ''
                    }`}
                  >
                    <td className="px-6 py-4 border-r border-current text-cyan-300 hover:text-cyan-100">
                      {row.prerequisites}
                    </td>
                    <td className="px-6 py-4 border-r border-current text-yellow-300 hover:text-yellow-100">
                      {row.reliants}
                    </td>
                    <td className="px-6 py-4 border-r border-current text-green-300 hover:text-green-100">
                      {row.independents}
                    </td>
                    <td className="px-6 py-4 text-red-300 hover:text-red-100">
                      {row.centrals}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Expected outcomes */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-green-400 mr-3">&gt;&gt;</span>
            EXPECTED OUTCOMES
          </h2>
          <div className="border-l-4 border-green-400 pl-6 py-4 bg-green-900 bg-opacity-10">
            <p className="text-lg leading-relaxed">
              We expect this data to tell us about the <span className="text-yellow-400 font-bold">connectivity within a long-running series</span> and 
              how <span className="text-cyan-400 font-bold">objective connections between episodes</span> compare to the 
              <span className="text-red-400 font-bold">initial sentiment perceived by fans</span>.
            </p>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-4 border border-current px-8 py-4 bg-current bg-opacity-10">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono">HYPOTHESIS ESTABLISHED • READY FOR ANALYSIS</span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
      </div>
      
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

export default HypothesisPage;