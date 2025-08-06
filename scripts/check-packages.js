#!/usr/bin/env node

/**
 * DelvUI Package Verification Script
 * Checks packages before publishing
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const PACKAGES = [
  'packages/core',
  'packages/tokens',
  'packages/react', 
  'packages/cli'
];

async function checkPackages() {
  console.log(chalk.blue.bold('🔍 Checking DelvUI packages...\n'));

  let allGood = true;

  for (const packagePath of PACKAGES) {
    const isGood = await checkPackage(packagePath);
    allGood = allGood && isGood;
  }

  console.log('');
  if (allGood) {
    console.log(chalk.green.bold('✅ All packages are ready for publishing!'));
    console.log(chalk.cyan('Next steps:'));
    console.log('  1. npm run pre-publish');
    console.log('  2. npm run publish:manual');
    console.log('  3. Or use changesets: npm run changeset');
  } else {
    console.log(chalk.red.bold('❌ Some packages have issues. Please fix before publishing.'));
    process.exit(1);
  }
}

async function checkPackage(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  console.log(chalk.blue(`📦 Checking ${packagePath}...`));

  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.red('  ❌ package.json not found'));
    return false;
  }

  const packageJson = await fs.readJson(packageJsonPath);
  let isGood = true;

  // Check required fields
  const requiredFields = ['name', 'version', 'description', 'author', 'license'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      console.log(chalk.red(`  ❌ Missing ${field}`));
      isGood = false;
    }
  }

  // Check version format
  const versionRegex = /^\d+\.\d+\.\d+(-\w+)?$/;
  if (!versionRegex.test(packageJson.version)) {
    console.log(chalk.red(`  ❌ Invalid version format: ${packageJson.version}`));
    isGood = false;
  }

  // Check if build output exists
  if (packageJson.main) {
    const mainPath = path.join(packagePath, packageJson.main);
    if (!fs.existsSync(mainPath)) {
      console.log(chalk.red(`  ❌ Main file not found: ${packageJson.main}`));
      console.log(chalk.yellow(`      Run: npm run build`));
      isGood = false;
    }
  }

  // Check files array
  if (packageJson.files) {
    for (const file of packageJson.files) {
      const filePath = path.join(packagePath, file);
      if (!fs.existsSync(filePath)) {
        console.log(chalk.yellow(`  ⚠️  File in 'files' array not found: ${file}`));
      }
    }
  }

  // Check repository URL
  if (packageJson.repository?.url?.includes('digidelv') || 
      packageJson.repository?.url?.includes('yourusername')) {
    console.log(chalk.yellow(`  ⚠️  Update repository URL: ${packageJson.repository.url}`));
  }

  // Check author
  if (packageJson.author?.includes('Your')) {
    console.log(chalk.yellow(`  ⚠️  Update author field: ${packageJson.author}`));
  }

  // Check publishConfig
  if (!packageJson.publishConfig?.access) {
    console.log(chalk.yellow(`  ⚠️  Consider adding publishConfig.access: "public"`));
  }

  if (isGood) {
    console.log(chalk.green('  ✅ Package looks good'));
  }

  console.log('');
  return isGood;
}

checkPackages().catch(error => {
  console.error(chalk.red('❌ Check failed:'), error);
  process.exit(1);
});