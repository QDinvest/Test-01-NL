import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LogicFlowAnimation
 * --------------------------------------------------------------
 * Renders a two–part animation used in the AI Agent Protocol section.
 * 1. Horizontal logic strip with five tiles that light up sequentially.
 * 2. A terminal-style typing block that prints strategy code.
 * Once the code finishes printing the entire sequence resets and loops.
 *
 * Design tokens (see tailwind.config.js for colour refs):
 * – Obsidian Black background (bg-neuro-black / #050509)
 * – Electric Purple, Plasma Blue, Neon Green glows
 */

const TILE_LABELS = [
  'Wallet Flow',
  'Sentiment Spike',
  'Token Verified',
  'Volume Surge',
  'Execute'
] as const;

// Define the sequence in which tiles should be activated
const ACTIVATION_SEQUENCE = [0, 3, 1, 2, 4]; // Wallet Flow, Volume Surge, Sentiment Spike, Token Verified, Execute

const CODE_LINES = [
  '# Agent: WhaleTracker',
  '',
  'when wallet_transaction >= 10 ETH:',
  '    if direction == "buy":',
  '        send_notification("Large buy detected!")',
  '        wait(5 minutes)',
  '        execute_swap(amount=0.5 ETH)',
  '',
  'when social_sentiment > 0.8 and volume_change > 50%:',
  '    execute_swap(amount=0.2 ETH)'
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const LogicFlowAnimation = () => {
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [showExecuteMsg, setShowExecuteMsg] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);

  // Main animation controller (runs once on mount, self-loops)
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        // Reset state at start of loop
        setActiveIdx(-1);
        setShowExecuteMsg(false);
        setTypedLines([]);

        await sleep(400);

        // Light tiles in the specified sequence
        for (let i = 0; i < ACTIVATION_SEQUENCE.length; i++) {
          setActiveIdx(ACTIVATION_SEQUENCE[i]);
          await sleep(550);
        }

        // Show execute message
        setShowExecuteMsg(true);
        await sleep(700);

        // Start terminal typing
        setShowTerminal(true);
        for (const line of CODE_LINES) {
          setTypedLines((prev) => [...prev, line]);
          await sleep(350);
        }

        // Pause then restart
        await sleep(2000);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Animation variants for tiles
  const tileVariants = {
    inactive: {
      backgroundColor: 'rgba(23,23,35,0.4)',
      borderColor: 'rgba(147,51,234,0.3)',
      color: '#a5a5b5',
      boxShadow: '0 0 0 rgba(147,51,234,0)',
    },
    active: {
      backgroundColor: 'rgba(64,33,115,0.6)',
      borderColor: 'rgba(168,85,247,0.9)',
      color: '#d8b4fe',
      boxShadow: '0 0 12px rgba(168,85,247,0.8)',
    },
    final: {
      backgroundColor: 'rgba(0,64,32,0.6)',
      borderColor: 'rgba(34,197,94,0.9)',
      color: '#86efac',
      boxShadow: '0 0 14px rgba(34,197,94,0.9)',
    },
  } as const;

  return (
    <div className="relative flex flex-col select-none h-[380px]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-neuro-purple-500/15 to-transparent opacity-40 blur-3xl -z-10"></div>
      
      {/* Main container with glow */}
      <div className="relative bg-gradient-to-br from-neuro-deep-800 via-neuro-deep-900 to-neuro-deep-800 p-6 rounded-2xl border border-neuro-purple-700/30 overflow-hidden shadow-[0_0_30px_rgba(107,63,175,0.3)]">
        {/* Neural mesh / grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Horizontal lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px w-full bg-neuro-deep-700/40"
              style={{ top: `${(i + 1) * 15}%` }}
            />
          ))}
          {/* Vertical lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px h-full bg-neuro-deep-700/40"
              style={{ left: `${(i + 1) * 15}%` }}
            />
          ))}
        </div>

        {/* Tile rows */}
        <div className="relative z-10 space-y-3">
          {/* First row - Wallet Flow, Sentiment Spike, Token Verified */}
          <div className="flex items-center justify-between space-x-4">
            {/* Wallet Flow */}
            <motion.div
              key={TILE_LABELS[0]}
              variants={tileVariants}
              animate={(activeIdx === 0 || activeIdx >= 0 && ACTIVATION_SEQUENCE.indexOf(0) <= ACTIVATION_SEQUENCE.indexOf(activeIdx)) ? 'active' : 'inactive'}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 rounded-xl border backdrop-blur-md text-xs font-semibold whitespace-nowrap"
            >
              {TILE_LABELS[0]}
            </motion.div>

            {/* Sentiment Spike */}
            <motion.div
              key={TILE_LABELS[1]}
              variants={tileVariants}
              animate={(activeIdx === 1 || activeIdx >= 0 && ACTIVATION_SEQUENCE.indexOf(1) <= ACTIVATION_SEQUENCE.indexOf(activeIdx)) ? 'active' : 'inactive'}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 rounded-xl border backdrop-blur-md text-xs font-semibold whitespace-nowrap"
            >
              {TILE_LABELS[1]}
            </motion.div>

            {/* Token Verified */}
            <motion.div
              key={TILE_LABELS[2]}
              variants={tileVariants}
              animate={(activeIdx === 2 || activeIdx >= 0 && ACTIVATION_SEQUENCE.indexOf(2) <= ACTIVATION_SEQUENCE.indexOf(activeIdx)) ? 'active' : 'inactive'}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 rounded-xl border backdrop-blur-md text-xs font-semibold whitespace-nowrap"
            >
              {TILE_LABELS[2]}
            </motion.div>
          </div>

          {/* Second row - Volume Surge under Wallet Flow with Execute on the right */}
          <div className="flex items-start justify-between">
            {/* Volume Surge */}
            <motion.div
              key={TILE_LABELS[3]}
              variants={tileVariants}
              animate={(activeIdx === 3 || activeIdx >= 0 && ACTIVATION_SEQUENCE.indexOf(3) <= ACTIVATION_SEQUENCE.indexOf(activeIdx)) ? 'active' : 'inactive'}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 rounded-xl border backdrop-blur-md text-xs font-semibold whitespace-nowrap"
            >
              {TILE_LABELS[3]}
            </motion.div>
            
            {/* Execute on the right side */}
            <motion.div
              key={TILE_LABELS[4]}
              variants={tileVariants}
              animate={activeIdx === 4 ? 'final' : (activeIdx >= 0 && ACTIVATION_SEQUENCE.indexOf(4) <= ACTIVATION_SEQUENCE.indexOf(activeIdx)) ? 'active' : 'inactive'}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 rounded-xl border backdrop-blur-md text-xs font-semibold whitespace-nowrap"
              style={{ width: 'fit-content' }}
            >
              {TILE_LABELS[4]}
            </motion.div>
          </div>
        </div>

        {/* Strategy executing message */}
        <AnimatePresence>
          {showExecuteMsg && (
            <motion.div
              key="exec-msg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-neuro-green-400 font-mono text-sm"
            >
              {'>> Strategy Executing...'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TERMINAL - absolutely positioned */}
      <div className="absolute top-[140px] left-0 right-0 h-[230px]">
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-neuro-deep-900/60 p-4 rounded-xl border border-neuro-purple-700/30 font-mono text-[13px] leading-relaxed text-neuro-white/80 h-full overflow-hidden shadow-[0_0_20px_rgba(147,51,234,0.15)] backdrop-blur-md before:absolute before:inset-0 before:rounded-xl before:border before:border-neuro-purple-500/20 before:pointer-events-none"
            >
              {typedLines.map((l, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {l}
                </div>
              ))}
              {/* Blinking cursor */}
              <span className="animate-pulse">{typedLines.length % 2 === 0 ? '▍' : '▌'}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LogicFlowAnimation;
