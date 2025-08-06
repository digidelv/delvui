/**
 * DelvUI CLI - List Command
 * List available components and templates
 */

import chalk from 'chalk';
import { logger } from '../utils/logger.js';

interface ListOptions {
  framework?: string;
  category?: string;
  level?: string;
}

export async function listComponents(options: ListOptions): Promise<void> {
  logger.info('DelvUI Available Components and Templates\n');

  if (options.level) {
    await listByAtomicLevel(options.level, options);
  } else if (options.category) {
    await listByCategory(options.category, options);
  } else if (options.framework) {
    await listByFramework(options.framework);
  } else {
    await listAll();
  }
}

async function listAll(): Promise<void> {
  console.log(chalk.blue.bold('📦 Available Packages:\n'));
  
  const packages = [
    { name: '@delvui/core', description: 'Core types and atomic design definitions' },
    { name: '@delvui/tokens', description: 'Design tokens (colors, typography, spacing)' },
    { name: '@delvui/react', description: 'React component library' },
    { name: '@delvui/vue', description: 'Vue component library' },
    { name: '@delvui/angular', description: 'Angular component library' },
    { name: '@delvui/react-native', description: 'React Native component library' },
    { name: '@delvui/vanilla', description: 'Vanilla JavaScript components' },
    { name: '@delvui/cli', description: 'Command line tools' },
  ];

  packages.forEach(pkg => {
    console.log(`  ${chalk.cyan(pkg.name.padEnd(25))} ${chalk.gray(pkg.description)}`);
  });

  console.log(chalk.blue.bold('\n🏗️  Project Templates:\n'));
  
  const templates = [
    { name: 'react', description: '⚛️  React - Modern React with TypeScript' },
    { name: 'nextjs', description: '⚡ Next.js - Full-stack React framework' },
    { name: 'vue', description: '💚 Vue - Vue 3 with Composition API' },
    { name: 'nuxt', description: '🟢 Nuxt - Vue.js framework' },
    { name: 'angular', description: '🅰️  Angular - Enterprise Angular application' },
    { name: 'react-native', description: '📱 React Native - Mobile app with Expo' },
    { name: 'vanilla', description: '🟨 Vanilla - Pure JavaScript/TypeScript' },
    { name: 'storybook', description: '📚 Storybook - Component documentation' },
    { name: 'workspace', description: '🏗️  Multi-framework workspace' },
  ];

  templates.forEach(template => {
    console.log(`  ${chalk.cyan(template.name.padEnd(15))} ${template.description}`);
  });

  console.log(chalk.blue.bold('\n🧬 Atomic Design Levels:\n'));
  
  const atomicLevels = [
    { name: 'atoms', description: 'Basic building blocks (Button, Input, Icon)' },
    { name: 'molecules', description: 'Simple combinations (SearchBox, FormField)' },
    { name: 'organisms', description: 'Complex components (Header, DataTable)' },
    { name: 'templates', description: 'Page layouts and structure' },
    { name: 'pages', description: 'Complete page implementations' },
  ];

  atomicLevels.forEach(level => {
    console.log(`  ${chalk.cyan(level.name.padEnd(15))} ${chalk.gray(level.description)}`);
  });
}

async function listByAtomicLevel(level: string, options: ListOptions): Promise<void> {
  console.log(chalk.blue.bold(`🧬 ${level.charAt(0).toUpperCase() + level.slice(1)} Components:\n`));

  const components = getComponentsByLevel(level);
  const filteredComponents = options.framework 
    ? components.filter(comp => comp.frameworks.includes(options.framework!))
    : components;

  if (filteredComponents.length === 0) {
    console.log(chalk.yellow('No components found for the specified criteria.'));
    return;
  }

  filteredComponents.forEach(component => {
    console.log(`  ${chalk.cyan(component.name.padEnd(20))} ${chalk.gray(component.description)}`);
    if (options.framework) {
      console.log(`    ${chalk.dim('Framework:')} ${chalk.dim(options.framework)}`);
    } else {
      console.log(`    ${chalk.dim('Frameworks:')} ${chalk.dim(component.frameworks.join(', '))}`);
    }
    console.log('');
  });
}

async function listByCategory(category: string, options: ListOptions): Promise<void> {
  console.log(chalk.blue.bold(`📂 ${category.charAt(0).toUpperCase() + category.slice(1)} Components:\n`));

  const components = getComponentsByCategory(category);
  const filteredComponents = options.framework 
    ? components.filter(comp => comp.frameworks.includes(options.framework!))
    : components;

  if (filteredComponents.length === 0) {
    console.log(chalk.yellow('No components found for the specified category.'));
    return;
  }

  // Group by atomic level
  const groupedComponents = filteredComponents.reduce((acc, comp) => {
    if (!acc[comp.level]) acc[comp.level] = [];
    acc[comp.level].push(comp);
    return acc;
  }, {} as Record<string, any[]>);

  Object.entries(groupedComponents).forEach(([level, comps]) => {
    console.log(chalk.blue(`  ${level.charAt(0).toUpperCase() + level.slice(1)}s:`));
    comps.forEach(comp => {
      console.log(`    ${chalk.cyan(comp.name.padEnd(15))} ${chalk.gray(comp.description)}`);
    });
    console.log('');
  });
}

