import React from 'react';
import { Platform, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../styles/theme';

/**
 * Typography components for consistent text styling across platforms
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Text content
 * @param {string} props.variant - Typography variant: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'button'
 * @param {string} props.color - Text color
 * @param {string} props.align - Text alignment: 'left', 'center', 'right'
 * @param {boolean} props.bold - Whether the text should be bold
 * @param {Object} props.style - Additional styles for the text
 */
export const Typography = ({
  children,
  variant = 'body1',
  color,
  align,
  bold = false,
  style,
  ...props
}) => {
  // Get styles based on variant
  const textStyles = getTextStyles(variant, color, align, bold);
  
  return (
    <Text style={[textStyles, style]} {...props}>
      {children}
    </Text>
  );
};

/**
 * Get text styles based on variant, color, alignment, and weight
 */
const getTextStyles = (variant, color, align, bold) => {
  // Base styles
  const baseStyles = {
    color: color || colors.darkGrey,
    textAlign: align || 'left',
    fontFamily: Platform.OS === 'web' 
      ? (bold ? typography.fontFamily.web.bold : typography.fontFamily.web.regular)
      : (bold ? typography.fontFamily.native.bold : typography.fontFamily.native.regular),
  };
  
  // Variant styles
  const variantStyles = {
    h1: {
      fontSize: typography.fontSize.xxxl,
      lineHeight: typography.lineHeight.xxxl,
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.bold : typography.fontFamily.native.bold,
    },
    h2: {
      fontSize: typography.fontSize.xxl,
      lineHeight: typography.lineHeight.xxl,
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.bold : typography.fontFamily.native.bold,
    },
    h3: {
      fontSize: typography.fontSize.xl,
      lineHeight: typography.lineHeight.xl,
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.bold : typography.fontFamily.native.bold,
    },
    h4: {
      fontSize: typography.fontSize.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.medium : typography.fontFamily.native.medium,
    },
    h5: {
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.medium : typography.fontFamily.native.medium,
    },
    h6: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.medium : typography.fontFamily.native.medium,
    },
    body1: {
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.md,
    },
    body2: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.sm,
    },
    caption: {
      fontSize: typography.fontSize.xs,
      lineHeight: typography.lineHeight.xs,
      color: colors.grey,
    },
    button: {
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.medium : typography.fontFamily.native.medium,
      textTransform: 'uppercase',
    },
  };
  
  // Merge styles
  return {
    ...baseStyles,
    ...variantStyles[variant],
  };
};

// Convenience components for different typography variants
export const H1 = (props) => <Typography variant="h1" {...props} />;
export const H2 = (props) => <Typography variant="h2" {...props} />;
export const H3 = (props) => <Typography variant="h3" {...props} />;
export const H4 = (props) => <Typography variant="h4" {...props} />;
export const H5 = (props) => <Typography variant="h5" {...props} />;
export const H6 = (props) => <Typography variant="h6" {...props} />;
export const Body1 = (props) => <Typography variant="body1" {...props} />;
export const Body2 = (props) => <Typography variant="body2" {...props} />;
export const Caption = (props) => <Typography variant="caption" {...props} />;
export const ButtonText = (props) => <Typography variant="button" {...props} />;

export default Typography;