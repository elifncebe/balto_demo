import React from 'react';
import { Platform, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing, borderRadius, elevation, shadows } from '../styles/theme';

/**
 * Button component that works in both React Native and React Web
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'outline', 'text'
 * @param {string} props.size - Button size: 'sm', 'md', 'lg'
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onPress - Function to call when button is pressed
 * @param {React.ReactNode} props.children - Button content
 * @param {Object} props.style - Additional styles for the button
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onPress,
  children,
  style,
  ...props
}) => {
  // Get styles based on variant and size
  const buttonStyles = getButtonStyles(variant, size, fullWidth, disabled);
  
  // Use TouchableOpacity for both platforms
  return (
    <TouchableOpacity
      style={[buttonStyles.container, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={buttonStyles.text}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

/**
 * Get button styles based on variant, size, and state
 */
const getButtonStyles = (variant, size, fullWidth, disabled) => {
  // Base styles
  const baseStyles = {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.md,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
      ...getPlatformSpecificStyles(),
    },
    text: {
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.medium : typography.fontFamily.native.medium,
      textAlign: 'center',
    },
  };
  
  // Variant styles
  const variantStyles = {
    primary: {
      container: {
        backgroundColor: colors.primary,
      },
      text: {
        color: colors.white,
      },
    },
    secondary: {
      container: {
        backgroundColor: colors.secondary,
      },
      text: {
        color: colors.white,
      },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
      },
      text: {
        color: colors.primary,
      },
    },
    text: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: colors.primary,
      },
    },
  };
  
  // Size styles
  const sizeStyles = {
    sm: {
      container: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
      },
      text: {
        fontSize: typography.fontSize.sm,
      },
    },
    md: {
      container: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
      },
      text: {
        fontSize: typography.fontSize.md,
      },
    },
    lg: {
      container: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
      },
      text: {
        fontSize: typography.fontSize.lg,
      },
    },
  };
  
  // Merge all styles
  return {
    container: {
      ...baseStyles.container,
      ...variantStyles[variant].container,
      ...sizeStyles[size].container,
    },
    text: {
      ...baseStyles.text,
      ...variantStyles[variant].text,
      ...sizeStyles[size].text,
    },
  };
};

/**
 * Get platform-specific styles
 */
const getPlatformSpecificStyles = () => {
  if (Platform.OS === 'web') {
    return {
      cursor: 'pointer',
      boxShadow: shadows.sm,
      transition: 'all 0.2s ease',
      ':hover': {
        boxShadow: shadows.md,
      },
    };
  } else {
    return {
      elevation: elevation.sm,
    };
  }
};

export default Button;