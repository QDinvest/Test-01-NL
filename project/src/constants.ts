export const SECTION_IDS = {
  MAIN: 'hero-section', 
  FEATURES: 'ai-scanner', 
  NEUROSWAP: 'gasless-ai', 
  NEURO_VISUALIZER: 'neuro-visualizer', 
  AI_AGENT_PROTOCOL: 'ai-agent-protocol',
  X_TRACKER: 'x-tracker',
  TOKENOMICS: 'tokenomics',
  ROADMAP: 'roadmap',
} as const;

// Type helper for SECTION_IDS values
export type SectionIdKey = keyof typeof SECTION_IDS;
export type SectionIdValue = typeof SECTION_IDS[SectionIdKey];

export const NAV_ITEM_LABELS = {
  MAIN: 'Main',
  FEATURES: 'Features', 
  NEURO_VISUALIZER: 'NeuroVisualizer', 
  NEUROSWAP: 'NeuroSwap', 
  AI_AGENT_PROTOCOL: 'Agent Protocol',
  X_TRACKER: 'X Tracker',
  TOKENOMICS: 'Tokenomics',
  ROADMAP: 'Roadmap',
} as const;

// Type helper for NAV_ITEM_LABELS values
export type NavItemLabelKey = keyof typeof NAV_ITEM_LABELS;
export type NavItemLabelValue = typeof NAV_ITEM_LABELS[NavItemLabelKey];

// Defines the structure for each entry in NAV_MAP
export interface NavMapEntry {
  id: SectionIdValue;    // The actual ID used in the DOM, e.g., 'ai-scanner' or 'top'
  label: NavItemLabelValue; // The display label for the navigation item, e.g., 'Scanner'
}

// Maps SECTION_ID keys to their corresponding NavMapEntry objects
// This provides a single source of truth for navigation details.
export const NAV_MAP: Record<NavItemLabelKey, NavMapEntry> = {
  MAIN:             { id: SECTION_IDS.MAIN,             label: NAV_ITEM_LABELS.MAIN },
  FEATURES:         { id: SECTION_IDS.FEATURES,         label: NAV_ITEM_LABELS.FEATURES },
  NEURO_VISUALIZER: { id: SECTION_IDS.NEURO_VISUALIZER, label: NAV_ITEM_LABELS.NEURO_VISUALIZER },
  NEUROSWAP:        { id: SECTION_IDS.NEUROSWAP,        label: NAV_ITEM_LABELS.NEUROSWAP },
  AI_AGENT_PROTOCOL: { id: SECTION_IDS.AI_AGENT_PROTOCOL, label: NAV_ITEM_LABELS.AI_AGENT_PROTOCOL },
  X_TRACKER:        { id: SECTION_IDS.X_TRACKER,        label: NAV_ITEM_LABELS.X_TRACKER },
  TOKENOMICS:       { id: SECTION_IDS.TOKENOMICS,       label: NAV_ITEM_LABELS.TOKENOMICS },
  ROADMAP:          { id: SECTION_IDS.ROADMAP,          label: NAV_ITEM_LABELS.ROADMAP },
};
