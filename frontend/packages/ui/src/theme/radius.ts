/**
 * Border radius definitions for the logistics platform
 * Defines consistent border radius values for UI elements
 */

// Base radius scale
export const radius = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 16,
  8: 20,
  9: 24,
  10: 32,
  11: 40,
  12: 48,
  full: 9999,
};

// Named radius values for semantic usage
export const radiusNamed = {
  none: radius[0],
  xs: radius[1],
  sm: radius[2],
  md: radius[4],
  lg: radius[6],
  xl: radius[8],
  xxl: radius[10],
  pill: radius[full],
  
  // Component-specific radius
  button: radius[4],
  input: radius[3],
  card: radius[5],
  chip: radius[full],
  avatar: radius[full],
  modal: radius[6],
  toast: radius[4],
};

export default radius;