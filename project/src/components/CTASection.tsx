import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GlowButton from './common/GlowButton';

const CTASection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="relative py-20">
      {/* Background circuit patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-gradient-to-r from-transparent via-neuro-deep-700 to-transparent h-px"
            style={{
              width: `${Math.random() * 30 + 20}%`,
              left: `${Math.random() * 70}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          ></div>
        ))}
        
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-gradient-to-b from-transparent via-neuro-deep-700 to-transparent w-px"
            style={{
              height: `${Math.random() * 30 + 20}%`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          ></div>
        ))}
        
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-neuro-deep-700 opacity-20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px #6B3FAF',
            }}
          ></div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neuro-purple-300"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join the Movement. Discover Alpha First.
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Experience the cutting edge of AI-powered crypto tools and gain the edge in a competitive market.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
      </motion.div>
      
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-neuro-deep-700 rounded-full w-1 h-1 opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -30 - 10],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          ></motion.div>
        ))}
      </div>
      
      {/* Slow fog drift */}
      <motion.div
        className="absolute -inset-20 rounded-full overflow-hidden opacity-30 -z-10"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(107, 63, 175, 0.3), transparent 40%), radial-gradient(circle at 70% 60%, rgba(107, 63, 175, 0.3), transparent 40%)',
          backgroundSize: '200% 200%',
        }}
      ></motion.div>
    </section>
  );
};

export default CTASection;