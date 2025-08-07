/**
 * DelvUI Theme System
 * Theme presets and customization architecture
 */

import { ButtonTokens, defaultButtonTokens } from '../components/button';
import { colors } from '../colors';

// Base theme interface
export interface DelvUITheme {
  name: string;
  version: string;
  description?: string;
  
  // Global design tokens
  colors: typeof colors;
  
  // Component-specific tokens
  components: {
    button: ButtonTokens;
    // TODO: Add other components
    // input: InputTokens;
    // card: CardTokens;
    // modal: ModalTokens;
    // etc...
  };
  
  // CSS variable prefix
  cssPrefix: string;
  
  // Theme metadata
  metadata: {
    darkMode: boolean;
    colorScheme: 'light' | 'dark' | 'auto';
    author?: string;
    license?: string;
    tags?: string[];
  };
}

// Theme preset interface for easier theme creation
export interface ThemePreset {
  name: string;
  description?: string;
  overrides: {
    colors?: Partial<typeof colors>;
    components?: {
      button?: Partial<ButtonTokens>;
      // Other components...
    };
  };
  metadata?: Partial<DelvUITheme['metadata']>;
}

// Default theme
export const defaultTheme: DelvUITheme = {
  name: 'DelvUI Default',
  version: '1.0.0',
  description: 'Default DelvUI theme with modern design tokens',
  
  colors: colors,
  
  components: {
    button: defaultButtonTokens,
  },
  
  cssPrefix: '--delvui',
  
  metadata: {
    darkMode: false,
    colorScheme: 'light',
    author: 'DelvUI Team',
    license: 'MIT',
    tags: ['default', 'light', 'modern'],
  },
};

// Dark theme preset
export const darkTheme: DelvUITheme = {
  ...defaultTheme,
  name: 'DelvUI Dark',
  description: 'Dark theme variant with inverted colors',
  
  colors: {
    ...colors,
    // Override colors for dark theme
    neutral: {
      50: '#18181b',
      100: '#27272a',
      200: '#3f3f46',
      300: '#52525b',
      400: '#71717a',
      500: '#a1a1aa',
      600: '#d4d4d8',
      700: '#e4e4e7',
      800: '#f4f4f5',
      900: '#fafafa',
      950: '#ffffff',
    },
    
    semantic: {
      ...colors.semantic,
      // Adjust semantic colors for dark theme if needed
    },
  },
  
  components: {
    button: {
      ...defaultButtonTokens,
      // Override button tokens for dark theme
      root: {
        ...defaultButtonTokens.root,
        primary: {
          ...defaultButtonTokens.root.primary,
          background: 'var(--delvui-color-primary-600)',
          hoverBackground: 'var(--delvui-color-primary-500)',
          activeBackground: 'var(--delvui-color-primary-400)',
        },
        secondary: {
          ...defaultButtonTokens.root.secondary,
          background: 'var(--delvui-color-neutral-800)',
          hoverBackground: 'var(--delvui-color-neutral-700)',
          activeBackground: 'var(--delvui-color-neutral-600)',
          color: 'var(--delvui-color-neutral-100)',
          hoverColor: 'var(--delvui-color-neutral-50)',
        },
      },
    },
  },
  
  metadata: {
    darkMode: true,
    colorScheme: 'dark',
    author: 'DelvUI Team',
    license: 'MIT',
    tags: ['dark', 'modern', 'professional'],
  },
};

// Material Design inspired theme
export const materialTheme: ThemePreset = {
  name: 'Material Design',
  description: 'Material Design 3 inspired theme',
  
  overrides: {
    colors: {
      brand: {
        50: '#e8f5e8',
        100: '#c8e6c9',
        200: '#a5d6a7',
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50', // Material Green
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20',
        950: '#0d3b0d',
      },
    },
    
    components: {
      button: {
        root: {
          borderRadius: '1rem', // More rounded for Material Design
          raisedShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
          hoverShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
          
          label: {
            fontWeight: '600',
            textTransform: 'uppercase' as any,
            letterSpacing: '0.025em',
          },
          
          transitionDuration: '300ms',
        },
      },
    },
  },
  
  metadata: {
    tags: ['material', 'google', 'modern'],
  },
};

