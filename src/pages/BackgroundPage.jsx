import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

/**
 * BackgroundPage - Series background with interactive elements
 * Features image gallery and animated content sections
 */
const BackgroundPage = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // Set theme
  useEffect(() => {
    setTheme('gravity-falls');
  }, [setTheme]);
  
  // Animate sections appearing
  useEffect(() => {
    const timeouts = [];
    ['intro', 'why', 'mysteries'].forEach((section, index) => {
      timeouts.push(setTimeout(() => {
        setVisibleSections(prev => new Set([...prev, section]));
      }, (index + 1) * 800));
    });
    
    return () => timeouts.forEach(clearTimeout);
  }, []);
  
  const images = [
    {
      id: 'cast',
      src: 'https://image.tmdb.org/t/p/original/cvJPd911PMS7cY8ajwZlnF0xClj.jpg',
      alt: 'Gravity Falls Main Characters',
      credit: 'Image credit: TMDB',
      description: 'The main cast including Dipper, Mabel, and Grunkle Stan'
    },
    {
      id: 'bill',
      src: '/GravityFallsResearchAssets/coolBillPic.jpg',
      alt: 'Bill Cipher mysteries',
      credit: 'Image credit: vrogue.co',
      description: 'Cryptographic elements and mystery symbols from the series'
    }
  ];
  
  const showFeatures = [
    {
      icon: '🎭',
      title: 'Sophisticated Storytelling',
      description: 'Complex narrative structure with mature themes',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900 bg-opacity-20',
      borderColor: 'border-cyan-400'
    },
    {
      icon: '🔮',
      title: 'Extensive Foreshadowing', 
      description: 'Carefully planted clues that pay off episodes later',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900 bg-opacity-20',
      borderColor: 'border-yellow-400'
    },
    {
      icon: '🧩',
      title: 'Interconnected Plotlines',
      description: 'Episodes that build upon each other narratively',
      color: 'text-green-400',
      bgColor: 'bg-green-900 bg-opacity-20', 
      borderColor: 'border-green-400'
    },
    {
      icon: '🎓',
      title: 'Academic Study Value',
      description: 'Rich material for narrative analysis research',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900 bg-opacity-20',
      borderColor: 'border-purple-400'
    }
  ];
  
  const mysteryElements = [
    { icon: '👁️', text: 'Visual Easter Eggs', detail: 'Hidden symbols in background art' },
    { icon: '🔐', text: 'Cryptographic Puzzles', detail: 'Encoded messages throughout episodes' },
    { icon: '📖', text: 'Symbolic References', detail: 'Meaningful imagery with future significance' },
    { icon: '📚', text: 'Journal Documentation', detail: 'Central mystery around supernatural journals' }
  ];
  
  const openImageModal = (image) => {
    setSelectedImage(image);
  };
  
  const closeImageModal = () => {
    setSelectedImage(null);
  };
  
  return (
    <div className="min-h-screen bg-black theme-ui-text font-mono">
      {/* Header */}
      <div className="border-b-2 border-current p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-green-400">&gt;</span> RESEARCH BACKGROUND
            </h1>
            <p className="text-sm opacity-70">
              Series Context & Analysis Rationale
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
        
        {/* Introduction Section */}
        <div className={`border border-current p-8 bg-black bg-opacity-30 transition-all duration-1000 ${
          visibleSections.has('intro') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-green-400 mr-3">&gt;&gt;</span>
            SERIES OVERVIEW
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-4">
                <span className="text-yellow-400 font-bold">Gravity Falls</span> is a critically acclaimed animated series created by 
                <span className="text-cyan-400 font-bold"> Alex Hirsch</span> that aired from 
                <span className="text-green-400 font-bold"> 2012 to 2016</span>. The show follows twins 
                <span className="text-red-400 font-bold"> Dipper and Mabel Pines</span> as they spend their summer with their 
                great-uncle Stan in the mysterious town of Gravity Falls, Oregon.
              </p>
              <div className="border-l-4 border-green-400 pl-4 py-2 bg-green-900 bg-opacity-10">
                <p className="text-sm opacity-90">
                  The series combines <span className="text-yellow-400">supernatural mystery</span> with 
                  <span className="text-cyan-400"> coming-of-age themes</span>, creating a unique narrative experience 
                  that appeals to both children and adults.
                </p>
              </div>
            </div>
            
            {/* First Image */}
            <div className="relative">
              <div 
                className="border-2 border-current bg-black bg-opacity-20 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => openImageModal(images[0])}
              >
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="w-full h-auto max-h-64 object-contain mx-auto border border-current rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden flex-col items-center justify-center h-64 text-center">
                  <div className="text-4xl mb-2">⚠</div>
                  <p className="text-red-400 font-bold">IMAGE FAILED TO LOAD</p>
                  <p className="text-xs opacity-70 mt-1">TMDB Cast Image</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 hover:opacity-100 rounded-lg">
                  <span className="text-white font-bold">▶ EXPAND IMAGE</span>
                </div>
              </div>
              <p className="text-center text-xs opacity-70 mt-2">{images[0].credit}</p>
            </div>
          </div>
        </div>
        
        {/* Why Analyze Section */}
        <div className={`border border-current p-8 bg-black bg-opacity-30 transition-all duration-1000 ${
          visibleSections.has('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-blue-400 mr-3">&gt;&gt;</span>
            WHY ANALYZE GRAVITY FALLS?
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            The series is renowned for its <span className="text-cyan-400 font-bold">sophisticated storytelling</span> and 
            <span className="text-yellow-400 font-bold"> complex narrative structure</span> that rewards careful analysis. 
            Unlike typical animated shows, Gravity Falls employs extensive foreshadowing and interconnected plotlines that 
            make it ideal for academic study.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`border-2 ${feature.borderColor} ${feature.bgColor} p-6 rounded-lg hover:scale-105 transition-all duration-300`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className={`text-lg font-bold ${feature.color} mb-3 text-center`}>
                  {feature.title}
                </h3>
                <p className="text-sm opacity-80 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mysteries Section */}
        <div className={`border border-current p-8 bg-black bg-opacity-30 transition-all duration-1000 ${
          visibleSections.has('mysteries') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-purple-400 mr-3">&gt;&gt;</span>
            MYSTERIES AND FORESHADOWING
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Gravity Falls contains numerous <span className="text-cyan-400 font-bold">embedded clues</span> and 
                <span className="text-yellow-400 font-bold"> hidden messages</span> throughout episodes. The central mystery 
                revolves around <span className="text-red-400 font-bold">supernatural journals</span> documenting strange 
                phenomena in the town.
              </p>
              
              <div className="space-y-4">
                {mysteryElements.map((element, index) => (
                  <div 
                    key={element.text}
                    className="border border-purple-400 p-4 bg-purple-900 bg-opacity-20 rounded-lg hover:bg-purple-900 hover:bg-opacity-30 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{element.icon}</span>
                      <div>
                        <h4 className="font-bold text-purple-400">{element.text}</h4>
                        <p className="text-sm opacity-80">{element.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-l-4 border-red-400 pl-6 py-4 bg-red-900 bg-opacity-10">
                <p className="text-lg leading-relaxed">
                  The show's mysteries are <span className="text-green-400 font-bold">carefully woven</span> throughout the series, 
                  with seemingly minor details in early episodes becoming 
                  <span className="text-yellow-400 font-bold"> crucial plot points</span> later, creating a viewing experience 
                  where episodes are <span className="text-cyan-400 font-bold">deeply interconnected</span> through narrative threads.
                </p>
              </div>
            </div>
            
            {/* Second Image */}
            <div className="relative">
              <div 
                className="border-2 border-current bg-black bg-opacity-20 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => openImageModal(images[1])}
              >
                <img
                  src={images[1].src}
                  alt={images[1].alt}
                  className="w-full h-auto max-h-96 object-contain mx-auto border border-current rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden flex-col items-center justify-center h-96 text-center">
                  <div className="text-4xl mb-2">⚠</div>
                  <p className="text-red-400 font-bold">IMAGE FAILED TO LOAD</p>
                  <p className="text-xs opacity-70 mt-1">Bill Cipher Image</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 hover:opacity-100 rounded-lg">
                  <span className="text-white font-bold">▶ EXPAND IMAGE</span>
                </div>
              </div>
              <p className="text-center text-xs opacity-70 mt-2">{images[1].credit}</p>
            </div>
          </div>
        </div>
        
        {/* Series Stats */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-green-400 mr-3">&gt;&gt;</span>
            SERIES STATISTICS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border border-cyan-400 p-4 bg-cyan-900 bg-opacity-20 rounded text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">2012-2016</div>
              <div className="text-xs">AIR DATES</div>
            </div>
            <div className="border border-yellow-400 p-4 bg-yellow-900 bg-opacity-20 rounded text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">40</div>
              <div className="text-xs">TOTAL EPISODES</div>
            </div>
            <div className="border border-green-400 p-4 bg-green-900 bg-opacity-20 rounded text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">2</div>
              <div className="text-xs">SEASONS</div>
            </div>
            <div className="border border-purple-400 p-4 bg-purple-900 bg-opacity-20 rounded text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">∞</div>
              <div className="text-xs">MYSTERIES</div>
            </div>
          </div>
        </div>
        
        {/* Research Context */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-4 border-2 border-blue-400 px-8 py-4 bg-blue-900 bg-opacity-20 rounded-lg">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-mono font-bold">BACKGROUND ESTABLISHED • READY FOR ANALYSIS</span>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4">
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <div className="flex justify-between items-center mb-4 p-4 border-2 border-current bg-black bg-opacity-50 rounded-lg">
              <div>
                <h2 className="text-xl font-bold text-green-400">
                  {selectedImage.alt.toUpperCase()}
                </h2>
                <p className="text-sm opacity-70">{selectedImage.description}</p>
                <p className="text-xs opacity-50 mt-1">{selectedImage.credit}</p>
              </div>
              <button
                onClick={closeImageModal}
                className="theme-button px-4 py-2"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="border-2 border-current bg-black rounded-lg p-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
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

export default BackgroundPage;