#!/usr/bin/env node

/**
 * DelvUI Test Installation
 * Verify that packages can be imported correctly
 */

console.log('🧪 Testing DelvUI package imports...\n');

try {
  // Test core package
  console.log('Testing @delvui/core...');
  const core = require('./packages/core/lib/index.js');
  console.log('✅ Core package loaded successfully');
  console.log('   - Version:', core.CORE_VERSION);
  console.log('   - Atomic Design Version:', core.ATOMIC_DESIGN_VERSION);
  
  // Test tokens package
  console.log('\nTesting @delvui/tokens...');
  const tokens = require('./packages/tokens/lib/index.js');
  console.log('✅ Tokens package loaded successfully');
  console.log('   - Version:', tokens.TOKENS_VERSION);
  console.log('   - Colors available:', Object.keys(tokens.colors).length);
  
  // Test react package
  console.log('\nTesting @delvui/react...');
  const react = require('./packages/react/lib/index.js');
  console.log('✅ React package loaded successfully');  
  console.log('   - Version:', react.VERSION);
  console.log('   - Components available:', Object.keys(react).filter(key => !key.includes('VERSION') && !key.includes('INFO')).length);
  
  console.log('\n🎉 All packages are working correctly!');
  console.log('\n📦 Ready for publishing to npm registry');
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}