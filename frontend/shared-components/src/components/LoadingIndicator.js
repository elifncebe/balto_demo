import React from 'react';
import { ActivityIndicator, View, StyleSheet, Platform } from 'react-native';
import { colors, spacing } from '../styles/theme';

/**
 * LoadingIndicator component that works in both React Native and React Web
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the indicator: 'small', 'large'
 * @param {string} props.color - Color of the indicator
 * @param {boolean} props.fullScreen - Whether the indicator should take the full screen
 * @param {Object} props.style - Additional styles for the container
 */
export const LoadingIndicator = ({
  size = 'large',
  color = colors.primary,
  fullScreen = false,
  style,
  ...props
}) => {
  const styles = getStyles(fullScreen);
  
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size={size}
        color={color}
        {...props}
      />
    </View>
  );
};

/**
 * Get component styles
 */
const getStyles = (fullScreen) => {
  return {
    container: {
      padding: spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      ...(fullScreen ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 999,
      } : {}),
    },
  };
};

/**
 * FullScreenLoading component for showing a loading indicator over the entire screen
 */
export const FullScreenLoading = (props) => (
  <LoadingIndicator fullScreen {...props} />
);

export default LoadingIndicator;