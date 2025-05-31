import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import React from 'react';

// Types for our nodes and edges
interface NodeData {
  id: string;
  type: 'C' | 'W' | 'S' | 'B' | 'T';
  label: string;
  position: { x: number; y: number };
  address: string;
  holding: string;
  tokens: string;
  value: string;
  pnl: string;
  isActive?: boolean;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  animated: boolean;
}

interface PopupData {
  visible: boolean;
  node: NodeData | null;
  position: { x: number; y: number };
}

/**
 * Generate mathematically precise positions for nodes in a radial layout
 * This function ensures perfectly balanced distribution of nodes
 * 
 * @param numPoints Number of points to distribute
 * @param radiusPercent Radius as percentage of container (normalized)
 * @param startAngleOffset Optional offset to rotate the entire layout (in radians)
 * @returns Array of normalized positions (0-100 range for both x and y)
 */
const generateRadialPositions = (
  numPoints: number, 
  radiusPercent: number = 40, // Use wider radius (40% of container)
  startAngleOffset: number = -Math.PI / 2 // Start from top (12 o'clock position)
): { x: number, y: number }[] => {
  const positions: { x: number, y: number }[] = [];
  
  // Calculate the angle increment for equal distribution
  const angleIncrement = (2 * Math.PI) / numPoints;
  
  // For each point, calculate its position on the circle
  for (let i = 0; i < numPoints; i++) {
    // Calculate the angle for this point with perfect spacing
    const angle = startAngleOffset + (i * angleIncrement);
    
    // Convert polar coordinates to Cartesian (normalized 0-100 range)
    // Use a wider spread by adjusting the radius
    const x = 50 + radiusPercent * Math.cos(angle);
    const y = 50 + radiusPercent * Math.sin(angle);
    
    positions.push({ x, y });
  }
  
  return positions;
};

/**
 * Create a balanced node structure with categorized wallet types
 * This modular approach allows for dynamic adjustment based on number of nodes
 */

// Group wallet types by category for visual cohesion
interface WalletCategory {
  type: 'W' | 'S' | 'B' | 'T';
  label: string;
  color: string;
  nodes: Omit<NodeData, 'position'>[];
}

// Configure wallet categories with consistent styling
const walletCategories: WalletCategory[] = [
  {
    type: 'W',
    label: 'Whale',
    color: 'rgb(59, 130, 246)', // Blue
    nodes: [
      { 
        id: 'whale001', 
        type: 'W', 
        label: 'Whale001',
        address: '0xABCD1234EFGH5678IJKL9012MNOP3456QRST1234',
        holding: '3.4%',
        tokens: '1.2M',
        value: '$97K',
        pnl: '+42%'
      },
      { 
        id: 'whale002', 
        type: 'W', 
        label: 'Whale002',
        address: '0x7A16FF8270133F063AAB6C9977183D9E72835428',
        holding: '2.8%',
        tokens: '980K',
        value: '$82K',
        pnl: '+17%'
      }
    ]
  },
  {
    type: 'S',
    label: 'Sniper',
    color: 'rgb(239, 68, 68)', // Red
    nodes: [
      { 
        id: 'sniper001', 
        type: 'S', 
        label: 'Sniper001',
        address: '0x931D387731BBBC988B312206C74F77D004D6B84B',
        holding: '1.2%',
        tokens: '420K',
        value: '$35K',
        pnl: '+89%'
      },
      { 
        id: 'sniper002', 
        type: 'S', 
        label: 'Sniper002',
        address: '0x3D2F8AE0A0D2C2A2F8B8A9A0B8C7D6E5F4G3H2I1J',
        holding: '0.8%',
        tokens: '280K',
        value: '$23K',
        pnl: '+53%'
      }
    ]
  },
  {
    type: 'B',
    label: 'Bot',
    color: 'rgb(234, 179, 8)', // Yellow
    nodes: [
      { 
        id: 'bot001', 
        type: 'B', 
        label: 'Bot001',
        address: '0x3A6E3A9D2F4095E2C3B060A7596A814DCAEEFE2C',
        holding: '0.5%',
        tokens: '175K',
        value: '$14K',
        pnl: '+22%'
      },
      { 
        id: 'bot002', 
        type: 'B', 
        label: 'Bot002',
        address: '0x1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U',
        holding: '0.3%',
        tokens: '105K',
        value: '$8K',
        pnl: '-5%'
      }
    ]
  },
  {
    type: 'T',
    label: 'Team',
    color: 'rgb(34, 197, 94)', // Green
    nodes: [
      { 
        id: 'team001', 
        type: 'T', 
        label: 'Team001',
        address: '0xF4E77E5DA47AC3125140C470C71CBF8A71C6B7F3',
        holding: '4.5%',
        tokens: '1.6M',
        value: '$132K',
        pnl: '+12%'
      }
    ]
  }
];

