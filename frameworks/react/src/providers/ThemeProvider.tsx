/**
 * DelvUI React Theme Provider
 * Provides theme context for all components
 */

import React, { createContext, useContext, ReactNode } from 'react';

export interface Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
}

const defaultTheme: Theme = {
  name: 'default',
  mode: 'light',
  colors: {},
  spacing: {},
  typography: {}
};

const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = defaultTheme
}) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDelvUITheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useDelvUITheme must be used within a ThemeProvider');
  }
  return context;
};