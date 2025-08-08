/**
 * Simplified DelvUI Button Component for Storybook
 */

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

// Simplified Button Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
  
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Loading state */
  loading?: boolean;
  
  /** Full width button */
  fullWidth?: boolean;
  
  /** Shape of the button */
  shape?: 'rectangle' | 'rounded' | 'pill' | 'circle';
}

// Simplified Button Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  shape = 'rectangle',
  className,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  
  const buttonClasses = clsx([
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    styles[`button--${shape}`],
    {
      [styles['button--loading']]: loading,
      [styles['button--full-width']]: fullWidth,
      [styles['button--disabled']]: disabled,
    },
    className
  ]);

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner}>⏳</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';