/**
 * DelVui CLI - Add Command
 * Add DelVui components to existing projects
 */

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { logger } from '../utils/logger.js';

interface AddOptions {
  framework?: string;
  version?: string;
  dev?: boolean;
  peer?: boolean;
}

export async function addCommand(components: string[], options: AddOptions): Promise<void> {
  try {
    logger.info('Adding DelVui components to your project...');

    // Detect project framework if not specified
    const framework = options.framework || await detectFramework();
    logger.info(`Detected framework: ${chalk.cyan(framework)}`);

    // Get package information
    const packages = getFrameworkPackages(framework, components);
    const version = options.version || 'latest';

    // Install packages
    await installPackages(packages, version, options);

    // Setup configuration if needed
    await setupConfiguration(framework);

    logger.success('DelVui components added successfully!');
    printUsageInstructions(framework);

  } catch (error) {
    logger.error('Failed to add components:', error);
    process.exit(1);
  }
}

async function detectFramework(): Promise<string> {
  const cwd = process.cwd();
  
  // Check package.json for framework indicators
  try {
    const packageJsonPath = path.join(cwd, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      if (deps.react || deps['react-dom']) {
        // Check if it's Next.js
        if (deps.next) return 'nextjs';
        // Check if it's React Native
        if (deps['react-native'] || deps.expo) return 'react-native';
        return 'react';
      }

      if (deps.vue || deps['@vue/cli-service']) {
        // Check if it's Nuxt
        if (deps.nuxt || deps['@nuxt/kit']) return 'nuxt';
        return 'vue';
      }

      if (deps['@angular/core']) return 'angular';
    }
  } catch (error) {
    // Ignore errors, continue with file detection
  }

  // Check for framework-specific files
  if (await fs.pathExists(path.join(cwd, 'angular.json'))) return 'angular';
  if (await fs.pathExists(path.join(cwd, 'nuxt.config.js')) || 
      await fs.pathExists(path.join(cwd, 'nuxt.config.ts'))) return 'nuxt';
  if (await fs.pathExists(path.join(cwd, 'next.config.js')) || 
      await fs.pathExists(path.join(cwd, 'next.config.ts'))) return 'nextjs';
  if (await fs.pathExists(path.join(cwd, 'vue.config.js'))) return 'vue';

  // Ask user to select framework
  const { framework } = await inquirer.prompt({
    type: 'list',
    name: 'framework',
    message: 'Which framework are you using?',
    choices: [
      { name: '⚛️  React', value: 'react' },
      { name: '⚡ Next.js', value: 'nextjs' },
      { name: '💚 Vue', value: 'vue' },
      { name: '🟢 Nuxt', value: 'nuxt' },
      { name: '🅰️  Angular', value: 'angular' },
      { name: '📱 React Native', value: 'react-native' },
      { name: '🟨 Vanilla', value: 'vanilla' },
    ]
  });

  return framework;
}

function getFrameworkPackages(framework: string, components: string[]): string[] {
  const packages = ['@delvui/tokens']; // Always include tokens

  switch (framework) {
    case 'react':
    case 'nextjs':
      packages.push('@delvui/react');
      break;
    case 'vue':
    case 'nuxt':
      packages.push('@delvui/vue');
      break;
    case 'angular':
      packages.push('@delvui/angular');
      break;
    case 'react-native':
      packages.push('@delvui/react-native');
      break;
    case 'vanilla':
      packages.push('@delvui/vanilla');
      break;
    default:
      throw new Error(`Unsupported framework: ${framework}`);
  }

  return packages;
}

async function installPackages(
  packages: string[],
  version: string,
  options: AddOptions
): Promise<void> {
  const packageManager = await detectPackageManager();
  const versionSuffix = version !== 'latest' ? `@${version}` : '';
  const packagesWithVersion = packages.map(pkg => `${pkg}${versionSuffix}`);

  const spinner = ora(`Installing packages with ${packageManager}...`).start();

  try {
    let command = '';
    
    if (packageManager === 'npm') {
      command = `npm install ${packagesWithVersion.join(' ')}`;
      if (options.dev) command += ' --save-dev';
      if (options.peer) command += ' --save-peer';
    } else if (packageManager === 'yarn') {
      command = `yarn add ${packagesWithVersion.join(' ')}`;
      if (options.dev) command += ' --dev';
      if (options.peer) command += ' --peer';
    } else if (packageManager === 'pnpm') {
      command = `pnpm add ${packagesWithVersion.join(' ')}`;
      if (options.dev) command += ' --save-dev';
      if (options.peer) command += ' --save-peer';
    }

    execSync(command, { stdio: 'ignore' });
    spinner.succeed(`Packages installed successfully`);

    logger.info('Installed packages:');
    packagesWithVersion.forEach(pkg => {
      logger.info(`  ${chalk.green('✓')} ${pkg}`);
    });

  } catch (error) {
    spinner.fail('Failed to install packages');
    throw error;
  }
}

