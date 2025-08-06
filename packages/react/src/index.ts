/**
 * DelVui React - Main Entry Point
 * Export all components organized by atomic design levels
 */

// Atoms
export { Button, ButtonAtom } from './atoms/Button/Button';
export type { ButtonProps } from './atoms/Button/Button';

// Export atomic design metadata
export * from './atoms';
export * from './molecules'; 
export * from './organisms';
export * from './templates';
export * from './pages';

// Hooks
export * from './hooks';

// Providers
export * from './providers';

// Utils
export * from './utils';

// Core types
export type {
  AtomicComponent,
  AtomProps,
  MoleculeProps,
  OrganismProps
} from '@delvui/core';

// Version info
export const VERSION = '1.0.0';
export const ATOMIC_DESIGN_VERSION = '1.0.0';

// Library metadata
export const LIBRARY_INFO = {
  name: '@delvui/react',
  version: VERSION,
  description: 'DelVui React - Enterprise React Component Library with Atomic Design',
  atomicDesignVersion: ATOMIC_DESIGN_VERSION,
  framework: 'react',
  buildDate: new Date().toISOString(),
} as const;