// iOS/Apple inspired theme
export const appleTheme: ThemePreset = {
  name: 'Apple Design',
  description: 'iOS/Apple Human Interface Guidelines inspired theme',
  
  overrides: {
    colors: {
      brand: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#007AFF', // iOS Blue
        600: '#0056b3',
        700: '#1e40af',
        800: '#1e3a8a',
        900: '#1e3a8a',
        950: '#0f1419',
      },
    },
    
    components: {
      button: {
        root: {
          borderRadius: '0.5rem', // Less rounded, more iOS-like
          fontWeight: '600',
          
          sm: {
            fontSize: '0.8125rem', // SF Pro Text sizing
            paddingX: '0.875rem',
            paddingY: '0.4375rem',
            height: '1.875rem',
            minWidth: '1.875rem',
          },
          
          md: {
            fontSize: '0.9375rem',
            paddingX: '1.125rem',
            paddingY: '0.5625rem',
            height: '2.1875rem',
            minWidth: '2.1875rem',
          },
          
          lg: {
            fontSize: '1.0625rem',
            paddingX: '1.375rem',
            paddingY: '0.6875rem',
            height: '2.5rem',
            minWidth: '2.5rem',
          },
          
          label: {
            fontWeight: '600',
            letterSpacing: '-0.01em', // Tighter letter spacing like SF Pro
          },
          
          raisedShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
          hoverShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          
          transitionDuration: '150ms',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // iOS easing
        },
      },
    },
  },
  
  metadata: {
    tags: ['apple', 'ios', 'minimal', 'clean'],
  },
};

// Bootstrap inspired theme
export const bootstrapTheme: ThemePreset = {
  name: 'Bootstrap',
  description: 'Bootstrap 5 inspired theme with familiar styling',
  
  overrides: {
    colors: {
      brand: {
        50: '#e7f3ff',
        100: '#cfe2ff',
        200: '#9ec5ff',
        300: '#6ea8ff',
        400: '#3d8bfd',
        500: '#0d6efd', // Bootstrap Primary Blue
        600: '#0a58ca',
        700: '#084298',
        800: '#052c65',
        900: '#03163d',
        950: '#010a1f',
      },
      
      semantic: {
        success: {
          50: '#d1e7dd',
          100: '#a3d5bb',
          200: '#75c299',
          300: '#47b077',
          400: '#189d55',
          500: '#198754', // Bootstrap Success Green
          600: '#146c43',
          700: '#0f5132',
          800: '#0a3622',
          900: '#051b11',
          950: '#020d08',
        },
        
        warning: {
          50: '#fff3cd',
          100: '#ffe69c',
          200: '#ffd86b',
          300: '#ffcb3a',
          400: '#ffbe09',
          500: '#ffc107', // Bootstrap Warning Yellow
          600: '#cc9a06',
          700: '#997404',
          800: '#664d03',
          900: '#332701',
          950: '#1a1300',
        },
        
        error: {
          50: '#f8d7da',
          100: '#f1aeb5',
          200: '#ea868f',
          300: '#e35d6a',
          400: '#dc3545', // Bootstrap Danger Red
          500: '#dc3545',
          600: '#b02a37',
          700: '#842029',
          800: '#58151c',
          900: '#2c0b0e',
          950: '#160507',
        },
      },
    },
    
    components: {
      button: {
        root: {
          borderRadius: '0.25rem', // Bootstrap's default border radius
          fontWeight: '400',
          
          sm: {
            fontSize: '0.875rem',
            paddingX: '0.5rem',
            paddingY: '0.25rem',
            height: 'auto',
            minWidth: 'auto',
          },
          
          md: {
            fontSize: '1rem',
            paddingX: '0.75rem',
            paddingY: '0.375rem',
            height: 'auto',
            minWidth: 'auto',
          },
          
          lg: {
            fontSize: '1.25rem',
            paddingX: '1rem',
            paddingY: '0.5rem',
            height: 'auto',
            minWidth: 'auto',
          },
          
          label: {
            fontWeight: '400',
            textTransform: 'none' as any,
            letterSpacing: '0',
          },
          
          borderWidth: '1px',
          raisedShadow: 'none',
          hoverShadow: 'none',
          activeShadow: 'inset 0 3px 5px rgba(0, 0, 0, 0.125)',
          
          transitionDuration: '150ms',
          
          focusRing: {
            width: '0.25rem',
            style: 'solid',
            offset: '0',
          },
        },
      },
    },
  },
  
  metadata: {
    tags: ['bootstrap', 'familiar', 'traditional'],
  },
};

