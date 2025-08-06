/**
 * DelVui Core - Common Types
 */

export interface ComponentMetadata {
  name: string;
  version: string;
  description?: string;
  category: string;
  tags?: string[];
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  colors: Record<string, any>;
  typography: Record<string, any>;
  spacing: Record<string, any>;
}

export interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}