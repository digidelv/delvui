/**
 * DelVui Design Tokens - Colors
 * Complete color system with semantic naming
 */

export const colors = {
  // Brand Colors
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Primary brand color
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },

  // Neutral/Gray Colors
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Semantic Colors
  semantic: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
  },

  // Extended Color Palette
  extended: {
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    pink: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    orange: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },
  },

  // Special Colors
  special: {
    transparent: 'transparent',
    current: 'currentColor',
    white: '#ffffff',
    black: '#000000',
  },
} as const;

// Semantic Color Mappings
export const semanticColors = {
  primary: colors.brand[500],
  secondary: colors.neutral[600],
  success: colors.semantic.success[500],
  warning: colors.semantic.warning[500],
  error: colors.semantic.error[500],
  info: colors.semantic.info[500],
  
  // Text Colors
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[600],
    tertiary: colors.neutral[400],
    inverse: colors.special.white,
    success: colors.semantic.success[700],
    warning: colors.semantic.warning[700],
    error: colors.semantic.error[700],
    info: colors.semantic.info[700],
  },

  // Background Colors
  background: {
    primary: colors.special.white,
    secondary: colors.neutral[50],
    tertiary: colors.neutral[100],
    inverse: colors.neutral[900],
    overlay: 'rgba(0, 0, 0, 0.5)',
    success: colors.semantic.success[50],
    warning: colors.semantic.warning[50],
    error: colors.semantic.error[50],
    info: colors.semantic.info[50],
  },

  // Border Colors
  border: {
    primary: colors.neutral[200],
    secondary: colors.neutral[300],
    tertiary: colors.neutral[100],
    inverse: colors.neutral[700],
    success: colors.semantic.success[200],
    warning: colors.semantic.warning[200],
    error: colors.semantic.error[200],
    info: colors.semantic.info[200],
    focus: colors.brand[500],
  },
} as const;

// Color Utilities
export const colorUtilities = {
  isLight: (color: string): boolean => {
    // Simple light color detection
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  },

  getContrastColor: (backgroundColor: string): string => {
    return colorUtilities.isLight(backgroundColor) 
      ? semanticColors.text.primary 
      : semanticColors.text.inverse;
  },

  rgba: (color: string, alpha: number): string => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
};

// Export all colors for easy access
export const allColors = {
  ...colors,
  semantic: semanticColors,
  utilities: colorUtilities,
} as const;

export default allColors;