import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

/**
 * DiscussionPage - Results analysis with interactive accuracy visualization
 * Shows the success/failure breakdown with terminal aesthetics
 */
const DiscussionPage = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [animateAccuracy, setAnimateAccuracy] = useState(false);
  
  // Set theme
  useEffect(() => {
    setTheme('gravity-falls');
  }, [setTheme]);
  
  // Trigger accuracy animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setAnimateAccuracy(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const correctPredictions = [
    "Tourist Trapped",
    "Society of the Blind Eye", 
    "Not What He Seems",
    "Weirdmageddon Part 3",
    "Double Dipper",
    "Dreamscaperers"
  ];
  
  const incorrectPredictions = [
    "The Time-Traveler's Pig",
    "A Tale of Two Stans",
    "Gideon Rises", 
    "Northwest Mansion Mystery",
    "Roadside Attraction",
    "The Golf War",
    "The Deep End",
    "Dipper and Mabel vs. The Future",
    "Scary-oke",
    "Sock Opera"
  ];
  
  const futureDirections = [
    {
      title: "Data-Driven Alignment Chart",
      description: "Map new classification based on collected data",
      icon: "📊"
    },
    {
      title: "External Database Cross-Reference", 
      description: "Integrate with IMDB and other sources",
      icon: "🔗"
    },
    {
      title: "Timeline Visualization",
      description: "Graph connections linearly across series",
      icon: "⏱️"
    },
    {
      title: "Extended Universe Integration",
      description: "Include Journal 3, Book of Bill, shorts, ARGs",
      icon: "📚"
    },
    {
      title: "Cross-Series Analysis",
      description: "Rick and Morty, Simpsons connections",
      icon: "🌌"
    }
  ];
  
  return (
    <div className="min-h-screen bg-black theme-ui-text font-mono">
      {/* Header */}
      <div className="border-b-2 border-current p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-green-400">&gt;</span> RESEARCH DISCUSSION
            </h1>
            <p className="text-sm opacity-70">
              Analysis Results & Future Directions
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
        
        {/* Analysis Results Overview */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-green-400 mr-3">&gt;&gt;</span>
            ANALYSIS RESULTS
          </h2>
          <div className="border-l-4 border-blue-400 pl-6 py-4 bg-blue-900 bg-opacity-10">
            <p className="text-lg leading-relaxed mb-4">
              Taking the entire series into our data set and processing it, we mapped 
              <span className="text-cyan-400 font-bold"> prerequisites</span>, 
              <span className="text-yellow-400 font-bold"> reliants</span>, 
              <span className="text-green-400 font-bold"> independence</span>, and 
              <span className="text-red-400 font-bold"> centrality</span> using 
              degrees out, degrees in, inverted degree value, and betweenness, respectively.
            </p>
            <div className="border border-yellow-400 p-4 bg-yellow-900 bg-opacity-20 rounded">
              <p className="text-yellow-400 font-bold">
                Our hypothesis was only partially correct.
              </p>
            </div>
          </div>
        </div>
        
        {/* Results Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Correct Predictions */}
          <div className="border-2 border-green-400 bg-green-900 bg-opacity-20 rounded-lg overflow-hidden">
            <div className="bg-green-400 bg-opacity-20 p-4 border-b border-green-400">
              <h3 className="text-xl font-bold text-green-400 flex items-center">
                <span className="mr-2">✓</span>
                CORRECTLY PREDICTED EPISODES
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {correctPredictions.map((episode, index) => (
                <div 
                  key={episode}
                  className="border border-green-400 p-3 bg-black bg-opacity-50 rounded hover:bg-green-900 hover:bg-opacity-30 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3 font-bold">✓</span>
                    <span className="text-green-300">{episode}</span>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-green-400 text-center">
                <span className="text-green-400 font-bold text-lg">
                  SUCCESS COUNT: {correctPredictions.length}
                </span>
              </div>
            </div>
          </div>
          
          {/* Incorrect Predictions */}
          <div className="border-2 border-red-400 bg-red-900 bg-opacity-20 rounded-lg overflow-hidden">
            <div className="bg-red-400 bg-opacity-20 p-4 border-b border-red-400">
              <h3 className="text-xl font-bold text-red-400 flex items-center">
                <span className="mr-2">✗</span>
                INCORRECTLY PREDICTED EPISODES
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {incorrectPredictions.map((episode, index) => (
                <div 
                  key={episode}
                  className="border border-red-400 p-3 bg-black bg-opacity-50 rounded hover:bg-red-900 hover:bg-opacity-30 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center">
                    <span className="text-red-400 mr-3 font-bold">✗</span>
                    <span className="text-red-300">{episode}</span>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-red-400 text-center">
                <span className="text-red-400 font-bold text-lg">
                  FAILURE COUNT: {incorrectPredictions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Accuracy Visualization */}
        <div className="border-2 border-yellow-400 bg-yellow-900 bg-opacity-20 rounded-lg overflow-hidden">
          <div className="bg-yellow-400 bg-opacity-20 p-4 border-b border-yellow-400">
            <h3 className="text-xl font-bold text-yellow-400 text-center flex items-center justify-center">
              <span className="mr-2">📊</span>
              ACCURACY ANALYSIS
              <span className="ml-2">📊</span>
            </h3>
          </div>
          <div className="p-8">
            <div className="text-center mb-8">
              <div className={`text-8xl font-bold text-yellow-400 font-mono mb-4 transition-all duration-2000 ${
                animateAccuracy ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}>
                37.5%
              </div>
              <p className="text-xl text-yellow-400 font-bold">
                OVERALL PREDICTION ACCURACY
              </p>
            </div>
            
            {/* Visual accuracy bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-bold">CORRECT</span>
                <span className="text-red-400 font-bold">INCORRECT</span>
              </div>
              <div className="w-full h-8 bg-red-400 bg-opacity-30 rounded-lg overflow-hidden">
                <div 
                  className={`h-full bg-green-400 bg-opacity-80 transition-all duration-3000 ease-out ${
                    animateAccuracy ? 'w-[37.5%]' : 'w-0'
                  }`}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-green-400">6 episodes</span>
                <span className="text-red-400">10 episodes</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Methodology Critique */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-red-400 mr-3">&gt;&gt;</span>
            METHODOLOGY ASSESSMENT
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-red-400 pl-6 py-4 bg-red-900 bg-opacity-10">
              <p className="text-lg leading-relaxed">
                Given the relative importance and unimportance of certain episodes to the plot, I think this calls into question the 
                <span className="text-red-400 font-bold"> methodology of our analysis procedures</span>, and specifically how 
                <span className="text-yellow-400 font-bold">[poorly]</span> it aligned with our initial assertion.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-400 pl-6 py-4 bg-blue-900 bg-opacity-10">
              <p className="text-lg leading-relaxed">
                As it turns out, <span className="text-cyan-400 font-bold">tracking random background references</span> between episodes is 
                <span className="text-red-400 font-bold">not a good indication</span> of the flow and progression of an episodic storyline.
              </p>
            </div>
            
            <div className="border-l-4 border-green-400 pl-6 py-4 bg-green-900 bg-opacity-10">
              <p className="text-lg leading-relaxed">
                That being said, this dataset has resulted in a <span className="text-green-400 font-bold">detailed compilation of foreshadowing, 
                callbacks, and instances of continuity</span> between episodes of Gravity Falls. One potential use for this data would be to determine 
                what these connections of continuity can tell us about <span className="text-yellow-400 font-bold">storytelling</span>.
              </p>
            </div>
          </div>
        </div>
        
        {/* Future Research Directions */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-purple-400 mr-3">&gt;&gt;</span>
            FUTURE RESEARCH DIRECTIONS
          </h2>
          <p className="text-lg mb-6 opacity-90">
            To flesh out our research, we could additionally explore the following avenues:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureDirections.map((direction, index) => (
              <div 
                key={direction.title}
                className="border border-purple-400 p-6 bg-purple-900 bg-opacity-20 rounded-lg hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4 text-center">{direction.icon}</div>
                <h4 className="text-lg font-bold text-purple-400 mb-3 text-center">
                  {direction.title}
                </h4>
                <p className="text-sm opacity-80 text-center leading-relaxed">
                  {direction.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 border-t border-current pt-6">
            <div className="border-l-4 border-purple-400 pl-6 py-4 bg-purple-900 bg-opacity-10">
              <p className="text-lg leading-relaxed">
                Extended analysis could include <span className="text-cyan-400 font-bold">apocryphal print publications</span> and graphic novels, 
                <span className="text-yellow-400 font-bold">Journal 3</span> and <span className="text-red-400 font-bold">The Book of Bill</span>, 
                the shorts, the ARGs, and entirely separate shows like <span className="text-green-400 font-bold">Rick and Morty</span> and 
                <span className="text-blue-400 font-bold">The Simpsons</span> which tie directly or indirectly into the post-show plotline and 
                Bill's revival.
              </p>
            </div>
          </div>
        </div>
        
        {/* Research Status */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-4 border-2 border-blue-400 px-8 py-4 bg-blue-900 bg-opacity-20 rounded-lg">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-mono font-bold">ANALYSIS COMPLETE • FUTURE RESEARCH IDENTIFIED</span>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
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

export default DiscussionPage;