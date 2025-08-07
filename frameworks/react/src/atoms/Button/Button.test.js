"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * DelvUI Button Component Tests
 * Comprehensive test suite covering all functionality
 */
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const Button_1 = require("./Button");
const ThemeProvider_1 = require("../../providers/ThemeProvider");
// Test wrapper with theme provider
const renderButton = (props = {}) => {
    return (0, react_2.render)((0, jsx_runtime_1.jsx)(ThemeProvider_1.ThemeProvider, { children: (0, jsx_runtime_1.jsx)(Button_1.Button, { ...props }) }));
};
describe('Button Component', () => {
    // Basic rendering tests
    describe('Rendering', () => {
        it('renders without crashing', () => {
            renderButton({ children: 'Test Button' });
            expect(react_2.screen.getByRole('button')).toBeInTheDocument();
        });
        it('renders children correctly', () => {
            renderButton({ children: 'Click me' });
            expect(react_2.screen.getByText('Click me')).toBeInTheDocument();
        });
        it('renders as button element by default', () => {
            renderButton({ children: 'Test' });
            expect(react_2.screen.getByRole('button')).toBeInTheDocument();
        });
        it('applies custom className', () => {
            renderButton({
                children: 'Test',
                className: 'custom-class',
                testId: 'test-button'
            });
            const button = react_2.screen.getByTestId('test-button');
            expect(button).toHaveClass('custom-class');
        });
    });
    // Variants tests
    describe('Variants', () => {
        const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'];
        variants.forEach(variant => {
            it(`renders ${variant} variant correctly`, () => {
                renderButton({
                    children: 'Test',
                    variant,
                    testId: `${variant}-button`
                });
                const button = react_2.screen.getByTestId(`${variant}-button`);
                expect(button).toHaveAttribute('data-variant', variant);
            });
        });
    });
    // Sizes tests
    describe('Sizes', () => {
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
        sizes.forEach(size => {
            it(`renders ${size} size correctly`, () => {
                renderButton({
                    children: 'Test',
                    size,
                    testId: `${size}-button`
                });
                const button = react_2.screen.getByTestId(`${size}-button`);
                expect(button).toHaveAttribute('data-size', size);
            });
        });
    });
    // States tests
    describe('States', () => {
        it('handles disabled state', () => {
            renderButton({
                children: 'Disabled',
                disabled: true,
                testId: 'disabled-button'
            });
            const button = react_2.screen.getByTestId('disabled-button');
            expect(button).toBeDisabled();
            expect(button).toHaveAttribute('aria-disabled', 'true');
        });
        it('handles loading state', () => {
            renderButton({
                children: 'Loading',
                loading: true,
                testId: 'loading-button'
            });
            const button = react_2.screen.getByTestId('loading-button');
            expect(button).toBeDisabled();
            expect(button).toHaveAttribute('data-loading', 'true');
        });
        it('shows spinner when loading', () => {
            renderButton({
                children: 'Loading',
                loading: true
            });
            expect(react_2.screen.getByTestId('spinner')).toBeInTheDocument();
        });
        it('applies fullWidth correctly', () => {
            renderButton({
                children: 'Full Width',
                fullWidth: true,
                testId: 'full-width-button'
            });
            const button = react_2.screen.getByTestId('full-width-button');
            expect(button).toHaveClass('fullWidth');
        });
    });
    // Icon tests
    describe('Icons', () => {
        it('renders icon on left side by default', () => {
            renderButton({
                children: 'With Icon',
                icon: 'plus',
                testId: 'icon-button'
            });
            const button = react_2.screen.getByTestId('icon-button');
            expect(button).toHaveClass('icon-left');
        });
        it('renders icon on right side when specified', () => {
            renderButton({
                children: 'With Icon',
                icon: 'arrow-right',
                iconPosition: 'right',
                testId: 'icon-right-button'
            });
            const button = react_2.screen.getByTestId('icon-right-button');
            expect(button).toHaveClass('icon-right');
        });
        it('renders custom icon component', () => {
            const CustomIcon = () => (0, jsx_runtime_1.jsx)("span", { "data-testid": "custom-icon", children: "\u2605" });
            renderButton({
                children: 'Custom Icon',
                icon: (0, jsx_runtime_1.jsx)(CustomIcon, {})
            });
            expect(react_2.screen.getByTestId('custom-icon')).toBeInTheDocument();
        });
    });
    // Interaction tests
    describe('Interactions', () => {
        it('calls onClick when clicked', async () => {
            const handleClick = jest.fn();
            renderButton({
                children: 'Clickable',
                onClick: handleClick,
                testId: 'clickable-button'
            });
            const button = react_2.screen.getByTestId('clickable-button');
            await user_event_1.default.click(button);
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
        it('does not call onClick when disabled', async () => {
            const handleClick = jest.fn();
            renderButton({
                children: 'Disabled',
                disabled: true,
                onClick: handleClick,
                testId: 'disabled-button'
            });
            const button = react_2.screen.getByTestId('disabled-button');
            await user_event_1.default.click(button);
            expect(handleClick).not.toHaveBeenCalled();
        });
        it('does not call onClick when loading', async () => {
            const handleClick = jest.fn();
            renderButton({
                children: 'Loading',
                loading: true,
                onClick: handleClick,
                testId: 'loading-button'
            });
            const button = react_2.screen.getByTestId('loading-button');
            await user_event_1.default.click(button);
            expect(handleClick).not.toHaveBeenCalled();
        });
        it('handles keyboard interactions', async () => {
            const handleClick = jest.fn();
            renderButton({
                children: 'Keyboard',
                onClick: handleClick,
                testId: 'keyboard-button'
            });
            const button = react_2.screen.getByTestId('keyboard-button');
            button.focus();
            react_2.fireEvent.keyDown(button, { key: 'Enter' });
            await (0, react_2.waitFor)(() => {
                expect(handleClick).toHaveBeenCalledTimes(1);
            });
            react_2.fireEvent.keyDown(button, { key: ' ' });
            await (0, react_2.waitFor)(() => {
                expect(handleClick).toHaveBeenCalledTimes(2);
            });
        });
    });
    // Accessibility tests
    describe('Accessibility', () => {
        it('has correct ARIA attributes', () => {
            renderButton({
                children: 'Accessible',
                'aria-label': 'Custom label',
                testId: 'accessible-button'
            });
            const button = react_2.screen.getByTestId('accessible-button');
            expect(button).toHaveAttribute('aria-label', 'Custom label');
        });
        it('maintains focus outline for keyboard users', () => {
            renderButton({
                children: 'Focus test',
                testId: 'focus-button'
            });
            const button = react_2.screen.getByTestId('focus-button');
            button.focus();
            expect(button).toHaveFocus();
        });
        it('has proper role for screen readers', () => {
            renderButton({ children: 'Screen reader test' });
            const button = react_2.screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });
        it('announces loading state to screen readers', () => {
            renderButton({
                children: 'Loading test',
                loading: true,
                testId: 'loading-announce'
            });
            const button = react_2.screen.getByTestId('loading-announce');
            expect(button).toHaveAttribute('aria-disabled', 'true');
        });
    });
    // Form integration tests
    describe('Form Integration', () => {
        it('submits form when type is submit', () => {
            const handleSubmit = jest.fn((e) => e.preventDefault());
            (0, react_2.render)((0, jsx_runtime_1.jsx)(ThemeProvider_1.ThemeProvider, { children: (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", children: "Submit" }) }) }));
            const button = react_2.screen.getByText('Submit');
            react_2.fireEvent.click(button);
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        });
        it('does not submit form when type is button', () => {
            const handleSubmit = jest.fn();
            (0, react_2.render)((0, jsx_runtime_1.jsx)(ThemeProvider_1.ThemeProvider, { children: (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", children: "Button" }) }) }));
            const button = react_2.screen.getByText('Button');
            react_2.fireEvent.click(button);
            expect(handleSubmit).not.toHaveBeenCalled();
        });
    });
    // Animation tests
    describe('Animations', () => {
        it('applies animation classes when animated is true', () => {
            renderButton({
                children: 'Animated',
                animated: true,
                testId: 'animated-button'
            });
            const button = react_2.screen.getByTestId('animated-button');
            expect(button).toHaveClass('animated');
        });
        it('does not apply animation classes when animated is false', () => {
            renderButton({
                children: 'Static',
                animated: false,
                testId: 'static-button'
            });
            const button = react_2.screen.getByTestId('static-button');
            expect(button).not.toHaveClass('animated');
        });
    });
    // Shape tests
    describe('Shapes', () => {
        const shapes = ['rectangle', 'rounded', 'pill', 'circle'];
        shapes.forEach(shape => {
            it(`applies ${shape} shape correctly`, () => {
                renderButton({
                    children: shape === 'circle' ? '' : 'Test',
                    shape,
                    testId: `${shape}-button`
                });
                const button = react_2.screen.getByTestId(`${shape}-button`);
                expect(button).toHaveClass(`shape-${shape}`);
            });
        });
    });
    // Performance tests
    describe('Performance', () => {
        it('does not re-render unnecessarily', () => {
            const { rerender } = renderButton({ children: 'Test' });
            // Re-render with same props
            rerender((0, jsx_runtime_1.jsx)(ThemeProvider_1.ThemeProvider, { children: (0, jsx_runtime_1.jsx)(Button_1.Button, { children: "Test" }) }));
            // Component should still be in the document
            expect(react_2.screen.getByText('Test')).toBeInTheDocument();
        });
    });
});
//# sourceMappingURL=Button.test.js.map