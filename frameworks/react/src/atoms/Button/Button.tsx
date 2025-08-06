/**
 * DelvUI React Button Component
 * A comprehensive, accessible button component following atomic design principles
 */

import React, { forwardRef, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';
import clsx from 'clsx';
import { AtomProps } from '@delvui/core';
import { useDelvUITheme } from '../../providers/ThemeProvider';
import { Spinner } from '../Spinner/Spinner';
import { Icon } from '../Icon/Icon';
import styles from './Button.module.css';

// Button Props Interface
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
  
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Loading state */
  loading?: boolean;
  
  /** Icon element or name */
  icon?: React.ReactNode | string;
  
  /** Position of the icon */
  iconPosition?: 'left' | 'right';
  
  /** Whether button should take full width */
  fullWidth?: boolean;
  
  /** Button shape */
  shape?: 'rectangle' | 'rounded' | 'pill' | 'circle';
  
  /** Enable motion animations */
  animated?: boolean;
  
  /** Custom CSS classes */
  className?: string;
  
  /** Test ID for testing */
  testId?: string;
  
  /** Accessibility label */
  'aria-label'?: string;
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
  tags: ['interactive', 'clickable', 'form-control', 'cta'],
  
  variants: [
    {
      name: 'primary',
      description: 'Primary call-to-action button',
      props: { variant: 'primary', size: 'md' },
      preview: '<Button variant="primary">Primary</Button>'
    },
    {
      name: 'secondary',
      description: 'Secondary action button',
      props: { variant: 'secondary', size: 'md' },
      preview: '<Button variant="secondary">Secondary</Button>'
    },
    {
      name: 'outline',
      description: 'Outlined button for subtle actions',
      props: { variant: 'outline', size: 'md' },
      preview: '<Button variant="outline">Outline</Button>'
    },
    {
      name: 'ghost',
      description: 'Minimal button with no background',
      props: { variant: 'ghost', size: 'md' },
      preview: '<Button variant="ghost">Ghost</Button>'
    },
    {
      name: 'loading',
      description: 'Button in loading state',
      props: { loading: true, variant: 'primary' },
      preview: '<Button loading>Loading...</Button>'
    },
    {
      name: 'with-icon',
      description: 'Button with icon',
      props: { icon: 'plus', variant: 'primary' },
      preview: '<Button icon="plus">Add Item</Button>'
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
      props: { variant: 'primary', size: 'md', className: 'hover' }
    },
    {
      name: 'active',
      description: 'Active/pressed button state',
      props: { variant: 'primary', size: 'md', className: 'active' }
    },
    {
      name: 'focus',
      description: 'Focused button state',
      props: { variant: 'primary', size: 'md', className: 'focus' }
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
    roles: ['button', 'menuitem', 'tab', 'link'],
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

// Motion variants for animations
const motionVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
  disabled: { scale: 1, opacity: 0.6 }
};

/**
 * Button Component
 * 
 * A highly customizable button component that supports multiple variants,
 * sizes, states, and accessibility features.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * // With icon
 * <Button variant="outline" icon="plus" iconPosition="left">
 *   Add Item
 * </Button>
 * 
 * // Loading state
 * <Button loading disabled>
 *   Processing...
 * </Button>
 * 
 * // Full width
 * <Button variant="primary" fullWidth>
 *   Submit Form
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps & MotionProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  shape = 'rectangle',
  animated = true,
  className,
  disabled,
  testId,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  const theme = useDelvUITheme();
  
  // Memoize class combinations for performance
  const buttonClasses = useMemo(() => clsx([
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`shape-${shape}`],
    {
      [styles.fullWidth]: fullWidth,
      [styles.loading]: loading,
      [styles.disabled]: disabled || loading,
      [styles.animated]: animated,
      [styles.withIcon]: !!icon,
      [styles[`icon-${iconPosition}`]]: !!icon,
    },
    className
  ]), [variant, size, shape, fullWidth, loading, disabled, animated, icon, iconPosition, className]);

  // Handle click with loading state
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  // Render icon based on type
  const renderIcon = () => {
    if (loading) {
      return <Spinner size={size} className={styles.spinner} />;
    }
    
    if (typeof icon === 'string') {
      return <Icon name={icon} size={size} />;
    }
    
    return icon;
  };

  // Determine motion props
  const motionProps = animated ? {
    variants: motionVariants,
    initial: 'initial',
    whileHover: disabled || loading ? undefined : 'hover',
    whileTap: disabled || loading ? undefined : 'tap',
    animate: disabled || loading ? 'disabled' : 'initial',
    transition: { duration: 0.2, ease: 'easeInOut' }
  } : {};

  const ButtonComponent = animated ? motion.button : 'button';

  return (
    <ButtonComponent
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      data-delvui-component="button"
      data-atomic-level="atom"
      data-atomic-type="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading}
      data-testid={testId}
      aria-disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      <span className={styles.content}>
        {iconPosition === 'left' && renderIcon()}
        {children && <span className={styles.text}>{children}</span>}
        {iconPosition === 'right' && renderIcon()}
      </span>
      
      {/* Ripple effect container */}
      {animated && <span className={styles.ripple} />}
    </ButtonComponent>
  );
});

Button.displayName = 'Button';

export default Button;