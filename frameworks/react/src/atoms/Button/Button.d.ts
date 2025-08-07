/**
 * DelvUI React Button Component
 * A comprehensive, accessible button component following atomic design principles
 */
import React from 'react';
import { AtomProps } from '@delvui/core';
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
export declare const ButtonAtom: AtomProps;
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
export declare const Button: any;
export default Button;
//# sourceMappingURL=Button.d.ts.map