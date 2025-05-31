
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { PiLinktreeLogoLight, PiAppWindowLight, PiTelegramLogoLight, PiBookBookmarkLight, PiXLogoLight } from 'react-icons/pi';
import { useState } from 'react';
import ComingSoonModal from './common/ComingSoonModal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const links = [
    { title: 'Linktree', icon: <PiLinktreeLogoLight className="h-4 w-4" />, href: 'https://linktr.ee/NeuroLabsTech' },
    { title: 'App', icon: <PiAppWindowLight className="h-4 w-4" />, showComingSoonModal: true },
    { title: 'Telegram', icon: <PiTelegramLogoLight className="h-4 w-4" />, href: 'https://t.me/NeuroLabsPortal' },
    { title: 'X', icon: <PiXLogoLight className="h-4 w-4" />, href: 'https://x.com/NeuroLabsTech' },
    { title: 'Lite-Paper', icon: <PiBookBookmarkLight className="h-4 w-4" />, href: 'https://neuroteams-organization.gitbook.io/neurolabs-lite-paper./' },
    { title: 'Dex', icon: <ExternalLink className="h-4 w-4" />, href: '#' },
  ];
  
  return (
    <footer className="relative mt-24 border-t border-neuro-purple-600/20">
      <div className="bg-neuro-black/80 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 md:mb-0"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://i.ibb.co/qLmcbKjs/image-Photoroom-22.png" 
                  alt="NeuroLabs Logo" 
                  className="h-16 w-16 mix-blend-screen" 
                  style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                />
                <span className="text-xl font-bold text-white">
                  NeuroLabs
                </span>
              </div>
              <p className="text-gray-400 max-w-xs">
                All synced. All live. All in one terminal.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-x-6 gap-y-6 w-full max-w-3xl mx-auto md:mx-0 mt-6 md:mt-0"
            >
              {links.map((link, index) => {
                if (link.showComingSoonModal) {
                  return (
                    <button 
                      key={index}
                      onClick={() => setIsModalOpen(true)}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 cursor-pointer relative"
                    >
                      <span className="mr-3 p-2 rounded-full bg-neuro-deep-800/40 flex items-center justify-center group-hover:bg-neuro-deep-700/60 transition-all duration-300 group-hover:shadow-[0_0_8px_rgba(107,63,175,0.3)]">
                        <span className="text-neuro-purple-400 group-hover:text-neuro-purple-300">{link.icon}</span>
                      </span>
                      <span className="font-medium whitespace-nowrap">{link.title}</span>
                    </button>
                  );
                }
                
                return (
                  <a 
                    key={index}
                    href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 relative"
                  >
                    <span className="mr-3 p-2 rounded-full bg-neuro-deep-800/40 flex items-center justify-center group-hover:bg-neuro-deep-700/60 transition-all duration-300 group-hover:shadow-[0_0_8px_rgba(107,63,175,0.3)]">
                      <span className="text-neuro-purple-400 group-hover:text-neuro-purple-300">{link.icon}</span>
                    </span>
                    <span className="font-medium whitespace-nowrap">{link.title}</span>
                  </a>
                );
              })}
            </motion.div>
          </div>
          
          <div className="mt-16 border-t border-neuro-purple-600/20 pt-8 flex flex-col md:flex-row justify-center items-center">
            <div className="relative px-6 py-3 rounded-full">
              <div className="absolute inset-0 bg-neuro-deep-800/10 rounded-full opacity-30 blur-sm"></div>
              <p className="text-sm text-gray-300 relative z-10">
                © 2025 NeuroLabs. <span className="text-neuro-purple-300">AI-Powered Precision.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-5 pointer-events-none"></div>
      
      {/* Coming Soon Modal */}
      <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};

export default Footer;