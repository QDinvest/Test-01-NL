import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComingSoonModal from './ComingSoonModal';

interface GlowButtonProps {
  text: string;
  color: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  href?: string;
  showComingSoonModal?: boolean;
  openInNewTab?: boolean;
}

const GlowButton = ({ 
  text, 
  color, 
  size = 'medium', 
  onClick, 
  href, 
  showComingSoonModal = false,
  openInNewTab = true
}: GlowButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-1.5 text-sm';
      case 'medium':
        return 'px-6 py-2 text-base';
      case 'large':
        return 'px-8 py-3 text-lg';
      default:
        return 'px-6 py-2 text-base';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (showComingSoonModal) {
      e.preventDefault();
      setIsModalOpen(true);
      return;
    }
    
    if (onClick) {
      onClick();
    }
  };

  const ButtonComponent = href ? motion.a : motion.button;
  const linkProps = href ? {
    href,
    target: openInNewTab ? '_blank' : undefined,
    rel: openInNewTab ? 'noopener noreferrer' : undefined
  } : {};

  return (
    <>
      <ButtonComponent
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative rounded-[2rem] text-[#EAEAEA] font-bold transition-all duration-300 overflow-hidden ${getSizeClasses()} shadow-[0_0_10px_rgba(107,63,175,0.2)]`}
        {...linkProps}
      >
      {/* Button background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color === 'primary' ? 'from-gray-900/70 via-neuro-deep-500/10 to-gray-900/70' : 'from-gray-900/70 via-gray-800/10 to-gray-900/70'} backdrop-blur-md rounded-[2rem] border ${color === 'primary' ? 'border-neuro-deep-600/30' : 'border-gray-600/30'}`}></div>
      
      {/* Button text */}
      <span className="relative z-10">{text}</span>
      
      {/* Subtle glow effect */}
      <motion.span 
        className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-70"
        animate={{ 
          boxShadow: [
            '0 0 0px rgba(107,63,175,0.2)', 
            '0 0 15px rgba(107,63,175,0.4)', 
            '0 0 0px rgba(107,63,175,0.2)'
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Shine effect - moves from left to right */}
      <span 
        className="absolute top-0 left-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-[300%] transition-transform ease-in-out duration-1000"
      />
      
      {/* Light trail on hover with subtle glow */}
      <motion.span 
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-70"
        whileHover={{ 
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 0%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 0%)'
          ]
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Additional outer glow effect that's always visible but intensifies on hover */}
      <span 
        className="absolute inset-0 rounded-[2rem] opacity-20 group-hover:opacity-40 blur-md bg-neuro-deep-600/20 transition-opacity duration-300"
      ></span>
      
      {/* Inner gradient */}
      <span className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-neuro-deep-500/5 via-neuro-deep-600/10 to-neuro-deep-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

      {/* Decorative edge glows like in the Core Features section */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neuro-deep-600/50 to-transparent"></div>
      <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-neuro-deep-600/40 to-transparent"></div>
    </ButtonComponent>
      {showComingSoonModal && (
        <ComingSoonModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default GlowButton;