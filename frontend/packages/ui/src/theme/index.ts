/**
 * Theme exports for the logistics platform
 * Centralizes all theme-related exports for easier imports
 */

import colors, { lightColors, darkColors } from './colors';
import spacing, { spacingNamed } from './spacing';
import typography, { fonts, fontSizes, fontWeights, lineHeights, textPresets } from './typography';
import radius, { radiusNamed } from './radius';

// Export individual theme modules
export {
  colors,
  lightColors,
  darkColors,
  spacing,
  spacingNamed,
  typography,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  textPresets,
  radius,
  radiusNamed,
};

// Combined theme object
export const theme = {
  colors,
  lightColors,
  darkColors,
  spacing,
  spacingNamed,
  typography,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  textPresets,
  radius,
  radiusNamed,
};

export default theme;