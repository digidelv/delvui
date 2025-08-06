/**
 * DelvUI CLI - Template Types
 */

export interface ProjectTemplate {
  name: string;
  description: string;
  framework: string;
  features: string[];
  dependencies: string[];
  devDependencies: string[];
  files: TemplateFile[];
}

export interface TemplateFile {
  path: string;
  content: string;
  template?: boolean; // If true, process with mustache
}

export interface TemplateConfig {
  framework: string;
  styling?: 'css-modules' | 'tailwind' | 'styled-components' | 'emotion' | 'sass';
  typescript?: boolean;
  testing?: boolean;
  storybook?: boolean;
  eslint?: boolean;
  prettier?: boolean;
  husky?: boolean;
  vueVersion?: '2' | '3';
  [key: string]: any;
}

export interface BoilerplateOptions {
  projectName: string;
  template: string;
  config: TemplateConfig;
  targetPath: string;
  skipInstall?: boolean;
  skipGit?: boolean;
}

export const AVAILABLE_TEMPLATES = [
  {
    name: 'react',
    description: '⚛️  React - Modern React with TypeScript',
    framework: 'react',
    category: 'web'
  },
  {
    name: 'nextjs', 
    description: '⚡ Next.js - Full-stack React framework',
    framework: 'react',
    category: 'web'
  },
  {
    name: 'vue',
    description: '💚 Vue - Vue 3 with Composition API',
    framework: 'vue',
    category: 'web'
  },
  {
    name: 'nuxt',
    description: '🟢 Nuxt - Vue.js framework',
    framework: 'vue',
    category: 'web'
  },
  {
    name: 'angular',
    description: '🅰️  Angular - Enterprise Angular application',
    framework: 'angular',
    category: 'web'
  },
  {
    name: 'react-native',
    description: '📱 React Native - Mobile app with Expo',
    framework: 'react',
    category: 'mobile'
  },
  {
    name: 'expo',
    description: '📲 Expo - React Native with Expo CLI',
    framework: 'react',
    category: 'mobile'
  },
  {
    name: 'vanilla',
    description: '🟨 Vanilla - Pure JavaScript/TypeScript',
    framework: 'vanilla',
    category: 'web'
  },
  {
    name: 'storybook',
    description: '📚 Storybook - Component documentation',
    framework: 'storybook',
    category: 'docs'
  },
  {
    name: 'workspace',
    description: '🏗️  Multi-framework - Workspace with multiple frameworks',
    framework: 'workspace',
    category: 'workspace'
  }
] as const;

export type TemplateName = typeof AVAILABLE_TEMPLATES[number]['name'];