"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.IconAtom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * DelvUI React Icon Component
 * Scalable icon component with built-in icon library
 */
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Icon_module_css_1 = __importDefault(require("./Icon.module.css"));
// Built-in icon library (simplified SVG paths)
const ICONS = {
    // UI Icons
    'plus': 'M12 5v6m0 0v6m0-6h6m-6 0H6',
    'minus': 'M6 12h12',
    'x': 'm6 6 12 12m0-12L6 18',
    'check': 'm5 13 4 4L19 7',
    'chevron-left': 'm15 18-6-6 6-6',
    'chevron-right': 'm9 18 6-6-6-6',
    'chevron-up': 'm18 15-6-6-6 6',
    'chevron-down': 'm6 9 6 6 6-6',
    'arrow-left': 'M19 12H5m0 0 7 7m-7-7 7-7',
    'arrow-right': 'M5 12h14m0 0-7-7m7 7-7 7',
    'arrow-up': 'M12 19V5m0 0-7 7m7-7 7 7',
    'arrow-down': 'M12 5v14m0 0 7-7m0 0-7 7',
    // Action Icons
    'edit': 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125',
    'delete': 'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0',
    'settings': 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495',
    'search': 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
    'heart': 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
    // Status Icons
    'info': 'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
    'warning': 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
    'error': 'M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z',
    'success': 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
};
// Atomic Design Metadata
exports.IconAtom = {
    id: 'icon',
    name: 'Icon',
    level: 'atom',
    category: 'display',
    complexity: 1,
    dependencies: [],
    baseElement: 'svg',
    version: '1.0.0',
    description: 'Scalable vector icon component with built-in icon library',
    tags: ['icon', 'svg', 'graphics'],
    variants: Object.keys(ICONS).slice(0, 6).map(iconName => ({
        name: iconName,
        description: `${iconName} icon`,
        props: { name: iconName },
        preview: `<Icon name="${iconName}" />`
    }))
};
/**
 * Icon Component
 */
const Icon = ({ name, size = 'md', variant = 'default', className, testId = 'icon', onClick, ...props }) => {
    const iconPath = ICONS[name];
    if (!iconPath) {
        console.warn(`Icon "${name}" not found in icon library`);
        return null;
    }
    // Calculate size in pixels
    const getSize = () => {
        if (typeof size === 'number')
            return size;
        const sizeMap = { xs: 12, sm: 16, md: 20, lg: 24, xl: 28 };
        return sizeMap[size] || 20;
    };
    const iconSize = getSize();
    const isClickable = !!onClick;
    const iconClasses = (0, clsx_1.default)([
        Icon_module_css_1.default.icon,
        Icon_module_css_1.default[`variant-${variant}`],
        {
            [Icon_module_css_1.default.clickable]: isClickable
        },
        className
    ]);
    const IconComponent = isClickable ? 'button' : 'svg';
    const iconProps = isClickable ? {
        type: 'button',
        onClick,
        'aria-label': props['aria-label'],
        className: iconClasses
    } : {
        className: iconClasses,
        'aria-hidden': !props['aria-label']
    };
    if (isClickable) {
        return ((0, jsx_runtime_1.jsx)("button", { ...iconProps, "data-testid": testId, "data-delvui-component": "icon", "data-atomic-level": "atom", children: (0, jsx_runtime_1.jsx)("svg", { width: iconSize, height: iconSize, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: iconPath }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)("svg", { ...iconProps, width: iconSize, height: iconSize, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "data-testid": testId, "data-delvui-component": "icon", "data-atomic-level": "atom", ...props, children: (0, jsx_runtime_1.jsx)("path", { d: iconPath }) }));
};
exports.Icon = Icon;
exports.Icon.displayName = 'Icon';
exports.default = exports.Icon;
//# sourceMappingURL=Icon.js.map