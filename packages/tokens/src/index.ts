/**
 * DelvUI Tokens - Main Entry Point
 * Export all design tokens
 */

// Colors
export * from './colors/index';

// Typography (placeholder)
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Spacing (placeholder)
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
};

// Version info
export const TOKENS_VERSION = '1.0.0';

// Token metadata
export const TOKENS_INFO = {
  name: '@delvui/tokens',
  version: TOKENS_VERSION,
  description: 'DelvUI Design Tokens - Colors, Typography, Spacing, and More',
  buildDate: new Date().toISOString(),
} as const;