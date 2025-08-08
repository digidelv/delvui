"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = exports.SpinnerAtom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * DelvUI React Spinner Component
 * Loading indicator with multiple variants and sizes
 */
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Spinner_module_css_1 = __importDefault(require("./Spinner.module.css"));
// Atomic Design Metadata
exports.SpinnerAtom = {
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
const Spinner = ({ size = 'md', variant = 'default', label = 'Loading...', className, testId = 'spinner' }) => {
    const spinnerClasses = (0, clsx_1.default)([
        Spinner_module_css_1.default.spinner,
        Spinner_module_css_1.default[`size-${size}`],
        Spinner_module_css_1.default[`variant-${variant}`],
        className
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: spinnerClasses, role: "status", "aria-label": label, "data-testid": testId, "data-delvui-component": "spinner", "data-atomic-level": "atom", children: [(0, jsx_runtime_1.jsx)("div", { className: Spinner_module_css_1.default.circle }), (0, jsx_runtime_1.jsx)("span", { className: Spinner_module_css_1.default.srOnly, children: label })] }));
};
exports.Spinner = Spinner;
exports.Spinner.displayName = 'Spinner';
exports.default = exports.Spinner;
//# sourceMappingURL=Spinner.js.map