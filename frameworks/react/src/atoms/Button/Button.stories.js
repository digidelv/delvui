"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibilityDemo = exports.FormIntegration = exports.AllVariants = exports.InteractiveExample = exports.AllShapes = exports.IconOnly = exports.WithRightIcon = exports.WithLeftIcon = exports.FullWidth = exports.Disabled = exports.Loading = exports.AllSizes = exports.Info = exports.Warning = exports.Success = exports.Danger = exports.Ghost = exports.Outline = exports.Secondary = exports.Primary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("./Button");
const meta = {
    title: 'Atoms/Button',
    component: Button_1.Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible, accessible button component following atomic design principles. Supports multiple variants, sizes, states, and comprehensive accessibility features.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'],
            description: 'Visual style variant of the button'
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size of the button'
        },
        shape: {
            control: 'select',
            options: ['rectangle', 'rounded', 'pill', 'circle'],
            description: 'Shape of the button'
        },
        loading: {
            control: 'boolean',
            description: 'Loading state with spinner'
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state'
        },
        fullWidth: {
            control: 'boolean',
            description: 'Full width button'
        },
        animated: {
            control: 'boolean',
            description: 'Enable animations'
        },
        iconPosition: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Position of the icon'
        }
    }
};
exports.default = meta;
// Basic variants
exports.Primary = {
    args: {
        children: 'Primary Button',
        variant: 'primary'
    }
};
exports.Secondary = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary'
    }
};
exports.Outline = {
    args: {
        children: 'Outline Button',
        variant: 'outline'
    }
};
exports.Ghost = {
    args: {
        children: 'Ghost Button',
        variant: 'ghost'
    }
};
// Semantic variants
exports.Danger = {
    args: {
        children: 'Danger Button',
        variant: 'danger'
    }
};
exports.Success = {
    args: {
        children: 'Success Button',
        variant: 'success'
    }
};
exports.Warning = {
    args: {
        children: 'Warning Button',
        variant: 'warning'
    }
};
exports.Info = {
    args: {
        children: 'Info Button',
        variant: 'info'
    }
};
// Sizes
exports.AllSizes = {
    render: () => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { size: "xs", children: "Extra Small" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", children: "Small" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", children: "Medium" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "lg", children: "Large" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "xl", children: "Extra Large" })] }))
};
// States
exports.Loading = {
    args: {
        children: 'Loading...',
        loading: true,
        variant: 'primary'
    }
};
exports.Disabled = {
    args: {
        children: 'Disabled Button',
        disabled: true,
        variant: 'primary'
    }
};
exports.FullWidth = {
    args: {
        children: 'Full Width Button',
        fullWidth: true,
        variant: 'primary'
    }
};
// With icons
exports.WithLeftIcon = {
    args: {
        children: 'Add Item',
        icon: 'plus',
        iconPosition: 'left',
        variant: 'primary'
    }
};
exports.WithRightIcon = {
    args: {
        children: 'Continue',
        icon: 'arrow-right',
        iconPosition: 'right',
        variant: 'primary'
    }
};
exports.IconOnly = {
    args: {
        icon: 'settings',
        variant: 'outline',
        shape: 'circle',
        'aria-label': 'Settings'
    }
};
// Shapes
exports.AllShapes = {
    render: () => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { shape: "rectangle", children: "Rectangle" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { shape: "rounded", children: "Rounded" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { shape: "pill", children: "Pill Shape" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { shape: "circle", icon: "heart", "aria-label": "Like" })] }))
};
// Interactive examples
exports.InteractiveExample = {
    render: () => {
        const [loading, setLoading] = React.useState(false);
        const [count, setCount] = React.useState(0);
        const handleClick = () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setCount(c => c + 1);
            }, 2000);
        };
        return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", loading: loading, onClick: handleClick, children: loading ? 'Processing...' : `Clicked ${count} times` }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500", children: "Click the button to see the loading state" })] }));
    }
};
// All variants showcase
exports.AllVariants = {
    render: () => ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-4", children: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'].map(variant => ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: variant, children: variant.charAt(0).toUpperCase() + variant.slice(1) }, variant))) }))
};
// Form integration
exports.FormIntegration = {
    render: () => ((0, jsx_runtime_1.jsxs)("form", { className: "space-y-4 p-6 border rounded-lg max-w-md", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium mb-2", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", className: "w-full px-3 py-2 border rounded-md", placeholder: "Enter your email" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium mb-2", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", className: "w-full px-3 py-2 border rounded-md", placeholder: "Enter your password" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", variant: "primary", fullWidth: true, children: "Sign In" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", variant: "outline", children: "Cancel" })] })] }))
};
// Accessibility demonstration
exports.AccessibilityDemo = {
    render: () => ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold", children: "Accessibility Features" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", "aria-label": "Save document with keyboard shortcut Ctrl+S", title: "Save (Ctrl+S)", children: "Save" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "danger", "aria-describedby": "delete-warning", children: "Delete" }), (0, jsx_runtime_1.jsx)("div", { id: "delete-warning", className: "text-sm text-red-600", children: "This action cannot be undone" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", disabled: true, "aria-disabled": "true", title: "Feature coming soon", children: "Premium Feature" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600 space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { children: "\u2022 All buttons have proper focus indicators" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 Screen reader compatible with ARIA labels" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 Keyboard navigation support (Tab, Enter, Space)" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 High contrast mode support" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 Reduced motion support for animations" })] })] }))
};
//# sourceMappingURL=Button.stories.js.map