// Flatten all wallet nodes into a single array
const allWalletNodes: Omit<NodeData, 'position'>[] = 
  walletCategories.flatMap(category => category.nodes);

// Initialize node data with the central contract node
const nodeData: NodeData[] = [
  // Contract node (always center of visualization)
  { 
    id: 'contract', 
    type: 'C', 
    label: 'Contract',
    position: { x: 50, y: 50 }, // Exact center (50%, 50%)
    address: '0xABCD1234EFGH5678IJKL9012MNOP3456QRST7890',
    holding: '100%',
    tokens: '100M',
    value: '$1.2M',
    pnl: '0%'
  }
];

// Generate balanced radial positions for all wallet nodes
const walletPositions = generateRadialPositions(
  allWalletNodes.length, 
  70 // Radius: 70% of container size for much wider distribution
);

// Add positioned wallet nodes to the nodeData array
allWalletNodes.forEach((wallet, index) => {
  nodeData.push({
    ...wallet,
    position: walletPositions[index]
  });
});

// Define edges between nodes
const createEdges = () => {
  // Connect contract node to all other nodes
  return nodeData
    .filter(node => node.id !== 'contract')
    .map(node => ({
      id: `edge-contract-${node.id}`,
      source: 'contract',
      target: node.id,
      animated: false
    }));
};

