// Uses React for JSX transpilation
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonModal = ({ isOpen, onClose }: ComingSoonModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-gray-900/90 via-neuro-black/95 to-gray-900/90 border border-neuro-deep-600/30 p-8 shadow-[0_0_40px_rgba(107,63,175,0.4)] w-full max-w-md mx-auto">
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              {/* Content */}
              <div className="text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 relative w-28 h-28">
                  <div className="absolute inset-0 rounded-full bg-neuro-purple-500/50 blur-xl animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/qLmcbKjs/image-Photoroom-22.png" 
                      alt="NeuroLabs Logo" 
                      className="h-28 w-28 mix-blend-screen" 
                      style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                    />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-neuro-purple-300">
                  Coming Soon
                </h3>
                
                <p className="text-gray-300 mb-8 text-lg">
                  We're working hard to bring you the full NeuroLabs experience. Stay tuned for our launch!
                </p>
                
                <a 
                  href="https://t.me/NeuroLabsPortal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block group relative overflow-hidden px-6 py-2 rounded-[2rem] text-[#EAEAEA] font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(107,63,175,0.4)] shadow-[0_0_10px_rgba(107,63,175,0.3)]"
                >
                  {/* Button background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-neuro-deep-500/10 to-gray-900/70 backdrop-blur-md rounded-[2rem] border border-neuro-deep-600/30"></div>
                  
                  <span className="relative z-10">Join Our Community</span>
                  
                  {/* Shine effect */}
                  <span 
                    className="absolute top-0 left-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-[300%] transition-transform ease-in-out duration-1000"
                  />
                  
                  {/* Glow effect */}
                  <span 
                    className="absolute inset-0 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-md bg-neuro-deep-600/30 transition-opacity duration-300"
                  ></span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonModal;
