/**
 * DelvUI Button Stories
 * Comprehensive Storybook documentation for Button component
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button.simple';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible, accessible button component following atomic design principles. Supports multiple variants, sizes, states, and comprehensive accessibility features.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: 'select', 
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button'
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'rounded', 'pill', 'circle'],
      description: 'Shape of the button'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button'
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations'
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
};

// Semantic variants
export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger'
  }
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success'
  }
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: 'warning'
  }
};

export const Info: Story = {
  args: {
    children: 'Info Button',
    variant: 'info'
  }
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  )
};

// States
export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
    variant: 'primary'
  }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    variant: 'primary'
  }
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
    variant: 'primary'
  }
};

// Icon buttons - simplified for demo
export const WithIcon: Story = {
  args: {
    children: '🎯 Add Item',
    variant: 'primary'
  }
};

// Shapes
export const AllShapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button shape="rectangle">Rectangle</Button>
      <Button shape="rounded">Rounded</Button>
      <Button shape="pill">Pill Shape</Button>
      <Button shape="circle">❤️</Button>
    </div>
  )
};

// Interactive examples
export const InteractiveExample: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [count, setCount] = React.useState(0);

    const handleClick = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCount(c => c + 1);
      }, 2000);
    };

    return (
      <div className="space-y-4">
        <Button 
          variant="primary"
          loading={loading}
          onClick={handleClick}
        >
          {loading ? 'Processing...' : `Clicked ${count} times`}
        </Button>
        
        <div className="text-sm text-gray-500">
          Click the button to see the loading state
        </div>
      </div>
    );
  }
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'].map(variant => (
        <Button key={variant} variant={variant as any}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  )
};

// Form integration
export const FormIntegration: Story = {
  render: () => (
    <form className="space-y-4 p-6 border rounded-lg max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input 
          type="email" 
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input 
          type="password" 
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your password"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" variant="primary" fullWidth>
          Sign In
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
};

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Accessibility Features</h3>
      
      <div className="space-y-2">
        <Button 
          variant="primary"
          aria-label="Save document with keyboard shortcut Ctrl+S"
          title="Save (Ctrl+S)"
        >
          Save
        </Button>
        
        <Button 
          variant="danger"
          aria-describedby="delete-warning"
        >
          Delete
        </Button>
        <div id="delete-warning" className="text-sm text-red-600">
          This action cannot be undone
        </div>
        
        <Button 
          variant="outline"
          disabled
          aria-disabled="true"
          title="Feature coming soon"
        >
          Premium Feature
        </Button>
      </div>
      
      <div className="text-sm text-gray-600 space-y-1">
        <p>• All buttons have proper focus indicators</p>
        <p>• Screen reader compatible with ARIA labels</p>
        <p>• Keyboard navigation support (Tab, Enter, Space)</p>
        <p>• High contrast mode support</p>
        <p>• Reduced motion support for animations</p>
      </div>
    </div>
  )
};