import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Button, 
  Input, 
  Card, 
  Typography, 
  H2, 
  Body1, 
  LoadingIndicator 
} from 'shared-components';
import { login, isCustomer } from 'shared-components/src/utils/auth';
import { colors, spacing } from 'shared-components/src/styles/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Attempt to login
      await login(email, password);
      
      // Check if user is a customer
      const customer = await isCustomer();
      
      if (!customer) {
        Alert.alert(
          'Access Denied',
          'This app is for customers only. Please use the appropriate app for your role.',
          [{ text: 'OK' }]
        );
        setIsLoading(false);
        return;
      }
      
      // Login successful - navigation will be handled by App.js
    } catch (error) {
      console.error('Login error:', error);
      
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Invalid email or password. Please try again.',
        [{ text: 'OK' }]
      );
      
      setIsLoading(false);
    }
  };

  // Navigate to registration screen
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
            {/* Replace with your actual logo */}
            <View style={styles.logoPlaceholder}>
              <H2 color={colors.customer}>LOGISTICS</H2>
            </View>
          </View>
          
          <Card style={styles.card}>
            <H2 style={styles.title}>Customer Login</H2>
            <Body1 style={styles.subtitle}>
              Welcome back! Please log in to your customer account.
            </Body1>
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />
            
            <Button
              onPress={handleLogin}
              disabled={isLoading}
              fullWidth
              style={styles.loginButton}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            
            {isLoading && <LoadingIndicator size="small" style={styles.loader} />}
            
            <View style={styles.registerContainer}>
              <Body1>Don't have an account? </Body1>
              <Button variant="text" onPress={handleRegister}>
                Register
              </Button>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoPlaceholder: {
    width: 200,
    height: 80,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  card: {
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
    textAlign: 'center',
    color: colors.customer,
  },
  subtitle: {
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.grey,
  },
  loginButton: {
    marginTop: spacing.md,
  },
  loader: {
    marginTop: spacing.md,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});

export default LoginScreen;