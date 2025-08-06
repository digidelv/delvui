/**
 * DelvUI CLI - Project Utilities
 */

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import { TemplateConfig } from '../types/templates.js';
import { logger } from './logger.js';

export async function downloadTemplate(
  template: string,
  projectPath: string,
  config: TemplateConfig
): Promise<void> {
  const spinner = ora(`Downloading ${template} template...`).start();
  
  try {
    // For now, we'll create templates locally
    // In production, you might want to download from GitHub or a CDN
    await createTemplateFromLocal(template, projectPath, config);
    spinner.succeed(`Template downloaded successfully`);
  } catch (error) {
    spinner.fail(`Failed to download template`);
    throw error;
  }
}

async function createTemplateFromLocal(
  template: string,
  projectPath: string,
  config: TemplateConfig
): Promise<void> {
  // Create basic project structure based on template
  const templateContent = getTemplateContent(template, config);
  
  for (const [filePath, content] of Object.entries(templateContent.files)) {
    const fullPath = path.join(projectPath, filePath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content);
  }
  
  // Create package.json
  const packageJson = generatePackageJson(config, templateContent);
  await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
}

function getTemplateContent(template: string, config: TemplateConfig) {
  switch (template) {
    case 'react':
      return getReactTemplate(config);
    case 'nextjs':
      return getNextjsTemplate(config);
    case 'vue':
      return getVueTemplate(config);
    case 'angular':
      return getAngularTemplate(config);
    case 'react-native':
      return getReactNativeTemplate(config);
    case 'vanilla':
      return getVanillaTemplate(config);
    case 'storybook':
      return getStorybookTemplate(config);
    default:
      throw new Error(`Unknown template: ${template}`);
  }
}

function getReactTemplate(config: TemplateConfig) {
  const isTypeScript = config.typescript !== false;
  const ext = isTypeScript ? 'tsx' : 'jsx';
  
  return {
    files: {
      [`src/App.${ext}`]: getReactAppContent(config),
      [`src/index.${ext}`]: getReactIndexContent(config),
      'src/components/Button.tsx': getReactButtonContent(),
      'public/index.html': getReactHtmlContent(),
      'README.md': getReactReadmeContent(),
      '.gitignore': getGitignoreContent(),
      ...(config.typescript && { 'tsconfig.json': getTsConfigContent() }),
      ...(config.eslint && { '.eslintrc.js': getEslintConfig() }),
      ...(config.prettier && { '.prettierrc': getPrettierConfig() }),
    }
  };
}

function getNextjsTemplate(config: TemplateConfig) {
  return {
    files: {
      'pages/index.tsx': getNextjsIndexContent(),
      'pages/_app.tsx': getNextjsAppContent(),
      'components/Layout.tsx': getNextjsLayoutContent(),
      'README.md': getNextjsReadmeContent(),
      '.gitignore': getGitignoreContent(),
      'tsconfig.json': getNextjsTsConfigContent(),
      'next.config.js': getNextjsConfigContent(config),
    }
  };
}

function getVueTemplate(config: TemplateConfig) {
  const isVue3 = config.vueVersion !== '2';
  
  return {
    files: {
      'src/App.vue': getVueAppContent(isVue3),
      'src/main.ts': getVueMainContent(isVue3),
      'src/components/HelloWorld.vue': getVueComponentContent(),
      'public/index.html': getVueHtmlContent(),
      'README.md': getVueReadmeContent(),
      '.gitignore': getGitignoreContent(),
      'tsconfig.json': getTsConfigContent(),
      'vite.config.ts': getViteConfigContent(),
    }
  };
}

function getAngularTemplate(config: TemplateConfig) {
  return {
    files: {
      'src/app/app.component.ts': getAngularAppComponentContent(),
      'src/app/app.component.html': getAngularAppTemplateContent(),
      'src/app/app.module.ts': getAngularAppModuleContent(),
      'src/main.ts': getAngularMainContent(),
      'src/index.html': getAngularHtmlContent(),
      'README.md': getAngularReadmeContent(),
      '.gitignore': getGitignoreContent(),
      'tsconfig.json': getAngularTsConfigContent(),
      'angular.json': getAngularJsonContent(),
    }
  };
}

