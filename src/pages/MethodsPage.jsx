import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

/**
 * MethodsPage - Creative methodology visualization
 * Shows research process as a flowchart with terminal aesthetics
 */
const MethodsPage = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Set theme
  useEffect(() => {
    setTheme('gravity-falls');
  }, [setTheme]);
  
  // Auto-advance through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const methodologySteps = [
    {
      id: "INIT",
      title: "INITIALIZATION",
      description: "Team formation and episode distribution",
      details: "Each team member assigned 10 episodes for analysis",
      color: "text-cyan-400",
      bgColor: "bg-cyan-900 bg-opacity-20",
      borderColor: "border-cyan-400"
    },
    {
      id: "SCAN",
      title: "EPISODE SCANNING",
      description: "Systematic viewing and element identification",
      details: "Looking for foreshadowing and continuity elements",
      color: "text-yellow-400", 
      bgColor: "bg-yellow-900 bg-opacity-20",
      borderColor: "border-yellow-400"
    },
    {
      id: "LINK",
      title: "CONNECTION MAPPING",
      description: "Identifying callbacks and narrative links",
      details: "Documenting connections between episodes",
      color: "text-green-400",
      bgColor: "bg-green-900 bg-opacity-20", 
      borderColor: "border-green-400"
    },
    {
      id: "VERIFY",
      title: "VERIFICATION",
      description: "Cross-reference with external sources",
      details: "Gravity Falls wiki validation process",
      color: "text-purple-400",
      bgColor: "bg-purple-900 bg-opacity-20",
      borderColor: "border-purple-400"
    },
    {
      id: "COMPILE",
      title: "DATA COMPILATION",
      description: "Integration and conclusion formation",
      details: "Comprehensive dataset assembly",
      color: "text-red-400",
      bgColor: "bg-red-900 bg-opacity-20",
      borderColor: "border-red-400"
    }
  ];
  
  const teamMembers = ["GEORDYN", "CAM", "ZARIAN", "MIGUEL"];
  
  return (
    <div className="min-h-screen bg-black theme-ui-text font-mono">
      {/* Header */}
      <div className="border-b-2 border-current p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-green-400">&gt;</span> RESEARCH METHODOLOGY
            </h1>
            <p className="text-sm opacity-70">
              Data Collection & Analysis Protocol
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
        
        {/* Methodology Overview */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-green-400 mr-3">&gt;&gt;</span>
            PRIMARY METHODOLOGY
          </h2>
          <div className="border-l-4 border-green-400 pl-6 py-4 bg-green-900 bg-opacity-10">
            <p className="text-lg leading-relaxed">
              The main method for analyzing and collecting our data was that we each watched through <span className="text-yellow-400 font-bold">10 episodes</span>, 
              looked at any elements that would <span className="text-cyan-400 font-bold">foreshadow future events</span>, paid attention to any 
              <span className="text-red-400 font-bold">call-backs or continuity nods</span> that were featured within our 10 episodes, and integrated 
              our findings into our data, which led to our conclusion.
            </p>
          </div>
        </div>
        
        {/* Process Flowchart */}
        <div className="border-2 border-current bg-black bg-opacity-50 rounded-lg overflow-hidden">
          <div className="bg-current bg-opacity-20 p-4 border-b border-current">
            <h3 className="text-xl font-bold text-center">
              &gt; ANALYSIS WORKFLOW DIAGRAM &lt;
            </h3>
          </div>
          
          <div className="p-8">
            <div className="flex flex-wrap justify-center items-center gap-4">
              {methodologySteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Step box */}
                  <div 
                    className={`border-2 ${step.borderColor} p-4 ${step.bgColor} rounded-lg min-w-48 transition-all duration-500 ${
                      currentStep === index ? 'scale-110 shadow-lg' : 'scale-100'
                    }`}
                  >
                    <div className={`text-sm font-bold ${step.color} mb-2`}>
                      [{step.id}]
                    </div>
                    <div className="font-bold mb-2 text-sm">
                      {step.title}
                    </div>
                    <div className="text-xs opacity-80 mb-2">
                      {step.description}
                    </div>
                    <div className="text-xs opacity-60">
                      {step.details}
                    </div>
                    {currentStep === index && (
                      <div className="mt-2">
                        <div className="w-full h-1 bg-current bg-opacity-20 rounded">
                          <div className={`h-full ${step.bgColor} rounded animate-pulse`}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow connector */}
                  {index < methodologySteps.length - 1 && (
                    <div className="text-2xl text-green-400 animate-pulse">
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        {/* Team Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-current p-6 bg-black bg-opacity-30">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-yellow-400 mr-2">▶</span>
              TEAM ALLOCATION
            </h3>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={member} className="flex items-center justify-between border-b border-current pb-2">
                  <span className="font-bold text-cyan-400">{member}</span>
                  <span className="text-sm opacity-70">10 EPISODES ASSIGNED</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-current">
              <div className="text-center">
                <span className="text-green-400 font-bold">TOTAL: 40 EPISODES ANALYZED</span>
              </div>
            </div>
          </div>
          
          <div className="border border-current p-6 bg-black bg-opacity-30">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-red-400 mr-2">▶</span>
              DATA COLLECTION FOCUS
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-400 pl-4 py-2">
                <div className="font-bold text-cyan-400 text-sm">FORESHADOWING</div>
                <div className="text-xs opacity-80">Elements hinting at future events</div>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4 py-2">
                <div className="font-bold text-yellow-400 text-sm">CALLBACKS</div>
                <div className="text-xs opacity-80">References to previous episodes</div>
              </div>
              <div className="border-l-4 border-green-400 pl-4 py-2">
                <div className="font-bold text-green-400 text-sm">CONTINUITY</div>
                <div className="text-xs opacity-80">Narrative thread connections</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Visualization Placeholder */}
        <div className="border-2 border-current bg-black bg-opacity-50 rounded-lg">
          <div className="bg-current bg-opacity-20 p-4 border-b border-current">
            <h3 className="text-lg font-bold text-center">
              &gt; DATA COLLECTION PROCESS VISUALIZATION &lt;
            </h3>
          </div>
          <div className="p-8 text-center">
            <div className="border border-current p-8 bg-green-900 bg-opacity-10 rounded">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-lg font-bold text-green-400 mb-2">
                PROCESS DIAGRAM PLACEHOLDER
              </p>
              <p className="text-sm opacity-70">
                Visual representation of data collection workflow
              </p>
              <p className="text-xs opacity-50 mt-2">
                [Would contain: Team distribution → Episode analysis → Data integration]
              </p>
            </div>
          </div>
        </div>
        
        {/* Verification Process */}
        <div className="border border-current p-8 bg-black bg-opacity-30">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-purple-400 mr-3">&gt;&gt;</span>
            VERIFICATION & VALIDATION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-purple-400 pl-6 py-4 bg-purple-900 bg-opacity-10">
              <p className="text-lg leading-relaxed">
                We also looked at the <span className="text-yellow-400 font-bold">Gravity Falls wiki page</span> for any pieces of information 
                that we may have missed.
              </p>
            </div>
            <div className="border-l-4 border-green-400 pl-6 py-4 bg-green-900 bg-opacity-10">
              <p className="text-lg leading-relaxed">
                After tightening everything up, I'd say we managed to incorporate <span className="text-green-400 font-bold">practically all 
                the foreshadowing elements</span> that are found within Gravity Falls and connected media.
              </p>
            </div>
          </div>
        </div>
        
        {/* Another Visualization Placeholder */}
        <div className="border-2 border-current bg-black bg-opacity-50 rounded-lg">
          <div className="bg-current bg-opacity-20 p-4 border-b border-current">
            <h3 className="text-lg font-bold text-center">
              &gt; EPISODE ANALYSIS EXAMPLE &lt;
            </h3>
          </div>
          <div className="p-8 text-center">
            <div className="border border-current p-8 bg-blue-900 bg-opacity-10 rounded">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg font-bold text-blue-400 mb-2">
                ANALYSIS METHODOLOGY DIAGRAM
              </p>
              <p className="text-sm opacity-70">
                Detailed breakdown of episode examination process
              </p>
              <p className="text-xs opacity-50 mt-2">
                [Would show: Frame-by-frame analysis → Element tagging → Connection mapping]
              </p>
            </div>
          </div>
        </div>
        
        {/* Success Metrics */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-4 border-2 border-green-400 px-8 py-4 bg-green-900 bg-opacity-20 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg font-mono font-bold">COMPREHENSIVE DATASET ACHIEVED</span>
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

export default MethodsPage;