/**
 * DelvUI CLI - Generate Command
 * Generate atomic design components
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';

interface GenerateOptions {
  framework?: string;
  output?: string;
  style?: string;
  tests?: boolean;
  stories?: boolean;
  docs?: boolean;
  atomicLevel?: string;
}

export async function generateCommand(
  type: 'atom' | 'molecule' | 'organism' | 'template' | 'page',
  name: string,
  options: GenerateOptions
): Promise<void> {
  try {
    logger.info(`Generating ${type}: ${chalk.cyan(name)}`);

    const framework = options.framework || 'react';
    const outputDir = options.output || `src/${type}s/${name}`;
    
    // Validate atomic design level
    if (options.atomicLevel && options.atomicLevel !== type) {
      logger.warn(`Atomic level mismatch: generating ${type} but specified level ${options.atomicLevel}`);
    }

    // Create component directory
    await fs.ensureDir(outputDir);

    // Generate component files based on framework
    switch (framework) {
      case 'react':
        await generateReactComponent(type, name, outputDir, options);
        break;
      case 'vue':
        await generateVueComponent(type, name, outputDir, options);
        break;
      case 'angular':
        await generateAngularComponent(type, name, outputDir, options);
        break;
      default:
        throw new Error(`Unsupported framework: ${framework}`);
    }

    // Generate additional files
    if (options.tests) {
      await generateTestFile(type, name, outputDir, framework);
    }

    if (options.stories) {
      await generateStoryFile(type, name, outputDir, framework);
    }

    if (options.docs) {
      await generateDocsFile(type, name, outputDir);
    }

    logger.success(`${type} component "${name}" generated successfully!`);
    logger.info(`Location: ${chalk.gray(outputDir)}`);

  } catch (error) {
    logger.error('Failed to generate component:', error);
    process.exit(1);
  }
}

async function generateReactComponent(
  type: string,
  name: string,
  outputDir: string,
  options: GenerateOptions
): Promise<void> {
  const componentContent = getReactComponentTemplate(type, name, options);
  const indexContent = getReactIndexTemplate(name);
  const stylesContent = getStylesTemplate(options.style || 'css-modules');

  await fs.writeFile(path.join(outputDir, `${name}.tsx`), componentContent);
  await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
  
  const styleExt = options.style === 'sass' ? 'scss' : 'css';
  await fs.writeFile(path.join(outputDir, `${name}.module.${styleExt}`), stylesContent);
}

async function generateVueComponent(
  type: string,
  name: string,
  outputDir: string,
  options: GenerateOptions
): Promise<void> {
  const componentContent = getVueComponentTemplate(type, name, options);
  const indexContent = getVueIndexTemplate(name);

  await fs.writeFile(path.join(outputDir, `${name}.vue`), componentContent);
  await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
}

async function generateAngularComponent(
  type: string,
  name: string,
  outputDir: string,
  options: GenerateOptions
): Promise<void> {
  const kebabName = name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
  
  const componentContent = getAngularComponentTemplate(type, name, options);
  const templateContent = getAngularTemplateTemplate(type, name);
  const styleContent = getAngularStyleTemplate();

  await fs.writeFile(path.join(outputDir, `${kebabName}.component.ts`), componentContent);
  await fs.writeFile(path.join(outputDir, `${kebabName}.component.html`), templateContent);
  await fs.writeFile(path.join(outputDir, `${kebabName}.component.scss`), styleContent);
}

async function generateTestFile(
  type: string,
  name: string,
  outputDir: string,
  framework: string
): Promise<void> {
  let testContent = '';
  let testExt = '';

  switch (framework) {
    case 'react':
      testContent = getReactTestTemplate(type, name);
      testExt = 'test.tsx';
      break;
    case 'vue':
      testContent = getVueTestTemplate(type, name);
      testExt = 'test.ts';
      break;
    case 'angular':
      testContent = getAngularTestTemplate(type, name);
      testExt = 'component.spec.ts';
      break;
  }

  if (testContent) {
    await fs.writeFile(path.join(outputDir, `${name}.${testExt}`), testContent);
  }
}

async function generateStoryFile(
  type: string,
  name: string,
  outputDir: string,
  framework: string
): Promise<void> {
  let storyContent = '';

  switch (framework) {
    case 'react':
      storyContent = getReactStoryTemplate(type, name);
      break;
    case 'vue':
      storyContent = getVueStoryTemplate(type, name);
      break;
    case 'angular':
      storyContent = getAngularStoryTemplate(type, name);
      break;
  }

  if (storyContent) {
    await fs.writeFile(path.join(outputDir, `${name}.stories.ts`), storyContent);
  }
}

async function generateDocsFile(
  type: string,
  name: string,
  outputDir: string
): Promise<void> {
  const docsContent = getDocsTemplate(type, name);
  await fs.writeFile(path.join(outputDir, 'README.md'), docsContent);
}

// Template generators
function getReactComponentTemplate(type: string, name: string, options: GenerateOptions): string {
  const atomicMetadata = getAtomicMetadata(type, name);
  
  return `/**
 * DelvUI ${name} ${type}
 * Generated with DelvUI CLI
 */

