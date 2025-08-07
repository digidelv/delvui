/**
 * DelvUI React Spinner Component
 * Loading indicator with multiple variants and sizes
 */

import React from 'react';
import clsx from 'clsx';
import { AtomProps } from '@delvui/core';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  /** Loading text for accessibility */
  label?: string;
  
  /** Custom CSS classes */
  className?: string;
  
  /** Test ID */
  testId?: string;
}

// Atomic Design Metadata
export const SpinnerAtom: AtomProps = {
  id: 'spinner',
  name: 'Spinner',
  level: 'atom',
  category: 'feedback',
  complexity: 1,
  dependencies: [],
  baseElement: 'div',
  version: '1.0.0',
  description: 'A loading indicator to show ongoing processes',
  tags: ['loading', 'progress', 'feedback'],
  
  variants: [
    {
      name: 'default',
      description: 'Default spinner',
      props: { size: 'md' },
      preview: '<Spinner />'
    },
    {
      name: 'small',
      description: 'Small spinner for buttons',
      props: { size: 'sm' },
      preview: '<Spinner size="sm" />'
    },
    {
      name: 'primary',
      description: 'Primary colored spinner',
      props: { variant: 'primary' },
      preview: '<Spinner variant="primary" />'
    }
  ]
};

/**
 * Spinner Component
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  label = 'Loading...',
  className,
  testId = 'spinner'
}) => {
  const spinnerClasses = clsx([
    styles.spinner,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    className
  ]);

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label={label}
      data-testid={testId}
      data-delvui-component="spinner"
      data-atomic-level="atom"
    >
      <div className={styles.circle} />
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;