/**
 * DelvUI React - Spinner Atom
 */

import React from 'react';
import clsx from 'clsx';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4', 
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  return (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
        sizeClasses[size],
        className
      )}
      data-atomic-level="atom"
      data-atomic-type="spinner"
    />
  );
};