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

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { useAuth } = auth;
  const { login } = useAuth();

  // Validate form inputs
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (!success) {
        Alert.alert(
          'Login Failed',
          'Invalid email or password. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      
      Alert.alert(
        'Login Failed',
        'An error occurred during login. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to registration screen
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
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