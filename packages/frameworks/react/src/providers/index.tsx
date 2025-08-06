/**
 * DelvUI React - Providers Export
 */

import React, { createContext, useContext } from 'react';

// Theme Provider (placeholder)
interface DelvUITheme {
  mode: 'light' | 'dark';
  colors: Record<string, any>;
}

const ThemeContext = createContext<DelvUITheme>({
  mode: 'light',
  colors: {},
});

export const useDelvUITheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children, theme }: { 
  children: React.ReactNode; 
  theme?: Partial<DelvUITheme>; 
}) => {
  const defaultTheme: DelvUITheme = {
    mode: 'light',
    colors: {},
    ...theme,
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};