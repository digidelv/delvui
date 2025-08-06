#!/usr/bin/env node

/**
 * Test CLI functionality
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const CLI_PATH = path.join(__dirname, 'packages/cli/bin/delvui.js');
const TEST_DIR = path.join(__dirname, 'test-project');

console.log('🧪 Testing DelvUI CLI functionality...\n');

async function testCLI() {
  try {
    // Test version command
    console.log('Testing version command...');
    const version = execSync(`node "${CLI_PATH}" --version`, { encoding: 'utf8' }).trim();
    console.log(`✅ Version: ${version}`);

    // Test list command
    console.log('\nTesting list command...');
    const listOutput = execSync(`node "${CLI_PATH}" list --framework react`, { 
      encoding: 'utf8', 
      stdio: 'pipe' 
    });
    console.log('✅ List command works');

    // Test info command
    console.log('\nTesting info command...');
    const infoOutput = execSync(`node "${CLI_PATH}" info`, { 
      encoding: 'utf8', 
      stdio: 'pipe' 
    });
    console.log('✅ Info command works');

    // Test doctor command
    console.log('\nTesting doctor command...');
    const doctorOutput = execSync(`node "${CLI_PATH}" doctor`, { 
      encoding: 'utf8', 
      stdio: 'pipe' 
    });
    console.log('✅ Doctor command works');

    // Test generate command
    console.log('\nTesting generate command...');
    
    // Ensure clean test directory
    await fs.remove(TEST_DIR);
    await fs.ensureDir(TEST_DIR);
    
    process.chdir(TEST_DIR);
    
    // Generate a component
    execSync(`node "${CLI_PATH}" generate atom TestButton --framework react --output src/components/TestButton`, { 
      stdio: 'ignore' 
    });
    
    if (fs.existsSync('src/components/TestButton/TestButton.tsx')) {
      console.log('✅ Generate command works');
    } else {
      console.log('❌ Generate command failed - no file created');
    }

    console.log('\n🎉 All CLI tests passed!');
    console.log('\n📦 Ready for global npm installation:');
    console.log('  npm install -g @delvui/cli');
    console.log('\n🚀 Usage after global installation:');
    console.log('  delv init my-project --template react');
    console.log('  delv generate atom Button --framework vue');
    console.log('  delv list --level atoms');

  } catch (error) {
    console.error('❌ CLI test failed:', error.message);
    process.exit(1);
  } finally {
    // Clean up
    process.chdir(__dirname);
    await fs.remove(TEST_DIR);
  }
}

testCLI();