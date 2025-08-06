/**
 * DelVui CLI - Doctor Command
 */

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';

export async function runDoctor(): Promise<void> {
  console.log(chalk.blue.bold('🏥 DelVui Health Check\n'));

  let allGood = true;

  // Check Node.js version
  allGood = allGood && await checkNodeVersion();
  
  // Check npm/package manager
  allGood = allGood && await checkPackageManager();
  
  // Check TypeScript
  allGood = allGood && await checkTypeScript();
  
  // Check project structure
  allGood = allGood && await checkProjectStructure();
  
  // Check DelVui dependencies
  allGood = allGood && await checkDelVuiDependencies();

  console.log('');
  if (allGood) {
    logger.success('🎉 Everything looks good! Your DelVui setup is healthy.');
  } else {
    logger.warn('⚠️  Some issues were found. Please review the recommendations above.');
  }
}

async function checkNodeVersion(): Promise<boolean> {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion >= 16) {
    logger.success(`Node.js version: ${nodeVersion}`);
    return true;
  } else {
    logger.error(`Node.js version ${nodeVersion} is too old. Please upgrade to Node.js 16+`);
    return false;
  }
}

async function checkPackageManager(): Promise<boolean> {
  const managers = ['npm', 'yarn', 'pnpm'];
  let found = false;

  for (const manager of managers) {
    try {
      const version = execSync(`${manager} --version`, { encoding: 'utf8', stdio: 'pipe' });
      logger.success(`${manager}: ${version.trim()}`);
      found = true;
    } catch {
      // Manager not found
    }
  }

  if (!found) {
    logger.error('No package manager found (npm, yarn, or pnpm)');
    return false;
  }

  return true;
}

async function checkTypeScript(): Promise<boolean> {
  try {
    const version = execSync('tsc --version', { encoding: 'utf8', stdio: 'pipe' });
    logger.success(`TypeScript: ${version.trim()}`);
    return true;
  } catch {
    logger.warn('TypeScript not found globally. This is optional but recommended.');
    return true; // Not critical
  }
}

async function checkProjectStructure(): Promise<boolean> {
  const cwd = process.cwd();
  
  try {
    const packageJsonPath = path.join(cwd, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      logger.success('package.json found');
      
      const packageJson = await fs.readJson(packageJsonPath);
      
      // Check for TypeScript config
      const tsConfigPath = path.join(cwd, 'tsconfig.json');
      if (await fs.pathExists(tsConfigPath)) {
        logger.success('tsconfig.json found');
      } else if (packageJson.dependencies?.typescript || packageJson.devDependencies?.typescript) {
        logger.warn('TypeScript is installed but tsconfig.json is missing');
      }

      return true;
    } else {
      logger.warn('No package.json found in current directory');
      return true; // Not always required
    }
  } catch (error) {
    logger.error('Error checking project structure:', error);
    return false;
  }
}

async function checkDelVuiDependencies(): Promise<boolean> {
  const cwd = process.cwd();
  
  try {
    const packageJsonPath = path.join(cwd, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
        ...packageJson.peerDependencies
      };

      const delvuiPackages = Object.keys(allDeps).filter(dep => dep.startsWith('@delvui/'));
      
      if (delvuiPackages.length > 0) {
        logger.success(`DelVui packages found: ${delvuiPackages.join(', ')}`);
        
        // Check for version consistency
        const versions = new Set(
          delvuiPackages.map(pkg => allDeps[pkg])
        );
        
        if (versions.size > 1) {
          logger.warn('Different DelVui package versions detected. Consider using the same version for all packages.');
        }
        
        return true;
      } else {
        logger.info('No DelVui packages found in current project');
        logger.info('Run "delv add" to add DelVui to your project');
        return true;
      }
    } else {
      return true; // No project structure
    }
  } catch (error) {
    logger.error('Error checking DelVui dependencies:', error);
    return false;
  }
}