import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Card, 
  Button, 
  H2, 
  H4, 
  Body1, 
  Caption, 
  LoadingIndicator 
} from 'shared-components';
import { logout } from 'shared-components/src/utils/auth';
import { apiService } from 'shared-components/src/utils/api';
import { colors, spacing } from 'shared-components/src/styles/theme';

const DashboardScreen = ({ navigation }) => {
  const [loads, setLoads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Fetch user info and loads on component mount
  useEffect(() => {
    fetchUserInfo();
    fetchLoads();
  }, []);

  // Fetch user information
  const fetchUserInfo = async () => {
    try {
      const response = await apiService.get('/api/users/me');
      setUserInfo(response.data);
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
      const response = await apiService.get('/api/loads/customer');
      setLoads(response.data);
    } catch (error) {
      console.error('Error fetching loads:', error);
      Alert.alert(
        'Error',
        'Failed to load your shipments. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
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
  const handleLoadSelect = (load) => {
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
  const renderLoadItem = ({ item }) => (
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
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return colors.warning;
      case 'IN_TRANSIT':
        return colors.info;
      case 'DELIVERED':
        return colors.success;
      case 'CANCELLED':
        return colors.error;
      default:
        return colors.grey;
    }
  };

  // Format date
  const formatDate = (dateString) => {
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
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[colors.customer]}
              tintColor={colors.customer}
            />
          }
        />
      )}
      
      <Button
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateLoad')}
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
    color: colors.customer,
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