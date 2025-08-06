/**
 * DelVui React - Providers Export
 */

import React, { createContext, useContext } from 'react';

// Theme Provider (placeholder)
interface DelVuiTheme {
  mode: 'light' | 'dark';
  colors: Record<string, any>;
}

const ThemeContext = createContext<DelVuiTheme>({
  mode: 'light',
  colors: {},
});

export const useDelVuiTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children, theme }: { 
  children: React.ReactNode; 
  theme?: Partial<DelVuiTheme>; 
}) => {
  const defaultTheme: DelVuiTheme = {
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