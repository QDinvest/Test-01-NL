import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PiCodeLight, PiChartLineUpLight, PiShoppingCartLight } from 'react-icons/pi';
import SectionTitle from './common/SectionTitle';
import LogicFlowAnimation from './LogicFlowAnimation';
import { SECTION_IDS } from '../constants';

const AIAgentProtocolSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section
      ref={ref}
      id={SECTION_IDS.AI_AGENT_PROTOCOL}
      className="relative py-24 overflow-hidden bg-transparent"
    >
      {/* Circuit-like background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
        
        {[...Array(12)].map((_, i) => (
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
        
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-neuro-deep-600 opacity-30"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(147, 51, 234, 0.5)',
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Neuro AI Agent Protocol"
          subtitle="Automate Trading Strategies With No-Code Logic"
        />
        
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Unified Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LogicFlowAnimation />
          </motion.div>
          
          {/* Right column: Features and benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            
            {/* Feature points */}
            <ul className="space-y-5 mt-6">
              {[
                {
                  title: "Visual Logic Builder",
                  description: "Simple drag-and-drop interface to create IF/THEN conditions and action flows",
                  icon: <PiCodeLight size="22" className="text-amber-400" />
                },
                {
                  title: "Wallet Flow + Sentiment Integration",
                  description: "Trigger actions based on whale movements or sentiment spikes from social media",
                  icon: <PiChartLineUpLight size="22" className="text-amber-400" />
                },
                {
                  title: "Decentralized Agent Marketplace",
                  description: "Stake NEURO to run your agents or monetize successful strategies in the marketplace",
                  icon: <PiShoppingCartLight size="22" className="text-amber-400" />
                }
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mr-3 p-2.5 bg-neuro-deep-800 rounded-lg shadow-inner">
                    <div className="text-amber-400">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neuro-white mb-1">{feature.title}</h4>
                    <p className="text-neuro-white/70 text-sm">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Agent Templates Section and CTA removed */}
      </div>
    </section>
  );
};

export default AIAgentProtocolSection;