// Chakra UI inspired theme  
export const chakraTheme: ThemePreset = {
  name: 'Chakra UI',
  description: 'Chakra UI inspired theme with smooth animations',
  
  overrides: {
    colors: {
      brand: {
        50: '#e6fffa',
        100: '#b2f5ea',
        200: '#81e6d9',
        300: '#4fd1c7',
        400: '#38b2ac',
        500: '#319795', // Chakra Teal
        600: '#2c7a7b',
        700: '#285e61',
        800: '#234e52',
        900: '#1d4044',
        950: '#102a2e',
      },
    },
    
    components: {
      button: {
        root: {
          borderRadius: '0.375rem', // md rounded in Chakra
          fontWeight: '600',
          
          label: {
            fontWeight: '600',
          },
          
          raisedShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          hoverShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          
          transitionDuration: '200ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          
          focusRing: {
            width: '3px',
            style: 'solid',
            offset: '2px',
          },
        },
      },
    },
  },
  
  metadata: {
    tags: ['chakra', 'smooth', 'accessible'],
  },
};

// Export all preset themes
export const themePresets = {
  default: defaultTheme,
  dark: darkTheme,
  material: materialTheme,
  apple: appleTheme,
  bootstrap: bootstrapTheme,
  chakra: chakraTheme,
} as const;

export type ThemePresetName = keyof typeof themePresets;

/**
 * Create a custom theme by extending a base theme with overrides
 */
export function createTheme(
  baseTheme: DelvUITheme | ThemePresetName,
  overrides: Partial<DelvUITheme>
): DelvUITheme {
  const base = typeof baseTheme === 'string' 
    ? themePresets[baseTheme] 
    : baseTheme;
    
  return {
    ...base,
    ...overrides,
    colors: {
      ...base.colors,
      ...overrides.colors,
    },
    components: {
      ...base.components,
      ...overrides.components,
      button: {
        ...base.components.button,
        ...overrides.components?.button,
      },
    },
    metadata: {
      ...base.metadata,
      ...overrides.metadata,
    },
  };
}

/**
 * Apply theme preset overrides to base theme
 */
export function applyThemePreset(
  baseTheme: DelvUITheme,
  preset: ThemePreset
): DelvUITheme {
  return {
    ...baseTheme,
    name: preset.name,
    description: preset.description,
    
    colors: {
      ...baseTheme.colors,
      ...preset.overrides.colors,
    },
    
    components: {
      ...baseTheme.components,
      button: {
        ...baseTheme.components.button,
        ...preset.overrides.components?.button,
      },
    },
    
    metadata: {
      ...baseTheme.metadata,
      ...preset.metadata,
    },
  };
}

/**
 * Generate CSS variables from theme
 */
export function generateCSSVariables(theme: DelvUITheme): Record<string, string> {
  const cssVars: Record<string, string> = {};
  const prefix = theme.cssPrefix;
  
  // Generate color variables
  Object.entries(theme.colors).forEach(([colorGroup, colors]) => {
    if (typeof colors === 'object' && colors !== null) {
      Object.entries(colors).forEach(([key, value]) => {
        if (typeof value === 'string') {
          cssVars[`${prefix}-color-${colorGroup}-${key}`] = value;
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string') {
              cssVars[`${prefix}-color-${colorGroup}-${key}-${subKey}`] = subValue;
            }
          });
        }
      });
    }
  });
  
  // Generate component-specific variables
  const generateTokenVars = (tokens: any, prefix: string) => {
    Object.entries(tokens).forEach(([key, value]) => {
      if (typeof value === 'string') {
        cssVars[`${prefix}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        generateTokenVars(value, `${prefix}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
      }
    });
  };
  
  // Button variables
  generateTokenVars(theme.components.button, `${prefix}-button`);
  
  return cssVars;
}

/**
 * Generate CSS string from theme
 */
export function generateCSS(theme: DelvUITheme, selector: string = ':root'): string {
  const cssVars = generateCSSVariables(theme);
  
  const cssRules = Object.entries(cssVars)
    .map(([property, value]) => `  --${property}: ${value};`)
    .join('\n');
  
  return `${selector} {\n${cssRules}\n}`;
}

export default themePresets;