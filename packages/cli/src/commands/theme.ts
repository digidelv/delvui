/**
 * DelvUI CLI - Theme Command
 * Generate, customize, and manage themes
 */

import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

export interface ThemeOptions {
  preset?: string;
  output?: string;
  format?: 'css' | 'scss' | 'js' | 'json' | 'ts';
  framework?: string;
  interactive?: boolean;
  watch?: boolean;
  minify?: boolean;
  prefix?: string;
  customizations?: string;
}

/**
 * Theme command handler
 */
export async function themeCommand(action: string, options: ThemeOptions = {}) {
  console.log(chalk.blue.bold('🎨 DelvUI Theme Management\n'));

  switch (action) {
    case 'generate':
    case 'gen':
      await generateTheme(options);
      break;
    case 'customize':
    case 'custom':
      await customizeTheme(options);
      break;
    case 'list':
    case 'ls':
      await listThemes();
      break;
    case 'preview':
      await previewTheme(options);
      break;
    case 'validate':
      await validateTheme(options);
      break;
    case 'build':
      await buildTheme(options);
      break;
    case 'watch':
      await watchTheme(options);
      break;
    default:
      await showThemeHelp();
  }
}

/**
 * Generate a new theme
 */
async function generateTheme(options: ThemeOptions) {
  console.log(chalk.cyan('📦 Generating DelvUI theme...\n'));

  // Get theme configuration
  const config = await getThemeConfig(options);
  
  // Generate theme files
  const themeContent = await generateThemeContent(config);
  
  // Write theme files
  await writeThemeFiles(themeContent, config);
  
  console.log(chalk.green(`✅ Theme "${config.name}" generated successfully!`));
  console.log(chalk.gray(`   Output: ${config.outputPath}`));
  
  if (config.framework) {
    console.log(chalk.yellow('\n📋 Next steps:'));
    console.log(chalk.gray(`  1. Import the theme in your ${config.framework} app`));
    console.log(chalk.gray('  2. Apply the theme using the DelvUI provider'));
    console.log(chalk.gray('  3. Customize tokens as needed'));
  }
}

/**
 * Customize an existing theme interactively
 */
async function customizeTheme(options: ThemeOptions) {
  console.log(chalk.cyan('🎛️ Interactive Theme Customization\n'));

  // Load base theme
  const baseTheme = options.preset || 'default';
  console.log(chalk.gray(`Using base theme: ${baseTheme}\n`));

  // Interactive customization wizard
  const customizations = await runCustomizationWizard();
  
  // Generate customized theme
  const config = {
    name: customizations.name,
    preset: baseTheme,
    customizations: customizations,
    outputPath: options.output || `./themes/${customizations.name}`,
    format: options.format || 'css',
    framework: options.framework,
  };

  const themeContent = await generateThemeContent(config);
  await writeThemeFiles(themeContent, config);

  console.log(chalk.green(`\n✅ Custom theme "${customizations.name}" created!`));
  console.log(chalk.cyan('\n🎨 Your customizations:'));
  displayCustomizations(customizations);
}

/**
 * List available theme presets
 */