function getReactNativeTemplate(config: TemplateConfig) {
  return {
    files: {
      'App.tsx': getReactNativeAppContent(),
      'src/components/DelvUIButton.tsx': getReactNativeButtonContent(),
      'README.md': getReactNativeReadmeContent(),
      '.gitignore': getReactNativeGitignoreContent(),
      'app.json': getExpoConfigContent(),
      'tsconfig.json': getTsConfigContent(),
    }
  };
}

function getVanillaTemplate(config: TemplateConfig) {
  return {
    files: {
      'src/main.ts': getVanillaMainContent(),
      'src/components/Button.ts': getVanillaButtonContent(),
      'index.html': getVanillaHtmlContent(),
      'README.md': getVanillaReadmeContent(),
      '.gitignore': getGitignoreContent(),
      'tsconfig.json': getTsConfigContent(),
      'vite.config.ts': getVanillaViteConfigContent(),
    }
  };
}

function getStorybookTemplate(config: TemplateConfig) {
  return {
    files: {
      '.storybook/main.js': getStorybookMainContent(),
      '.storybook/preview.js': getStorybookPreviewContent(),
      'stories/Button.stories.ts': getStorybookButtonStoryContent(),
      'README.md': getStorybookReadmeContent(),
      '.gitignore': getGitignoreContent(),
    }
  };
}

