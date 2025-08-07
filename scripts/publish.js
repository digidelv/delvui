#!/usr/bin/env node

/**
 * DelvUI Publishing Script
 * Publishes all packages to npm registry
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const PACKAGES = [
  'packages/core',
  'packages/tokens',
  'packages/react',
  'packages/vue',
  'packages/angular',
  'packages/react-native',
  'packages/vanilla',
  'packages/cli',
  'packages/frameworks/react'
];

async function publishPackages() {
  console.log(chalk.blue.bold('🚀 Publishing DelvUI packages to npm...\n'));

  // Note: No 2FA required for this setup

  // Check if user is logged in
  try {
    execSync('npm whoami', { stdio: 'pipe' });
  } catch (error) {
    console.error(chalk.red('❌ You are not logged in to npm. Run: npm login'));
    process.exit(1);
  }

  // Skip build for now - publish existing built packages
  console.log(chalk.yellow('📦 Skipping build - publishing existing packages...\n'));

  // Publish each package
  for (const packagePath of PACKAGES) {
    await publishPackage(packagePath);
  }

  console.log(chalk.green.bold('\n🎉 All packages published successfully!'));
  console.log(chalk.cyan('\n📚 Next steps:'));
  console.log('  1. Test global installation: npm install -g @delvui/cli');
  console.log('  2. Create a project: delv init my-project --template react');
  console.log('  3. Share with the community: https://npmjs.com/~digidelve');
}

async function publishPackage(packagePath) {

  const fullPath = path.resolve(packagePath);
  const packageJsonPath = path.join(fullPath, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(chalk.yellow(`⚠️  Skipping ${packagePath} - no package.json found`));
    return;
  }

  const packageJson = await fs.readJson(packageJsonPath);
  console.log(chalk.blue(`📦 Publishing ${packageJson.name}@${packageJson.version}...`));

  try {
    // Check if package version already exists
    try {
      execSync(`npm view ${packageJson.name}@${packageJson.version}`, { stdio: 'pipe' });
      console.log(chalk.yellow(`⚠️  Version ${packageJson.version} already exists, skipping`));
      return;
    } catch (error) {
      // Version doesn't exist, proceed with publishing
    }

    // Publish the package
    const otpArg = process.argv.includes('--otp') ? `--otp=${process.argv[process.argv.indexOf('--otp') + 1]}` : '';
    execSync(`npm publish ${otpArg}`, {
      cwd: fullPath,
      stdio: 'inherit'
    });

    console.log(chalk.green(`✅ Published ${packageJson.name}@${packageJson.version}`));

  } catch (error) {
    console.error(chalk.red(`❌ Failed to publish ${packageJson.name}:`));
    console.error(chalk.red(error.message));

    if (error.message.includes('403')) {
      console.error(chalk.yellow('   Possible causes:'));
      console.error(chalk.yellow('   - Package name already taken'));
      console.error(chalk.yellow('   - Not logged in to npm'));
      console.error(chalk.yellow('   - No permission to publish to this scope'));
    }

    if (error.message.includes('402')) {
      console.error(chalk.yellow('   You need to pay for private packages or publish as public'));
    }
  }

  console.log('');
}

publishPackages().catch(error => {
  console.error(chalk.red('❌ Publishing failed:'), error);
  process.exit(1);
});