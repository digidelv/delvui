/**
 * DelVui CLI - Logger Utility
 */

import chalk from 'chalk';

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(chalk.blue('ℹ'), message, ...args);
  },

  success: (message: string, ...args: any[]) => {
    console.log(chalk.green('✓'), message, ...args);
  },

  warn: (message: string, ...args: any[]) => {
    console.warn(chalk.yellow('⚠'), message, ...args);
  },

  error: (message: string, ...args: any[]) => {
    console.error(chalk.red('✗'), message, ...args);
  },

  debug: (message: string, ...args: any[]) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray('🐛'), message, ...args);
    }
  },

  log: (message: string, ...args: any[]) => {
    console.log(message, ...args);
  },
};