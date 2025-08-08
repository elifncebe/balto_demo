/**
 * Typography definitions for the logistics platform
 * Defines font families, sizes, weights, and line heights
 */

import { createFont } from 'tamagui';

// Font family definitions
export const fonts = {
  // Main font family (Inter)
  body: createFont({
    family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    size: {
      1: 12,
      2: 14,
      3: 16,
      4: 18,
      5: 20,
      6: 24,
      7: 28,
      8: 32,
      9: 36,
      10: 40,
      11: 48,
      12: 56,
      13: 64,
      14: 72,
    },
    weight: {
      thin: '100',
      extralight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      wider: 1,
      widest: 2,
    },
    lineHeight: {
      1: 16,
      2: 20,
      3: 24,
      4: 28,
      5: 32,
      6: 36,
      7: 40,
      8: 44,
      9: 48,
      10: 52,
      11: 60,
      12: 68,
      13: 76,
      14: 84,
    },
    transform: {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
      normal: 'none',
    },
  }),

  // Monospace font for code, etc.
  mono: createFont({
    family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: {
      1: 12,
      2: 14,
      3: 16,
      4: 18,
      5: 20,
      6: 24,
    },
    weight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
    letterSpacing: {
      normal: 0,
    },
    lineHeight: {
      1: 16,
      2: 20,
      3: 24,
      4: 28,
      5: 32,
      6: 36,
    },
    transform: {
      normal: 'none',
    },
  }),
};

// Named font sizes for semantic usage
export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Named font weights for semantic usage
export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

// Named line heights for semantic usage
export const lineHeights = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 36,
  xxxl: 44,
};

// Typography presets for common text elements
export const textPresets = {
  // Headings
  h1: {
    fontFamily: 'body',
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.xxxl,
  },
  h2: {
    fontFamily: 'body',
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.xxl,
  },
  h3: {
    fontFamily: 'body',
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.xl,
  },
  h4: {
    fontFamily: 'body',
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lg,
  },
  h5: {
    fontFamily: 'body',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.md,
  },
  h6: {
    fontFamily: 'body',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
  },
  
  // Body text
  body1: {
    fontFamily: 'body',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.md,
  },
  body2: {
    fontFamily: 'body',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.sm,
  },
  
  // Other text styles
  caption: {
    fontFamily: 'body',
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.xs,
  },
  button: {
    fontFamily: 'body',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.md,
  },
  overline: {
    fontFamily: 'body',
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.xs,
    textTransform: 'uppercase',
  },
  code: {
    fontFamily: 'mono',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.sm,
  },
};

export default {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  textPresets,
};