import React from 'react';
import clsx from 'clsx';
import { ${type === 'atom' ? 'AtomProps' : type === 'molecule' ? 'MoleculeProps' : 'OrganismProps'} } from '@delvui/core';
import styles from './${name}.module.css';

export interface ${name}Props {
  /** Custom className */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Children elements */
  children?: React.ReactNode;
}

// Atomic Design Metadata
export const ${name}${type.charAt(0).toUpperCase() + type.slice(1)}: ${type === 'atom' ? 'AtomProps' : type === 'molecule' ? 'MoleculeProps' : 'OrganismProps'} = ${atomicMetadata};

/**
 * ${name} component
 * 
 * @example
 * \`\`\`tsx
 * <${name}>
 *   Content goes here
 * </${name}>
 * \`\`\`
 */
export const ${name}: React.FC<${name}Props> = ({
  className,
  testId,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(styles.${name.toLowerCase()}, className)}
      data-atomic-level="${type}"
      data-atomic-type="${name.toLowerCase()}"
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  );
};

${name}.displayName = '${name}';

export default ${name};`;
}

function getReactIndexTemplate(name: string): string {
  return `export { ${name} } from './${name}';
export type { ${name}Props } from './${name}';`;
}

function getStylesTemplate(styleType: string): string {
  switch (styleType) {
    case 'css-modules':
      return `.component {
  /* Add your styles here */
}`;
    case 'sass':
      return `$primary-color: #007bff;

.component {
  /* Add your SCSS styles here */
}`;
    default:
      return `/* Add your styles here */`;
  }
}

function getVueComponentTemplate(type: string, name: string, options: GenerateOptions): string {
  return `<template>
  <div 
    class="${name.toLowerCase()}"
    :data-atomic-level="${type}"
    :data-atomic-type="${name.toLowerCase()}"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * DelvUI ${name} ${type}
 * Generated with DelvUI CLI
 */

interface ${name}Props {
  className?: string;
}

withDefaults(defineProps<${name}Props>(), {
  className: '',
});
</script>

<style scoped>
.${name.toLowerCase()} {
  /* Add your styles here */
}
</style>`;
}

function getVueIndexTemplate(name: string): string {
  return `export { default as ${name} } from './${name}.vue';`;
}

function getAngularComponentTemplate(type: string, name: string, options: GenerateOptions): string {
  const kebabName = name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
  
  return `/**
 * DelvUI ${name} ${type}
 * Generated with DelvUI CLI
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'dv-${kebabName}',
  templateUrl: './${kebabName}.component.html',
  styleUrls: ['./${kebabName}.component.scss'],
})
export class ${name}Component {
  @Input() className?: string;
  
  constructor() {}
}`;
}

function getAngularTemplateTemplate(type: string, name: string): string {
  return `<div 
  class="${name.toLowerCase()}"
  [attr.data-atomic-level]="${type}"
  [attr.data-atomic-type]="${name.toLowerCase()}"
  [class]="className"
>
  <ng-content></ng-content>
</div>`;
}

function getAngularStyleTemplate(): string {
  return `:host {
  display: block;
}

.component {
  /* Add your styles here */
}`;
}

function getReactTestTemplate(type: string, name: string): string {
  return `/**
 * ${name} Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name}>Test content</${name}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<${name} className="custom-class">Test</${name}>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('custom-class');
  });

  it('has correct atomic design attributes', () => {
    render(<${name} testId="test-${name.toLowerCase()}">Test</${name}>);
    const element = screen.getByTestId('test-${name.toLowerCase()}');
    expect(element).toHaveAttribute('data-atomic-level', '${type}');
    expect(element).toHaveAttribute('data-atomic-type', '${name.toLowerCase()}');
  });
});`;
}

function getVueTestTemplate(type: string, name: string): string {
  return `/**
 * ${name} Component Tests
 */

