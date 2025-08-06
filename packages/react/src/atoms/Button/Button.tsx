/**
 * DelVui React - Button Atom
 * A flexible, accessible button component following atomic design principles
 */

import React, { forwardRef } from 'react';
import { AtomProps } from '@delvui/core';
import clsx from 'clsx';
import { useDelVuiTheme } from '../../providers';
import { Spinner } from '../Spinner/Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
  
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Loading state */
  loading?: boolean;
  
  /** Icon element to display */
  icon?: React.ReactNode;
  
  /** Position of the icon */
  iconPosition?: 'left' | 'right';
  
  /** Whether button should take full width */
  fullWidth?: boolean;
  
  /** Button shape */
  shape?: 'default' | 'round' | 'circle';
  
  /** Custom className */
  className?: string;
  
  /** Animation type */
  animation?: 'none' | 'scale' | 'bounce' | 'pulse';
  
  /** Test ID for testing */
  testId?: string;
}

// Atomic Design Metadata
export const ButtonAtom: AtomProps = {
  id: 'button',
  name: 'Button',
  level: 'atom',
  category: 'form',
  complexity: 1,
  dependencies: [],
  baseElement: 'button',
  version: '1.0.0',
  description: 'A flexible, accessible button component for user interactions',
  tags: ['interactive', 'clickable', 'form-control'],
  
  variants: [
    {
      name: 'primary',
      description: 'Main call-to-action button',
      props: { variant: 'primary', size: 'md' },
      preview: '<Button variant="primary">Primary Button</Button>'
    },
    {
      name: 'secondary', 
      description: 'Secondary action button',
      props: { variant: 'secondary', size: 'md' },
      preview: '<Button variant="secondary">Secondary Button</Button>'
    },
    {
      name: 'outline',
      description: 'Outlined button for subtle actions',
      props: { variant: 'outline', size: 'md' },
      preview: '<Button variant="outline">Outline Button</Button>'
    },
    {
      name: 'loading',
      description: 'Button in loading state',
      props: { loading: true, variant: 'primary' },
      preview: '<Button loading variant="primary">Loading...</Button>'
    }
  ],
  
  states: [
    {
      name: 'default',
      description: 'Default button state',
      props: { variant: 'primary', size: 'md' }
    },
    {
      name: 'hover',
      description: 'Hovered button state', 
      props: { variant: 'primary', size: 'md' }
    },
    {
      name: 'active',
      description: 'Active/pressed button state',
      props: { variant: 'primary', size: 'md' }
    },
    {
      name: 'disabled',
      description: 'Disabled button state',
      props: { disabled: true, variant: 'primary', size: 'md' }
    },
    {
      name: 'loading',
      description: 'Loading button state',
      props: { loading: true, variant: 'primary', size: 'md' }
    }
  ],
  
  accessibility: {
    ariaLabels: ['aria-label', 'aria-labelledby', 'aria-describedby'],
    roles: ['button', 'menuitem', 'tab'],
    keyboardNavigation: true,
    screenReaderSupport: true,
    colorContrastRatio: 4.5
  },
  
  responsive: {
    breakpoints: ['sm', 'md', 'lg', 'xl'],
    adaptiveProps: {
      size: { sm: 'sm', md: 'md', lg: 'lg' },
      fullWidth: { sm: true, md: false }
    },
    mobileFirst: true
  }
};

/**
 * Button component for user interactions
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * <Button variant="outline" icon={<Icon name="plus" />} iconPosition="left">
 *   Add Item
 * </Button>
 * 
 * <Button loading disabled>
 *   Processing...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md', 
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  shape = 'default',
  className,
  animation = 'scale',
  disabled,
  testId,
  type = 'button',
  ...props
}, ref) => {
  const theme = useDelVuiTheme();
  
  // Base classes
  const baseClasses = [
    // Core styling
    'dv-atom',
    'dv-atom-button', 
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'active:scale-95',
    
    // Disabled state
    (disabled || loading) && [
      'opacity-60',
      'cursor-not-allowed',
      'pointer-events-none'
    ],
    
    // Full width
    fullWidth && 'w-full',
    
    // Animation
    animation === 'scale' && 'hover:scale-105 active:scale-95',
    animation === 'bounce' && 'hover:animate-bounce',
    animation === 'pulse' && 'hover:animate-pulse'
  ].filter(Boolean);

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-primary-500',
      'text-white',
      'border-transparent',
      'hover:bg-primary-600',
      'focus:ring-primary-500',
      'shadow-sm'
    ],
    secondary: [
      'bg-secondary-100',
      'text-secondary-900', 
      'border-transparent',
      'hover:bg-secondary-200',
      'focus:ring-secondary-500'
    ],
    outline: [
      'bg-transparent',
      'text-primary-600',
      'border-2',
      'border-primary-500',
      'hover:bg-primary-50',
      'focus:ring-primary-500'
    ],
    ghost: [
      'bg-transparent',
      'text-primary-600',
      'border-transparent',
      'hover:bg-primary-50',
      'focus:ring-primary-500'
    ],
    danger: [
      'bg-red-500',
      'text-white',
      'border-transparent',
      'hover:bg-red-600',
      'focus:ring-red-500',
      'shadow-sm'
    ],
    success: [
      'bg-green-500',
      'text-white', 
      'border-transparent',
      'hover:bg-green-600',
      'focus:ring-green-500',
      'shadow-sm'
    ],
    warning: [
      'bg-yellow-500',
      'text-white',
      'border-transparent',
      'hover:bg-yellow-600',
      'focus:ring-yellow-500',
      'shadow-sm'
    ]
  };

  // Size classes
  const sizeClasses = {
    xs: ['px-2.5', 'py-1.5', 'text-xs', 'leading-4'],
    sm: ['px-3', 'py-2', 'text-sm', 'leading-4'], 
    md: ['px-4', 'py-2.5', 'text-sm', 'leading-5'],
    lg: ['px-6', 'py-3', 'text-base', 'leading-6'],
    xl: ['px-8', 'py-4', 'text-lg', 'leading-7']
  };

  // Shape classes  
  const shapeClasses = {
    default: {
      xs: 'rounded',
      sm: 'rounded-md',
      md: 'rounded-md', 
      lg: 'rounded-lg',
      xl: 'rounded-lg'
    },
    round: {
      xs: 'rounded-full',
      sm: 'rounded-full',
      md: 'rounded-full',
      lg: 'rounded-full', 
      xl: 'rounded-full'
    },
    circle: 'rounded-full aspect-square p-0'
  };

  // Compile classes
  const buttonClasses = clsx([
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    shape === 'circle' ? shapeClasses.circle : shapeClasses[shape][size],
    className
  ]);

  // Icon spacing based on size
  const iconSpacing = {
    xs: 'gap-1',
    sm: 'gap-1.5', 
    md: 'gap-2',
    lg: 'gap-2.5',
    xl: 'gap-3'
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Spinner size={size} className="animate-spin" />
          {children && <span>{children}</span>}
        </>
      );
    }

    const hasIcon = icon && !loading;
    const hasChildren = React.Children.count(children) > 0;

    if (!hasIcon && !hasChildren) {
      return null;
    }

    if (hasIcon && hasChildren) {
      return (
        <div className={clsx('flex items-center', iconSpacing[size])}>
          {iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </div>
      );
    }

    if (hasIcon && !hasChildren) {
      return <span className="flex-shrink-0">{icon}</span>;
    }

    return <span>{children}</span>;
  };

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      data-atomic-level="atom"
      data-atomic-type="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading}
      data-testid={testId}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;