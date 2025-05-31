import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useRef } from 'react';
import { PiHardDrivesLight, PiVaultLight, PiCoinsLight } from 'react-icons/pi';
import SectionTitle from './common/SectionTitle';
import { SECTION_IDS } from '../constants';

// LiveTerminal component to simulate a real-time trading terminal
const LiveTerminal = () => {
  const [lines, setLines] = useState<{text: string; className: string}[]>([]);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  
  // Get a reference to check if component is in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  // Sample terminal output sequences - these will be shown in sequence to simulate live activity
  const terminalSequences = [
    // First sequence - ETH to USDT swap
    [
      { text: 'neuro:~$ swap 1.25 ETH for USDT', className: 'text-neuro-purple-400' },
      { text: '  Scanning routes across 12 DEXs...', className: 'text-blue-300' },
      { text: '  Optimal route: ETH → WETH → USDT via Uniswap V3', className: 'text-blue-300' },
      { text: '  ⏳ Transaction pending: 0x7ae45c88d221a8e5f1c...4a5c', className: 'text-yellow-300' },
      { text: '  ✓ Swap completed - Received: 3,012.54 USDT', className: 'text-green-400' },
      { text: '  Gas used: 142,543 • Gas price: 25 gwei', className: 'text-blue-300' },
    ],
    // Second sequence - autoSwap PEPE
    [
      { text: 'neuro:~$ autoSwap --token=PEPE --amount=max --slippage=1.5', className: 'text-neuro-purple-400' },
      { text: '  Wallet connected: 0x3f8c...76ab', className: 'text-blue-300' },
      { text: '  Analyzing token PEPE...', className: 'text-blue-300' },
      { text: '  Security score: 91/100 • Liquidity: $8.7M', className: 'text-blue-300' },
      { text: '  ✓ Transaction successful: 0x94ae2c11e54875f...b12a', className: 'text-green-400' },
      { text: '  Received: 129,437,802.14 PEPE', className: 'text-blue-300' },
    ],
    // Third sequence - monitor wallet
    [
      { text: 'neuro:~$ monitor 0x84a05b...de61', className: 'text-neuro-purple-400' },
      { text: '  Monitoring wallet activity...', className: 'text-blue-300' },
    ],
    // Fourth sequence - limit order
    [
      { text: 'neuro:~$ limit --buy ATOM --amount=500 --price=8.75', className: 'text-neuro-purple-400' },
      { text: '  Setting limit order for 500 ATOM @ $8.75', className: 'text-blue-300' },
      { text: '  Order placed - ID: ORD-3724-ATOM', className: 'text-blue-300' },
      { text: '  Watching market price...', className: 'text-blue-300' },
      { text: '  ✓ Order filled - Transaction: 0xf62e1d9...a3c7', className: 'text-green-400' },
    ],
    // Fifth sequence - DEX analysis
    [
      { text: 'neuro:~$ analyze --pair=ETH/USDT --dexes=all', className: 'text-neuro-purple-400' },
      { text: '  Analyzing ETH/USDT across all DEXs', className: 'text-blue-300' },
      { text: '  Best rates found:', className: 'text-blue-300' },
      { text: '  1. Uniswap V3: 1 ETH = 2,415.92 USDT (0.12% fee)', className: 'text-blue-300' },
      { text: '  2. Curve: 1 ETH = 2,414.87 USDT (0.04% fee)', className: 'text-blue-300' },
      { text: '  3. Balancer: 1 ETH = 2,413.65 USDT (0.15% fee)', className: 'text-blue-300' },
      { text: '  Recommendation: Uniswap V3 for best execution', className: 'text-green-400' },
    ],
    // Sixth sequence - failed transaction with retry
    [
      { text: 'neuro:~$ swap 0.5 ETH for SHIB', className: 'text-neuro-purple-400' },
      { text: '  Preparing transaction...', className: 'text-blue-300' },
      { text: '  ❌ Transaction failed: Insufficient gas', className: 'text-red-500' },
      { text: '  Retrying with increased gas limit...', className: 'text-yellow-300' },
      { text: '  ✓ Transaction successful: 0x3b5a9e7...f82d', className: 'text-green-400' },
      { text: '  Received: 27,358,492.15 SHIB', className: 'text-blue-300' },
    ],
  ];
  
  // Function to add a new line to the terminal
  const addLine = (line: {text: string; className: string}) => {
    setLines(prev => {
      // Keep only the last 15 lines to prevent too much content
      const newLines = [...prev, line];
      if (newLines.length > 15) {
        return newLines.slice(newLines.length - 15);
      }
      return newLines;
    });
    
    // Scroll to bottom of terminal
    if (terminalRef.current) {
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 10);
    }
  };

  // Simulate typing and processing in terminal
  useEffect(() => {
    if (!inView) return;
    
    let sequenceIndex = 0;
    let lineIndex = 0;
    let currentTimeout: number;
    
    const processNextLine = () => {
      const currentSequence = terminalSequences[sequenceIndex];
      if (lineIndex < currentSequence.length) {
        // Add the next line in the current sequence
        addLine(currentSequence[lineIndex]);
        lineIndex++;
        
        // Faster random delay between 100ms and 400ms for showing speed
        const delay = Math.random() * 300 + 100;
        currentTimeout = setTimeout(processNextLine, delay);
      } else {
        // Move to next sequence or loop back
        sequenceIndex = (sequenceIndex + 1) % terminalSequences.length;
        lineIndex = 0;
        
        // Shorter pause between sequences
        currentTimeout = setTimeout(processNextLine, 800);
      }
    };
    
    // Start the animation faster
    currentTimeout = setTimeout(processNextLine, 300);
    
    // Cleanup function
    return () => {
      if (currentTimeout) clearTimeout(currentTimeout);
    };
  }, [inView]);

  // We'll use a callback ref for the terminal content

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800/90 text-center py-1 rounded-t-lg border-b border-gray-700 flex justify-between px-4 items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-neuro-purple-300 font-mono text-sm">neuro-swap-terminal</div>
        <div className="text-neuro-purple-300 font-mono text-sm">v1.4.2</div>
      </div>
      
      {/* Terminal Body */}
      <div 
        ref={(el) => {
          // Set the terminal ref for scrolling
          terminalRef.current = el;
          // Call the inView ref function with the element
          if (el) inViewRef(el);
        }}
        className="bg-[#0a0b14] text-gray-100 rounded-b-lg p-4 h-80 overflow-y-auto font-mono text-sm relative shadow-[0_0_30px_rgba(107,63,175,0.3)] border-2 border-t-0"
        style={{ 
          borderImage: 'linear-gradient(135deg, #2A1E40, #4A2D7C, #6B3FAF) 1',
          boxShadow: '0 0 30px rgba(107, 63, 175, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Terminal Content */}
        <div className="space-y-1.5">
          {lines.map((line, index) => (
            <div key={index} className="leading-tight">
              <span className={line.className}>{line.text}</span>
            </div>
          ))}
          {/* Cursor */}
          <div className="h-4 w-2 bg-neuro-purple-400 inline-block animate-pulse"></div>
        </div>
        
        {/* Terminal Overlay Glow Effect */}
        <div className="absolute inset-0 pointer-events-none rounded-b-lg" 
          style={{ 
            boxShadow: 'inset 0 0 15px rgba(107, 63, 175, 0.2)', 
            background: 'radial-gradient(circle at center, transparent 60%, rgba(107, 63, 175, 0.1))'
          }}>
        </div>
      </div>
    </motion.div>
  );
};

