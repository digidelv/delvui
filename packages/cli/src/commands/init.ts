/**
 * DelVui CLI - Init Command
 * Initialize new projects with DelVui boilerplates
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { Listr } from 'listr2';
// @ts-ignore - No types available for this package
import validatePackageName from 'validate-npm-package-name';

import { ProjectTemplate, TemplateConfig } from '../types/templates.js';
import { downloadTemplate, installDependencies, initializeGit } from '../utils/project.js';
import { logger } from '../utils/logger.js';

interface InitOptions {
  template?: string;
  preset?: string;
  skipInstall?: boolean;
  skipGit?: boolean;
  verbose?: boolean;
}

export async function initCommand(projectName: string, options: InitOptions): Promise<void> {
  try {
    let finalProjectName = projectName;

    // If no project name provided, ask for it
    if (!finalProjectName) {
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is your project name?',
        validate: (input: string) => {
          if (!input.trim()) return 'Project name is required';
          const validation = validatePackageName(input);
          if (!validation.validForNewPackages) {
            return validation.errors?.[0] || 'Invalid package name';
          }
          return true;
        },
      });
      finalProjectName = name;
    }

    // Validate project name
    const validation = validatePackageName(finalProjectName);
    if (!validation.validForNewPackages) {
      throw new Error(`Invalid project name: ${validation.errors?.[0] || 'Unknown error'}`);
    }

    const projectPath = path.resolve(process.cwd(), finalProjectName);

    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
      const { overwrite } = await inquirer.prompt({
        type: 'confirm',
        name: 'overwrite',
        message: `Directory "${finalProjectName}" already exists. Overwrite?`,
        default: false,
      });

      if (!overwrite) {
        logger.info('Operation cancelled');
        return;
      }

      await fs.remove(projectPath);
    }

    // Select template if not provided
    let template = options.template || 'react';
    if (!options.template) {
      const templateChoice = await inquirer.prompt({
        type: 'list',
        name: 'template',
        message: 'Choose a project template:',
        choices: [
          {
            name: '⚛️  React - Modern React with TypeScript',
            value: 'react',
          },
          {
            name: '⚡ Next.js - Full-stack React framework',
            value: 'nextjs',
          },
          {
            name: '💚 Vue - Vue 3 with Composition API',
            value: 'vue',
          },
          {
            name: '🅰️  Angular - Enterprise Angular application',
            value: 'angular',
          },
          {
            name: '📱 React Native - Mobile app with Expo',
            value: 'react-native',
          },
          {
            name: '🟨 Vanilla - Pure JavaScript/TypeScript',
            value: 'vanilla',
          },
          {
            name: '📚 Storybook - Component documentation',
            value: 'storybook',
          },
          {
            name: '🏗️  Multi-framework - Workspace with multiple frameworks',
            value: 'workspace',
          },
        ],
      });
      template = templateChoice.template;
    }

    // Additional configuration based on template
    const config = await gatherTemplateConfig(template);

    console.log(`\n🚀 Creating DelVui project "${finalProjectName}" with ${template} template...\n`);

    const tasks = new Listr([
      {
        title: 'Creating project directory',
        task: async () => {
          await fs.ensureDir(projectPath);
        },
      },
      {
        title: 'Downloading template',
        task: async () => {
          await downloadTemplate(template, projectPath, config);
        },
      },
      {
        title: 'Customizing template',
        task: async () => {
          await customizeTemplate(projectPath, finalProjectName, template, config);
        },
      },
      {
        title: 'Installing dependencies',
        enabled: () => !options.skipInstall,
        task: async (ctx, task) => {
          const packageManager = await detectPackageManager();
          task.title = `Installing dependencies with ${packageManager}`;
          await installDependencies(projectPath, packageManager);
        },
      },
      {
        title: 'Initializing Git repository',
        enabled: () => !options.skipGit,
        task: async () => {
          await initializeGit(projectPath);
        },
      },
      {
        title: 'Running post-install scripts',
        task: async () => {
          await runPostInstallScripts(projectPath, template);
        },
      },
    ]);

    await tasks.run();

    // Success message
    console.log(chalk.green('\n✅ Project created successfully!\n'));
    console.log(chalk.cyan('📁 Project location:'), chalk.white(projectPath));
    console.log(chalk.cyan('📦 Template used:'), chalk.white(template));

    // Next steps
    console.log(chalk.yellow('\n📋 Next steps:'));
    console.log(chalk.gray(`  1. cd ${finalProjectName}`));
    
    if (options.skipInstall) {
      const packageManager = await detectPackageManager();
      console.log(chalk.gray(`  2. ${packageManager} install`));
      console.log(chalk.gray(`  3. ${packageManager} run dev`));
    } else {
      console.log(chalk.gray('  2. npm run dev'));
    }

    // Template-specific instructions
    const instructions = getTemplateInstructions(template);
    if (instructions.length > 0) {
      console.log(chalk.yellow('\n💡 Template-specific tips:'));
      instructions.forEach((instruction, index) => {
        console.log(chalk.gray(`  ${index + 1}. ${instruction}`));
      });
    }

    console.log(chalk.cyan('\n📚 Documentation: https://delvui.dev/docs'));
    console.log(chalk.cyan('💬 Community: https://discord.gg/delvui'));
    console.log(chalk.cyan('🐛 Issues: https://github.com/digidelv/delvui/issues'));

  } catch (error) {
    logger.error('Failed to initialize project:', error);
    process.exit(1);
  }
}

async function gatherTemplateConfig(template: string): Promise<TemplateConfig> {
  const config: TemplateConfig = {
    framework: template,
    styling: 'css-modules',
    testing: true,
    eslint: true,
    prettier: true,
    husky: true,
  };

  // Framework-specific configuration
  if (template === 'react' || template === 'nextjs') {
    const reactConfig = await inquirer.prompt([
      {
        type: 'list',
        name: 'styling',
        message: 'Choose styling solution:',
        choices: [
          { name: 'CSS Modules', value: 'css-modules' },
          { name: 'Tailwind CSS', value: 'tailwind' },
          { name: 'Styled Components', value: 'styled-components' },
          { name: 'Emotion', value: 'emotion' },
          { name: 'Sass/SCSS', value: 'sass' },
        ],
        default: 'css-modules',
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Use TypeScript?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'storybook',
        message: 'Include Storybook?',
        default: true,
      },
    ]);
    Object.assign(config, reactConfig);
  }

  if (template === 'vue') {
    const vueConfig = await inquirer.prompt([
      {
        type: 'list',
        name: 'vueVersion',
        message: 'Vue version:',
        choices: [
          { name: 'Vue 3 (Recommended)', value: '3' },
          { name: 'Vue 2', value: '2' },
        ],
        default: '3',
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Use TypeScript?',
        default: true,
      },
      {
        type: 'list',
        name: 'styling',
        message: 'Choose styling solution:',
        choices: [
          { name: 'CSS Modules', value: 'css-modules' },
          { name: 'Tailwind CSS', value: 'tailwind' },
          { name: 'Sass/SCSS', value: 'sass' },
        ],
      },
    ]);
    Object.assign(config, vueConfig);
  }

  return config;
}

async function customizeTemplate(
  projectPath: string,
  projectName: string,
  template: string,
  config: TemplateConfig
): Promise<void> {
  // Update package.json
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    packageJson.version = '0.1.0';
    packageJson.private = true;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }

  // Update README.md
  const readmePath = path.join(projectPath, 'README.md');
  if (fs.existsSync(readmePath)) {
    let readme = await fs.readFile(readmePath, 'utf8');
    readme = readme.replace(/{{PROJECT_NAME}}/g, projectName);
    readme = readme.replace(/{{TEMPLATE}}/g, template);
    await fs.writeFile(readmePath, readme);
  }

  // Template-specific customizations
  if (template === 'nextjs') {
    await customizeNextjsTemplate(projectPath, config);
  } else if (template === 'vue') {
    await customizeVueTemplate(projectPath, config);
  } else if (template === 'angular') {
    await customizeAngularTemplate(projectPath, projectName, config);
  }
}

async function customizeNextjsTemplate(projectPath: string, config: TemplateConfig): Promise<void> {
  // Customize next.config.js based on config
  const nextConfigPath = path.join(projectPath, 'next.config.js');
  if (fs.existsSync(nextConfigPath) && config.styling === 'tailwind') {
    // Add Tailwind config
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
    await fs.writeFile(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);
  }
}

async function customizeVueTemplate(projectPath: string, config: TemplateConfig): Promise<void> {
  if (config.vueVersion === '2') {
    // Adjust dependencies for Vue 2
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    
    // Update Vue version
    packageJson.dependencies.vue = '^2.7.0';
    
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }
}

async function customizeAngularTemplate(
  projectPath: string,
  projectName: string,
  config: TemplateConfig
): Promise<void> {
  // Update angular.json
  const angularJsonPath = path.join(projectPath, 'angular.json');
  if (fs.existsSync(angularJsonPath)) {
    const angularJson = await fs.readJson(angularJsonPath);
    
    // Update project name in angular.json
    if (angularJson.projects && angularJson.projects['template-project']) {
      angularJson.projects[projectName] = angularJson.projects['template-project'];
      delete angularJson.projects['template-project'];
      angularJson.defaultProject = projectName;
    }
    
    await fs.writeJson(angularJsonPath, angularJson, { spaces: 2 });
  }
}

async function detectPackageManager(): Promise<'npm' | 'yarn' | 'pnpm'> {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return 'yarn';
  } catch {}

  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {}

  return 'npm';
}

async function runPostInstallScripts(projectPath: string, template: string): Promise<void> {
  const postInstallPath = path.join(projectPath, 'scripts', 'post-install.js');
  if (fs.existsSync(postInstallPath)) {
    try {
      execSync('node scripts/post-install.js', {
        cwd: projectPath,
        stdio: 'ignore',
      });
    } catch (error) {
      logger.warn('Post-install script failed:', error);
    }
  }
}

function getTemplateInstructions(template: string): string[] {
  const instructions: Record<string, string[]> = {
    react: [
      'Start building components in src/components/',
      'Use DelVui components from @delvui/react',
      'Run "npm run storybook" to view component documentation',
    ],
    nextjs: [
      'Pages are in pages/ or app/ directory (depending on version)',
      'Add DelVui components to your pages',
      'Configure your styling solution in next.config.js',
    ],
    vue: [
      'Components are in src/components/',
      'Import DelVui components from @delvui/vue', 
      'Use Vue DevTools for debugging',
    ],
    angular: [
      'Components are in src/app/',
      'Import DelVui modules in your app.module.ts',
      'Use Angular CLI for generating new components',
    ],
    'react-native': [
      'Start with App.tsx',
      'Import DelVui components from @delvui/react-native',
      'Use Expo CLI for development and deployment',
    ],
    storybook: [
      'Stories are in stories/ directory',
      'Add new stories for your components',
      'Customize Storybook configuration in .storybook/',
    ],
  };

  return instructions[template] || [];
}