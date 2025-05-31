import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
// All icons now use custom images
import SectionTitle from './common/SectionTitle';
import { SECTION_IDS } from '../constants';

const features = [
  {
    id: 'gasless-ai',
    title: 'NeuroVisualizer',
    subtitle: 'Contract-to-Wallet Flow Visualizer',
    icon: <img src="https://i.ibb.co/tMtGY8g9/Neuro-icon-1-2.png" alt="NeuroVisualizer Icon" style={{ width: 58, height: 58, display: 'block', margin: '0 auto' }} />,
    description: 'See real-time buy and sell activity flow between contracts and wallets. Neuro Visualizer maps every transaction with live edge updates and identity tagging, letting you visually see holders and their live actions.',
    points: [
      'Track wallet inflows and outflows in real time',
      'Identify and tag wallets: sniper, whale, team, bot',
      'Pin wallets and set alerts for repeated patterns'
    ],
    color: 'from-purple-500/30 to-indigo-600/30'
  },
  {
    id: 'ai-scanner',
    title: 'NeuroSwap',
    subtitle: 'On-Terminal Swap Execution',
    icon: <img src="https://i.ibb.co/nqGw9XHL/Neuro-icon-2-2.png" alt="NeuroSwap Icon" style={{ width: 58, height: 58, display: 'block', margin: '0 auto' }} />,
    description: 'Trade directly inside the terminal, no redirects, no delays. NeuroSwap routes through multiple DEXs with slippage control and pre-trade risk checks to ensure execution clarity.',
    points: [
      'Execute swaps instantly from token pages',
      'Built-in LP lock, honeypot, and contract risk scoring',
      'Multi-DEX routing with price optimization'
    ],
    color: 'from-blue-500/30 to-cyan-600/30'
  },
  {
    id: 'ai-agent-protocol',
    title: 'Neuro AI Agent Protocol',
    subtitle: 'Rule-Based Strategy Automation',
    icon: <img src="https://i.ibb.co/rfvWvmWZ/Neuro-icon-3.png" alt="Neuro AI Agent Protocol Icon" style={{ width: 58, height: 58, display: 'block', margin: '0 auto' }} />,
    description: 'Create and deploy AI agents that react to wallet flows, sentiment spikes, or technical signals. No code, just logic. Execute trades or trigger alerts automatically.',
    points: [
      'Visual logic builder using IF/THEN conditions',
      'Trigger actions from wallet flow + sentiment',
      'Stake to run agents and monetize in the marketplace'
    ],
    color: 'from-amber-500/30 to-yellow-600/30'
  },
  {
    id: 'x-tracker',
    title: 'Neuro Social Sentiment Tracking',
    subtitle: 'Token-Level Narrative Monitoring',
    icon: <img src="https://i.ibb.co/rGxvFvC6/Neuro-icon-4.png" alt="Neuro Social Sentiment Tracking Icon" style={{ width: 58, height: 58, display: 'block', margin: '0 auto' }} />,
    description: 'Track token-specific social momentum from X (Twitter) in real time. Neuro surfaces trending posts, influencer chatter, and sentiment shifts before they move the chart.',
    points: [
      'AI-ranked sentiment feed (bullish, neutral, bearish)',
      'Tracks hashtags, KOL mentions, and volume surges',
      'Sentiment overlays embedded directly into token view'
    ],
    color: 'from-teal-500/30 to-emerald-600/30'
  }
];

const FeatureShowcaseSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lockExpanded, setLockExpanded] = useState<boolean>(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const handleCardInteraction = (id: string) => {
    // Toggle expanded state
    if (!lockExpanded) {
      setExpandedId(expandedId === id ? null : id);
    }
  };
  
  // Dedicated function for handling button clicks to improve reliability
  const handleLearnMoreClick = (e: React.MouseEvent, featureId: string) => {
    e.stopPropagation();
    // Ensure the card stays expanded when clicking the button
    setExpandedId(featureId);
    
    // If on desktop, briefly lock expanded state to prevent flickering
    if (window.innerWidth >= 768) {
      setLockExpanded(true);
      // Increase timeout duration for more reliable clicking
      setTimeout(() => setLockExpanded(false), 300);
    }
  };

  return (
    <section 
      ref={ref} 
      id={SECTION_IDS.FEATURES} 
      className="relative py-20 overflow-hidden bg-transparent"
    >
      {/* Ambient circuit patterns */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-gradient-to-r from-transparent via-neuro-deep-600/30 to-transparent h-px"
            style={{
              width: `${Math.random() * 30 + 20}%`,
              left: `${Math.random() * 70}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
        
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-gradient-to-b from-transparent via-neuro-deep-600/30 to-transparent w-px"
            style={{
              height: `${Math.random() * 30 + 20}%`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
            }}
          ></div>
        ))}
        
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-neuro-deep-600 opacity-30"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(107,63,175,0.4)',
            }}
          ></div>
        ))}
      </div>
      
      <SectionTitle 
        title="Core Features" 
        subtitle="Powerful AI Tools for Crypto"
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-neuro-deep-600 rounded-full w-1 h-1 opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -30 - 20],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          ></motion.div>
        ))}
      </div>
      
      {/* Feature cards container */}
      <div className="relative mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:h-[520px] gap-4 md:gap-6">
          {features.map((feature) => {
            const isExpanded = expandedId === feature.id;
            const isAnyExpanded = expandedId !== null;
            const isShrunk = isAnyExpanded && !isExpanded;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0,
                  flex: isExpanded ? 3 : (isShrunk ? 0.8 : 1),
                  filter: isShrunk ? 'brightness(0.7)' : 'brightness(1)'
                } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + features.findIndex(f => f.id === feature.id) * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                onClick={() => handleCardInteraction(feature.id)}
                onMouseEnter={() => window.innerWidth >= 768 && !lockExpanded && setExpandedId(feature.id)}
                onMouseLeave={() => window.innerWidth >= 768 && !lockExpanded && setExpandedId(null)}
                className={`relative rounded-[2rem] cursor-pointer transition-all duration-500 ease-out h-full
                  ${isExpanded ? 'md:flex-[3_3_0%] md:max-w-[40%]' : 'md:flex-[1_1_0%] md:max-w-[25%]'}
                  ${isShrunk ? 'opacity-70' : 'opacity-100'}
                `}
                style={{
                  overflow: 'hidden' // Ensure no content spills outside rounded corners
                }}
              >
                <div className={`
                  relative h-full rounded-[2rem] overflow-hidden transition-all duration-500
                  ${isExpanded 
                    ? 'border border-neuro-deep-600/50 shadow-[0_0_30px_rgba(107,63,175,0.25)]' 
                    : 'border border-neuro-deep-600/30 shadow-lg hover:border-neuro-deep-600/40 hover:shadow-[0_0_20px_rgba(107,63,175,0.2)]'}
                  ${window.innerWidth < 768 ? 'min-h-[400px]' : ''}
                `}
                style={{
                  borderRadius: '2rem', // Explicit border-radius to match parent
                  overflow: 'hidden' // Ensure no content spills outside rounded corners
                }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 z-0 rounded-[2rem] overflow-hidden">
                    {/* Dynamic gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20`}></div>
                    
                    {/* Neural network pattern */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute rounded-full bg-white"
                          style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.3,
                          }}
                        ></div>
                      ))}
                      
                      {[...Array(10)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute bg-gradient-to-r from-transparent via-white to-transparent h-px"
                          style={{
                            width: `${Math.random() * 30 + 20}%`,
                            left: `${Math.random() * 70}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.3 + 0.1,
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Dark overlay for better readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neuro-black/90 via-neuro-black/80 to-neuro-black/90 opacity-90 rounded-[2rem]"></div>
                  </div>
                  
                  {/* Content container */}
                  <div className="relative z-10 h-full flex flex-col pt-6 pr-6 pb-1.5 pl-6 justify-between">
                    {/* Icon */}
                    <div className={`flex items-start ${isExpanded ? 'mb-3' : 'mb-8'}`}>
                      <div className={`rounded-[1rem] ${isExpanded ? 'scale-200' : 'scale-100'} transition-transform duration-500 transform-origin-center`}>
                        <div className="text-[#EAEAEA]">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Title always visible */}
                    <h3 className={`text-2xl font-bold text-white mb-2 transition-all duration-300 
                      ${isExpanded ? 'text-neuro-purple-200' : 'text-white'}`
                    }>
                      {feature.title}
                    </h3>
                    
                    {/* Subtitle always visible */}
                    <p className="text-gray-300 mb-4">{feature.subtitle}</p>
                    
                    {/* Mobile toggle indicator */}
                    <div className="md:hidden flex justify-end">
                      <ArrowRight className={`h-5 w-5 text-neuro-deep-600 transition-transform duration-300 
                        ${isExpanded ? 'rotate-90' : 'rotate-0'}`} 
                      />
                    </div>
                    
                    {/* Expanded content */}
                    <AnimatePresence>
                      {(isExpanded || window.innerWidth < 768) && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: isExpanded ? 1 : 0,
                            height: isExpanded ? 'auto' : 0,
                            marginTop: isExpanded ? '1rem' : '0'
                          }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-300 mb-6">{feature.description}</p>
                          
                          <ul className="space-y-3">
                            {feature.points.map((point, index) => (
                              <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                                className="flex items-start"
                              >
                                <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-neuro-deep-600 to-neuro-deep-700 mt-2 mr-2 shadow-[0_0_4px_rgba(107,63,175,0.6)]"></span>
                                <span className="text-gray-300">{point}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {/* Centered button container with margin-top auto to push to bottom */}
                          <div className="flex justify-center items-center mt-auto pt-4 pb-2">
                            <a 
                              href="https://neuroteams-organization.gitbook.io/neurolabs-lite-paper./introduction/key-features" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => handleLearnMoreClick(e, feature.id)}
                              className="group relative px-6 py-3 rounded-full text-[#EAEAEA] font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105"
                              style={{
                                background: 'linear-gradient(to right, rgba(107,63,175,0.2), rgba(107,63,175,0.4), rgba(107,63,175,0.2))',
                                boxShadow: '0 0 15px rgba(107,63,175,0.4), 0 0 30px rgba(107,63,175,0.2), inset 0 0 10px rgba(107,63,175,0.3)'
                              }}
                            >
                              {/* Subtle inner highlight */}
                              <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
                              
                              {/* Button text */}
                              <span className="relative z-10 flex items-center">
                                <span>Learn More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Enhanced decorative elements with gradient colors */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neuro-deep-600/50 to-transparent rounded-b-[2rem]"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-neuro-deep-600/40 to-transparent rounded-tr-[2rem] rounded-br-[2rem]"></div>
                    
                    {/* Additional glow effect with matched border radius */}
                    {isExpanded && (
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-neuro-deep-500/5 via-neuro-deep-600/10 to-neuro-deep-700/5 shadow-inner"></div>
                    )}
                    
                    {/* Overlay on hover to prevent rectangular outline */}
                    <div className="absolute inset-0 rounded-[2rem] pointer-events-none transition-opacity duration-300 opacity-0 hover:opacity-5 bg-gradient-to-br from-neuro-deep-500 via-neuro-deep-600 to-neuro-deep-700"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcaseSection;