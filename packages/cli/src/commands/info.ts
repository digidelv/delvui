/**
 * DelVui CLI - Info Command
 */

import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';

interface InfoOptions {
  env?: boolean;
  deps?: boolean;
}

export async function showInfo(options: InfoOptions): Promise<void> {
  console.log(chalk.blue.bold('DelVui System Information\n'));

  // Basic system info
  console.log(chalk.cyan('System:'));
  console.log(`  OS: ${os.type()} ${os.release()}`);
  console.log(`  Platform: ${os.platform()}`);
  console.log(`  Arch: ${os.arch()}`);
  console.log(`  Node: ${process.version}`);
  console.log(`  NPM: ${await getNpmVersion()}`);
  console.log('');

  // DelVui CLI info
  const cliInfo = await getCliInfo();
  console.log(chalk.cyan('DelVui CLI:'));
  console.log(`  Version: ${cliInfo.version}`);
  console.log(`  Location: ${cliInfo.location}`);
  console.log('');

  // Project info
  await showProjectInfo();

  if (options.env) {
    await showEnvironmentInfo();
  }

  if (options.deps) {
    await showDependencyInfo();
  }
}

async function getNpmVersion(): Promise<string> {
  try {
    const { execSync } = require('child_process');
    return execSync('npm --version', { encoding: 'utf8' }).trim();
  } catch {
    return 'Not found';
  }
}

async function getCliInfo() {
  try {
    const packagePath = path.join(__dirname, '../../package.json');
    const packageJson = await fs.readJson(packagePath);
    return {
      version: packageJson.version,
      location: path.dirname(packagePath)
    };
  } catch {
    return {
      version: 'Unknown',
      location: 'Unknown'
    };
  }
}

async function showProjectInfo(): Promise<void> {
  const cwd = process.cwd();
  
  console.log(chalk.cyan('Current Project:'));
  console.log(`  Directory: ${cwd}`);

  try {
    const packageJsonPath = path.join(cwd, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      console.log(`  Name: ${packageJson.name || 'Unknown'}`);
      console.log(`  Version: ${packageJson.version || 'Unknown'}`);
      
      // Check for DelVui dependencies
      const delvuiDeps = Object.keys({
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      }).filter(dep => dep.startsWith('@delvui/'));

      if (delvuiDeps.length > 0) {
        console.log(`  DelVui packages: ${delvuiDeps.join(', ')}`);
      } else {
        console.log(`  DelVui packages: ${chalk.yellow('None found')}`);
      }
    } else {
      console.log(`  ${chalk.yellow('No package.json found')}`);
    }
  } catch (error) {
    console.log(`  ${chalk.red('Error reading project info')}`);
  }
  
  console.log('');
}

async function showEnvironmentInfo(): Promise<void> {
  console.log(chalk.cyan('Environment Variables:'));
  const relevantEnvs = Object.keys(process.env)
    .filter(key => key.startsWith('DELVUI_') || key.includes('NODE') || key.includes('NPM'))
    .sort();

  if (relevantEnvs.length > 0) {
    relevantEnvs.forEach(key => {
      console.log(`  ${key}: ${process.env[key]}`);
    });
  } else {
    console.log(`  ${chalk.yellow('No relevant environment variables found')}`);
  }
  
  console.log('');
}

async function showDependencyInfo(): Promise<void> {
  console.log(chalk.cyan('Global Dependencies:'));
  
  const globalDeps = ['typescript', 'yarn', 'pnpm', '@delvui/cli'];
  
  for (const dep of globalDeps) {
    try {
      const { execSync } = require('child_process');
      const version = execSync(`npm list -g ${dep} --depth=0`, { 
        encoding: 'utf8', 
        stdio: 'pipe' 
      });
      const match = version.match(new RegExp(`${dep}@([\\d\\.\\w-]+)`));
      console.log(`  ${dep}: ${match ? match[1] : 'Found'}`);
    } catch {
      console.log(`  ${dep}: ${chalk.red('Not installed')}`);
    }
  }
  
  console.log('');
}