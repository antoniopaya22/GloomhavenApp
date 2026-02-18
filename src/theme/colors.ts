/**
 * Gloomhaven Design System - Colors & Theme Constants
 * Mirrors the CSS variables from the web app
 */

export const Colors = {
  // Dark backgrounds with warm undertones
  bg: {
    darkest: '#0d0a08',
    darker: '#1a1410',
    dark: '#241c16',
    medium: '#2e241c',
    light: '#3d3128',
    lighter: '#4d3f34',
  },

  // Gold/Bronze accent colors
  gold: {
    50: '#fdf8e8',
    100: '#f9ecc4',
    200: '#f3d98b',
    300: '#e9c15a',
    400: '#d4a438',
    500: '#b8862a',
    600: '#9a6a21',
    700: '#7a511d',
    800: '#5c3d1a',
    900: '#3d2912',
  },

  // Blood Red for damage
  red: {
    400: '#ef6b6b',
    500: '#dc4545',
    600: '#b82d2d',
    700: '#8f2222',
    800: '#6b1a1a',
  },

  // Emerald Green for healing
  green: {
    400: '#5dd39e',
    500: '#3cb97a',
    600: '#2d9660',
    700: '#237348',
    800: '#1a5435',
  },

  // Mystic Purple
  purple: {
    400: '#b794f6',
    500: '#9061e4',
    600: '#7240c9',
    700: '#5a2fa6',
  },

  // Ice Blue
  blue: {
    400: '#6db8e8',
    500: '#3d9cd6',
    600: '#2a7db5',
    700: '#1f5f8a',
  },

  // Text
  text: {
    primary: '#f5ede4',
    secondary: '#c4b8aa',
    muted: '#8a7d6f',
    dark: '#1a1410',
  },

  // Borders
  border: {
    subtle: 'rgba(184, 134, 42, 0.15)',
    default: 'rgba(184, 134, 42, 0.25)',
    strong: 'rgba(184, 134, 42, 0.4)',
    accent: '#b8862a',
  },
} as const;

export const Spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const;

export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 30,
  '5xl': 36,
} as const;

export const BorderRadius = {
  sm: 3,
  md: 6,
  lg: 8,
  xl: 10,
  '2xl': 14,
  full: 9999,
} as const;

// Enemy type color mappings
export const EnemyTypeColors = {
  normal: {
    border: Colors.gold[600],
    bg: Colors.bg.medium,
    badge: Colors.gold[500],
    text: Colors.gold[300],
  },
  elite: {
    border: Colors.purple[500],
    bg: '#2a1f3d',
    badge: Colors.purple[400],
    text: Colors.purple[400],
  },
  boss: {
    border: Colors.red[500],
    bg: '#3d1c1c',
    badge: Colors.red[400],
    text: Colors.red[400],
  },
  objective: {
    border: Colors.blue[500],
    bg: '#1c2a3d',
    badge: Colors.blue[400],
    text: Colors.blue[400],
  },
} as const;

// Status effect definitions
export const StatusEffects = {
  negative: [
    { key: 'poison', emoji: '☠️', color: Colors.green[500] },
    { key: 'wound', emoji: '🩸', color: Colors.red[500] },
    { key: 'immobilize', emoji: '⛓️', color: Colors.blue[500] },
    { key: 'disarm', emoji: '🚫', color: Colors.gold[500] },
    { key: 'stun', emoji: '💫', color: Colors.purple[500] },
    { key: 'muddle', emoji: '🌀', color: Colors.blue[400] },
  ],
  positive: [
    { key: 'strengthen', emoji: '💪', color: Colors.green[400] },
    { key: 'shield', emoji: '🛡️', color: Colors.gold[400] },
  ],
} as const;
