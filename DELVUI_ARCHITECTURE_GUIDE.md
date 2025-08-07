# DelvUI Architecture & Usage Guide

## 🏗️ Architecture Overview

DelvUI is a comprehensive design system that provides consistent UI components across multiple frameworks using atomic design principles.

### Package Structure

```
@delvui/
├── cli          - Project scaffolding and component generation
├── core         - Atomic design types and utilities  
├── tokens       - Design tokens (colors, typography, spacing)
├── react        - React components
├── vue          - Vue components
├── angular      - Angular components
├── react-native - React Native components
└── vanilla      - Vanilla JavaScript components
```

## 🔄 How Components Work Together

### Foundation Layer
- **`@delvui/tokens`** - Provides design system tokens
- **`@delvui/core`** - Defines atomic design interfaces and types

### Framework Layer
- Each framework package implements components using core types and tokens
- Maintains consistency across different technology stacks

### Developer Tools
- **`@delvui/cli`** - Automates project setup and component generation

## 📦 Package Details

### CLI Package (`@delvui/cli`)

**Installation:**
```bash
npm install -g @delvui/cli
```

**Commands:**
```bash
# Create new project
delv init my-project --template react
delvui create my-app --template vue

# Generate components
delv generate atom Button --framework react
delv g molecule Card --framework vue --tests --stories

# Add existing components
delv add Button Icon Spinner --framework angular

# List available components
delv list --framework react
delv ls --category form

# Utilities
delv info        # Show system information
delv doctor      # Health check
delv serve       # Start dev server
delv build       # Build components
```

**Supported Templates:**
- `react` - React with TypeScript
- `vue` - Vue 3 with TypeScript
- `angular` - Angular with TypeScript
- `react-native` - React Native with TypeScript
- `vanilla` - Vanilla JavaScript/TypeScript

### Tokens Package (`@delvui/tokens`)

**Usage:**
```typescript
import { colors, typography, spacing } from '@delvui/tokens';

// Brand colors
const primary = colors.brand[500];
const secondary = colors.neutral[600];

// Semantic colors  
const textColor = colors.semantic.text.primary;
const successColor = colors.semantic.success[500];

// Typography
const fontSize = typography.fontSize.lg;
const fontFamily = typography.fontFamily.sans;

// Spacing
const padding = spacing[4]; // 1rem
const margin = spacing[8];  // 2rem
```

**Available Token Categories:**
- **Colors**: Brand, neutral, semantic (success, warning, error, info), extended palette
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Utilities**: Color manipulation functions

### Core Package (`@delvui/core`)

**Purpose:** Provides TypeScript interfaces and types for atomic design components.

**Key Interfaces:**
```typescript
import { AtomProps, AtomicComponent } from '@delvui/core';

// Define component metadata
export const ButtonAtom: AtomProps = {
  id: 'button',
  name: 'Button', 
  level: 'atom',
  category: 'form',
  complexity: 1,
  dependencies: [],
  baseElement: 'button',
  variants: [...],
  states: [...],
  accessibility: {...}
};
```

**Atomic Design Levels:**
- **Atoms**: Basic building blocks (Button, Input, Icon)
- **Molecules**: Simple component groups (SearchBox, Navigation)  
- **Organisms**: Complex component sections (Header, ProductGrid)
- **Templates**: Page layouts
- **Pages**: Specific page instances

### Framework Packages

Each framework package provides components that:
- Use `@delvui/tokens` for consistent styling
- Implement `@delvui/core` interfaces for type safety
- Include atomic design metadata for CLI generation
- Support framework-specific optimizations

**React Example:**
```typescript
import { Button } from '@delvui/react';
import { colors } from '@delvui/tokens';

// Component with design tokens
<Button 
  variant="primary" 
  size="md"
  onClick={handleClick}
>
  Click me
</Button>
```

**Vue Example:**
```vue
<template>
  <Button variant="primary" size="md" @click="handleClick">
    Click me
  </Button>
</template>

<script setup>
import { Button } from '@delvui/vue';
</script>
```

## 🚀 Complete Workflow

### 1. Install CLI
```bash
npm install -g @delvui/cli
```

### 2. Create New Project
```bash
# React project
delv init my-react-app --template react

# Vue project  
delv init my-vue-app --template vue

# Angular project
delv init my-angular-app --template angular
```

### 3. Navigate and Install
```bash
cd my-react-app
npm install
```

### 4. Generate Components
```bash
# Generate a new Button atom
delv generate atom Button --framework react --tests --stories

# Generate a Card molecule
delv generate molecule Card --framework react --tests
```

### 5. Add Existing Components
```bash
# Add pre-built components
delv add Icon Spinner Modal --framework react
```

### 6. Start Development
```bash
# Start dev server
npm run dev
# or
delv serve
```

## 🎨 Component Structure

Each generated component includes:

```
Button/
├── Button.tsx           # Main component
├── Button.module.css    # Styles
├── Button.test.tsx      # Tests (if --tests)
├── Button.stories.tsx   # Storybook (if --stories)  
└── index.ts            # Exports
```

## 🏷️ Design Tokens Integration

Components automatically use design tokens:

```typescript
// Component uses tokens internally
const Button = ({ variant = 'primary' }) => {
  const backgroundColor = variant === 'primary' 
    ? colors.brand[500]    // From @delvui/tokens
    : colors.neutral[100];
    
  return <button style={{ backgroundColor }}>...</button>;
};
```

## 🔧 Customization

### Override Tokens
```typescript
// Create custom token file
export const customTokens = {
  ...tokens,
  colors: {
    ...tokens.colors,
    brand: {
      ...tokens.colors.brand,
      500: '#your-custom-color'
    }
  }
};
```

### Extend Components
```typescript
// Extend existing components
import { Button as DelvUIButton } from '@delvui/react';

export const CustomButton = ({ customProp, ...props }) => {
  return <DelvUIButton {...props} className="custom-button" />;
};
```

## 📚 Available Packages

All packages are published to npm:

- `@delvui/cli` - CLI tools
- `@delvui/core` - Core types
- `@delvui/tokens` - Design tokens  
- `@delvui/react` - React components
- `@delvui/vue` - Vue components
- `@delvui/angular` - Angular components
- `@delvui/react-native` - React Native components
- `@delvui/vanilla` - Vanilla JS components

## 🤝 Contributing

1. Install dependencies: `npm install`
2. Build packages: `npm run build`
3. Run tests: `npm test`
4. Publish: `npm run publish:manual --otp=YOUR_CODE`

## 📖 Resources

- **Repository**: https://github.com/digidelv/delvui
- **NPM**: https://npmjs.com/~digidelve  
- **Issues**: https://github.com/digidelv/delvui/issues

---

*Generated with DelvUI v1.0.0*