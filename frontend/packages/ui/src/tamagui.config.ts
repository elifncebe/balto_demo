/**
 * Tamagui configuration for the logistics platform
 * Creates a consistent design system that works across React Native and web
 */

import { createTamagui, createTokens } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/theme-base';
import { createMedia } from '@tamagui/react-native-media-driver';

import {
  colors,
  lightColors,
  darkColors,
  spacing,
  spacingNamed,
  fonts,
  radius,
  radiusNamed,
} from './theme';

// Create tokens from our theme values
const tamaguiTokens = createTokens({
  // Color tokens
  color: {
    ...colors,
  },
  
  // Spacing tokens
  space: {
    ...spacing,
    ...spacingNamed,
  },
  
  // Size tokens (used for width, height, etc.)
  size: {
    ...spacing,
    ...spacingNamed,
  },
  
  // Radius tokens
  radius: {
    ...radius,
    ...radiusNamed,
  },
  
  // Z-index tokens
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    max: 999,
  },
});

// Create themes using our color palettes
const tamaguiThemes = {
  // Light theme
  light: {
    background: lightColors.background,
    backgroundHover: lightColors.primaryDark,
    backgroundPress: lightColors.primaryDark,
    backgroundFocus: lightColors.primaryDark,
    color: lightColors.text,
    colorHover: lightColors.secondary,
    colorPress: lightColors.secondary,
    colorFocus: lightColors.secondary,
    borderColor: lightColors.border,
    borderColorHover: lightColors.neutralLight,
    borderColorFocus: lightColors.accent,
    borderColorPress: lightColors.accent,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowColorHover: 'rgba(0,0,0,0.2)',
    shadowColorPress: 'rgba(0,0,0,0.3)',
    shadowColorFocus: 'rgba(0,0,0,0.3)',
  },
  
  // Dark theme
  dark: {
    background: darkColors.background,
    backgroundHover: darkColors.darkLight,
    backgroundPress: darkColors.darkLight,
    backgroundFocus: darkColors.darkLight,
    color: darkColors.text,
    colorHover: darkColors.primary,
    colorPress: darkColors.primary,
    colorFocus: darkColors.primary,
    borderColor: darkColors.border,
    borderColorHover: darkColors.neutralLight,
    borderColorFocus: darkColors.accent,
    borderColorPress: darkColors.accent,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowColorHover: 'rgba(0,0,0,0.4)',
    shadowColorPress: 'rgba(0,0,0,0.5)',
    shadowColorFocus: 'rgba(0,0,0,0.5)',
  },
  
  // Customer theme (for customer-facing UI)
  customer: {
    background: lightColors.background,
    backgroundHover: lightColors.primaryDark,
    backgroundPress: lightColors.primaryDark,
    backgroundFocus: lightColors.primaryDark,
    color: lightColors.text,
    colorHover: lightColors.secondary,
    colorPress: lightColors.secondary,
    colorFocus: lightColors.secondary,
    borderColor: lightColors.border,
    borderColorHover: lightColors.neutralLight,
    borderColorFocus: colors.customer,
    borderColorPress: colors.customer,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowColorHover: 'rgba(0,0,0,0.2)',
    shadowColorPress: 'rgba(0,0,0,0.3)',
    shadowColorFocus: 'rgba(0,0,0,0.3)',
    accent: colors.customer,
  },
  
  // Broker theme (for broker-facing UI)
  broker: {
    background: lightColors.background,
    backgroundHover: lightColors.primaryDark,
    backgroundPress: lightColors.primaryDark,
    backgroundFocus: lightColors.primaryDark,
    color: lightColors.text,
    colorHover: lightColors.secondary,
    colorPress: lightColors.secondary,
    colorFocus: lightColors.secondary,
    borderColor: lightColors.border,
    borderColorHover: lightColors.neutralLight,
    borderColorFocus: colors.broker,
    borderColorPress: colors.broker,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowColorHover: 'rgba(0,0,0,0.2)',
    shadowColorPress: 'rgba(0,0,0,0.3)',
    shadowColorFocus: 'rgba(0,0,0,0.3)',
    accent: colors.broker,
  },
};

// Create the Tamagui configuration
const config = createTamagui({
  // Use our custom tokens
  tokens: tamaguiTokens,
  
  // Use our custom themes
  themes: tamaguiThemes,
  
  // Use Inter font
  fonts: {
    ...fonts,
    heading: fonts.body,
    body: fonts.body,
  },
  
  // Add shorthands for common style properties
  shorthands,
  
  // Configure media queries for responsive design
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 661 },
    gtSm: { minWidth: 801 },
    gtMd: { minWidth: 1021 },
    gtLg: { minWidth: 1281 },
    gtXl: { minWidth: 1421 },
    short: { maxHeight: 820 },
    tall: { minHeight: 821 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
  
  // Default animation settings
  animations: {
    fast: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
  },
});

// Export the config types
type AppConfig = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;