const ContractFlowVisualizer = () => {
  // Initialize state with our predefined nodes
  const [nodes] = useState<NodeData[]>(nodeData);
  const [edges, setEdges] = useState<EdgeData[]>(createEdges());
  const [popup, setPopup] = useState<PopupData>({ visible: false, node: null, position: { x: 0, y: 0 } });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle the animation loop
  useEffect(() => {
    let animationTimeout: ReturnType<typeof setTimeout>;
    let cursorMoveTimeout: ReturnType<typeof setTimeout>;
    let popupTimeout: ReturnType<typeof setTimeout>;
    
    const runAnimationSequence = () => {
      // Reset state
      setShowCursor(false);
      setPopup({ visible: false, node: null, position: { x: 0, y: 0 } });
      
      // Step 1: Activate a random node (simulate new transaction)
      const randomNodeIndex = Math.floor(Math.random() * (nodes.length - 1)) + 1; // Skip contract node
      const targetNodeId = nodes[randomNodeIndex].id;
      
      // Animate the edge first
      const edgeToAnimate = edges.findIndex(edge => edge.target === targetNodeId);
      if (edgeToAnimate !== -1) {
        const newEdges = [...edges];
        newEdges[edgeToAnimate] = { ...newEdges[edgeToAnimate], animated: true };
        setEdges(newEdges);
        
        // Then highlight the node
        setTimeout(() => {
          setActiveNodeId(targetNodeId);
          
          // After node highlights, show cursor and move to it
          setTimeout(() => {
            setShowCursor(true);
            const targetNode = nodes.find(n => n.id === targetNodeId);
            if (targetNode) {
              setCursorPosition({
                x: targetNode.position.x,
                y: targetNode.position.y
              });
              
              // After cursor arrives, show popup
              cursorMoveTimeout = setTimeout(() => {
                setPopup({
                  visible: true,
                  node: targetNode,
                  position: {
                    x: targetNode.position.x,
                    y: targetNode.position.y
                  }
                });
                
                // Hide popup after a few seconds
                popupTimeout = setTimeout(() => {
                  setPopup({ visible: false, node: null, position: { x: 0, y: 0 } });
                  
                  // Move to another node
                  const secondRandomIndex = Math.floor(Math.random() * (nodes.length - 1)) + 1;
                  const secondNodeId = nodes[secondRandomIndex].id;
                  const secondNode = nodes.find(n => n.id === secondNodeId);
                  
                  if (secondNode) {
                    setCursorPosition({
                      x: secondNode.position.x,
                      y: secondNode.position.y
                    });
                    
                    // Show second popup
                    setTimeout(() => {
                      setPopup({
                        visible: true,
                        node: secondNode,
                        position: {
                          x: secondNode.position.x,
                          y: secondNode.position.y
                        }
                      });
                      
                      // Hide second popup and reset for next loop
                      setTimeout(() => {
                        setPopup({ visible: false, node: null, position: { x: 0, y: 0 } });
                        setActiveNodeId(null);
                        setShowCursor(false);
                        
                        // Reset animated edges
                        const resetEdges = edges.map(edge => ({ ...edge, animated: false }));
                        setEdges(resetEdges);
                        
                        // Start the sequence again
                        animationTimeout = setTimeout(runAnimationSequence, 1000);
                      }, 2000);
                    }, 500);
                  }
                }, 2000);
              }, 1000);
            }
          }, 500);
        }, 1000);
      }
    };
    
    // Start the animation sequence
    animationTimeout = setTimeout(runAnimationSequence, 1000);
    
    // Cleanup
    return () => {
      clearTimeout(animationTimeout);
      clearTimeout(cursorMoveTimeout);
      clearTimeout(popupTimeout);
    };
  }, [nodes, edges]);

  // Get color based on node type
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'C': return 'rgb(107, 63, 175)'; // Purple for contract
      case 'W': return 'rgb(59, 130, 246)'; // Blue for whale
      case 'S': return 'rgb(239, 68, 68)';  // Red for sniper
      case 'B': return 'rgb(234, 179, 8)';  // Yellow for bot
      case 'T': return 'rgb(34, 197, 94)';  // Green for team
      default: return 'rgb(156, 163, 175)'; // Gray default
    }
  };

  /**
   * Calculate node size dynamically based on container dimensions
   * This ensures consistent proportional sizing across different screen sizes
   */
  const getNodeSize = (type: string) => {
    if (!containerRef.current) {
      // Fallback values if container not yet measured
      return type === 'C' ? 70 : 45;
    }
    
    // Get the container dimensions
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const minDimension = Math.min(width, height);
    
    // Adjust node sizes to be smaller for better distribution
    if (type === 'C') {
      return minDimension * 0.15; // Contract node: 15% of min dimension
    } else {
      return minDimension * 0.10; // Wallet nodes: 10% of min dimension
    }
  };

  /**
   * Converts normalized coordinates (0-100 range) to actual pixel positions
   * This ensures precise positioning across the full width of the container
   */
  const getPixelPosition = (normalizedPos: { x: number, y: number }) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    // Get the actual dimensions of the container
    const rect = containerRef.current.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    
    // Calculate the center point of the container
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    
    // Calculate the position relative to the center
    // This scales the entire visualization to fit the container
    return {
      x: centerX + ((normalizedPos.x - 50) / 100) * containerWidth,
      y: centerY + ((normalizedPos.y - 50) / 100) * containerHeight
    };
  };

  return (
    <GlassCard className="w-full aspect-video relative overflow-hidden">
      <div 
        ref={containerRef}
        className="w-full h-full relative"
        style={{
          background: 'radial-gradient(circle at center, rgba(20, 20, 30, 0.7) 0%, rgba(10, 10, 15, 0.8) 70%)',
          minHeight: '480px', // Proper height for maintaining aspect ratio
          aspectRatio: '16/9',  // Maintain consistent proportions
          width: '100%', // Explicitly set width to 100%
          maxWidth: '100%', // Ensure it doesn't exceed container
          overflow: 'visible' // Ensure contents aren't clipped
        }}
      >
        {/* Visualization container - full width with proper positioning */}
        <div className="absolute inset-0 z-10 w-full h-full">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMmQyZDQ1IiBzdHJva2Utb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          
          {/* Neural ambient effects - centered and mathematically balanced */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Central plasma glow with precise opacity */}
            <div className="absolute inset-0 opacity-10 bg-gradient-radial from-neuro-purple-500/20 via-transparent to-transparent"></div>
            
            {/* Ambient glow spots with mathematical distribution */}
            <div className="absolute w-[40%] h-[40%] rounded-full bg-neuro-purple-500/5 blur-3xl animate-slow-pulse"></div>
            <div className="absolute w-[60%] h-[60%] rounded-full bg-neuro-purple-500/10 blur-3xl animate-slow-pulse delay-1000"></div>
            <div className="absolute w-[80%] h-[80%] rounded-full bg-neuro-purple-500/5 blur-3xl animate-slow-pulse delay-2000"></div>

            {/* Neural network grid pattern - subtle but visible */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjgzZWFmIiBzdHJva2Utb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48L3N2Zz4=')] bg-center opacity-20"></div>
          </div>
          
          {/* Network Edges with precise mathematical calculations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '100%', height: '100%' }}>
            {/* Edge glow definition for reuse */}
            <defs>
              <filter id="edge-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              {/* Animated flow for edges */}
              <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(107, 63, 175, 0)" />
                <stop offset="50%" stopColor="rgba(107, 63, 175, 0.5)" />
                <stop offset="100%" stopColor="rgba(107, 63, 175, 0)" />
                <animateTransform 
                  attributeName="gradientTransform" 
                  type="translate" 
                  from="-1 0" 
                  to="1 0" 
                  dur="2s" 
                  repeatCount="indefinite" 
                />
              </linearGradient>
            </defs>
            
            {edges.map(edge => {
              const sourceNode = nodes.find(node => node.id === edge.source);
              const targetNode = nodes.find(node => node.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;
              
              // Get precise pixel positions
              const sourcePos = getPixelPosition(sourceNode.position);
              const targetPos = getPixelPosition(targetNode.position);
              
              // Calculate dynamically sized nodes
              const sourceSize = getNodeSize(sourceNode.type);
              const targetSize = getNodeSize(targetNode.type);
              
              // Calculate exact edge connection points with proper math
              const dx = targetPos.x - sourcePos.x;
              const dy = targetPos.y - sourcePos.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx);
              
              // Precise radius calculations
              const sourceRadius = sourceSize / 2;
              const targetRadius = targetSize / 2;
              
              // Calculate exact edge connection points
              const adjustedSource = {
                x: sourcePos.x + Math.cos(angle) * sourceRadius,
                y: sourcePos.y + Math.sin(angle) * sourceRadius
              };
              
              const adjustedTarget = {
                x: targetPos.x - Math.cos(angle) * targetRadius,
                y: targetPos.y - Math.sin(angle) * targetRadius
              };
              
              // Get base color for the edge from the target node
              const color = getNodeColor(targetNode.type);
              
              return (
                <g key={edge.id}>
                  {/* Base edge connection line with proper width scaling */}
                  <line
                    x1={adjustedSource.x}
                    y1={adjustedSource.y}
                    x2={adjustedTarget.x}
                    y2={adjustedTarget.y}
                    stroke={color}
                    strokeWidth={edge.animated ? 1.5 : 0.8}
                    strokeOpacity={0.3}
                    filter="url(#edge-glow)"
                  />
                  
                  {/* Dynamic flow animation with variable intensity */}
                  <motion.line
                    x1={adjustedSource.x}
                    y1={adjustedSource.y}
                    x2={adjustedTarget.x}
                    y2={adjustedTarget.y}
                    stroke={color}
                    strokeWidth={edge.animated ? 3 : 1.5}
                    initial={{ strokeOpacity: 0.1 }}
                    animate={{ 
                      strokeOpacity: edge.animated ? [0.3, 0.7, 0.3] : [0.05, 0.2, 0.05],
                      strokeDashoffset: [-distance, 0]
                    }}
                    style={{ 
                      strokeDasharray: `${distance * 0.1} ${distance * 0.9}`,
                      filter: edge.animated ? 'brightness(1.5) drop-shadow(0 0 3px rgba(107,63,175,0.7))' : 'none'
                    }}
                    transition={{
                      duration: edge.animated ? 1.5 : 3,
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                  
                  {/* Animated pulse particle traveling along edge */}
                  {edge.animated && (
                    <motion.circle
                      cx={adjustedSource.x}
                      cy={adjustedSource.y}
                      r={3}
                      fill={color}
                      filter="url(#edge-glow)"
                      animate={{
                        cx: [adjustedSource.x, adjustedTarget.x],
                        cy: [adjustedSource.y, adjustedTarget.y],
                        opacity: [0, 1, 0.8, 0],
                        scale: [0.5, 1.2, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.8,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.7, 1],
                        repeat: Infinity,
                        repeatDelay: 0.7
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
          
          {/* Nodes - positioned to fill entire width */}
          <div className="absolute inset-0 w-full h-full">
            {nodes.map(node => {
              const pixelPos = getPixelPosition(node.position);
              const nodeSize = getNodeSize(node.type);
              const color = getNodeColor(node.type);
              const isActive = node.id === activeNodeId;
              
              return (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: pixelPos.x,
                    top: pixelPos.y,
                    width: nodeSize,
                    height: nodeSize,
                    zIndex: node.type === 'C' ? 20 : 10 // Contract node on top
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: isActive ? [1, 1.2, 1] : 1, 
                    opacity: 1,
                    boxShadow: isActive 
                      ? [
                          `0 0 0px ${color}`,
                          `0 0 15px ${color}`,
                          `0 0 5px ${color}`
                        ] 
                      : `0 0 5px ${color}`
                  }}
                  transition={{ 
                    duration: isActive ? 0.8 : 0.5,
                    repeat: isActive ? 1 : 0,
                    repeatType: "reverse"
                  }}
                >
                  {/* Node background */}
                  <div 
                    className="w-full h-full rounded-full relative flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at center, ${color}30 0%, ${color}15 70%)`,
                      border: `1.5px solid ${color}60`,
                      boxShadow: `0 0 10px ${color}30`
                    }}
                  >
                    {/* Node label */}
                    <div 
                      className="font-bold text-center" 
                      style={{ 
                        color,
                        fontSize: node.type === 'C' ? '22px' : '16px'
                      }}
                    >
                      {node.type}
                    </div>
                    
                    {/* Outer glow when active */}
                    {isActive && (
                      <motion.div 
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ backgroundColor: 'transparent', boxShadow: `0 0 25px ${color}` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Subtle permanent glow */}
                    <motion.div 
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ backgroundColor: 'transparent', boxShadow: `0 0 10px ${color}40` }}
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Cursor visualization */}
          {showCursor && (
            <motion.div 
              className="absolute w-5 h-5 pointer-events-none z-30"
              style={{
                backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAxNS44NjZMMTUuODY2IDVNNS4xMzQgNUwxNiAxNS44NjYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+')`,
                backgroundSize: 'contain',
                filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))'
              }}
              initial={{ 
                left: cursorPosition.x, 
                top: cursorPosition.y,
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                left: cursorPosition.x, 
                top: cursorPosition.y,
                opacity: 1,
                scale: 1
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 0.5
              }}
            />
          )}
          
          {/* Popup */}
          <AnimatePresence>
            {popup.visible && popup.node && (
              <motion.div
                className="absolute z-40 w-64 pointer-events-none"
                style={(() => {
                  // Intelligent popup positioning logic
                  const nodePos = getPixelPosition(popup.node.position);
                  const containerRect = containerRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
                  
                  // Calculate boundaries and available space
                  const spaceRight = containerRect.width - nodePos.x;
                  const spaceLeft = nodePos.x;
                  const spaceBottom = containerRect.height - nodePos.y;
                  const spaceTop = nodePos.y;
                  
                  // Get node size for offset calculations
                  const nodeSize = getNodeSize(popup.node.type);
                  
                  // Determine optimal position based on available space
                  let posX, posY, transformX, transformY;
                  
                  // Horizontal positioning with collision avoidance
                  if (spaceRight > 200) { // Plenty of space to the right
                    posX = nodePos.x + (nodeSize / 2) + 10;
                    transformX = '0%';
                  } else if (spaceLeft > 200) { // Plenty of space to the left
                    posX = nodePos.x - (nodeSize / 2) - 10;
                    transformX = '-100%';
                  } else { // Center align as fallback
                    posX = nodePos.x;
                    transformX = '-50%';
                  }
                  
                  // Vertical positioning with collision avoidance
                  if (spaceBottom > 180) { // Plenty of space below
                    posY = nodePos.y + (nodeSize / 2) + 10;
                    transformY = '0%';
                  } else if (spaceTop > 180) { // Plenty of space above
                    posY = nodePos.y - (nodeSize / 2) - 10;
                    transformY = '-100%';
                  } else { // Position to side with most space
                    posY = nodePos.y;
                    transformY = '-50%';
                  }
                  
                  return {
                    left: posX,
                    top: posY,
                    transform: `translate(${transformX}, ${transformY})`
                  };
                })()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeOut"
                }}
              >
                <div className="bg-black/60 backdrop-blur-xl border border-neuro-purple-500/40 rounded-lg p-4 shadow-[0_0_20px_rgba(107,63,175,0.3)]">
                  {/* Header with precise styling */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-white font-semibold tracking-wide">{popup.node.label}</div>
                    <div 
                      className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`} 
                      style={{ 
                        backgroundColor: `${getNodeColor(popup.node.type)}20`,
                        color: getNodeColor(popup.node.type),
                        border: `1px solid ${getNodeColor(popup.node.type)}40`
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: getNodeColor(popup.node.type) }}></span>
                      {popup.node.type === 'W' ? 'Whale' : 
                       popup.node.type === 'S' ? 'Sniper' : 
                       popup.node.type === 'B' ? 'Bot' : 
                       popup.node.type === 'T' ? 'Team' : 'Contract'}
                    </div>
                  </div>
                  
                  {/* Address with copy button */}
                  <div className="flex items-center mb-3 bg-black/30 rounded-md px-2 py-1.5 border border-neuro-deep-600/20">
                    <div className="text-gray-400 text-xs mr-1">Address:</div>
                    <div className="text-gray-300 text-xs font-mono flex-1">
                      {`${popup.node.address.substring(0, 6)}...${popup.node.address.substring(popup.node.address.length - 4)}`}
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer p-0.5 rounded-sm hover:bg-neuro-purple-500/20"
                    >
                      <Copy className="w-3 h-3 text-neuro-purple-400" />
                    </motion.div>
                  </div>
                  
                  {/* Stats with visual indicators */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                    <div className="flex flex-col">
                      <div className="text-gray-400 text-xs mb-0.5">Holding</div>
                      <div className="flex items-center">
                        <div className="h-1 bg-neuro-purple-500/20 rounded-full w-12 mr-2">
                          <div 
                            className="h-1 bg-neuro-purple-500 rounded-full" 
                            style={{ width: `${parseFloat(popup.node.holding) * 3}%` }}
                          ></div>
                        </div>
                        <div className="text-white text-sm font-medium">{popup.node.holding}</div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-400 text-xs mb-0.5">Tokens</div>
                      <div className="text-white text-sm font-medium">{popup.node.tokens}</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-400 text-xs mb-0.5">Value</div>
                      <div className="text-white text-sm font-medium">{popup.node.value}</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-400 text-xs mb-0.5">PNL</div>
                      <div className={`text-sm font-medium flex items-center ${popup.node.pnl.startsWith('+') ? 'text-green-400' : popup.node.pnl === '0%' ? 'text-white' : 'text-red-400'}`}>
                        {popup.node.pnl}
                        {popup.node.pnl.startsWith('+') && (
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        )}
                        {!popup.node.pnl.startsWith('+') && popup.node.pnl !== '0%' && (
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual connection line to node */}
                  <div 
                    className="absolute w-4 h-4 rotate-45 bg-black/60 border border-neuro-purple-500/40"
                    style={{
                      left: '50%',
                      top: '0',
                      transform: 'translate(-50%, -50%)',
                      zIndex: -1
                    }}
                  ></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Legend */}
          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-neuro-deep-600/30 text-xs z-20">
            <div className="text-gray-300 font-semibold mb-1">Legend</div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-neuro-purple-500/50 mr-2 border border-neuro-purple-500/50"></div>
              <span className="text-neuro-purple-300">Contract (C)</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-500/50 mr-2 border border-blue-500/50"></div>
              <span className="text-blue-300">Whale (W)</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500/50 mr-2 border border-red-500/50"></div>
              <span className="text-red-300">Sniper (S)</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-2 border border-yellow-500/50"></div>
              <span className="text-yellow-300">Bot (B)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500/50 mr-2 border border-green-500/50"></div>
              <span className="text-green-300">Team (T)</span>
            </div>
          </div>
          
          {/* Status indicators */}
          <div className="absolute top-3 left-3 flex items-center space-x-3 z-20">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-300">Live</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-xs text-blue-300">Auto-Tag</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ContractFlowVisualizer;
