import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Network, Zap, LineChart, Brain, Layers, Share2, Globe, Cpu } from 'lucide-react';
import { SECTION_IDS } from '../constants';

// Define phases with the most recent roadmap content
const PHASES = [
  {
    number: "1",
    title: "Launch Foundations",
    status: "Completed",
    points: [
      "Release beta dashboard with basic wallet flow tracking",
      "Publish landing page, brand content, and lightpaper",
      "Begin onboarding users to test core features and give feedback",
      "Launch Neuro social channels, Telegram, and community support"
    ],
    icon: <Zap className="h-8 w-8" />
  },
  {
    number: "1.1",
    title: "Token Access Integration",
    status: "Completed",
    points: [
      "Deploy Neuro token on Ethereum",
      "Set minimum token requirements to unlock key tools",
      "Begin education on how the token works within the Dapp",
      "Add access logic for Free and Pro tiers"
    ],
    icon: <Layers className="h-8 w-8" />
  },
  {
    number: "2.1",
    title: "Token Swapping",
    status: "In Progress",
    points: [
      "Enable simple, integrated token swap feature",
      "Roll out limited trading access for ETH-based tokens",
      "Ensure ease of use for new and mobile traders"
    ],
    icon: <Share2 className="h-8 w-8" />
  },
  {
    number: "2.2",
    title: "Social Sentiment Tools",
    status: "In Progress",
    points: [
      "Launch token-specific sentiment tracking",
      "Let users browse trending tokens and influencer activity",
      "Start displaying wallet reactions to social mentions"
    ],
    icon: <LineChart className="h-8 w-8" />
  },
  {
    number: "2.3",
    title: "Referrals & Profiles",
    status: "",
    points: [
      "Users receive referral codes tied to wallet",
      "Discounts applied automatically for referred users",
      "Referrers earn a share of the fees",
      "Profiles unlock tracking and personalization tools"
    ],
    icon: <Network className="h-8 w-8" />
  },
  {
    number: "3",
    title: "Smarter Trading Experience",
    status: "",
    points: [
      "Roll out wallet behavior labels (e.g. sniper, whale)",
      "Enable alerts when key wallets make moves",
      "Personalize dashboard based on user behavior and saved tokens",
      "Add Telegram alerts, wallet filters, and layout customization"
    ],
    icon: <Brain className="h-8 w-8" />
  },
  {
    number: "3.1",
    title: "AI Agent Protocol",
    status: "",
    points: [
      "Agent builder UI",
      "Stake-to-deploy logic",
      "Launch Agent Marketplace"
    ],
    icon: <Cpu className="h-8 w-8" />
  },
  {
    number: "4",
    title: "Ecosystem Growth",
    status: "",
    points: [
      "Mobile-ready dashboard goes live",
      "Partner projects can embed Neuro tools",
      "Reward campaigns for top users and referrers",
      "Roll out token-based user rewards"
    ],
    icon: <Globe className="h-8 w-8" />
  }
];

const RoadmapSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);

  // Handle scroll and update active index without forcing alignment
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 24; // Corresponds to gap-6 or space-x-6 (24px)
      
      let closestIndex = 0;
      let minDistance = Infinity;
      
      for (let i = 0; i < PHASES.length; i++) {
        const cardLeft = i * (cardWidth + gap);
        const distance = Math.abs(scrollLeft - cardLeft);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
      
      setActiveIndex(Math.min(Math.max(closestIndex, 0), PHASES.length - 1));
      
      // Calculate momentum for smooth scrolling
      const now = Date.now();
      const timeDelta = now - lastScrollTime;
      if (timeDelta > 0 && timeDelta < 100) {
        const posDelta = scrollLeft - lastScrollPos;
        setMomentum(posDelta / timeDelta * 25); // Increased momentum factor
      }
      
      setLastScrollTime(now);
      setLastScrollPos(scrollLeft);
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollTime, lastScrollPos]);

  // Apply momentum scrolling without snapping
  useEffect(() => {
    if (!isDragging && Math.abs(momentum) > 0.5 && scrollRef.current) {
      let animationFrameId: number;
      
      const animate = () => {
        if (!scrollRef.current || Math.abs(momentum) < 0.5) return;
        
        scrollRef.current.scrollLeft += momentum;
        setMomentum(momentum * 0.95); // Gradually reduce momentum
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animationFrameId = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [isDragging, momentum]);

  // Mouse drag scrolling handlers with improved sensitivity
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setMomentum(0); // Reset momentum on new drag
    setDragStartTime(Date.now());
    
    // Change cursor style
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Increased sensitivity for smoother dragging
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    e.preventDefault();
    
    // Track for momentum calculation
    const now = Date.now();
    const timeDelta = now - lastScrollTime;
    if (timeDelta > 0) {
      const posDelta = scrollRef.current.scrollLeft - lastScrollPos;
      if (timeDelta < 100) { // Only calculate momentum for recent moves
        setMomentum(posDelta / timeDelta * 25); // Increased momentum factor
      }
      setLastScrollTime(now);
      setLastScrollPos(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);
    // Change cursor style back
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    
    // If drag duration was very short, it might be a click
    const dragDuration = Date.now() - dragStartTime;
    if (dragDuration < 150 && Math.abs(momentum) < 0.5) {
      // This was probably meant to be a click, not a drag
      handleCardClick(e);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      // Change cursor style back
      if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    }
  };

  // Touch event handlers with improved momentum support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.clientX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setMomentum(0); // Reset momentum on new touch
    setLastScrollTime(Date.now());
    setLastScrollPos(scrollRef.current.scrollLeft);
    setDragStartTime(Date.now());
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const touch = e.touches[0];
    const x = touch.clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Increased sensitivity
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    // Track for momentum calculation
    const now = Date.now();
    const timeDelta = now - lastScrollTime;
    if (timeDelta > 0) {
      const posDelta = scrollRef.current.scrollLeft - lastScrollPos;
      if (timeDelta < 100) { // Only calculate momentum for recent moves
        setMomentum(posDelta / timeDelta * 25); // Increased momentum factor
      }
      setLastScrollTime(now);
      setLastScrollPos(scrollRef.current.scrollLeft);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    
    // If drag duration was very short, it might be a tap
    const dragDuration = Date.now() - dragStartTime;
    if (dragDuration < 150 && Math.abs(momentum) < 0.5) {
      // This was probably meant to be a tap, not a drag
      handleCardTap(e);
    }
  };

  // Handle card click for desktop
  const handleCardClick = (e: React.MouseEvent) => {
    if (!scrollRef.current || isDragging) return;
    
    // Find the clicked card by traversing up the DOM tree
    let target = e.target as HTMLElement;
    while (target && !target.classList.contains('roadmap-card')) {
      if (target.parentElement) {
        target = target.parentElement;
      } else {
        break;
      }
    }
    
    if (target && target.dataset.index) {
      const index = parseInt(target.dataset.index);
      setSelectedIndex(selectedIndex === index ? null : index);
      e.stopPropagation();
    }
  };
  
  // Handle card tap for mobile
  const handleCardTap = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    
    // Find the tapped card by traversing up the DOM tree
    let target = e.target as HTMLElement;
    while (target && !target.classList.contains('roadmap-card')) {
      if (target.parentElement) {
        target = target.parentElement;
      } else {
        break;
      }
    }
    
    if (target && target.dataset.index) {
      const index = parseInt(target.dataset.index);
      setSelectedIndex(selectedIndex === index ? null : index);
      e.stopPropagation();
    }
  };

  // Scroll to specific card (for navigation buttons only) - without snapping behavior
  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    
    const cardElement = scrollRef.current.querySelector('.roadmap-card');
    if (!cardElement) return;
    
    const cardWidth = cardElement.clientWidth;
    const gap = 24; // Corresponds to gap-6 or space-x-6 (24px)
    
    // Use regular scrollTo without smooth behavior to avoid interference with our custom scrolling
    scrollRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'auto'
    });
    
    // Set momentum to zero to prevent conflicts
    setMomentum(0);
  };

  const handlePrevClick = () => {
    const prevIndex = Math.max(activeIndex - 1, 0);
    scrollToCard(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = Math.min(activeIndex + 1, PHASES.length - 1);
    scrollToCard(nextIndex);
  };

  return (
    <section ref={ref} id={SECTION_IDS.ROADMAP} className="relative py-24 overflow-hidden">
      {/* Custom title for Roadmap - styled to match screenshot */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400"
        >
          Roadmap
        </motion.h2>
      </div>
      
      {/* Scrollable cards container with grab cursor for drag interaction - NO SNAP SCROLLING */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-16 scrollbar-hide relative cursor-grab select-none"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left spacer to center the first card */}
        <div className="flex-shrink-0 w-8 md:w-[calc(50%-225px)]"></div>
        
        {PHASES.map((phase, index) => (
          <motion.div
            key={index}
            data-index={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 + Math.min(index, 5) * 0.1 }}
            className={`roadmap-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[450px] mx-2 sm:mx-4 cursor-pointer transition-all duration-300
                ${selectedIndex === index ? 'z-10' : 'z-0'}`}
          >
            <div className="h-full">
              <motion.div 
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 0 25px rgba(107,63,175,0.3)'
                }}
                className={`
                  relative rounded-xl p-8 transition-all duration-300 overflow-hidden min-h-[400px] md:min-h-[450px] h-auto
                  ${selectedIndex === index 
                    ? 'bg-gray-900/10 backdrop-blur-sm border-neuro-deep-700/50 shadow-[0_0_20px_rgba(107,63,175,0.25)] scale-105 border' 
                    : activeIndex === index 
                      ? 'bg-gray-900/10 backdrop-blur-sm border-neuro-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.15)] border' 
                      : 'bg-gray-900/10 backdrop-blur-sm border-neuro-purple-500/10 shadow-[0_0_10px_rgba(147,51,234,0.1)] border'
                  }
                  transition-transform transition-shadow duration-300 ease-in-out
                `}
                style={{
                  transform: selectedIndex === index ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: selectedIndex === index ? '0 0 20px rgba(107, 63, 175, 0.2)' : '',
                }}
              >
                {/* Purple glow effect at the corners */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-neuro-purple-500/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-neuro-purple-500/5 rounded-full blur-xl"></div>
                
                {/* Phase header with status */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-neuro-purple-400">PHASE {phase.number}</h3>
                  {phase.status && (
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      phase.status === "Completed" 
                        ? "bg-neuro-purple-900/20 text-neuro-purple-300 border border-neuro-purple-500/20" 
                        : "bg-indigo-900/20 text-indigo-300 border border-indigo-500/20"
                    }`}>
                      {phase.status}
                    </span>
                  )}
                </div>
                
                {/* Phase title */}
                <h4 className="text-2xl font-bold text-white mb-6 min-h-[40px] sm:min-h-[60px]">{phase.title}</h4>
                
                {/* Bullet points styled as in the screenshot */}
                <ul className="space-y-3">
                  {phase.points.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                      className="flex items-start group"
                    >
                      <div className="mt-1.5 mr-3 flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full border-2 ${
                          phase.status === "Completed" 
                            ? "bg-neuro-purple-500 border-neuro-purple-400" 
                            : "bg-transparent border-neuro-purple-500"
                        }`}></div>
                      </div>
                      <span className="text-gray-300 text-sm sm:text-base break-words transition-colors duration-200 group-hover:text-[#884DC4]">{point}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Active card indicator - subtle glow */}
                {selectedIndex === index && (
                  <div className="absolute inset-0 border border-neuro-deep-700/30 rounded-xl"></div>
                )}
                
                {/* Bottom edge glow - more subtle */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neuro-purple-500/20 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-neuro-purple-500/20 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        ))}
        
        {/* Right spacer to allow scrolling the last card to center */}
        <div className="flex-shrink-0 w-8 md:w-[calc(50%-225px)]"></div>
      </div>
      
      {/* Custom scroll indicator */}
      <div className="relative h-1 max-w-4xl mx-auto mt-4 mb-8 bg-gray-800/30 rounded-full overflow-hidden">
        <motion.div 
          className="absolute h-full bg-gradient-to-r from-neuro-deep-600 to-neuro-deep-700 rounded-full"
          style={{ 
            width: `${100 / PHASES.length}%`,
            left: `${(activeIndex / (PHASES.length - 1)) * 100}%`,
            transform: 'translateX(-50%)'
          }}
          animate={{
            left: `${(activeIndex / (PHASES.length - 1)) * 100}%`
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Navigation dots */}
      <div className="mt-4 flex justify-center space-x-2">
        {PHASES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              scrollToCard(index);
              setSelectedIndex(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? 'bg-neuro-deep-700 scale-125 shadow-[0_0_10px_rgba(107,63,175,0.5)]'
                : activeIndex === index
                  ? 'bg-neuro-purple-500 scale-110 shadow-[0_0_10px_rgba(147,51,234,0.4)]'
                  : 'bg-gray-600/50 hover:bg-gray-500/50'
            }`}
            aria-label={`Go to phase ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows and View full Roadmap button */}
      <div className="mt-12 flex justify-center items-center space-x-4">
        <button 
          onClick={handlePrevClick}
          className="w-12 h-12 rounded-full bg-gray-800/20 border border-neuro-purple-500/10 flex items-center justify-center text-white hover:bg-gray-800/30 transition-all duration-300"
          aria-label="Previous phase"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <a 
          href="https://neuroteams-organization.gitbook.io/neurolabs-lite-paper./development-roadmap"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden px-6 py-3 rounded-[2rem] text-[#EAEAEA] font-bold transition-all duration-300 hover:scale-102 inline-block"
        >
          {/* Button background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-neuro-deep-500/10 to-gray-900/70 backdrop-blur-md rounded-[2rem] border border-neuro-deep-600/30"></div>
          
          <span className="relative z-10">View the full Roadmap</span>
          
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
        </a>
        
        <button 
          onClick={handleNextClick}
          className="w-12 h-12 rounded-full bg-gray-800/20 border border-neuro-purple-500/10 flex items-center justify-center text-white hover:bg-gray-800/30 transition-all duration-300"
          aria-label="Next phase"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default RoadmapSection;