#!/usr/bin/env node

/**
 * DelVui CLI Binary
 * Global executable for DelVui design system
 */

const path = require('path');

// For development, use source files
// For production, use built files
const isDev = process.env.NODE_ENV === 'development';
const cliPath = isDev 
  ? path.join(__dirname, '../src/index.ts')
  : path.join(__dirname, '../lib/index.js');

try {
  if (isDev) {
    // Use ts-node for development
    require('ts-node/register');
  }
  require(cliPath);
} catch (error) {
  console.error('Failed to start DelVui CLI:', error.message);
  process.exit(1);
}