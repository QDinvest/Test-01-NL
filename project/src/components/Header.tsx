import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SECTION_IDS, NAV_ITEM_LABELS, NAV_MAP, type NavItemLabelValue, type NavMapEntry } from '../constants';
import ComingSoonModal from './common/ComingSoonModal';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NavItemLabelValue>(NAV_ITEM_LABELS.MAIN);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems: NavItemLabelValue[] = Object.values(NAV_ITEM_LABELS);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections: { [label in NavItemLabelValue]?: number } = {};
      Object.values(NAV_MAP).forEach((navDetail: NavMapEntry) => {
        if (navDetail.id === SECTION_IDS.MAIN) {
          sections[navDetail.label] = 0;
        } else {
          sections[navDetail.label] = document.getElementById(navDetail.id)?.offsetTop || 0;
        }
      });
      
      const scrollPosition = window.scrollY + 200;
      
      let currentActiveSection: NavItemLabelValue = NAV_ITEM_LABELS.MAIN;
      
      for (const label of navItems) {
        const position = sections[label];
        if (position !== undefined && scrollPosition >= position) {
          currentActiveSection = label;
        }
      }
      
      if (currentActiveSection !== activeTab) {
        setActiveTab(currentActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, navItems]);

  const scrollToSection = (navItemLabel: NavItemLabelValue) => {
    const navDetail = Object.values(NAV_MAP).find(detail => detail.label === navItemLabel);

    if (!navDetail) return;

    const targetId = navDetail.id;
    
    if (targetId === SECTION_IDS.MAIN) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveTab(NAV_ITEM_LABELS.MAIN);
      return;
    }
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const headerOffset = 100;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveTab(NAV_ITEM_LABELS.MAIN);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-transparent py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      {/* Center blur effect that's more pronounced */}
      <div className="absolute inset-0 left-1/4 right-1/4 backdrop-blur-xl opacity-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={scrollToTop}
          >
            <img 
              src="https://i.ibb.co/qLmcbKjs/image-Photoroom-22.png" 
              alt="NeuroLabs Logo" 
              className="h-10 w-10 mix-blend-screen" 
              style={{ filter: 'brightness(1.2) contrast(1.1)' }}
            />
            <span className="text-xl font-bold tracking-tight text-white">
              NeuroLabs
            </span>
          </motion.div>

          {/* Desktop Navigation - Pill shaped */}
          <div className="hidden md:flex">
            <div className="bg-gradient-to-r from-neuro-deep-500/30 via-neuro-deep-600/40 to-neuro-deep-700/30 backdrop-blur-lg rounded-full px-2 py-1.5 border border-neuro-deep-600/30 shadow-[0_0_15px_rgba(107,63,175,0.15)]">
              <nav className="flex space-x-1">
                {navItems.map((item: NavItemLabelValue) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveTab(item);
                      scrollToSection(item);
                    }}
                    className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ease-out focus:outline-none whitespace-nowrap ${ 
                      activeTab === item
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {activeTab === item && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-gradient-to-r from-neuro-purple-600 to-neuro-blue-600 rounded-full shadow-md"
                        style={{ borderRadius: 9999 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="group relative rounded-[2rem] text-[#EAEAEA] font-bold transition-all duration-300 overflow-hidden px-6 py-2 shadow-[0_0_10px_rgba(107,63,175,0.2)]"
          >  
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-neuro-deep-500/10 to-gray-900/70 backdrop-blur-md rounded-[2rem] border border-neuro-deep-600/30"></div>
            
            <span className="relative z-10">Launch App</span>
            
            <span 
              className="absolute top-0 left-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-[300%] transition-transform ease-in-out duration-1000"
            />
            
            {/* Glow effect */}
            <span 
              className="absolute inset-0 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-md bg-neuro-deep-600/30 transition-opacity duration-300"
            ></span>
            
            {/* Decorative edge glows */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neuro-deep-600/50 to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-neuro-deep-600/40 to-transparent"></div>
          </motion.button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-4 bg-neuro-black/95 backdrop-blur-md rounded-lg border border-neuro-purple-600/20"
          >
            <div className="flex flex-col space-y-4 px-4">
              {navItems.map((item: NavItemLabelValue) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveTab(item);
                    scrollToSection(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-all duration-300 ${ 
                    activeTab === item
                      ? 'bg-gradient-to-r from-neuro-deep-600 to-neuro-deep-700 text-white font-medium'
                      : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
                  } transition-colors`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="group relative overflow-hidden mt-2 w-full px-6 py-2 rounded-[2rem] text-[#EAEAEA] font-bold transition-all duration-300"
              >
                {/* Button background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-neuro-deep-500/10 to-gray-900/70 backdrop-blur-md rounded-[2rem] border border-neuro-deep-600/30"></div>
                
                <span className="relative z-10">Launch App</span>
                
                {/* Shine effect - moves from left to right */}
                <span 
                  className="absolute top-0 left-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-[300%] transition-transform ease-in-out duration-1000"
                />
                
                {/* Glow effect */}
                <span 
                  className="absolute inset-0 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-md bg-neuro-deep-600/30 transition-opacity duration-300"
                ></span>
                
                {/* Decorative edge glows */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neuro-deep-600/50 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-neuro-deep-600/40 to-transparent"></div>
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Coming Soon Modal */}
      <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.header>
  );
};

export default Header;