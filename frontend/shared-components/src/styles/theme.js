/**
 * Shared theme for the logistics platform
 * This theme is designed to work with both React Native and React JS
 */

// Colors
export const colors = {
  // Primary colors
  primary: '#0066CC',
  primaryLight: '#4D94DB',
  primaryDark: '#004C99',
  
  // Secondary colors
  secondary: '#FF9900',
  secondaryLight: '#FFAD33',
  secondaryDark: '#CC7A00',
  
  // Accent colors
  accent: '#00CC99',
  accentLight: '#33DBAD',
  accentDark: '#00997A',
  
  // Semantic colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
  
  // Neutral colors
  black: '#000000',
  darkGrey: '#333333',
  grey: '#666666',
  lightGrey: '#CCCCCC',
  white: '#FFFFFF',
  
  // Role-specific colors
  customer: '#0066CC', // Primary color for customer-facing UI
  broker: '#FF9900',   // Secondary color for broker-facing UI
};

// Typography
export const typography = {
  fontFamily: {
    // For web
    web: {
      regular: 'Roboto, sans-serif',
      medium: 'Roboto Medium, sans-serif',
      bold: 'Roboto Bold, sans-serif',
    },
    // For React Native
    native: {
      regular: 'Roboto',
      medium: 'Roboto-Medium',
      bold: 'Roboto-Bold',
    },
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Shadows (for web)
export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  md: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
  lg: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
  xl: '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
};

// Elevation (for React Native)
export const elevation = {
  sm: 2,
  md: 4,
  lg: 8,
  xl: 16,
};

// Combined theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  elevation,
};

export default theme;