async function listByFramework(framework: string): Promise<void> {
  console.log(chalk.blue.bold(`⚛️  ${framework.charAt(0).toUpperCase() + framework.slice(1)} Components:\n`));

  const allComponents = getAllComponents();
  const frameworkComponents = allComponents.filter(comp => comp.frameworks.includes(framework));

  if (frameworkComponents.length === 0) {
    console.log(chalk.yellow(`No components available for ${framework}.`));
    return;
  }

  // Group by atomic level
  const groupedComponents = frameworkComponents.reduce((acc, comp) => {
    if (!acc[comp.level]) acc[comp.level] = [];
    acc[comp.level].push(comp);
    return acc;
  }, {} as Record<string, any[]>);

  Object.entries(groupedComponents).forEach(([level, comps]) => {
    console.log(chalk.blue(`  ${level.charAt(0).toUpperCase() + level.slice(1)}s:`));
    comps.forEach(comp => {
      console.log(`    ${chalk.cyan(comp.name.padEnd(15))} ${chalk.gray(comp.description)}`);
    });
    console.log('');
  });
}

function getComponentsByLevel(level: string) {
  const allComponents = getAllComponents();
  return allComponents.filter(comp => comp.level === level);
}

function getComponentsByCategory(category: string) {
  const allComponents = getAllComponents();
  return allComponents.filter(comp => comp.category === category);
}

function getAllComponents() {
  return [
    // Atoms
    { 
      name: 'Button', 
      level: 'atom', 
      category: 'form',
      description: 'Interactive button component',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },
    { 
      name: 'Input', 
      level: 'atom', 
      category: 'form',
      description: 'Text input field',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },
    { 
      name: 'Icon', 
      level: 'atom', 
      category: 'display',
      description: 'Scalable icon component',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },
    { 
      name: 'Avatar', 
      level: 'atom', 
      category: 'display',
      description: 'User avatar image',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },
    { 
      name: 'Badge', 
      level: 'atom', 
      category: 'display',
      description: 'Small status or count indicator',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },
    { 
      name: 'Spinner', 
      level: 'atom', 
      category: 'feedback',
      description: 'Loading indicator',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },

    // Molecules
    { 
      name: 'SearchBox', 
      level: 'molecule', 
      category: 'form',
      description: 'Search input with button',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },
    { 
      name: 'FormField', 
      level: 'molecule', 
      category: 'form',
      description: 'Label, input, and validation message',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
    { 
      name: 'Card', 
      level: 'molecule', 
      category: 'display',
      description: 'Content container with header and body',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },
    { 
      name: 'Toast', 
      level: 'molecule', 
      category: 'feedback',
      description: 'Temporary notification message',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },
    { 
      name: 'Pagination', 
      level: 'molecule', 
      category: 'navigation',
      description: 'Page navigation controls',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },

    // Organisms
    { 
      name: 'Header', 
      level: 'organism', 
      category: 'navigation',
      description: 'Site header with navigation',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
    { 
      name: 'DataTable', 
      level: 'organism', 
      category: 'display',
      description: 'Sortable, filterable data table',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
    { 
      name: 'ContactForm', 
      level: 'organism', 
      category: 'form',
      description: 'Complete contact form with validation',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
    { 
      name: 'ProductCard', 
      level: 'organism', 
      category: 'display',
      description: 'Product display with image and details',
      frameworks: ['react', 'vue', 'angular', 'react-native', 'vanilla']
    },

    // Templates
    { 
      name: 'DashboardTemplate', 
      level: 'template', 
      category: 'layout',
      description: 'Dashboard page layout',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
    { 
      name: 'LandingTemplate', 
      level: 'template', 
      category: 'layout',
      description: 'Landing page layout',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
    { 
      name: 'AuthTemplate', 
      level: 'template', 
      category: 'layout',
      description: 'Authentication page layout',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },

    // Pages
    { 
      name: 'HomePage', 
      level: 'page', 
      category: 'page',
      description: 'Complete home page implementation',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
    { 
      name: 'LoginPage', 
      level: 'page', 
      category: 'page',
      description: 'User login page',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
    { 
      name: 'DashboardPage', 
      level: 'page', 
      category: 'page',
      description: 'User dashboard page',
      frameworks: ['react', 'vue', 'angular', 'vanilla']
    },
  ];
}