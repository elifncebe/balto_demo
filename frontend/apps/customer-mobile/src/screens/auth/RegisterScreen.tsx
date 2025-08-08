import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  Button, 
  Card, 
  Input, 
  H2, 
  Body1, 
  LoadingIndicator,
  colors,
  spacing
} from '@logistics/ui';
import { auth } from '@logistics/features';
import { Role } from '@logistics/utils';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Register'>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { useAuth } = auth;
  const { register } = useAuth();

  // Validate form inputs
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
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
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle registration
  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Register as a customer
      const success = await register(name, email, password, Role.CUSTOMER);
      
      if (success) {
        Alert.alert(
          'Registration Successful',
          'Your customer account has been created successfully.',
          [
            { 
              text: 'OK', 
              onPress: () => {
                // Navigate back to login screen
                navigation.navigate('Login');
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Registration Failed',
          'Could not create account. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      Alert.alert(
        'Registration Failed',
        'An error occurred during registration. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate back to login screen
  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <H2 style={styles.title}>Create Customer Account</H2>
        <Body1 style={styles.subtitle}>
          Register as a customer to start shipping your loads.
        </Body1>
        
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        
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
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        
        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />
        
        <Button
          onPress={handleRegister}
          disabled={isLoading}
          fullWidth
          style={styles.registerButton}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        {isLoading && <LoadingIndicator size="small" style={styles.loader} />}
        
        <View style={styles.loginContainer}>
          <Body1>Already have an account? </Body1>
          <Button variant="text" onPress={handleBackToLogin}>
            Login
          </Button>
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    padding: spacing.md,
    justifyContent: 'center',
  },
  card: {
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
    textAlign: 'center',
    color: colors.accent,
  },
  subtitle: {
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.grey,
  },
  registerButton: {
    marginTop: spacing.md,
  },
  loader: {
    marginTop: spacing.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});

export default RegisterScreen;