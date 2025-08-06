#!/usr/bin/env node

/**
 * DelVui CLI - Main Entry Point
 * Provides project scaffolding, component generation, and boilerplates
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Commands
import { initCommand } from './commands/init.js';
import { generateCommand } from './commands/generate.js';
import { addCommand } from './commands/add.js';
import { updateCommand } from './commands/update.js';
import { buildCommand } from './commands/build.js';
import { serveCommand } from './commands/serve.js';
import { upgradeCommand } from './commands/upgrade.js';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get package info
const packagePath = join(__dirname, '..', 'package.json');
const packageJson = require(packagePath);

const program = new Command();

// ASCII Art Banner
const banner = `
${chalk.cyan('╔══════════════════════════════════════════════════════════════════════╗')}
${chalk.cyan('║')}                                                                      ${chalk.cyan('║')}
${chalk.cyan('║')}        ${chalk.bold.blue('██████╗ ███████╗██╗     ██╗   ██╗     ██╗   ██╗██╗')}            ${chalk.cyan('║')}
${chalk.cyan('║')}        ${chalk.bold.blue('██╔══██╗██╔════╝██║     ██║   ██║     ██║   ██║██║')}            ${chalk.cyan('║')}
${chalk.cyan('║')}        ${chalk.bold.blue('██║  ██║█████╗  ██║     ██║   ██║     ██║   ██║██║')}            ${chalk.cyan('║')}
${chalk.cyan('║')}        ${chalk.bold.blue('██║  ██║██╔══╝  ██║     ╚██╗ ██╔╝     ██║   ██║██║')}            ${chalk.cyan('║')}
${chalk.cyan('║')}        ${chalk.bold.blue('██████╔╝███████╗███████╗ ╚████╔╝      ╚██████╔╝██║')}            ${chalk.cyan('║')}
${chalk.cyan('║')}        ${chalk.bold.blue('╚═════╝ ╚══════╝╚══════╝  ╚═══╝        ╚═════╝ ╚═╝')}            ${chalk.cyan('║')}
${chalk.cyan('║')}                                                                      ${chalk.cyan('║')}
${chalk.cyan('║')}          ${chalk.yellow('🚀 DigiDelv Design System & Component Library')}               ${chalk.cyan('║')}
${chalk.cyan('║')}          ${chalk.gray(`v${packageJson.version} - Build amazing UIs faster`)}                          ${chalk.cyan('║')}
${chalk.cyan('║')}                                                                      ${chalk.cyan('║')}
${chalk.cyan('╚══════════════════════════════════════════════════════════════════════╝')}
`;

// Program setup
program
  .name('delvui')
  .description('DelVui CLI - Enterprise Design System Toolkit')
  .version(packageJson.version)
  .hook('preAction', () => {
    if (process.argv.includes('--help') || process.argv.includes('-h')) {
      return; // Don't show banner for help
    }
    console.log(banner);
  });

// Commands
program
  .command('init')
  .alias('create')
  .description('Initialize a new project with DelVui')
  .argument('[project-name]', 'Name of the project')
  .option('-t, --template <template>', 'Project template to use', 'react')
  .option('-p, --preset <preset>', 'Configuration preset', 'default')
  .option('--skip-install', 'Skip package installation')
  .option('--skip-git', 'Skip git initialization')
  .option('-v, --verbose', 'Verbose output')
  .action(initCommand);

program
  .command('generate')
  .alias('g')
  .description('Generate components, pages, or other assets')
  .argument('<type>', 'What to generate (atom|molecule|organism|template|page)')
  .argument('<name>', 'Name of the component/asset')
  .option('-f, --framework <framework>', 'Target framework', 'react')
  .option('-o, --output <path>', 'Output directory')
  .option('-s, --style <style>', 'Styling approach', 'css-modules')
  .option('-t, --tests', 'Include test files')
  .option('-st, --stories', 'Include Storybook stories')
  .option('-d, --docs', 'Include documentation')
  .option('--atomic-level <level>', 'Atomic design level validation')
  .action(generateCommand);

program
  .command('add')
  .description('Add DelVui components to existing project')
  .argument('[components...]', 'Component names to add')
  .option('-f, --framework <framework>', 'Target framework', 'react')
  .option('-v, --version <version>', 'Specific version to install')
  .option('--dev', 'Install as dev dependency')
  .option('--peer', 'Install as peer dependency')
  .action(addCommand);

program
  .command('update')
  .alias('upgrade')
  .description('Update DelVui packages to latest versions')
  .option('-c, --check', 'Check for updates without installing')
  .option('-i, --interactive', 'Interactive update mode')
  .option('--canary', 'Update to canary versions')
  .action(updateCommand);

program
  .command('build')
  .description('Build DelVui components for production')
  .option('-f, --framework <framework>', 'Target framework')
  .option('-o, --output <path>', 'Output directory', 'dist')
  .option('-w, --watch', 'Watch for changes')
  .option('--analyze', 'Analyze bundle size')
  .option('--sourcemap', 'Generate sourcemaps')
  .action(buildCommand);

program
  .command('serve')
  .alias('dev')
  .description('Start development server with DelVui components')
  .option('-p, --port <port>', 'Port number', '3000')
  .option('-h, --host <host>', 'Host address', 'localhost')
  .option('--open', 'Open browser automatically')
  .option('--https', 'Use HTTPS')
  .action(serveCommand);

// Utility commands
program
  .command('list')
  .alias('ls')
  .description('List available components and templates')
  .option('-f, --framework <framework>', 'Filter by framework')
  .option('-c, --category <category>', 'Filter by category')
  .option('-l, --level <level>', 'Filter by atomic level')
  .action(async (options) => {
    const { listComponents } = await import('./commands/list.js');
    await listComponents(options);
  });

program
  .command('info')
  .description('Show information about DelVui installation')
  .option('--env', 'Show environment information')
  .option('--deps', 'Show dependency information')
  .action(async (options) => {
    const { showInfo } = await import('./commands/info.js');
    await showInfo(options);
  });

program
  .command('doctor')
  .description('Check DelVui setup and dependencies')
  .action(async () => {
    const { runDoctor } = await import('./commands/doctor.js');
    await runDoctor();
  });

// Global error handler
process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('❌ Unhandled Rejection at:'), promise);
  console.error(chalk.red('Reason:'), reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error(chalk.red('❌ Uncaught Exception:'), error);
  process.exit(1);
});

// Parse and execute
program.parse();

export { program };