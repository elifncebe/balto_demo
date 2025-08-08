import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '@logistics/features';
import { colors } from '@logistics/ui';

// Import screens (these would be implemented later)
// Auth screens
const LoginScreen = () => <React.Fragment />;
const RegisterScreen = () => <React.Fragment />;

// Main screens
const DashboardScreen = () => <React.Fragment />;
const LoadDetailsScreen = () => <React.Fragment />;
const ProfileScreen = () => <React.Fragment />;
const MessagingScreen = () => <React.Fragment />;
const NotificationsScreen = () => <React.Fragment />;

// Create navigation stacks
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth navigator (for unauthenticated users)
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.accent,
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

// Tab navigator (for authenticated users)
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = 'home';
        } else if (route.name === 'Messaging') {
          iconName = 'comments';
        } else if (route.name === 'Notifications') {
          iconName = 'bell';
        } else if (route.name === 'Profile') {
          iconName = 'user';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.neutral,
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Messaging" component={MessagingScreen} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main navigator (for authenticated users)
const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen 
      name="Main" 
      component={TabNavigator} 
      options={{ headerShown: false }}
    />
    <MainStack.Screen 
      name="LoadDetails" 
      component={LoadDetailsScreen} 
      options={{ title: 'Load Details' }}
    />
  </MainStack.Navigator>
);

// Root navigator
const Navigation = () => {
  const { useAuth } = auth;
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoggedIn(isAuthenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, [isAuthenticated]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return null;
  }

  // Show auth navigator for unauthenticated users, main navigator for authenticated users
  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default Navigation;