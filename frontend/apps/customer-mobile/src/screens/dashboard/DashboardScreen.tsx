import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  Button, 
  Card, 
  H2, 
  H4, 
  Body1, 
  Caption, 
  LoadingIndicator,
  colors,
  spacing
} from '@logistics/ui';
import { auth } from '@logistics/features';
import { apiService } from '@logistics/utils';
import { Load, LoadStatus } from '@logistics/utils';

type RootStackParamList = {
  Dashboard: undefined;
  LoadDetails: { loadId: string };
  Profile: undefined;
};

type DashboardScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const { useAuth } = auth;
  const { logout, user } = useAuth();

  // Fetch user info and loads on component mount
  useEffect(() => {
    fetchUserInfo();
    fetchLoads();
  }, []);

  // Fetch user information
  const fetchUserInfo = async () => {
    try {
      // In a real implementation, this would come from the auth context
      // or from an API call
      setUserInfo(user || { name: 'Customer', email: 'customer@example.com' });
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert(
        'Error',
        'Failed to load user information. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };

  // Fetch customer loads
  const fetchLoads = async () => {
    try {
      setIsLoading(true);
      
      // This would be a real API call in production
      // const response = await apiService.get('/api/loads/customer');
      // setLoads(response.data);
      
      // For now, use mock data
      setTimeout(() => {
        setLoads([
          {
            id: '1',
            reference: 'LOAD-001',
            status: LoadStatus.PENDING,
            pickupLocation: 'New York, NY',
            pickupDate: '2025-08-10T10:00:00',
            deliveryLocation: 'Boston, MA',
            deliveryDate: '2025-08-11T14:00:00',
            customerId: 'customer-1',
          },
          {
            id: '2',
            reference: 'LOAD-002',
            status: LoadStatus.IN_TRANSIT,
            pickupLocation: 'Chicago, IL',
            pickupDate: '2025-08-09T08:00:00',
            deliveryLocation: 'Detroit, MI',
            deliveryDate: '2025-08-09T16:00:00',
            customerId: 'customer-1',
          },
          {
            id: '3',
            reference: 'LOAD-003',
            status: LoadStatus.DELIVERED,
            pickupLocation: 'San Francisco, CA',
            pickupDate: '2025-08-05T09:00:00',
            deliveryLocation: 'Los Angeles, CA',
            deliveryDate: '2025-08-05T17:00:00',
            customerId: 'customer-1',
          },
        ]);
        setIsLoading(false);
        setIsRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching loads:', error);
      Alert.alert(
        'Error',
        'Failed to load your shipments. Please try again later.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchLoads();
  };

  // Handle load selection
  const handleLoadSelect = (load: Load) => {
    navigation.navigate('LoadDetails', { loadId: load.id });
  };

  // Handle profile navigation
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: async () => {
            try {
              await logout();
              // App.js will handle navigation after logout
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        }
      ]
    );
  };

  // Render load item
  const renderLoadItem = ({ item }: { item: Load }) => (
    <TouchableOpacity onPress={() => handleLoadSelect(item)}>
      <Card style={styles.loadCard}>
        <View style={styles.loadHeader}>
          <H4>{item.reference || `Load #${item.id}`}</H4>
          <Caption style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            {item.status}
          </Caption>
        </View>
        
        <View style={styles.loadDetails}>
          <View style={styles.locationContainer}>
            <Body1 style={styles.locationLabel}>Pickup:</Body1>
            <Body1>{item.pickupLocation}</Body1>
            <Caption>{formatDate(item.pickupDate)}</Caption>
          </View>
          
          <View style={styles.locationContainer}>
            <Body1 style={styles.locationLabel}>Delivery:</Body1>
            <Body1>{item.deliveryLocation}</Body1>
            <Caption>{formatDate(item.deliveryDate)}</Caption>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  // Get color based on load status
  const getStatusColor = (status: LoadStatus) => {
    switch (status) {
      case LoadStatus.PENDING:
        return colors.warning;
      case LoadStatus.IN_TRANSIT:
        return colors.info;
      case LoadStatus.DELIVERED:
        return colors.success;
      case LoadStatus.CANCELLED:
        return colors.error;
      default:
        return colors.grey;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <H4 style={styles.emptyText}>No loads found</H4>
      <Body1 style={styles.emptySubtext}>
        You don't have any active shipments at the moment.
      </Body1>
      <Button 
        variant="outline" 
        onPress={handleRefresh}
        style={styles.refreshButton}
      >
        Refresh
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <H2 style={styles.title}>My Shipments</H2>
        <View style={styles.headerButtons}>
          <Button 
            variant="outline" 
            size="sm" 
            onPress={handleProfilePress}
            style={styles.profileButton}
          >
            Profile
          </Button>
          <Button 
            variant="text" 
            size="sm" 
            onPress={handleLogout}
          >
            Logout
          </Button>
        </View>
      </View>
      
      {userInfo && (
        <Card variant="outlined" style={styles.welcomeCard}>
          <Body1>Welcome back, <Body1 style={styles.userName}>{userInfo.name}</Body1></Body1>
          <Caption>You have {loads.length} active shipment(s)</Caption>
        </Card>
      )}
      
      {isLoading && !isRefreshing ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={loads}
          renderItem={renderLoadItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[colors.accent]}
              tintColor={colors.accent}
            />
          }
        />
      )}
      
      <Button
        style={styles.createButton}
        onPress={() => Alert.alert('Create Shipment', 'This feature is coming soon!')}
      >
        Create New Shipment
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  title: {
    color: colors.accent,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    marginRight: spacing.sm,
  },
  welcomeCard: {
    margin: spacing.md,
  },
  userName: {
    fontWeight: 'bold',
  },
  listContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  loadCard: {
    marginBottom: spacing.md,
  },
  loadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    overflow: 'hidden',
    color: colors.white,
  },
  loadDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.grey,
  },
  refreshButton: {
    minWidth: 120,
  },
  createButton: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    left: spacing.lg,
  },
});

export default DashboardScreen;