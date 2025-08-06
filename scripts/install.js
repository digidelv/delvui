#!/usr/bin/env node

/**
 * DelVui Installation Script
 * Handles workspace installation and setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up DelVui workspace...');

// Check Node version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js 16 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Install root dependencies
console.log('📦 Installing root dependencies...');
try {
  execSync('npm install --prefer-offline', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
} catch (error) {
  console.error('❌ Failed to install root dependencies:', error.message);
  process.exit(1);
}

// Create necessary directories
console.log('📁 Creating build directories...');
const buildDirs = [
  'packages/core/lib',
  'packages/tokens/lib', 
  'packages/react/lib',
  'packages/react/dist'
];

buildDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log('  ✅ Created:', dir);
  }
});

console.log('🎉 DelVui workspace setup complete!');
console.log('\n📋 Next steps:');
console.log('  npm run build     # Build all packages');
console.log('  npm run dev       # Start development mode');
console.log('  npm test          # Run tests');
console.log('\n📚 Documentation: https://delvui.dev');