async function detectPackageManager(): Promise<'npm' | 'yarn' | 'pnpm'> {
  const cwd = process.cwd();

  if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

async function setupConfiguration(framework: string): Promise<void> {
  const cwd = process.cwd();

  switch (framework) {
    case 'nextjs':
      await setupNextjsConfiguration(cwd);
      break;
    case 'nuxt':
      await setupNuxtConfiguration(cwd);
      break;
    case 'angular':
      await setupAngularConfiguration(cwd);
      break;
    // Add more framework-specific setups as needed
  }
}

async function setupNextjsConfiguration(cwd: string): Promise<void> {
  const nextConfigPath = path.join(cwd, 'next.config.js');
  
  if (await fs.pathExists(nextConfigPath)) {
    logger.info('Next.js configuration detected - you may need to update it manually');
    logger.info('Add DelVui CSS import to your _app.tsx:');
    logger.info(chalk.gray("import '@delvui/react/styles';"));
  }
}

async function setupNuxtConfiguration(cwd: string): Promise<void> {
  const nuxtConfigPath = path.join(cwd, 'nuxt.config.ts');
  
  if (await fs.pathExists(nuxtConfigPath)) {
    logger.info('Nuxt configuration detected - you may need to update it manually');
    logger.info('Add DelVui to your modules in nuxt.config.ts');
  }
}

async function setupAngularConfiguration(cwd: string): Promise<void> {
  const angularJsonPath = path.join(cwd, 'angular.json');
  
  if (await fs.pathExists(angularJsonPath)) {
    logger.info('Angular configuration detected - you may need to update it manually');
    logger.info('Import DelVuiModule in your app.module.ts:');
    logger.info(chalk.gray("import { DelVuiModule } from '@delvui/angular';"));
  }
}

function printUsageInstructions(framework: string): void {
  logger.info('\n📚 Usage instructions:');

  switch (framework) {
    case 'react':
    case 'nextjs':
      logger.info(chalk.cyan('React/Next.js:'));
      logger.log(`${chalk.gray('import { Button, Input, Card } from \'@delvui/react\';')}`);
      logger.log(`${chalk.gray('import \'@delvui/react/styles\';')}\n`);
      logger.log(`${chalk.gray('<Button variant="primary">Click me</Button>')}`);
      break;

    case 'vue':
    case 'nuxt':
      logger.info(chalk.cyan('Vue/Nuxt:'));
      logger.log(`${chalk.gray('import { DelVuiButton, DelVuiInput } from \'@delvui/vue\';')}\n`);
      logger.log(`${chalk.gray('<DelVuiButton variant="primary">Click me</DelVuiButton>')}`);
      break;

    case 'angular':
      logger.info(chalk.cyan('Angular:'));
      logger.log(`${chalk.gray('import { DelVuiModule } from \'@delvui/angular\';')}\n`);
      logger.log(`${chalk.gray('<dv-button variant="primary">Click me</dv-button>')}`);
      break;

    case 'react-native':
      logger.info(chalk.cyan('React Native:'));
      logger.log(`${chalk.gray('import { Button } from \'@delvui/react-native\';')}\n`);
      logger.log(`${chalk.gray('<Button variant="primary">Click me</Button>')}`);
      break;

    case 'vanilla':
      logger.info(chalk.cyan('Vanilla JavaScript:'));
      logger.log(`${chalk.gray('import { createButton } from \'@delvui/vanilla\';')}\n`);
      logger.log(`${chalk.gray('const button = createButton({ variant: "primary", text: "Click me" });')}`);
      break;
  }

  logger.info(`\n📖 Documentation: ${chalk.cyan('https://delvui.dev/docs')}`);
  logger.info(`💬 Community: ${chalk.cyan('https://discord.gg/delvui')}`);
}