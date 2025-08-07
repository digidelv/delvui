/**
 * DelvUI React Spinner Component
 * Loading indicator with multiple variants and sizes
 */
import React from 'react';
import { AtomProps } from '@delvui/core';
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
export declare const SpinnerAtom: AtomProps;
/**
 * Spinner Component
 */
export declare const Spinner: React.FC<SpinnerProps>;
export default Spinner;
//# sourceMappingURL=Spinner.d.ts.map