const GaslessAISection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Scroll animation removed since we no longer need it
  
  // Token logos removed as requested

  return (
    <section 
      ref={ref} 
      id={SECTION_IDS.NEUROSWAP} 
      className="relative py-20 overflow-hidden bg-transparent"
    >
      
      <SectionTitle 
        title="NeuroSwap" 
        subtitle="On-Terminal Swap Execution"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-start space-x-4"
          >
            <div className="flex items-start space-x-4 w-full">
              <div className="p-3 rounded-[1rem] hover:shadow-[0_0_20px_rgba(107,63,175,0.4)] transition-all duration-300">
                <PiCoinsLight className="h-6 w-6 text-neuro-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Instant Token Trading</h3>
                <p className="text-gray-300">Execute swaps instantly from token pages</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-start space-x-4"
          >
            <div className="flex items-start space-x-4 w-full">
              <div className="p-3 rounded-[1rem] hover:shadow-[0_0_20px_rgba(107,63,175,0.4)] transition-all duration-300">
                <PiVaultLight className="h-6 w-6 text-neuro-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Contract Security</h3>
                <p className="text-gray-300">Built-in LP lock, honeypot, and contract risk scoring</p>
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
                <PiHardDrivesLight className="h-6 w-6 text-neuro-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Optimized Trading Routes</h3>
                <p className="text-gray-300">Multi-DEX routing with price optimization</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Live Terminal Visualization */}
        <div className="flex items-center justify-center">
          <LiveTerminal />
        </div>
      </div>
    </section>
  );
};

export default GaslessAISection;