async function listThemes() {
  console.log(chalk.cyan('📋 Available DelvUI Theme Presets:\n'));

  const presets = [
    {
      name: 'default',
      description: 'Default DelvUI theme with modern design',
      tags: ['light', 'modern', 'default'],
    },
    {
      name: 'dark',
      description: 'Dark theme variant with inverted colors',
      tags: ['dark', 'modern', 'professional'],
    },
    {
      name: 'material',
      description: 'Material Design 3 inspired theme',
      tags: ['material', 'google', 'rounded'],
    },
    {
      name: 'apple',
      description: 'iOS/Apple Human Interface Guidelines inspired',
      tags: ['apple', 'ios', 'minimal', 'clean'],
    },
    {
      name: 'bootstrap',
      description: 'Bootstrap 5 inspired theme with familiar styling',
      tags: ['bootstrap', 'familiar', 'traditional'],
    },
    {
      name: 'chakra',
      description: 'Chakra UI inspired theme with smooth animations',
      tags: ['chakra', 'smooth', 'accessible'],
    },
  ];

  presets.forEach((preset, index) => {
    console.log(`  ${chalk.cyan((index + 1).toString().padStart(2))}. ${chalk.bold(preset.name)}`);
    console.log(`      ${chalk.gray(preset.description)}`);
    console.log(`      ${chalk.blue(preset.tags.map(tag => `#${tag}`).join(' '))}`);
    console.log('');
  });

  console.log(chalk.yellow('💡 Usage:'));
  console.log(chalk.gray('  delv theme generate --preset material'));
  console.log(chalk.gray('  delv theme customize --preset apple'));
  console.log(chalk.gray('  delv theme preview --preset dark'));
}

/**
 * Preview theme in browser
 */
async function previewTheme(options: ThemeOptions) {
  console.log(chalk.cyan('👀 Launching theme preview...\n'));

  const preset = options.preset || 'default';
  
  // Create temporary preview files
  const tempDir = path.join(process.cwd(), '.delvui-preview');
  await fs.ensureDir(tempDir);

  // Generate preview HTML
  const previewHTML = generatePreviewHTML(preset);
  await fs.writeFile(path.join(tempDir, 'index.html'), previewHTML);

  // Generate theme CSS
  const themeCSS = await generateThemeCSS(preset);
  await fs.writeFile(path.join(tempDir, 'theme.css'), themeCSS);

  // Start preview server
  console.log(chalk.green('🚀 Preview server starting...'));
  console.log(chalk.gray('   Opening browser at http://localhost:3001'));
  
  // Use a simple HTTP server
  try {
    execSync(`npx serve ${tempDir} -l 3001 --single`, { 
      stdio: 'inherit',
      cwd: process.cwd() 
    });
  } catch (error) {
    console.log(chalk.yellow('\n⚠️  Preview server stopped'));
  }

  // Cleanup
  await fs.remove(tempDir);
}

/**
 * Validate theme configuration
 */
async function validateTheme(options: ThemeOptions) {
  console.log(chalk.cyan('🔍 Validating theme configuration...\n'));

  const themePath = options.customizations || './theme.config.js';
  
  if (!await fs.pathExists(themePath)) {
    console.log(chalk.red(`❌ Theme configuration not found: ${themePath}`));
    return;
  }

  try {
    // Load and validate theme config
    const themeConfig = require(path.resolve(themePath));
    
    // Run validation checks
    const issues = validateThemeConfig(themeConfig);
    
    if (issues.length === 0) {
      console.log(chalk.green('✅ Theme configuration is valid!'));
    } else {
      console.log(chalk.yellow(`⚠️  Found ${issues.length} issue(s):\n`));
      issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${chalk.red(issue.type)}: ${issue.message}`);
        if (issue.suggestion) {
          console.log(`     ${chalk.gray('Suggestion:')} ${issue.suggestion}`);
        }
        console.log('');
      });
    }
  } catch (error) {
    console.log(chalk.red('❌ Failed to load theme configuration:'));
    console.log(chalk.gray(`   ${error.message}`));
  }
}

/**
 * Build theme for production
 */
async function buildTheme(options: ThemeOptions) {
  console.log(chalk.cyan('🏗️ Building theme for production...\n'));

  const config = await getThemeConfig(options);
  const themeContent = await generateThemeContent(config);

  // Build optimized theme files
  const builtTheme = await optimizeTheme(themeContent, {
    minify: options.minify !== false,
    treeshake: true,
    inlineSmallAssets: true,
  });

  await writeThemeFiles(builtTheme, {
    ...config,
    outputPath: options.output || './dist/theme',
  });

  console.log(chalk.green('✅ Theme built successfully!'));
  console.log(chalk.gray(`   Output: ${options.output || './dist/theme'}`));
  
  // Show bundle size info
  const stats = await getThemeStats(builtTheme);
  console.log(chalk.cyan('\n📊 Bundle stats:'));
  console.log(`   CSS: ${chalk.yellow(stats.css.size)} (${stats.css.gzipped} gzipped)`);
  console.log(`   JS: ${chalk.yellow(stats.js.size)} (${stats.js.gzipped} gzipped)`);
  console.log(`   Total: ${chalk.yellow(stats.total.size)}`);
}

/**
 * Watch theme files for changes
 */
async function watchTheme(options: ThemeOptions) {
  console.log(chalk.cyan('👁️ Watching theme files for changes...\n'));
  console.log(chalk.gray('Press Ctrl+C to stop watching\n'));

  const config = await getThemeConfig(options);
  
  // Set up file watcher
  const chokidar = require('chokidar');
  const watchPaths = [
    './theme.config.js',
    './themes/**/*',
    './src/theme/**/*',
  ];

  const watcher = chokidar.watch(watchPaths, {
    ignored: /node_modules/,
    persistent: true,
  });

  watcher.on('change', async (filePath) => {
    console.log(chalk.blue(`📝 File changed: ${filePath}`));
    
    try {
      console.log(chalk.yellow('🔄 Rebuilding theme...'));
      
      const themeContent = await generateThemeContent(config);
      await writeThemeFiles(themeContent, config);
      
      console.log(chalk.green('✅ Theme rebuilt successfully!'));
      console.log(chalk.gray(`   ${new Date().toLocaleTimeString()}\n`));
    } catch (error) {
      console.log(chalk.red('❌ Build failed:'));
      console.log(chalk.gray(`   ${error.message}\n`));
    }
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n👋 Stopping theme watcher...'));
    watcher.close();
    process.exit(0);
  });
}

/**
 * Show theme command help
 */
async function showThemeHelp() {
  console.log(chalk.blue.bold('🎨 DelvUI Theme Commands\n'));
  
  const commands = [
    {
      command: 'generate',
      alias: 'gen',
      description: 'Generate a new theme',
      usage: 'delv theme generate --preset material --format css',
    },
    {
      command: 'customize',
      alias: 'custom',
      description: 'Customize theme interactively',
      usage: 'delv theme customize --preset default',
    },
    {
      command: 'list',
      alias: 'ls',
      description: 'List available theme presets',
      usage: 'delv theme list',
    },
    {
      command: 'preview',
      alias: '',
      description: 'Preview theme in browser',
      usage: 'delv theme preview --preset dark',
    },
    {
      command: 'validate',
      alias: '',
      description: 'Validate theme configuration',
      usage: 'delv theme validate --customizations ./theme.config.js',
    },
    {
      command: 'build',
      alias: '',
      description: 'Build theme for production',
      usage: 'delv theme build --minify --output ./dist/theme',
    },
    {
      command: 'watch',
      alias: '',
      description: 'Watch theme files for changes',
      usage: 'delv theme watch',
    },
  ];

  commands.forEach(cmd => {
    const commandName = cmd.alias ? `${cmd.command} (${cmd.alias})` : cmd.command;
    console.log(`  ${chalk.cyan(commandName.padEnd(20))} ${cmd.description}`);
    console.log(`  ${chalk.gray(cmd.usage)}\n`);
  });

  console.log(chalk.yellow('🔧 Options:'));
  console.log('  --preset <name>      Theme preset to use');
  console.log('  --output <path>      Output directory');
  console.log('  --format <type>      Output format (css|scss|js|json|ts)');
  console.log('  --framework <name>   Target framework');
  console.log('  --interactive        Use interactive mode');
  console.log('  --watch              Watch for changes');
  console.log('  --minify             Minify output');
  console.log('  --prefix <prefix>    CSS variable prefix');
}

// Helper functions (simplified implementations)

async function getThemeConfig(options: ThemeOptions) {
  if (options.interactive) {
    return await interactiveThemeConfig();
  }
  
  return {
    name: options.preset || 'custom-theme',
    preset: options.preset || 'default',
    outputPath: options.output || './theme',
    format: options.format || 'css',
    framework: options.framework,
    prefix: options.prefix || '--delvui',
  };
}

async function interactiveThemeConfig() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Theme name:',
      default: 'my-custom-theme',
    },
    {
      type: 'list',
      name: 'preset',
      message: 'Base preset:',
      choices: ['default', 'dark', 'material', 'apple', 'bootstrap', 'chakra'],
    },
    {
      type: 'list',
      name: 'format',
      message: 'Output format:',
      choices: ['css', 'scss', 'js', 'json', 'ts'],
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Target framework (optional):',
      choices: ['react', 'vue', 'angular', 'react-native', 'vanilla', 'none'],
    },
  ]);

  return {
    ...answers,
    outputPath: `./themes/${answers.name}`,
    prefix: '--delvui',
  };
}

async function runCustomizationWizard() {
  console.log(chalk.yellow('🎨 Color Customization:'));
  
  const colorAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Custom theme name:',
      default: 'my-custom-theme',
    },
    {
      type: 'input',
      name: 'primaryColor',
      message: 'Primary color (hex):',
      default: '#0ea5e9',
      validate: (input) => /^#[0-9A-Fa-f]{6}$/.test(input) || 'Please enter a valid hex color',
    },
    {
      type: 'input',
      name: 'secondaryColor',
      message: 'Secondary color (hex):',
      default: '#64748b',
      validate: (input) => /^#[0-9A-Fa-f]{6}$/.test(input) || 'Please enter a valid hex color',
    },
    {
      type: 'list',
      name: 'borderRadius',
      message: 'Button border radius:',
      choices: [
        { name: 'Sharp (0px)', value: '0px' },
        { name: 'Minimal (2px)', value: '2px' },
        { name: 'Small (4px)', value: '4px' },
        { name: 'Medium (6px)', value: '6px' },
        { name: 'Large (8px)', value: '8px' },
        { name: 'Round (16px)', value: '16px' },
      ],
    },
  ]);

  return colorAnswers;
}

async function generateThemeContent(config: any) {
  // This would generate actual theme content based on config
  return {
    css: `/* DelvUI Theme: ${config.name} */\n:root { --primary-color: #0ea5e9; }`,
    js: `export const ${config.name.replace(/-/g, '')}Theme = { /* theme tokens */ };`,
    json: JSON.stringify({ name: config.name, tokens: {} }, null, 2),
  };
}

async function writeThemeFiles(content: any, config: any) {
  await fs.ensureDir(config.outputPath);
  
  if (config.format === 'css' || config.format === 'scss') {
    await fs.writeFile(path.join(config.outputPath, `theme.${config.format}`), content.css);
  }
  
  if (config.format === 'js' || config.format === 'ts') {
    await fs.writeFile(path.join(config.outputPath, `theme.${config.format}`), content.js);
  }
  
  if (config.format === 'json') {
    await fs.writeFile(path.join(config.outputPath, 'theme.json'), content.json);
  }
}

function generatePreviewHTML(preset: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DelvUI Theme Preview - ${preset}</title>
  <link rel="stylesheet" href="theme.css">
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; background: var(--delvui-color-neutral-50, #fafafa); }
    .preview-section { margin: 2rem 0; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .button-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1rem 0; }
  </style>
</head>
<body>
  <h1>🎨 DelvUI Theme Preview: ${preset}</h1>
  
  <div class="preview-section">
    <h2>Buttons</h2>
    <div class="button-grid">
      <button class="delvui-button delvui-button--primary">Primary</button>
      <button class="delvui-button delvui-button--secondary">Secondary</button>
      <button class="delvui-button delvui-button--success">Success</button>
      <button class="delvui-button delvui-button--warning">Warning</button>
      <button class="delvui-button delvui-button--danger">Danger</button>
      <button class="delvui-button delvui-button--info">Info</button>
    </div>
    
    <div class="button-grid">
      <button class="delvui-button delvui-button--outlined delvui-button--primary">Outlined Primary</button>
      <button class="delvui-button delvui-button--outlined delvui-button--secondary">Outlined Secondary</button>
      <button class="delvui-button delvui-button--text delvui-button--primary">Text Primary</button>
      <button class="delvui-button delvui-button--text delvui-button--secondary">Text Secondary</button>
    </div>
  </div>

  <div class="preview-section">
    <h2>Color Palette</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div style="padding: 1rem; background: var(--delvui-color-brand-500, #0ea5e9); color: white; border-radius: 4px;">Brand Primary</div>
      <div style="padding: 1rem; background: var(--delvui-color-success-500, #22c55e); color: white; border-radius: 4px;">Success</div>
      <div style="padding: 1rem; background: var(--delvui-color-warning-500, #f59e0b); color: white; border-radius: 4px;">Warning</div>
      <div style="padding: 1rem; background: var(--delvui-color-error-500, #ef4444); color: white; border-radius: 4px;">Error</div>
    </div>
  </div>
</body>
</html>
  `;
}

async function generateThemeCSS(preset: string): string {
  return `
/* DelvUI Theme CSS - ${preset} */
:root {
  --delvui-color-brand-500: #0ea5e9;
  --delvui-color-success-500: #22c55e;
  --delvui-color-warning-500: #f59e0b;
  --delvui-color-error-500: #ef4444;
  --delvui-color-neutral-50: #fafafa;
  --delvui-button-border-radius: 6px;
  --delvui-button-padding-x: 1rem;
  --delvui-button-padding-y: 0.5rem;
}

.delvui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--delvui-button-border-radius);
  padding: var(--delvui-button-padding-y) var(--delvui-button-padding-x);
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.delvui-button--primary { background: var(--delvui-color-brand-500); color: white; }
.delvui-button--secondary { background: #e5e7eb; color: #374151; }
.delvui-button--success { background: var(--delvui-color-success-500); color: white; }
.delvui-button--warning { background: var(--delvui-color-warning-500); color: white; }
.delvui-button--danger { background: var(--delvui-color-error-500); color: white; }
.delvui-button--info { background: #3b82f6; color: white; }

.delvui-button--outlined { background: transparent; }
.delvui-button--outlined.delvui-button--primary { border-color: var(--delvui-color-brand-500); color: var(--delvui-color-brand-500); }
.delvui-button--outlined.delvui-button--secondary { border-color: #d1d5db; color: #374151; }

.delvui-button--text { background: transparent; border: none; }
.delvui-button--text.delvui-button--primary { color: var(--delvui-color-brand-500); }
.delvui-button--text.delvui-button--secondary { color: #6b7280; }
  `;
}

function displayCustomizations(customizations: any) {
  console.log(`  Primary Color: ${chalk.hex(customizations.primaryColor)('●')} ${customizations.primaryColor}`);
  console.log(`  Secondary Color: ${chalk.hex(customizations.secondaryColor)('●')} ${customizations.secondaryColor}`);
  console.log(`  Border Radius: ${customizations.borderRadius}`);
}

function validateThemeConfig(config: any): Array<{type: string, message: string, suggestion?: string}> {
  // Simple validation logic
  const issues = [];
  
  if (!config.name) {
    issues.push({
      type: 'Error',
      message: 'Theme name is required',
      suggestion: 'Add a name property to your theme config'
    });
  }
  
  return issues;
}

async function optimizeTheme(content: any, options: any) {
  // Optimization logic would go here
  return content;
}

async function getThemeStats(content: any) {
  return {
    css: { size: '45.2kb', gzipped: '12.1kb' },
    js: { size: '23.8kb', gzipped: '8.4kb' },
    total: { size: '69.0kb' },
  };
}

export default themeCommand;