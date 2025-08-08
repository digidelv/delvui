/**
 * DelvUI React Icon Component
 * Scalable icon component with built-in icon library
 */
import React from 'react';
import { AtomProps } from '@delvui/core';
export interface IconProps {
    /** Icon name from built-in library */
    name: string;
    /** Size of the icon */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
    /** Color variant */
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'muted';
    /** Custom CSS classes */
    className?: string;
    /** Accessibility label */
    'aria-label'?: string;
    /** Test ID */
    testId?: string;
    /** Click handler */
    onClick?: () => void;
}
export declare const IconAtom: AtomProps;
/**
 * Icon Component
 */
export declare const Icon: React.FC<IconProps>;
export default Icon;
//# sourceMappingURL=Icon.d.ts.map