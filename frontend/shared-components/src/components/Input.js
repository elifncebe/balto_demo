import React from 'react';
import { Platform, TextInput, View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, elevation } from '../styles/theme';

/**
 * Input component that works in both React Native and React Web
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.value - Input value
 * @param {Function} props.onChangeText - Function to call when input value changes
 * @param {boolean} props.secureTextEntry - Whether the input should hide text (for passwords)
 * @param {string} props.error - Error message to display
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {string} props.keyboardType - Keyboard type (numeric, email-address, etc.)
 * @param {Object} props.style - Additional styles for the input container
 * @param {Object} props.inputStyle - Additional styles for the input element
 */
export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  disabled = false,
  keyboardType = 'default',
  style,
  inputStyle,
  ...props
}) => {
  // Get styles
  const styles = getStyles();
  
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          inputStyle,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        keyboardType={keyboardType}
        placeholderTextColor={colors.grey}
        {...props}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

/**
 * Get component styles
 */
const getStyles = () => {
  return {
    container: {
      marginBottom: spacing.md,
      width: '100%',
    },
    label: {
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.medium : typography.fontFamily.native.medium,
      fontSize: typography.fontSize.sm,
      color: colors.darkGrey,
      marginBottom: spacing.xs,
    },
    input: {
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.regular : typography.fontFamily.native.regular,
      fontSize: typography.fontSize.md,
      color: colors.black,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: borderRadius.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.white,
      ...(Platform.OS === 'web' ? {
        outline: 'none',
        boxShadow: 'none',
      } : {
        elevation: 0,
      }),
    },
    inputError: {
      borderColor: colors.error,
    },
    inputDisabled: {
      backgroundColor: colors.lightGrey,
      opacity: 0.7,
    },
    errorText: {
      fontFamily: Platform.OS === 'web' ? typography.fontFamily.web.regular : typography.fontFamily.native.regular,
      fontSize: typography.fontSize.sm,
      color: colors.error,
      marginTop: spacing.xs,
    },
  };
};

export default Input;