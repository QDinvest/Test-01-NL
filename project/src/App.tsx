import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GaslessAISection from './components/GaslessAISection';
import XTrackerAISection from './components/XTrackerAISection';
import NeuroVisualizerSection from './components/NeuroVisualizerSection';
import AIAgentProtocolSection from './components/AIAgentProtocolSection';
import TokenomicsSection from './components/TokenomicsSection';
import RoadmapSection from './components/RoadmapSection';
import FeatureShowcaseSection from './components/FeatureShowcaseSection';
import DemoSection from './components/DemoSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ParticleBackground from './components/common/ParticleBackground';

function App() {
  return (
    <AnimatePresence>
      <div className="relative min-h-screen bg-neuro-black text-white overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 z-0 bg-grid-pattern bg-[size:40px_40px] opacity-10"></div>
        
        <div className="relative z-10">
          <Header />
          
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <HeroSection />
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true, margin: "-10%" }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 space-y-32"
            >
              <FeatureShowcaseSection />
              <NeuroVisualizerSection />
              <GaslessAISection />
              <AIAgentProtocolSection />
              <XTrackerAISection />
              <TokenomicsSection />
              <RoadmapSection />
              <DemoSection />
              <CTASection />
            </motion.div>
            
            <Footer />
          </motion.main>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default App;