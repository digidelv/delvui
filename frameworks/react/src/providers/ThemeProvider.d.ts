/**
 * DelvUI React Theme Provider
 * Provides theme context for all components
 */
import React, { ReactNode } from 'react';
export interface Theme {
    name: string;
    mode: 'light' | 'dark';
    colors: Record<string, string>;
    spacing: Record<string, string>;
    typography: Record<string, string>;
}
export interface ThemeProviderProps {
    children: ReactNode;
    theme?: Theme;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useDelvUITheme: () => any;
//# sourceMappingURL=ThemeProvider.d.ts.map