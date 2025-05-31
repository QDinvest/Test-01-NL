import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, TrendingDown, MinusCircle } from 'lucide-react';
import { PiXLogoLight, PiPresentationChartLight, PiTagSimpleLight, PiChartLineUpLight } from 'react-icons/pi';
import SectionTitle from './common/SectionTitle';
import { SECTION_IDS } from '../constants';

const XTrackerAISection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  interface RadarHotspotData {
    id: string;
    name: string;
    tweet: string;
    sentiment: 'bullish' | 'neutral' | 'bearish';
    angle: number; // degrees
  }

  interface RadarHotspot extends RadarHotspotData {
    dotPosition: { x: number; y: number };
    cardPosition: { x: number; y: number };
    isVisible: boolean;
  }

  const initialHotspotsData: RadarHotspotData[] = [
    { id: 'hs1', name: '@CryptoWhale', tweet: 'Just loaded up on $NEURO. This is the next 100x easy! To the moon! #Neuro #AI', sentiment: 'bullish', angle: 45 }, // Top-Right
    { id: 'hs2', name: '@TechTrendz', tweet: 'Interesting developments with $NEURO. Watching closely. Could be a game changer.', sentiment: 'neutral', angle: 135 }, // Bottom-Right (based on current angle calc)
    { id: 'hs3', name: '@MarketSkeptic', tweet: 'Not convinced by the $NEURO hype. Seems overvalued. #Bearish', sentiment: 'bearish', angle: 225 }, // Bottom-Left
    { id: 'hs4', name: '@FutureSeeker', tweet: '$NEURO is combining AI and blockchain innovatively. Long-term bullish.', sentiment: 'bullish', angle: 315 }, // Top-Left (based on current angle calc)
  ];

  const [hotspots, setHotspots] = useState<RadarHotspot[]>([]);
  const scannerAngle = useMotionValue(0); // 0-360, 0 is up, clockwise

  const RADAR_WIDTH = 768; // max-w-3xl
  const RADAR_HEIGHT = 400;
  const RADAR_CENTER_X = RADAR_WIDTH / 2;
  const RADAR_CENTER_Y = RADAR_HEIGHT / 2;
  const DOT_RADIUS = 175; // Increased radius for dots to be further out
  const CARD_WIDTH = 180; 
  const CARD_HEIGHT = 100;
  const CARD_GAP = 10; // Gap between dot and card

  const timeoutsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const newHotspots = initialHotspotsData.map(hs => {
      const effAngleRad = (hs.angle - 90) * (Math.PI / 180);
      const dotX = RADAR_CENTER_X + DOT_RADIUS * Math.cos(effAngleRad);
      const dotY = RADAR_CENTER_Y + DOT_RADIUS * Math.sin(effAngleRad);

      let cardX = 0;
      const cardY = dotY; // Card is vertically centered on the dot

      if (dotX < RADAR_CENTER_X) { // Dot is on the left side of radar
        // Place card to the LEFT of the dot
        cardX = dotX - (CARD_WIDTH / 2) - CARD_GAP;
      } else { // Dot is on the right side of radar
        // Place card to the RIGHT of the dot
        cardX = dotX + (CARD_WIDTH / 2) + CARD_GAP;
      }

      return {
        ...hs,
        dotPosition: { x: dotX, y: dotY },
        cardPosition: { x: cardX, y: cardY },
        isVisible: false,
      };
    });
    setHotspots(newHotspots);
  }, []);

  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  const SCANNER_TOLERANCE_DEGREES = 5;
  const VISIBILITY_DURATION_MS = 2300;

  // Helper: convert Framer-Motion angle (0° right, CW+) to our hotspot system (0° up, CW+).
  // CSS rotation starts at “east” (0°) and increases clockwise. We want 0° = north.
  const framerToHotspotDegrees = (framerDeg: number): number => {
    // Shift 90° CCW so that 0° (east) → 90°, 270° (north) → 0°
    // Add 360 before modulo to avoid negatives
    return (framerDeg + 90 + 360) % 360;
  };

  useMotionValueEvent(scannerAngle, "change", (framerDeg) => {
    const latestAngle = framerToHotspotDegrees(framerDeg);
    setHotspots(prevHotspots =>
      prevHotspots.map(hs => {
        const angleDifference = Math.abs(latestAngle - hs.angle);
        const normalizedDiff = Math.min(angleDifference, 360 - angleDifference);

        let updatedHs = { ...hs }; // Ensure immutability for the current mapping operation

        if (normalizedDiff < SCANNER_TOLERANCE_DEGREES) { // Hotspot is "hit"
          console.log(
            `Radar Hit: Angle=${hs.angle}, ID=${hs.id}, Name=${hs.name}, Tweet Snippet=${hs.tweet.substring(0, 30)}... | Scanner Angle: ${latestAngle.toFixed(1)}`
          );

          // Clear any existing timeout for this card to reset its visibility duration
          if (timeoutsRef.current[hs.id]) {
            clearTimeout(timeoutsRef.current[hs.id]);
            delete timeoutsRef.current[hs.id]; // Clean up ref for the cleared timeout
          }
          
          updatedHs.isVisible = true;
          timeoutsRef.current[hs.id] = setTimeout(() => {
            setHotspots(currentHotspots =>
              currentHotspots.map(h =>
                h.id === hs.id ? { ...h, isVisible: false } : h
              )
            );
            delete timeoutsRef.current[hs.id]; // Clean up ref after timeout completes
          }, VISIBILITY_DURATION_MS);
        } else {
          // If not hit, updatedHs (a copy of hs) is returned. 
          // Its isVisible state (which might be true from a previous hit) is preserved until its timeout fires.
        }
        return updatedHs;
      })
    );
  });

  const SentimentIconDisplay: React.FC<{ sentiment: 'bullish' | 'neutral' | 'bearish' }> = ({ sentiment }) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4 text-green-400 mr-1.5 flex-shrink-0" />;
      case 'neutral':
        return <MinusCircle className="h-4 w-4 text-yellow-400 mr-1.5 flex-shrink-0" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4 text-red-400 mr-1.5 flex-shrink-0" />;
      default:
        return null;
    }
  };

  // Feature cards data (remains unchanged)
  const features = [
    {
      icon: <PiPresentationChartLight className="h-6 w-6 text-neuro-purple-400" />,
      title: "Smart Sentiment Analysis",
      description: "AI-ranked sentiment feed (bullish, neutral, bearish)"
    },
    {
      icon: <PiTagSimpleLight className="h-6 w-6 text-neuro-purple-400" />,
      title: "Social Trend Tracking",
      description: "Tracks hashtags, KOL mentions, and volume surges"
    },
    {
      icon: <PiChartLineUpLight className="h-6 w-6 text-neuro-purple-400" />,
      title: "Integrated Data Visualization",
      description: "Real-time charts and graphs for market insights"
    }
  ];

  return (
    <section ref={ref} id={SECTION_IDS.X_TRACKER} className="py-20 bg-transparent text-neuro-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Neuro X-Tracker AI" subtitle="Token Sentiment and Narrative Monitoring - Real Time" />

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12 relative mx-auto max-w-3xl h-[400px] flex items-center justify-center"
        >
          {/* Radar Background Elements (rings, grid) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neuro-black/40 to-neuro-black/20 overflow-hidden shadow-[0_0_50px_rgba(107,63,175,0.5)]">
            {[0.8, 0.6, 0.4, 0.2].map((scale, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-neuro-purple-700/30 rounded-full"
                style={{ transform: `scale(${scale})` }}
              />
            ))}
            <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-20"></div>
            
            {/* Scanning Line */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 w-1/2 h-1 bg-gradient-to-r from-neuro-purple-500/80 to-transparent origin-left rounded-full shadow-[0_0_8px_rgba(107,63,175,0.8)]"
              style={{ transformOrigin: 'left center' }} // Ensures rotation is around the radar's center point
              onUpdate={(latest) => {
                if (typeof latest.rotate === 'number') {
                  scannerAngle.set(latest.rotate);
                }
              }}
            ></motion.div>
            
            {/* Center Glowing Point */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-4 h-4 bg-neuro-purple-500 rounded-full shadow-[0_0_15px_5px_rgba(107,63,175,0.7)]"
              style={{ x: '-50%', y: '-50%' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Pulsing Dots for Hotspots */}
            {hotspots.map(hs => (
              <motion.div
                key={`dot-${hs.id}-${hs.isVisible ? 'visible' : 'hidden'}`}
                className="absolute rounded-full shadow-lg"
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#1ab7ff', // Plasma Blue
                  left: hs.dotPosition.x,
                  top: hs.dotPosition.y,
                  translateX: '-50%', // Center dot on its coordinate
                  translateY: '-50%',
                }}
                initial={{
                  scale: 1,
                  opacity: 0.7,
                  boxShadow: "0 0 3px 1px #1ab7ff"
                }}
                animate={hs.isVisible ? {
                  // One dramatic glow effect when triggered
                  scale: [1, 2.8, 1.2],
                  opacity: [0.7, 1, 0.8],
                  boxShadow: [
                    "0 0 3px 1px #1ab7ff",
                    "0 0 20px 6px #1ab7ff", 
                    "0 0 5px 2px #1ab7ff"
                  ]
                } : {
                  // Return to normal state
                  scale: 1,
                  opacity: 0.7,
                  boxShadow: "0 0 3px 1px #1ab7ff"
                }}
                transition={{
                  duration: hs.isVisible ? 1.5 : 0.3,
                  repeat: 0,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Tweet Cards */}
            <AnimatePresence>
              {hotspots.map(hs => {
                if (!hs.isVisible) return null;

                return (
                  <motion.div
                    key={hs.id + '-card'}
                    className="absolute p-3 rounded-lg shadow-xl bg-neuro-gray-800/90 backdrop-blur-sm border border-neuro-purple-700/50 text-xs text-neuro-white overflow-hidden"
                    style={{
                      width: CARD_WIDTH,
                      height: CARD_HEIGHT,
                      // Initial position: card's center is at dot's center
                      left: hs.dotPosition.x - CARD_WIDTH / 2,
                      top: hs.dotPosition.y - CARD_HEIGHT / 2,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      // Final position: card's center is at cardPosition
                      left: hs.cardPosition.x - CARD_WIDTH / 2,
                      top: hs.cardPosition.y - CARD_HEIGHT / 2,
                    }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.4 }}
                  >
                    <div className="flex items-center mb-1.5">
                      <PiXLogoLight className="h-4 w-4 text-sky-400 mr-1.5 flex-shrink-0" />
                      <span className="font-semibold truncate">{hs.name}</span>
                    </div>
                    <p className="mb-1.5 text-[11px] leading-snug break-words line-clamp-3 h-[42px]">{hs.tweet}</p>
                    <div className="flex items-center text-[10px]">
                      <SentimentIconDisplay sentiment={hs.sentiment} />
                      <span className={`font-medium ${hs.sentiment === 'bullish' ? 'text-green-400' : hs.sentiment === 'neutral' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {hs.sentiment.charAt(0).toUpperCase() + hs.sentiment.slice(1)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Feature descriptions below radar */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 * index + 0.5, ease: "easeOut" }}
              className="p-6 bg-neuro-gray-800 rounded-xl shadow-lg"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neuro-purple-300">{feature.title}</h3>
              <p className="text-neuro-white/80 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default XTrackerAISection;