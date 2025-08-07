/**
 * DelvUI React Native Button Component
 * A comprehensive, accessible button component for mobile platforms
 */

import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityRole,
  AccessibilityState,
  TouchableOpacityProps
} from 'react-native';
import { AtomProps } from '@delvui/core';
import { Icon } from '../Icon/Icon';
import { useTheme } from '../../providers/ThemeProvider';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
  
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Loading state */
  loading?: boolean;
  
  /** Icon name */
  icon?: string;
  
  /** Position of the icon */
  iconPosition?: 'left' | 'right';
  
  /** Whether button should take full width */
  fullWidth?: boolean;
  
  /** Button shape */
  shape?: 'rectangle' | 'rounded' | 'pill' | 'circle';
  
  /** Button content */
  children?: React.ReactNode;
  
  /** Custom button style */
  buttonStyle?: ViewStyle;
  
  /** Custom text style */
  textStyle?: TextStyle;
  
  /** Test ID for testing */
  testID?: string;
}

// Atomic Design Metadata
export const ButtonAtom: AtomProps = {
  id: 'button-react-native',
  name: 'Button',
  level: 'atom',
  category: 'form',
  complexity: 1,
  dependencies: ['Icon'],
  baseElement: 'TouchableOpacity',
  version: '1.0.0',
  description: 'A flexible, accessible button component for mobile interactions (React Native)',
  tags: ['interactive', 'touchable', 'form-control', 'cta', 'react-native', 'mobile'],
  
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
      name: 'loading',
      description: 'Button in loading state',
      props: { loading: true, variant: 'primary' },
      preview: '<Button loading>Loading...</Button>'
    }
  ],
  
  accessibility: {
    ariaLabels: ['accessibilityLabel', 'accessibilityHint'],
    roles: ['button'],
    keyboardNavigation: false, // Touch-based
    screenReaderSupport: true,
    colorContrastRatio: 4.5
  },
  
  responsive: {
    breakpoints: ['phone', 'tablet'],
    adaptiveProps: {
      size: { phone: 'md', tablet: 'lg' },
      fullWidth: { phone: false, tablet: false }
    },
    mobileFirst: true
  }
};

/**
 * Button Component for React Native
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  shape = 'rounded',
  children,
  disabled,
  buttonStyle,
  textStyle,
  testID = 'button',
  onPress,
  ...props
}) => {
  const theme = useTheme();

  // Create styles based on props
  const buttonStyles = useMemo(() => {
    const styles: ViewStyle[] = [
      baseStyles.button,
      baseStyles[`size_${size}`],
      baseStyles[`variant_${variant}`],
      baseStyles[`shape_${shape}`],
    ];

    if (fullWidth) styles.push(baseStyles.fullWidth);
    if (loading || disabled) styles.push(baseStyles.disabled);
    if (buttonStyle) styles.push(buttonStyle);

    return StyleSheet.flatten(styles);
  }, [variant, size, shape, fullWidth, loading, disabled, buttonStyle]);

  const textStyles = useMemo(() => {
    const styles: TextStyle[] = [
      baseStyles.text,
      baseStyles[`text_${size}`],
      baseStyles[`textVariant_${variant}`],
    ];

    if (textStyle) styles.push(textStyle);
    return StyleSheet.flatten(styles);
  }, [variant, size, textStyle]);

  // Handle press
  const handlePress = (event: any) => {
    if (loading || disabled) return;
    onPress?.(event);
  };

  // Render icon or spinner
  const renderIcon = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={getActivityIndicatorColor(variant)}
          testID={`${testID}-spinner`}
        />
      );
    }

    if (icon) {
      return (
        <Icon
          name={icon}
          size={getIconSize(size)}
          color={getIconColor(variant)}
          testID={`${testID}-icon`}
        />
      );
    }

    return null;
  };

  // Accessibility
  const accessibilityRole: AccessibilityRole = 'button';
  const accessibilityState: AccessibilityState = {
    disabled: disabled || loading,
    busy: loading
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      {...props}
    >
      <View style={baseStyles.content}>
        {iconPosition === 'left' && renderIcon()}
        {children && (
          <Text style={textStyles} numberOfLines={1}>
            {children}
          </Text>
        )}
        {iconPosition === 'right' && renderIcon()}
      </View>
    </TouchableOpacity>
  );
};

// Helper functions
const getIconSize = (size: string): number => {
  const sizeMap = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 };
  return sizeMap[size as keyof typeof sizeMap] || 16;
};

const getIconColor = (variant: string): string => {
  const colorMap = {
    primary: '#FFFFFF',
    secondary: '#374151',
    outline: '#374151',
    ghost: '#374151',
    danger: '#FFFFFF',
    success: '#FFFFFF',
    warning: '#FFFFFF',
    info: '#FFFFFF'
  };
  return colorMap[variant as keyof typeof colorMap] || '#374151';
};

const getActivityIndicatorColor = (variant: string): string => {
  return getIconColor(variant);
};

// Base styles
const baseStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#3B82F6',
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  
  text: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  
  fullWidth: {
    alignSelf: 'stretch',
  },
  
  disabled: {
    opacity: 0.6,
  },
  
  // Size variants
  size_xs: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  
  size_sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  
  size_md: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  
  size_lg: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  
  size_xl: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  
  // Text size variants
  text_xs: {
    fontSize: 11,
  },
  
  text_sm: {
    fontSize: 12,
  },
  
  text_md: {
    fontSize: 14,
  },
  
  text_lg: {
    fontSize: 16,
  },
  
  text_xl: {
    fontSize: 18,
  },
  
  // Color variants
  variant_primary: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  
  variant_secondary: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  
  variant_outline: {
    backgroundColor: 'transparent',
    borderColor: '#D1D5DB',
  },
  
  variant_ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  
  variant_danger: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  
  variant_success: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  
  variant_warning: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  
  variant_info: {
    backgroundColor: '#06B6D4',
    borderColor: '#06B6D4',
  },
  
  // Text color variants
  textVariant_primary: {
    color: '#FFFFFF',
  },
  
  textVariant_secondary: {
    color: '#374151',
  },
  
  textVariant_outline: {
    color: '#374151',
  },
  
  textVariant_ghost: {
    color: '#374151',
  },
  
  textVariant_danger: {
    color: '#FFFFFF',
  },
  
  textVariant_success: {
    color: '#FFFFFF',
  },
  
  textVariant_warning: {
    color: '#FFFFFF',
  },
  
  textVariant_info: {
    color: '#FFFFFF',
  },
  
  // Shape variants
  shape_rectangle: {
    borderRadius: 4,
  },
  
  shape_rounded: {
    borderRadius: 8,
  },
  
  shape_pill: {
    borderRadius: 999,
  },
  
  shape_circle: {
    borderRadius: 999,
    aspectRatio: 1,
  },
});

export default Button;