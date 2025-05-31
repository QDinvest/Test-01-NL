import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PiGraphLight } from 'react-icons/pi';
import { PiGitMergeLight, PiFingerprintLight, PiWaveformLight } from 'react-icons/pi';
import SectionTitle from './common/SectionTitle';
import { SECTION_IDS } from '../constants';

const NeuroVisualizerSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // State for tracking active animations
  const [activeAnimations, setActiveAnimations] = useState<Array<{
    id: string;
    grayNodeIndex: number;
    isIncoming: boolean;
  }>>([]);
  
  // State for tracking which nodes are glowing
  const [glowingNodeIds, setGlowingNodeIds] = useState<Array<string>>([]);
  
  // State for cursor animation and wallet detail popup
  const [showCursor] = useState(true); // We're setting this to true and not changing it
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const [activeWalletId, setActiveWalletId] = useState<string | null>(null);
  
  // Animation manager effect
  // Effect for cursor animation and wallet detail popup sequence
  useEffect(() => {
    if (!inView || !showCursor) return;
    
    // Start cursor animation sequence
    const startSequence = () => {
      // Move cursor to Whale wallet (top left)
      setCursorPosition({ x: 15, y: 15 });
      
      // After moving to position, show cursor and start animation sequence
      setTimeout(() => {
        // Move to whale wallet position
        setCursorPosition({ x: 25, y: 25 });
        
        // Click on whale wallet after arriving
        setTimeout(() => {
          setActiveWalletId('w1'); // Whale wallet ID
          setShowWalletDetails(true);
          
          // Keep details open for 3 seconds
          setTimeout(() => {
            // Click off the node
            setCursorPosition({ x: 40, y: 40 });
            
            setTimeout(() => {
              setShowWalletDetails(false);
              setActiveWalletId(null);
              
              // Wait before restarting sequence
              setTimeout(() => {
                startSequence();
              }, 2000);
            }, 500);
          }, 3000);
        }, 500);
      }, 1000);
    };
    
    // Start the animation sequence
    startSequence();
    
    return () => {
      // Clear any potential timeouts on unmount
    };
  }, [inView, showCursor]);
  
  // Animation manager effect
  useEffect(() => {
    if (!inView) return;
    
    // Function to generate a random animation
    const generateAnimation = () => {
      // Get a random gray node index (0-7)
      const grayNodeIndex = Math.floor(Math.random() * 8);
      
      // 50% chance to be incoming or outgoing
      const isIncoming = Math.random() > 0.5;
      
      return {
        id: `anim-${Date.now()}-${grayNodeIndex}-${isIncoming ? 'in' : 'out'}`,
        grayNodeIndex,
        isIncoming
      };
    };
    
    // Initial animations
    setActiveAnimations([generateAnimation()]);
    
    // Function to create a new animation and trigger glows
    const startNewAnimation = () => {
      const newAnimation = generateAnimation();
      setActiveAnimations(prev => [...prev.slice(-1), newAnimation]);
      
      // Source and target nodes are determined by IDs, no need for positions here
      
      // Determine source and target node IDs
      const sourceNodeId = newAnimation.isIncoming ? 
        `gray-${newAnimation.grayNodeIndex}` : 
        'contract';
      
      // Add source node to glowing nodes
      setGlowingNodeIds(prev => [...prev, sourceNodeId]);
      
      // After 0.975 seconds (25% faster than 1.3s), remove source glow and add target glow
      setTimeout(() => {
        setGlowingNodeIds(prev => prev.filter(id => id !== sourceNodeId));
        
        // Determine target node ID
        const targetNodeId = newAnimation.isIncoming ? 
          'contract' : 
          `gray-${newAnimation.grayNodeIndex}`;
          
        // Add target node to glowing nodes
        setGlowingNodeIds(prev => [...prev, targetNodeId]);
        
        // Remove target glow after 0.75 seconds (25% faster than 1s)
        setTimeout(() => {
          setGlowingNodeIds(prev => prev.filter(id => id !== targetNodeId));
        }, 750);
        
      }, 975);
    };
    
    // Start the first animation
    startNewAnimation();
    
    // Create a new animation every 1.875 seconds (25% faster than 2.5s)
    const interval = setInterval(() => {
      startNewAnimation();
    }, 1875);
    
    return () => clearInterval(interval);
  }, [inView]);

  // Wallet data for visualization
  const contract = {
    address: '0x8a6e3a9d2f4095e2c3b060a7596a814dcaee1234',
    value: 350
  };

  // Main wallet nodes - Used for visualization data
  const wallets = [
    { id: 'w1', type: 'whale', address: '0x7a16ff8270133f063aab6c9977183d9e72835428', value: 280 },
    { id: 'w2', type: 'sniper', address: '0x931d387731bbbc988b312206c74f77d004d6b84b', value: 120 },
    { id: 'w3', type: 'team', address: '0xf4e77e5da47ac3125140c470c71cbf8a71c6b7f3', value: 200 },
    { id: 'w4', type: 'bot', address: '0x3a6e3a9d2f4095e2c3b060a7596a814dcaeefe2c', value: 150 },
  ];
  
  // Add 4 main wallet nodes in X pattern around the central node
  // (Currently disabled in UI but keeping the data structure for future use)

  // Background/secondary wallet nodes (gray)
  const secondaryWallets = [
    { id: 's1', address: '0x1a72ff8270133f063aab6c9977183d9e72835428', value: 45 },
    { id: 's2', address: '0x2b31d387731bbbc988b312206c74f77d004d6b84b', value: 28 },
    { id: 's3', address: '0x3c4e77e5da47ac3125140c470c71cbf8a71c6b7f3', value: 36 },
    { id: 's4', address: '0x4d5e3a9d2f4095e2c3b060a7596a814dcaeefe2c', value: 19 },
    { id: 's5', address: '0x5e6e3a9d2f4095e2c3b060a7596a814dcaee1234', value: 52 },
    { id: 's6', address: '0x6f7e3a9d2f4095e2c3b060a7596a814dcaee5678', value: 31 },
    { id: 's7', address: '0x7g8e3a9d2f4095e2c3b060a7596a814dcaee9012', value: 24 },
    { id: 's8', address: '0x8h9e3a9d2f4095e2c3b060a7596a814dcaee3456', value: 17 },
  ];

  return (
    <section 
      ref={ref} 
      id={SECTION_IDS.NEURO_VISUALIZER} 
      className="relative py-20 overflow-hidden bg-transparent"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neuro-purple-500/20 to-transparent opacity-30 blur-3xl -z-10"></div>
      
      <SectionTitle 
        title="NeuroVisualizer" 
        subtitle="Contract-to-Wallet Flow Visualizer"
      />

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md"
          >
            <h3 className="text-2xl font-bold text-white mb-4"></h3>
            <p className="text-gray-300"></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-start space-x-4"
          >
            <div className="flex items-start space-x-4 w-full">
              <div className="p-3 rounded-[1rem] hover:shadow-[0_0_20px_rgba(107,63,175,0.4)] transition-all duration-300">
                <PiGitMergeLight size={30} className="h-[30px] w-[30px] text-neuro-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Track Wallet Activity</h3>
                <p className="text-gray-300">Track wallet inflows and outflows in real time as transactions happen on-chain.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex items-start space-x-4"
          >
            <div className="flex items-start space-x-4 w-full">
              <div className="p-3 rounded-[1rem] hover:shadow-[0_0_20px_rgba(107,63,175,0.4)] transition-all duration-300">
                <PiFingerprintLight size={30} className="h-[30px] w-[30px] text-neuro-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Wallet Identification</h3>
                <p className="text-gray-300">Identify and tag wallets: sniper, whale, team, bot with AI-powered behavioral analysis.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-start space-x-4"
          >
            <div className="flex items-start space-x-4 w-full">
              <div className="p-3 rounded-[1rem] hover:shadow-[0_0_20px_rgba(107,63,175,0.4)] transition-all duration-300">
                <PiWaveformLight size={30} className="h-[30px] w-[30px] text-neuro-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Pattern Alerts</h3>
                <p className="text-gray-300">Pin wallets and set alerts for repeated patterns to catch market movements early.</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Visualization */}
        <motion.div 
          className="relative h-[500px] perspective"
        >
          <div className="relative mx-auto w-full h-full rounded-xl shadow-[0_0_30px_rgba(107,63,175,0.3)] bg-gradient-to-br from-gray-900/70 via-neuro-deep-500/10 to-gray-900/70 backdrop-blur-md">
            {/* Visualizer Interface */}
            <div className="h-full p-6 relative overflow-hidden rounded-xl border border-neuro-deep-600/30">
              {/* Interface Header */}
              <div className="flex justify-between items-center mb-4 bg-neuro-deep-500/20 p-3 rounded-lg border border-neuro-deep-600/30">
                <div className="flex items-center space-x-2">
                  <PiGraphLight className="h-5 w-5 text-neuro-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Contract Flow Visualizer</h3>
                </div>
                <div className="flex space-x-3">
                  <div className="px-3 py-1 rounded-full bg-neuro-deep-500/30 text-xs text-neuro-purple-300 border border-neuro-deep-600/20 flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" style={{ filter: 'drop-shadow(0 0 2px #4ade80)' }}></div>
                    <span>Live View</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-neuro-deep-500/30 text-xs text-neuro-purple-300 border border-neuro-deep-600/20">
                    Auto-Tag
                  </div>
                </div>
              </div>
              
              {/* Visualization Area */}
              <div className="relative h-[calc(100%-60px)] w-full bg-neuro-black/30 rounded-xl overflow-hidden border border-neuro-deep-600/20 p-4">
                {/* Animated cursor */}
                {showCursor && (
                  <motion.div
                    className="absolute w-6 h-6 z-50 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat'
                    }}
                    animate={{
                      left: `${cursorPosition.x}%`,
                      top: `${cursorPosition.y}%`,
                      scale: activeWalletId ? [1, 0.9, 1] : 1
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      scale: { duration: 0.2 }
                    }}
                  />
                )}
                
                {/* Wallet Details Popup */}
                {showWalletDetails && activeWalletId && (
                  <motion.div 
                    className="absolute bg-neuro-deep-500/90 backdrop-blur-md rounded-lg border border-neuro-purple-500/40 shadow-lg p-4 z-40 w-64"
                    style={{
                      left: '25%',
                      top: '30%',
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-neuro-purple-300 font-bold">WHALE WALLET</h3>
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Address:</span>
                        <span className="text-white font-mono">0x7a16...5428</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Holdings:</span>
                        <span className="text-white">280Ξ ($485,240)</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Supply %:</span>
                        <span className="text-white">4.7%</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">P&L:</span>
                        <span className="text-green-400">+52.3%</span>
                      </div>
                      
                      <div className="mt-3">
                        <div className="text-gray-400 mb-1">Recent Transactions:</div>
                        <div className="space-y-1 text-[0.65rem]">
                          <div className="flex justify-between">
                            <span className="text-green-400">+40Ξ</span>
                            <span className="text-gray-400">12 min ago</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-400">-15Ξ</span>
                            <span className="text-gray-400">2 hrs ago</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-400">+100Ξ</span>
                            <span className="text-gray-400">1 day ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {/* Central contract node */}
                <div
                  className="absolute bg-gradient-to-br from-neuro-purple-500/50 to-neuro-purple-700/50 text-neuro-purple-200 p-3 rounded-full border border-neuro-purple-500/40 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(107,63,175,0.3)]"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '75px',
                    height: '75px',
                    zIndex: 10,
                    boxShadow: glowingNodeIds.includes('contract') ? 
                      '0 0 25px 8px rgba(147, 51, 234, 0.8)' : 
                      '0 0 15px rgba(107,63,175,0.3)',
                    transition: 'box-shadow 0.3s ease-in-out'
                  }}
                >
                  <div className="font-bold text-xs">CONTRACT</div>
                  <div className="text-[0.6rem] opacity-70">{contract.address.substring(0, 4)}...</div>
                  <div className="text-white text-[0.6rem]">{contract.value}Ξ</div>
                </div>
                
                {/* Main wallet nodes in X pattern */}
                {wallets.map((wallet, index) => {
                  // Position wallets in an X pattern around the center
                  const positions = [
                    { x: 25, y: 25 }, // Top left
                    { x: 75, y: 25 }, // Top right
                    { x: 25, y: 75 }, // Bottom left
                    { x: 75, y: 75 }, // Bottom right
                  ];
                  
                  const position = positions[index];
                  
                  // Style based on wallet type
                  let bgColorClass = "";
                  let textColorClass = "";
                  
                  switch(wallet.type) {
                    case 'whale':
                      bgColorClass = "from-blue-500/50 to-blue-700/50";
                      textColorClass = "text-blue-200";
                      break;
                    case 'sniper':
                      bgColorClass = "from-red-500/50 to-red-700/50";
                      textColorClass = "text-red-200";
                      break;
                    case 'team':
                      bgColorClass = "from-green-500/50 to-green-700/50";
                      textColorClass = "text-green-200";
                      break;
                    case 'bot':
                      bgColorClass = "from-yellow-500/50 to-yellow-700/50";
                      textColorClass = "text-yellow-200";
                      break;
                  }
                  
                  return (
                    <div
                      key={wallet.id}
                      className={`absolute bg-gradient-to-br ${bgColorClass} ${textColorClass} p-2 rounded-full border border-neuro-deep-600/40 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(107,63,175,0.25)] ${activeWalletId === wallet.id ? 'ring-2 ring-white' : ''}`}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        width: '60px',
                        height: '60px',
                        zIndex: 10,
                        boxShadow: glowingNodeIds.includes(wallet.id) ? 
                          '0 0 20px 8px rgba(147, 51, 234, 0.6)' : 
                          (activeWalletId === wallet.id ? '0 0 15px rgba(255,255,255,0.8)' : '0 0 10px rgba(107,63,175,0.25)'),
                        transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
                        transform: activeWalletId === wallet.id ? 'translate(-50%, -50%) scale(1.05)' : 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="font-bold text-[0.6rem]">
                        {wallet.type.toUpperCase()}
                      </div>
                      <div className="text-[0.55rem] opacity-70">
                        {wallet.address.substring(0, 4)}...
                      </div>
                      <div className="text-white text-[0.55rem]">
                        {wallet.value}Ξ
                      </div>
                    </div>
                  );
                })}
                
                {/* Secondary gray wallet nodes */}
                {secondaryWallets.map((wallet, index) => {
                  // Position these in various places around the visualization
                  const positions = [
                    { x: 38, y: 15 },  // Top
                    { x: 85, y: 38 },  // Right
                    { x: 62, y: 85 },  // Bottom
                    { x: 15, y: 62 },  // Left
                    { x: 35, y: 50 },  // Middle left
                    { x: 65, y: 50 },  // Middle right
                    { x: 50, y: 20 },  // Top (moved up from 35)
                    { x: 50, y: 80 },  // Bottom (moved down from 65)
                  ];
                  
                  const position = positions[index];
                  
                  return (
                    <div
                      key={`gray-${index}`}
                      className="absolute bg-gradient-to-br from-gray-500/40 to-gray-700/40 text-gray-300 p-1 rounded-full border border-gray-500/30 flex flex-col items-center justify-center"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '40px',
                        height: '40px',
                        zIndex: 5,
                        opacity: 0.7,
                        boxShadow: glowingNodeIds.includes(`gray-${index}`) ? 
                          '0 0 20px 8px rgba(147, 51, 234, 0.6)' : 
                          '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
                        transition: 'box-shadow 0.3s ease-in-out'
                      }}
                    >
                      <div className="text-[0.5rem] opacity-70">
                        {wallet.address.substring(0, 4)}...
                      </div>
                      <div className="text-white text-[0.5rem]">
                        {wallet.value}Ξ
                      </div>
                    </div>
                  );
                })}
                
                {/* SVG for connections and animations */}
                <svg className="absolute inset-0 w-full h-full z-0">
                  {/* Animated beams of light */}
                  {activeAnimations.map(animation => {
                    const grayNodePositions = [
                      { x: 38, y: 15 },  // Top
                      { x: 85, y: 38 },  // Right
                      { x: 62, y: 85 },  // Bottom
                      { x: 15, y: 62 },  // Left
                      { x: 35, y: 50 },  // Middle left
                      { x: 65, y: 50 },  // Middle right
                      { x: 50, y: 20 },  // Top center
                      { x: 50, y: 80 },  // Bottom center
                    ];
                    const contractPos = { x: 50, y: 50 };
                    const grayNodePos = grayNodePositions[animation.grayNodeIndex];
                    
                    // Determine start and end positions based on direction
                    const startPos = animation.isIncoming ? grayNodePos : contractPos;
                    const endPos = animation.isIncoming ? contractPos : grayNodePos;
                    
                    // Color based on direction (incoming/outgoing)
                    const color = animation.isIncoming ? '#4ade80' : '#f87171'; // Green for incoming, Red for outgoing
                    
                    return (
                      <g key={animation.id}>
                        {/* First dot (lead) */}
                        <motion.circle
                          initial={{ 
                            cx: `${startPos.x}%`,
                            cy: `${startPos.y}%`,
                            r: 2.5,
                            opacity: 0
                          }}
                          animate={{
                            cx: [`${startPos.x}%`, `${endPos.x}%`],
                            cy: [`${startPos.y}%`, `${endPos.y}%`],
                            r: [2.5, 2.5],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "linear",
                            times: [0, 0.9, 1]
                          }}
                          fill={color}
                          style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                        />
                        
                        {/* Second dot (middle) */}
                        <motion.circle
                          initial={{ 
                            cx: `${startPos.x}%`,
                            cy: `${startPos.y}%`,
                            r: 2,
                            opacity: 0
                          }}
                          animate={{
                            cx: [`${startPos.x}%`, `${endPos.x}%`],
                            cy: [`${startPos.y}%`, `${endPos.y}%`],
                            r: [2, 2],
                            opacity: [0, 0.9, 0]
                          }}
                          transition={{
                            duration: 1.125, // 25% faster than 1.5s
                            ease: "linear",
                            times: [0, 0.9, 1],
                            delay: 0.075 // 25% faster than 0.1s
                          }}
                          fill={color}
                          style={{ filter: `drop-shadow(0 0 2px ${color})` }}
                        />
                        
                        {/* Third dot (trail) */}
                        <motion.circle
                          initial={{ 
                            cx: `${startPos.x}%`,
                            cy: `${startPos.y}%`,
                            r: 1.5,
                            opacity: 0
                          }}
                          animate={{
                            cx: [`${startPos.x}%`, `${endPos.x}%`],
                            cy: [`${startPos.y}%`, `${endPos.y}%`],
                            r: [1.5, 1.5],
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{
                            duration: 1.125, // 25% faster than 1.5s
                            ease: "linear",
                            times: [0, 0.9, 1],
                            delay: 0.15 // 25% faster than 0.2s
                          }}
                          fill={color}
                          style={{ filter: `drop-shadow(0 0 2px ${color})` }}
                        />
                        
                        {/* Small beam connecting the dots */}
                        <motion.line
                          initial={{ 
                            x1: `${startPos.x}%`,
                            y1: `${startPos.y}%`,
                            x2: `${startPos.x}%`,
                            y2: `${startPos.y}%`,
                            opacity: 0
                          }}
                          animate={{
                            x1: [`${startPos.x}%`, `${endPos.x}%`],
                            y1: [`${startPos.y}%`, `${endPos.y}%`],
                            x2: [`${startPos.x}%`, `${startPos.x + (endPos.x - startPos.x) * 0.8}%`],
                            y2: [`${startPos.y}%`, `${startPos.y + (endPos.y - startPos.y) * 0.8}%`],
                            opacity: [0, 0.6, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "linear",
                            times: [0, 0.9, 1]
                          }}
                          stroke={color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          style={{ filter: `drop-shadow(0 0 2px ${color})` }}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeuroVisualizerSection;