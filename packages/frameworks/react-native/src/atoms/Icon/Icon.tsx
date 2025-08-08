/**
 * DelvUI React Native Icon Component
 * Scalable icon component using React Native Vector Icons or custom SVG
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { AtomProps } from '@delvui/core';

export interface IconProps {
  /** Icon name from built-in library */
  name: string;
  
  /** Size of the icon */
  size?: number;
  
  /** Color of the icon */
  color?: string;
  
  /** Custom style */
  style?: ViewStyle;
  
  /** Test ID for testing */
  testID?: string;
}

// Simple icon mapping - in real implementation, you'd use react-native-vector-icons or SVG
const ICON_SYMBOLS: Record<string, string> = {
  'plus': '+',
  'minus': '−',
  'x': '×',
  'check': '✓',
  'chevron-left': '‹',
  'chevron-right': '›',
  'chevron-up': '‹', // Rotated
  'chevron-down': '›', // Rotated
  'arrow-left': '←',
  'arrow-right': '→',
  'arrow-up': '↑',
  'arrow-down': '↓',
  'edit': '✎',
  'delete': '🗑',
  'settings': '⚙',
  'search': '🔍',
  'heart': '♥',
  'info': 'ℹ',
  'warning': '⚠',
  'error': '⚠',
  'success': '✓'
};

// Atomic Design Metadata
export const IconAtom: AtomProps = {
  id: 'icon-react-native',
  name: 'Icon',
  level: 'atom',
  category: 'display',
  complexity: 1,
  dependencies: [],
  baseElement: 'Text',
  version: '1.0.0',
  description: 'Scalable icon component for mobile applications (React Native)',
  tags: ['icon', 'symbol', 'graphics', 'react-native', 'mobile']
};

/**
 * Icon Component for React Native
 * 
 * Note: In a real implementation, you would typically use:
 * - react-native-vector-icons for icon fonts
 * - react-native-svg for custom SVG icons
 * - Custom icon fonts
 * 
 * This is a simplified implementation for demonstration
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = '#000000',
  style,
  testID = 'icon'
}) => {
  const iconSymbol = ICON_SYMBOLS[name];
  
  if (!iconSymbol) {
    console.warn(`Icon "${name}" not found in icon library`);
    return null;
  }

  const iconStyle: TextStyle = {
    fontSize: size,
    color,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center'
  };

  return (
    <View style={[styles.container, { width: size, height: size }, style]} testID={testID}>
      <Text style={iconStyle} testID={`${testID}-symbol`}>
        {iconSymbol}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Icon;