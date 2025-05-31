import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = '' }: GlassCardProps) => {
  return (
    <div className={`relative bg-gradient-to-br from-gray-900/50 via-gray-900/40 to-gray-900/50 backdrop-blur-md rounded-3xl border border-neuro-deep-600/30 overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(107,63,175,0.3)] ${className}`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neuro-deep-500/5 via-neuro-deep-600/10 to-neuro-deep-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neuro-deep-500/0 via-neuro-deep-600/20 to-neuro-deep-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"></div>
      
      {/* Light edge glow that's always visible but intensifies on hover */}
      <div className="absolute inset-0 rounded-3xl shadow-[0_0_8px_rgba(107,63,175,0.1)] group-hover:shadow-[0_0_15px_rgba(107,63,175,0.3)] transition-all duration-300"></div>
      
      {/* Additional color enhancement */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neuro-deep-600/30 to-transparent"></div>
      <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-neuro-deep-600/30 to-transparent"></div>
    </div>
  );
};

export default GlassCard;