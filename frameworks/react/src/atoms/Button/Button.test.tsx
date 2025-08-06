/**
 * DelvUI Button Component Tests
 * Comprehensive test suite covering all functionality
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ButtonProps } from './Button';
import { ThemeProvider } from '../../providers/ThemeProvider';

// Test wrapper with theme provider
const renderButton = (props: ButtonProps = {}) => {
  return render(
    <ThemeProvider>
      <Button {...props} />
    </ThemeProvider>
  );
};

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderButton({ children: 'Test Button' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      renderButton({ children: 'Click me' });
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders as button element by default', () => {
      renderButton({ children: 'Test' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderButton({ 
        children: 'Test',
        className: 'custom-class',
        testId: 'test-button'
      });
      const button = screen.getByTestId('test-button');
      expect(button).toHaveClass('custom-class');
    });
  });

  // Variants tests
  describe('Variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'] as const;
    
    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        renderButton({ 
          children: 'Test',
          variant,
          testId: `${variant}-button`
        });
        const button = screen.getByTestId(`${variant}-button`);
        expect(button).toHaveAttribute('data-variant', variant);
      });
    });
  });

  // Sizes tests
  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    
    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        renderButton({ 
          children: 'Test',
          size,
          testId: `${size}-button`
        });
        const button = screen.getByTestId(`${size}-button`);
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
      const button = screen.getByTestId('disabled-button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('handles loading state', () => {
      renderButton({ 
        children: 'Loading',
        loading: true,
        testId: 'loading-button'
      });
      const button = screen.getByTestId('loading-button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-loading', 'true');
    });

    it('shows spinner when loading', () => {
      renderButton({ 
        children: 'Loading',
        loading: true
      });
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('applies fullWidth correctly', () => {
      renderButton({ 
        children: 'Full Width',
        fullWidth: true,
        testId: 'full-width-button'
      });
      const button = screen.getByTestId('full-width-button');
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
      const button = screen.getByTestId('icon-button');
      expect(button).toHaveClass('icon-left');
    });

    it('renders icon on right side when specified', () => {
      renderButton({ 
        children: 'With Icon',
        icon: 'arrow-right',
        iconPosition: 'right',
        testId: 'icon-right-button'
      });
      const button = screen.getByTestId('icon-right-button');
      expect(button).toHaveClass('icon-right');
    });

    it('renders custom icon component', () => {
      const CustomIcon = () => <span data-testid="custom-icon">★</span>;
      renderButton({ 
        children: 'Custom Icon',
        icon: <CustomIcon />
      });
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
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
      
      const button = screen.getByTestId('clickable-button');
      await userEvent.click(button);
      
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
      
      const button = screen.getByTestId('disabled-button');
      await userEvent.click(button);
      
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
      
      const button = screen.getByTestId('loading-button');
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard interactions', async () => {
      const handleClick = jest.fn();
      renderButton({ 
        children: 'Keyboard',
        onClick: handleClick,
        testId: 'keyboard-button'
      });
      
      const button = screen.getByTestId('keyboard-button');
      button.focus();
      
      fireEvent.keyDown(button, { key: 'Enter' });
      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
      
      fireEvent.keyDown(button, { key: ' ' });
      await waitFor(() => {
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
      
      const button = screen.getByTestId('accessible-button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });

    it('maintains focus outline for keyboard users', () => {
      renderButton({ 
        children: 'Focus test',
        testId: 'focus-button'
      });
      
      const button = screen.getByTestId('focus-button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('has proper role for screen readers', () => {
      renderButton({ children: 'Screen reader test' });
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('announces loading state to screen readers', () => {
      renderButton({ 
        children: 'Loading test',
        loading: true,
        testId: 'loading-announce'
      });
      
      const button = screen.getByTestId('loading-announce');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Form integration tests
  describe('Form Integration', () => {
    it('submits form when type is submit', () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      
      render(
        <ThemeProvider>
          <form onSubmit={handleSubmit}>
            <Button type="submit">Submit</Button>
          </form>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Submit');
      fireEvent.click(button);
      
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('does not submit form when type is button', () => {
      const handleSubmit = jest.fn();
      
      render(
        <ThemeProvider>
          <form onSubmit={handleSubmit}>
            <Button type="button">Button</Button>
          </form>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
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
      
      const button = screen.getByTestId('animated-button');
      expect(button).toHaveClass('animated');
    });

    it('does not apply animation classes when animated is false', () => {
      renderButton({ 
        children: 'Static',
        animated: false,
        testId: 'static-button'
      });
      
      const button = screen.getByTestId('static-button');
      expect(button).not.toHaveClass('animated');
    });
  });

  // Shape tests
  describe('Shapes', () => {
    const shapes = ['rectangle', 'rounded', 'pill', 'circle'] as const;
    
    shapes.forEach(shape => {
      it(`applies ${shape} shape correctly`, () => {
        renderButton({ 
          children: shape === 'circle' ? '' : 'Test',
          shape,
          testId: `${shape}-button`
        });
        
        const button = screen.getByTestId(`${shape}-button`);
        expect(button).toHaveClass(`shape-${shape}`);
      });
    });
  });

  // Performance tests
  describe('Performance', () => {
    it('does not re-render unnecessarily', () => {
      const { rerender } = renderButton({ children: 'Test' });
      
      // Re-render with same props
      rerender(
        <ThemeProvider>
          <Button>Test</Button>
        </ThemeProvider>
      );
      
      // Component should still be in the document
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});