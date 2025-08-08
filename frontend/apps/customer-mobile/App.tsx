import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogisticsUIProvider } from '@logistics/ui';
import { auth, messaging, notifications, tracking } from '@logistics/features';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Import navigation
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <LogisticsUIProvider defaultTheme="customer">
          <auth.AuthProvider>
            <messaging.MessagingProvider>
              <tracking.TrackingProvider>
                <notifications.NotificationsProvider>
                  <NavigationContainer>
                    <Navigation />
                    <StatusBar style="auto" />
                  </NavigationContainer>
                </notifications.NotificationsProvider>
              </tracking.TrackingProvider>
            </messaging.MessagingProvider>
          </auth.AuthProvider>
        </LogisticsUIProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}