import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PiVaultLight, PiCertificateLight, PiCoinsLight, PiChartPieSliceLight } from 'react-icons/pi';
import SectionTitle from './common/SectionTitle';
import { SECTION_IDS } from '../constants';

const TokenomicsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Main stats displayed at top
  const tokenStats = [
    { value: '100M', label: 'Token Supply' },
    { value: '4%', label: 'Buy/Sell Tax' },
    { value: '2.5%', label: 'Max Wallet' },
    { value: '90-10', label: 'Allocation' },
  ];
  
  // No additional allocation details needed
  
  // Card information
  const tokenCards = [
    { 
      title: 'Contract Renounced', 
      icon: <PiCertificateLight className="h-8 w-8" />, 
      gradient: 'from-neuro-deep-500 to-neuro-deep-700',
      description: ''
    },
    { 
      title: '6 Months', 
      subtitle: 'Liquidity Locked',
      icon: <PiVaultLight className="h-8 w-8" />, 
      gradient: 'from-neuro-deep-500 to-neuro-deep-700',
      description: ''
    },
    { 
      title: '100M Supply', 
      subtitle: '100% Tokens in Circulation',
      icon: <PiCoinsLight className="h-8 w-8" />, 
      gradient: 'from-neuro-deep-500 to-neuro-deep-700',
      description: ''
    },
    { 
      title: 'Token Allocation', 
      icon: <PiChartPieSliceLight className="h-8 w-8" />, 
      gradient: 'from-neuro-deep-500 to-neuro-deep-700',
      description: 'Platform Development, Marketing Initiatives, Exchange Listings, Product Enhancement'
    },
  ];

  return (
    <section ref={ref} id={SECTION_IDS.TOKENOMICS} className="relative py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neuro-deep-700/10 to-transparent opacity-20 blur-3xl -z-10"></div>
      
      <SectionTitle 
        title="Tokenomics" 
        subtitle="Engineered for Growth"
      />
      
      {/* Top stats section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 max-w-5xl mx-auto mb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 px-4">
          {tokenStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center md:border-r md:last:border-r-0 border-neuro-deep-600/30 last:border-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="mb-2"
              >
                <span className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neuro-purple-200 to-neuro-purple-400">
                  {stat.value}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <span className="text-gray-300 text-sm md:text-base">{stat.label}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Card section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {tokenCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="h-full"
          >
            <div className="relative group h-full">
              {/* Glass Card */}
              <div className="bg-gradient-to-br from-gray-900/70 via-neuro-deep-500/10 to-gray-900/70 backdrop-blur-md rounded-[2rem] border border-neuro-deep-600/30 p-6 h-full transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(107,63,175,0.3)] shadow-[0_0_15px_rgba(107,63,175,0.2)] overflow-hidden flex flex-col">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neuro-deep-500/5 to-neuro-deep-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]"></div>
                
                {/* Icon */}
                <div className={`relative w-14 h-14 mb-4 rounded-[1rem] flex items-center justify-center bg-gradient-to-r from-neuro-deep-500 to-neuro-deep-700 shadow-[0_0_15px_rgba(107,63,175,0.3)] transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(107,63,175,0.4)]`}>
                  <div className="text-[#EAEAEA]">
                    {card.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-1 relative">{card.title}</h3>
                
                {/* Subtitle if present */}
                {card.subtitle && (
                  <h4 className="text-xl font-medium text-neuro-purple-300 mb-3">{card.subtitle}</h4>
                )}
                
                {/* Description if present */}
                {card.description && (
                  <p className="text-gray-300 text-sm mt-auto">{card.description}</p>
                )}
                
                {/* Decorative lines */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neuro-deep-600/50 to-transparent rounded-b-[2rem]"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-neuro-deep-600/40 to-transparent rounded-tr-[2rem] rounded-br-[2rem]"></div>
                
                {/* Hover light beam */}
                <motion.div 
                  className="absolute -inset-1 bg-neuro-deep-600/0 opacity-0 group-hover:opacity-100 rounded-[2rem] blur-lg transition-all duration-700"
                  animate={inView ? 
                    { 
                      opacity: [0, 0.2, 0], 
                      scale: [0.9, 1.02, 0.9],
                    } : {}}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TokenomicsSection;