# DelvUI Design System

🚀 **Enterprise-grade design system with atomic design architecture**

DelvUI is a comprehensive, multi-framework design system built with atomic design principles. It provides consistent, accessible, and beautiful components for React, Vue, Angular, React Native, and Vanilla JavaScript.

[![npm version](https://badge.fury.io/js/%40delvui%2Freact.svg)](https://www.npmjs.com/package/@delvui/react)
[![Build Status](https://github.com/digidelv/delvui/workflows/CI/badge.svg)](https://github.com/digidelv/delvui/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- **🧬 Atomic Design**: Components organized as Atoms → Molecules → Organisms → Templates → Pages
- **🎨 Design Tokens**: Consistent colors, typography, spacing, and motion across all platforms
- **⚡ Multi-Framework**: React, Vue, Angular, React Native, and Vanilla JavaScript support
- **♿ Accessibility**: WCAG 2.1 compliant with full screen reader and keyboard support
- **📱 Responsive**: Mobile-first approach with flexible breakpoint system
- **🔧 CLI Tools**: Project scaffolding, component generation, and boilerplate creation
- **📚 Documentation**: Comprehensive Storybook documentation and interactive examples
- **🏗️ Builder System**: Drag-and-drop visual component builder (coming soon)
- **🎭 Theming**: Powerful theming system with dark mode support
- **📦 Tree-shakable**: Optimized bundle sizes with ES modules

## 🚀 Quick Start

### Install DelvUI CLI

```bash
npm install -g @delvui/cli
```

### Create a new project

```bash
# Interactive project creation
delv init my-app

# Or with specific template
delv init my-app --template react
delv init my-app --template nextjs
delv init my-app --template vue
delv init my-app --template angular
```

### Add to existing project

```bash
# React
npm install @delvui/react @delvui/tokens

# Vue
npm install @delvui/vue @delvui/tokens

# Angular
npm install @delvui/angular @delvui/tokens

# React Native
npm install @delvui/react-native @delvui/tokens
```

## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| `@delvui/core` | Core types and atomic design definitions | [![npm](https://img.shields.io/npm/v/@delvui/core.svg)](https://www.npmjs.com/package/@delvui/core) |
| `@delvui/tokens` | Design tokens (colors, typography, spacing) | [![npm](https://img.shields.io/npm/v/@delvui/tokens.svg)](https://www.npmjs.com/package/@delvui/tokens) |
| `@delvui/react` | React component library | [![npm](https://img.shields.io/npm/v/@delvui/react.svg)](https://www.npmjs.com/package/@delvui/react) |
| `@delvui/vue` | Vue component library | [![npm](https://img.shields.io/npm/v/@delvui/vue.svg)](https://www.npmjs.com/package/@delvui/vue) |
| `@delvui/angular` | Angular component library | [![npm](https://img.shields.io/npm/v/@delvui/angular.svg)](https://www.npmjs.com/package/@delvui/angular) |
| `@delvui/react-native` | React Native component library | [![npm](https://img.shields.io/npm/v/@delvui/react-native.svg)](https://www.npmjs.com/package/@delvui/react-native) |
| `@delvui/vanilla` | Vanilla JavaScript components | [![npm](https://img.shields.io/npm/v/@delvui/vanilla.svg)](https://www.npmjs.com/package/@delvui/vanilla) |
| `@delvui/cli` | Command line tools | [![npm](https://img.shields.io/npm/v/@delvui/cli.svg)](https://www.npmjs.com/package/@delvui/cli) |

## 🎯 Usage Examples

### React

```jsx
import { Button, Input, Card } from '@delvui/react';
import { ThemeProvider } from '@delvui/react/providers';

function App() {
  return (
    <ThemeProvider theme="light">
      <Card>
        <Input placeholder="Enter your name" />
        <Button variant="primary" size="md">
          Submit
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

### Vue

```vue
<template>
  <DelvUIProvider theme="light">
    <dv-card>
      <dv-input placeholder="Enter your name" />
      <dv-button variant="primary" size="md">
        Submit
      </dv-button>
    </dv-card>
  </DelvUIProvider>
</template>

<script setup>
import { DelvUIProvider, DvCard, DvInput, DvButton } from '@delvui/vue';
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { DelvUIModule } from '@delvui/angular';

@Component({
  selector: 'app-root',
  template: `
    <dv-theme-provider theme="light">
      <dv-card>
        <dv-input placeholder="Enter your name"></dv-input>
        <dv-button variant="primary" size="md">
          Submit
        </dv-button>
      </dv-card>
    </dv-theme-provider>
  `,
  imports: [DelvUIModule]
})
export class AppComponent {}
```

## 🧬 Atomic Design Structure

DelvUI follows atomic design principles:

### Atoms
Basic building blocks - buttons, inputs, labels, icons
```jsx
import { Button, Input, Icon, Badge } from '@delvui/react/atoms';
```

### Molecules  
Simple combinations of atoms - search box, form field, card header
```jsx
import { SearchBox, FormField, UserProfile } from '@delvui/react/molecules';
```

### Organisms
Complex components - headers, forms, data tables, navigation
```jsx
import { Header, ContactForm, DataTable } from '@delvui/react/organisms';
```

### Templates
Page-level layouts - dashboard template, landing page template
```jsx
import { DashboardTemplate, LandingTemplate } from '@delvui/react/templates';
```

### Pages
Complete page implementations
```jsx
import { HomePage, LoginPage, DashboardPage } from '@delvui/react/pages';
```

## 🛠️ CLI Commands

```bash
# Create new project
delv init <project-name>

# Generate components
delv generate atom Button
delv generate molecule SearchBox  
delv generate organism Header

# Add components to existing project
delv add Button Input Card

# Update DelvUI packages
delv update

# Build components
delv build

# Start development server
delv serve

# List available components
delv list

# Show system info
delv info

# Check setup health
delv doctor
```

## 🎨 Customization

### Design Tokens

```javascript
// Custom theme
import { createTheme } from '@delvui/tokens';

const customTheme = createTheme({
  colors: {
    primary: {
      500: '#your-brand-color',
    },
  },
  typography: {
    fontFamily: 'Your Custom Font',
  },
  spacing: {
    unit: 8, // 8px base unit
  },
});
```

### CSS Variables

```css
:root {
  --dv-color-primary-500: #your-color;
  --dv-font-family-base: 'Your Font';
  --dv-spacing-unit: 8px;
}
```

## 📚 Documentation

- **[Storybook](https://digidelv.github.io/delvui/storybook)** - Interactive component documentation
- **[Design System Guide](https://delvui.dev/docs)** - Comprehensive usage guide  
- **[API Reference](https://delvui.dev/api)** - Complete API documentation
- **[Migration Guide](https://delvui.dev/migration)** - Upgrade instructions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development

```bash
# Clone the repository
git clone https://github.com/digidelv/delvui.git
cd delvui

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Build all packages
npm run build
```

### Package Scripts

```bash
# Development
npm run dev                    # Start development mode
npm run storybook             # Launch Storybook
npm run showcase              # Launch showcase app

# Building
npm run build                 # Build all packages
npm run build:tokens          # Build design tokens
npm run clean                 # Clean build artifacts

# Testing & Quality
npm test                      # Run all tests
npm run lint                  # Lint all code
npm run type-check           # TypeScript type checking

# Publishing
npm run changeset            # Create changeset
npm run version-packages     # Version packages
npm run release              # Publish to npm
```

## 🔄 Versioning

DelvUI uses [Changesets](https://github.com/changesets/changesets) for version management:

1. Make your changes
2. Run `npm run changeset` to document changes
3. Commit changeset files with your PR
4. Versions are automatically managed on merge to main

## 📄 License

MIT © [Your Company](https://github.com/digidelv)

## 🙋‍♂️ Support

- **Documentation**: [https://delvui.dev](https://delvui.dev)
- **Issues**: [GitHub Issues](https://github.com/digidelv/delvui/issues)  
- **Discord**: [Join our community](https://discord.gg/delvui)
- **Twitter**: [@delvui](https://twitter.com/delvui)

---

<p align="center">
  <strong>Built with ❤️ by the DelvUI team</strong>
</p>