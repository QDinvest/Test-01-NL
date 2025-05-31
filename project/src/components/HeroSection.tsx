import { motion } from 'framer-motion';
import GlowButton from './common/GlowButton';
import { SECTION_IDS } from '../constants';

const HeroSection = () => {
  return (
    <div id={SECTION_IDS.MAIN} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Stylized background with gradients */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient overlay - changed to be more transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neuro-black/30 to-neuro-black/50 z-10"></div>
        
        {/* Neural network pattern effect */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-10"></div>
        
        {/* Ambient glow spots */}
        <div className="absolute top-1/4 left-1/4 w-[855px] h-[855px] rounded-full bg-gradient-radial from-neuro-purple-600/10 to-transparent opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[755px] h-[755px] rounded-full bg-gradient-radial from-neuro-purple-500/10 to-transparent opacity-20 blur-3xl"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-neuro-purple-500 rounded-full w-1 h-1 opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -50 - 20],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            ></motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-flex items-center justify-center"
          >
            <div className="relative h-64 w-64">
              <div className="absolute inset-0 bg-neuro-purple-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/qLmcbKjs/image-Photoroom-22.png" 
                  alt="NeuroLabs Logo" 
                  className="h-64 w-64 mix-blend-screen" 
                  style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                />
              </div>
              {/* Additional logo glow effect */}
              <div className="absolute inset-0 rounded-full opacity-70 animate-glowPulse"></div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neuro-purple-200 to-neuro-purple-300 leading-tight"
          >
            NeuroLabs — The Advanced Terminal for Ethereum Alpha
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Live Token Discovery. Contract-to-Wallet Visualizer. Token-Based Social Sentiment Tracker. NeuroSwap.
All synced. All live. All in one terminal.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <GlowButton 
              text="Launch App" 
              color="primary" 
              size="large"
              showComingSoonModal={true}
            />
            
            <GlowButton 
              text="Join Telegram" 
              color="secondary" 
              size="large"
              href="https://t.me/NeuroLabsPortal"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;