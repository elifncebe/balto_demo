/**
 * Spacing scale for the logistics platform
 * Defines consistent spacing values for margins, paddings, and gaps
 */

export const spacing = {
  // Base spacing scale
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
};

// Named spacing values for semantic usage
export const spacingNamed = {
  // Commonly used spacing values
  none: spacing[0],
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
  xl: spacing[8],
  xxl: spacing[12],
  xxxl: spacing[16],
  
  // Component-specific spacing
  buttonPaddingHorizontal: spacing[4],
  buttonPaddingVertical: spacing[2],
  inputPaddingHorizontal: spacing[3],
  inputPaddingVertical: spacing[2],
  cardPadding: spacing[4],
  containerPadding: spacing[4],
  sectionGap: spacing[6],
  itemGap: spacing[2],
};

export default spacing;