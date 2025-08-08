/**
 * Color palette for the logistics platform
 * Based on the specified colors from the requirements
 */

export const colors = {
  // Primary colors
  primary: '#F4F2F2', // rgba(244,242,242,1)
  primaryLight: '#FFFFFF',
  primaryDark: '#E5E3E3',
  
  // Secondary colors
  secondary: '#0D0908', // rgba(13,9,8,1)
  secondaryLight: '#2D2928',
  secondaryDark: '#000000',
  
  // Dark colors
  dark: '#181818', // rgba(24,24,24,1)
  darkLight: '#383838',
  darkDark: '#080808',
  
  // Accent colors
  accent: '#BA3139', // rgba(186,49,57,1)
  accentLight: '#D45A61',
  accentDark: '#9A2129',
  
  // Neutral colors
  neutral: '#696B6F', // rgba(105,107,111,1)
  neutralLight: '#898B8F',
  neutralDark: '#494B4F',
  neutralAlpha32: 'rgba(105,107,111,0.32)',
  neutralAlpha12: 'rgba(105,107,111,0.12)',
  
  // Semantic colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
  
  // Base colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Role-specific colors
  customer: '#BA3139', // Accent color for customer-facing UI
  broker: '#0D0908',   // Secondary color for broker-facing UI
};

// Color scheme for light mode
export const lightColors = {
  ...colors,
  background: colors.primary,
  foreground: colors.secondary,
  card: colors.white,
  text: colors.secondary,
  border: colors.neutralAlpha32,
  notification: colors.accent,
};

// Color scheme for dark mode
export const darkColors = {
  ...colors,
  background: colors.dark,
  foreground: colors.primary,
  card: colors.secondary,
  text: colors.primary,
  border: colors.neutralAlpha32,
  notification: colors.accent,
};

export default colors;