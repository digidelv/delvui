/**
 * DelVui Core - Main Entry Point
 * Export all atomic design types and utilities
 */

// Atomic Design Types
export * from './atomic/atoms/types';
export * from './atomic/molecules/types';
export * from './atomic/organisms/types';

// Utility Types
export * from './types/index';
export * from './utils/index';

// Version info
export const CORE_VERSION = '1.0.0';
export const ATOMIC_DESIGN_VERSION = '1.0.0';

// Core metadata
export const CORE_INFO = {
  name: '@delvui/core',
  version: CORE_VERSION,
  description: 'DelVui Core - Atomic Design Types and Utilities',
  atomicDesignVersion: ATOMIC_DESIGN_VERSION,
  buildDate: new Date().toISOString(),
} as const;