function generatePackageJson(config: TemplateConfig, template: any) {
  const basePackage = {
    name: '',
    version: '0.1.0',
    private: true,
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  // Add framework-specific dependencies and scripts
  switch (config.framework) {
    case 'react':
      Object.assign(basePackage.dependencies, {
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        '@delvui/react': '^1.0.0',
        '@delvui/tokens': '^1.0.0',
      });
      Object.assign(basePackage.scripts, {
        'start': 'react-scripts start',
        'build': 'react-scripts build',
        'test': 'react-scripts test',
        'eject': 'react-scripts eject',
      });
      Object.assign(basePackage.devDependencies, {
        'react-scripts': '^5.0.1',
        '@types/react': '^18.2.0',
        '@types/react-dom': '^18.2.0',
      });
      break;

    case 'nextjs':
      Object.assign(basePackage.dependencies, {
        'next': '^14.0.0',
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        '@delvui/react': '^1.0.0',
        '@delvui/tokens': '^1.0.0',
      });
      Object.assign(basePackage.scripts, {
        'dev': 'next dev',
        'build': 'next build',
        'start': 'next start',
        'lint': 'next lint',
      });
      break;

    case 'vue':
      Object.assign(basePackage.dependencies, {
        'vue': config.vueVersion === '2' ? '^2.7.0' : '^3.3.0',
        '@delvui/vue': '^1.0.0',
        '@delvui/tokens': '^1.0.0',
      });
      Object.assign(basePackage.scripts, {
        'dev': 'vite',
        'build': 'vue-tsc && vite build',
        'preview': 'vite preview',
      });
      Object.assign(basePackage.devDependencies, {
        'vite': '^4.4.0',
        '@vitejs/plugin-vue': '^4.3.0',
        'vue-tsc': '^1.8.0',
      });
      break;

    case 'angular':
      Object.assign(basePackage.dependencies, {
        '@angular/animations': '^16.0.0',
        '@angular/common': '^16.0.0',
        '@angular/compiler': '^16.0.0',
        '@angular/core': '^16.0.0',
        '@angular/platform-browser': '^16.0.0',
        '@delvui/angular': '^1.0.0',
        '@delvui/tokens': '^1.0.0',
      });
      Object.assign(basePackage.scripts, {
        'start': 'ng serve',
        'build': 'ng build',
        'test': 'ng test',
        'lint': 'ng lint',
      });
      break;
  }

  return basePackage;
}

// Content generators for different files
function getReactAppContent(config: TemplateConfig): string {
  return `import React from 'react';
import { Button } from '@delvui/react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to DelvUI React App</h1>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </header>
    </div>
  );
}

export default App;`;
}

function getReactIndexContent(config: TemplateConfig): string {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
}

function getReactButtonContent(): string {
  return `import React from 'react';
import { Button as DelvUIButton } from '@delvui/react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <DelvUIButton variant="primary" onClick={onClick}>
      {children}
    </DelvUIButton>
  );
};`;
}

function getReactHtmlContent(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="DelvUI React App" />
    <title>DelvUI React App</title>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>`;
}

function getReactReadmeContent(): string {
  return `# DelvUI React App

This project was created with DelvUI CLI.

## Available Scripts

- \`npm start\` - Runs the app in development mode
- \`npm run build\` - Builds the app for production  
- \`npm test\` - Launches the test runner
- \`npm run eject\` - Ejects from Create React App

## DelvUI Components

This project includes DelvUI React components:

\`\`\`jsx
import { Button, Input, Card } from '@delvui/react';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
\`\`\`

## Learn More

- [DelvUI Documentation](https://delvui.dev)
- [React Documentation](https://reactjs.org)
`;
}

function getGitignoreContent(): string {
  return `# Dependencies
node_modules/
.pnp
.pnp.js

# Production
/build
/dist
*.tgz

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Cache
.cache/
.parcel-cache/
.next/
.nuxt/`;
}

function getTsConfigContent(): string {
  return `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}`;
}

// Add more content generators as needed...
function getNextjsIndexContent(): string {
  return `import { Button } from '@delvui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>DelvUI Next.js App</title>
        <meta name="description" content="Generated with DelvUI CLI" />
      </Head>
      <main>
        <h1>Welcome to DelvUI Next.js!</h1>
        <Button variant="primary">Get Started</Button>
      </main>
    </>
  );
}`;
}

function getNextjsAppContent(): string {
  return `import type { AppProps } from 'next/app';
import { ThemeProvider } from '@delvui/react/providers';
import '@delvui/react/styles';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}`;
}

function getNextjsLayoutContent(): string {
  return `import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header>
        <nav>DelvUI App</nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>Powered by DelvUI</p>
      </footer>
    </div>
  );
}`;
}

function getNextjsReadmeContent(): string {
  return `# DelvUI Next.js App

This is a Next.js project created with DelvUI CLI.

## Getting Started

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## DelvUI Components

\`\`\`jsx
import { Button, Input, Card } from '@delvui/react';

export default function Page() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
\`\`\`
`;
}

function getNextjsTsConfigContent(): string {
  return `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;
}

function getNextjsConfigContent(config: TemplateConfig): string {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;`;
}

// Vue template content generators
function getVueAppContent(isVue3: boolean): string {
  if (isVue3) {
    return `<template>
  <div id="app">
    <header>
      <h1>Welcome to DelvUI Vue App</h1>
      <DelvUIButton variant="primary">Get Started</DelvUIButton>
    </header>
  </div>
</template>

<script setup lang="ts">
import { DelvUIButton } from '@delvui/vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>`;
  } else {
    return `<template>
  <div id="app">
    <header>
      <h1>Welcome to DelvUI Vue 2 App</h1>
      <DelvUIButton variant="primary">Get Started</DelvUIButton>
    </header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DelvUIButton } from '@delvui/vue';

export default Vue.extend({
  name: 'App',
  components: {
    DelvUIButton,
  },
});
</script>`;
  }
}

function getVueMainContent(isVue3: boolean): string {
  if (isVue3) {
    return `import { createApp } from 'vue';
import App from './App.vue';
import DelvUI from '@delvui/vue';

const app = createApp(App);
app.use(DelvUI);
app.mount('#app');`;
  } else {
    return `import Vue from 'vue';
import App from './App.vue';
import DelvUI from '@delvui/vue';

Vue.use(DelvUI);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');`;
  }
}

function getVueComponentContent(): string {
  return `<template>
  <div class="hello-world">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Hello DelvUI!',
  description: 'You are using DelvUI with Vue.js',
});
</script>`;
}

function getVueHtmlContent(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DelvUI Vue App</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
</body>
</html>`;
}

function getVueReadmeContent(): string {
  return `# DelvUI Vue App

This project was created with DelvUI CLI.

## Project Setup

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

### Production Build

\`\`\`bash
npm run build
\`\`\`

## DelvUI Components

\`\`\`vue
<template>
  <DelvUICard>
    <DelvUIInput placeholder="Enter text" />
    <DelvUIButton variant="primary">Submit</DelvUIButton>
  </DelvUICard>
</template>

<script setup>
import { DelvUIButton, DelvUIInput, DelvUICard } from '@delvui/vue';
</script>
\`\`\`
`;
}

function getViteConfigContent(): string {
  return `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});`;
}

// Placeholder implementations for other templates...
function getAngularAppComponentContent(): string { return `// Angular app component content`; }
function getAngularAppTemplateContent(): string { return `<!-- Angular app template -->`; }
function getAngularAppModuleContent(): string { return `// Angular app module content`; }
function getAngularMainContent(): string { return `// Angular main content`; }
function getAngularHtmlContent(): string { return `<!-- Angular HTML content -->`; }
function getAngularReadmeContent(): string { return `# DelvUI Angular App`; }
function getAngularTsConfigContent(): string { return `{}`; }
function getAngularJsonContent(): string { return `{}`; }

function getReactNativeAppContent(): string { return `// React Native app content`; }
function getReactNativeButtonContent(): string { return `// React Native button content`; }
function getReactNativeReadmeContent(): string { return `# DelvUI React Native App`; }
function getReactNativeGitignoreContent(): string { return getGitignoreContent(); }
function getExpoConfigContent(): string { return `{}`; }

function getVanillaMainContent(): string { return `// Vanilla TypeScript main`; }
function getVanillaButtonContent(): string { return `// Vanilla button component`; }
function getVanillaHtmlContent(): string { return `<!DOCTYPE html><html><head><title>DelvUI Vanilla App</title></head><body><div id="app"></div></body></html>`; }
function getVanillaReadmeContent(): string { return `# DelvUI Vanilla App`; }
function getVanillaViteConfigContent(): string { return `import { defineConfig } from 'vite'; export default defineConfig({});`; }

function getStorybookMainContent(): string { return `// Storybook main config`; }
function getStorybookPreviewContent(): string { return `// Storybook preview config`; }
function getStorybookButtonStoryContent(): string { return `// Button story`; }
function getStorybookReadmeContent(): string { return `# DelvUI Storybook`; }

function getEslintConfig(): string { return `module.exports = {};`; }
function getPrettierConfig(): string { return `{}`; }

export async function installDependencies(
  projectPath: string,
  packageManager: 'npm' | 'yarn' | 'pnpm'
): Promise<void> {
  const spinner = ora(`Installing dependencies with ${packageManager}...`).start();
  
  try {
    const command = packageManager === 'yarn' ? 'yarn install' : 
                   packageManager === 'pnpm' ? 'pnpm install' : 
                   'npm install';
                   
    execSync(command, { 
      cwd: projectPath, 
      stdio: 'ignore' 
    });
    
    spinner.succeed('Dependencies installed successfully');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    logger.warn('You can install dependencies manually by running:');
    logger.info(`  cd ${path.basename(projectPath)}`);
    logger.info(`  ${packageManager === 'yarn' ? 'yarn' : packageManager} install`);
  }
}

export async function initializeGit(projectPath: string): Promise<void> {
  const spinner = ora('Initializing Git repository...').start();
  
  try {
    execSync('git init', { cwd: projectPath, stdio: 'ignore' });
    execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
    execSync('git commit -m "Initial commit"', { cwd: projectPath, stdio: 'ignore' });
    
    spinner.succeed('Git repository initialized');
  } catch (error) {
    spinner.fail('Failed to initialize Git repository');
    logger.warn('You can initialize Git manually by running:');
    logger.info('  git init');
    logger.info('  git add .');
    logger.info('  git commit -m "Initial commit"');
  }
}