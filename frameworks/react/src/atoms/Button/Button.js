"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.ButtonAtom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * DelvUI React Button Component
 * A comprehensive, accessible button component following atomic design principles
 */
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const clsx_1 = __importDefault(require("clsx"));
const ThemeProvider_1 = require("../../providers/ThemeProvider");
const Spinner_1 = require("../Spinner/Spinner");
const Icon_1 = require("../Icon/Icon");
const Button_module_css_1 = __importDefault(require("./Button.module.css"));
// Atomic Design Metadata
exports.ButtonAtom = {
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
exports.Button = (0, react_1.forwardRef)(({ children, variant = 'primary', size = 'md', loading = false, icon, iconPosition = 'left', fullWidth = false, shape = 'rectangle', animated = true, className, disabled, testId, type = 'button', onClick, ...props }, ref) => {
    const theme = (0, ThemeProvider_1.useDelvUITheme)();
    // Memoize class combinations for performance
    const buttonClasses = (0, react_1.useMemo)(() => (0, clsx_1.default)([
        Button_module_css_1.default.button,
        Button_module_css_1.default[`variant-${variant}`],
        Button_module_css_1.default[`size-${size}`],
        Button_module_css_1.default[`shape-${shape}`],
        {
            [Button_module_css_1.default.fullWidth]: fullWidth,
            [Button_module_css_1.default.loading]: loading,
            [Button_module_css_1.default.disabled]: disabled || loading,
            [Button_module_css_1.default.animated]: animated,
            [Button_module_css_1.default.withIcon]: !!icon,
            [Button_module_css_1.default[`icon-${iconPosition}`]]: !!icon,
        },
        className
    ]), [variant, size, shape, fullWidth, loading, disabled, animated, icon, iconPosition, className]);
    // Handle click with loading state
    const handleClick = (event) => {
        if (loading || disabled) {
            event.preventDefault();
            return;
        }
        onClick?.(event);
    };
    // Render icon based on type
    const renderIcon = () => {
        if (loading) {
            return (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: size, className: Button_module_css_1.default.spinner });
        }
        if (typeof icon === 'string') {
            return (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: icon, size: size });
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
    const ButtonComponent = animated ? framer_motion_1.motion.button : 'button';
    return ((0, jsx_runtime_1.jsxs)(ButtonComponent, { ref: ref, type: type, className: buttonClasses, disabled: disabled || loading, onClick: handleClick, "data-delvui-component": "button", "data-atomic-level": "atom", "data-atomic-type": "button", "data-variant": variant, "data-size": size, "data-loading": loading, "data-testid": testId, "aria-disabled": disabled || loading, ...motionProps, ...props, children: [(0, jsx_runtime_1.jsxs)("span", { className: Button_module_css_1.default.content, children: [iconPosition === 'left' && renderIcon(), children && (0, jsx_runtime_1.jsx)("span", { className: Button_module_css_1.default.text, children: children }), iconPosition === 'right' && renderIcon()] }), animated && (0, jsx_runtime_1.jsx)("span", { className: Button_module_css_1.default.ripple })] }));
});
exports.Button.displayName = 'Button';
exports.default = exports.Button;
//# sourceMappingURL=Button.js.map