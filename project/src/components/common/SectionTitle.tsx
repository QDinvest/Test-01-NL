import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-2 px-5 py-1.5 rounded-full relative group overflow-hidden"
      >
        {/* Button background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-neuro-deep-500/10 to-gray-900/70 backdrop-blur-md rounded-full border border-neuro-deep-600/30"></div>
        
        {/* Animated pulse glow */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-30"
          animate={{ 
            boxShadow: [
              '0 0 5px rgba(107,63,175,0.2)', 
              '0 0 12px rgba(107,63,175,0.4)', 
              '0 0 5px rgba(107,63,175,0.2)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Shine effect */}
        <span 
          className="absolute top-0 left-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-[300%] transition-transform ease-in-out duration-1000"
        />
        
        {/* Decorative edge glows */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neuro-deep-600/50 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-neuro-deep-600/40 to-transparent"></div>
        
        <span className="text-neuro-purple-200 font-medium relative z-10">{title}</span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-white"
      >
        {subtitle}
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-24 h-1 bg-gradient-to-r from-neuro-deep-600/50 via-neuro-deep-700/70 to-neuro-deep-600/50 rounded-full mx-auto mt-4 shadow-[0_0_8px_rgba(107,63,175,0.2)]"
      ></motion.div>
    </div>
  );
};

export default SectionTitle;