import { mount } from '@vue/test-utils';
import ${name} from './${name}.vue';

describe('${name}', () => {
  it('renders properly', () => {
    const wrapper = mount(${name}, {
      slots: {
        default: 'Test content'
      }
    });
    
    expect(wrapper.text()).toContain('Test content');
  });

  it('has correct atomic design attributes', () => {
    const wrapper = mount(${name});
    const element = wrapper.find('.${name.toLowerCase()}');
    
    expect(element.attributes('data-atomic-level')).toBe('${type}');
    expect(element.attributes('data-atomic-type')).toBe('${name.toLowerCase()}');
  });
});`;
}

function getAngularTestTemplate(type: string, name: string): string {
  return `/**
 * ${name} Component Tests
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${name}Component } from './${name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}.component';

describe('${name}Component', () => {
  let component: ${name}Component;
  let fixture: ComponentFixture<${name}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${name}Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(${name}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});`;
}

function getReactStoryTemplate(type: string, name: string): string {
  return `/**
 * ${name} Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: '${type.charAt(0).toUpperCase() + type.slice(1)}s/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ${name}',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-style',
    children: 'Custom ${name}',
  },
};`;
}

function getVueStoryTemplate(type: string, name: string): string {
  return `/**
 * ${name} Stories
 */

import type { Meta, StoryObj } from '@storybook/vue3';
import ${name} from './${name}.vue';

const meta: Meta<typeof ${name}> = {
  title: '${type.charAt(0).toUpperCase() + type.slice(1)}s/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { ${name} },
    setup() {
      return { args };
    },
    template: '<${name} v-bind="args">Default ${name}</${name}>',
  }),
};`;
}

function getAngularStoryTemplate(type: string, name: string): string {
  return `/**
 * ${name} Stories
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { ${name}Component } from './${name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}.component';

const meta: Meta<${name}Component> = {
  title: '${type.charAt(0).toUpperCase() + type.slice(1)}s/${name}',
  component: ${name}Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<${name}Component>;

export const Default: Story = {
  args: {},
};`;
}

function getDocsTemplate(type: string, name: string): string {
  return `# ${name} ${type.charAt(0).toUpperCase() + type.slice(1)}

Generated with DelvUI CLI.

## Description

[Add component description here]

## Usage

### React

\`\`\`jsx
import { ${name} } from './components/${name}';

function MyComponent() {
  return (
    <${name}>
      Content goes here
    </${name}>
  );
}
\`\`\`

### Vue

\`\`\`vue
<template>
  <${name}>
    Content goes here
  </${name}>
</template>

<script setup>
import { ${name} } from './components/${name}';
</script>
\`\`\`

### Angular

\`\`\`html
<dv-${name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}>
  Content goes here
</dv-${name.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}>
\`\`\`

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Child elements |

## Atomic Design

- **Level**: ${type}
- **Category**: [Add category]
- **Dependencies**: [List dependencies]

## Examples

[Add more examples here]
`;
}

function getAtomicMetadata(type: string, name: string): string {
  const baseMetadata = {
    id: name.toLowerCase(),
    name: name,
    level: type,
    version: '1.0.0',
    description: `${name} ${type} component`,
    dependencies: [],
    complexity: type === 'atom' ? 1 : type === 'molecule' ? 2 : 4,
  };

  switch (type) {
    case 'atom':
      return JSON.stringify({
        ...baseMetadata,
        category: 'display', // Default category
        baseElement: 'div',
        variants: [],
        states: []
      }, null, 2);
    
    case 'molecule':
      return JSON.stringify({
        ...baseMetadata,
        atoms: [],
        composition: {
          structure: 'grouped',
          layout: 'horizontal'
        }
      }, null, 2);
    
    case 'organism':
      return JSON.stringify({
        ...baseMetadata,
        molecules: [],
        atoms: [],
        functionality: {
          primary: 'display',
          secondary: [],
          dataFlow: 'static',
          userActions: []
        }
      }, null, 2);
    
    default:
      return JSON.stringify(baseMetadata, null, 2);
  }
}