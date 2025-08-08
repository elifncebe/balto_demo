import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows, elevation } from '../styles/theme';

/**
 * Card component that works in both React Native and React Web
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.variant - Card variant: 'default', 'outlined', 'elevated'
 * @param {Object} props.style - Additional styles for the card
 */
export const Card = ({
  children,
  variant = 'default',
  style,
  ...props
}) => {
  // Get styles based on variant
  const cardStyles = getCardStyles(variant);
  
  return (
    <View style={[cardStyles.container, style]} {...props}>
      {children}
    </View>
  );
};

/**
 * Get card styles based on variant
 */
const getCardStyles = (variant) => {
  // Base styles
  const baseStyles = {
    container: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginVertical: spacing.md,
      ...getPlatformSpecificStyles(variant),
    },
  };
  
  // Variant styles
  const variantStyles = {
    default: {
      container: {
        // Default styles are already in baseStyles
      },
    },
    outlined: {
      container: {
        borderWidth: 1,
        borderColor: colors.lightGrey,
        ...(Platform.OS === 'web' ? { boxShadow: 'none' } : { elevation: 0 }),
      },
    },
    elevated: {
      container: {
        ...(Platform.OS === 'web' ? { boxShadow: shadows.lg } : { elevation: elevation.lg }),
      },
    },
  };
  
  // Merge styles
  return {
    container: {
      ...baseStyles.container,
      ...variantStyles[variant].container,
    },
  };
};

/**
 * Get platform-specific styles
 */
const getPlatformSpecificStyles = (variant) => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: variant === 'outlined' ? 'none' : shadows.md,
    };
  } else {
    return {
      elevation: variant === 'outlined' ? 0 : elevation.md,
    };
  }
};

export default Card;