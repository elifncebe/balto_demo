import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { isAuthenticated, isCustomer } from 'shared-components/src/utils/auth';
import { colors } from 'shared-components/src/styles/theme';

// Import screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import LoadDetailsScreen from './src/screens/loads/LoadDetailsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import { FullScreenLoading } from 'shared-components';

// Create navigation stacks
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

// Auth navigator
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.customer,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <AuthStack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ title: 'Customer Login' }}
    />
    <AuthStack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ title: 'Create Customer Account' }}
    />
  </AuthStack.Navigator>
);

// App navigator (after authentication)
const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.customer,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <AppStack.Screen 
      name="Dashboard" 
      component={DashboardScreen} 
      options={{ title: 'Customer Dashboard' }}
    />
    <AppStack.Screen 
      name="LoadDetails" 
      component={LoadDetailsScreen} 
      options={{ title: 'Load Details' }}
    />
    <AppStack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ title: 'My Profile' }}
    />
  </AppStack.Navigator>
);

// Main app component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        const customer = await isCustomer();
        
        // Only allow customers to access this app
        setIsLoggedIn(authenticated && customer);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  if (isLoading) {
    return <FullScreenLoading />;
  }
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}