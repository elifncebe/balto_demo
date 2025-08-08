import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { 
  Card, 
  Button, 
  H3, 
  H4, 
  Body1, 
  Caption, 
  LoadingIndicator,
  colors,
  spacing
} from '@logistics/ui';
import { apiService } from '@logistics/utils';
import { Load, LoadStatus } from '@logistics/utils';
import { messaging } from '@logistics/features';

type RootStackParamList = {
  Dashboard: undefined;
  LoadDetails: { loadId: string };
  Profile: undefined;
};

type LoadDetailsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LoadDetails'>;
  route: RouteProp<RootStackParamList, 'LoadDetails'>;
};

const LoadDetailsScreen: React.FC<LoadDetailsScreenProps> = ({ route, navigation }) => {
  const { loadId } = route.params;
  const [load, setLoad] = useState<Load | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { useChat } = messaging;
  const { messages, sendMessage } = useChat(loadId);

  // Fetch load details on component mount
  useEffect(() => {
    fetchLoadDetails();
  }, [loadId]);

  // Fetch load details from API
  const fetchLoadDetails = async () => {
    try {
      setIsLoading(true);
      
      // This would be a real API call in production
      // const response = await apiService.get(`/api/loads/${loadId}`);
      // setLoad(response.data);
      
      // For now, use mock data
      setTimeout(() => {
        // Find the load based on the ID
        const mockLoad: Load = {
          id: loadId,
          reference: `LOAD-${loadId.padStart(3, '0')}`,
          status: loadId === '1' ? LoadStatus.PENDING : 
                  loadId === '2' ? LoadStatus.IN_TRANSIT : 
                  LoadStatus.DELIVERED,
          description: 'Shipment of electronics equipment',
          pickupLocation: loadId === '1' ? 'New York, NY' : 
                         loadId === '2' ? 'Chicago, IL' : 
                         'San Francisco, CA',
          pickupDate: loadId === '1' ? '2025-08-10T10:00:00' : 
                     loadId === '2' ? '2025-08-09T08:00:00' : 
                     '2025-08-05T09:00:00',
          pickupContact: 'John Smith',
          pickupNotes: 'Call 30 minutes before arrival',
          deliveryLocation: loadId === '1' ? 'Boston, MA' : 
                           loadId === '2' ? 'Detroit, MI' : 
                           'Los Angeles, CA',
          deliveryDate: loadId === '1' ? '2025-08-11T14:00:00' : 
                       loadId === '2' ? '2025-08-09T16:00:00' : 
                       '2025-08-05T17:00:00',
          deliveryContact: 'Jane Doe',
          deliveryNotes: 'Delivery dock closes at 6 PM',
          commodity: 'Electronics',
          weight: 2500,
          equipmentType: 'Dry Van',
          specialInstructions: 'Handle with care. Temperature sensitive.',
          rate: 1850.00,
          paymentTerms: 'Net 30',
          customerId: 'customer-1',
          carrierId: loadId === '1' ? undefined : 'carrier-1',
          brokerId: 'broker-1',
        };
        
        setLoad(mockLoad);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching load details:', error);
      Alert.alert(
        'Error',
        'Failed to load shipment details. Please try again later.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      setIsLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

  // Handle cancel load
  const handleCancelLoad = () => {
    Alert.alert(
      'Cancel Shipment',
      'Are you sure you want to cancel this shipment?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes', 
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              
              // This would be a real API call in production
              // await apiService.patch(`/api/loads/${loadId}/cancel`);
              
              // For now, just simulate the API call
              setTimeout(() => {
                Alert.alert(
                  'Success',
                  'Shipment has been cancelled successfully.',
                  [{ text: 'OK', onPress: () => navigation.goBack() }]
                );
              }, 1000);
            } catch (error) {
              console.error('Error cancelling load:', error);
              Alert.alert(
                'Error',
                'Failed to cancel shipment. Please try again later.',
                [{ text: 'OK' }]
              );
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };

  // Handle contact broker
  const handleContactBroker = () => {
    Alert.alert(
      'Contact Broker',
      'This feature is coming soon!',
      [{ text: 'OK' }]
    );
  };

  // Render loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LoadingIndicator size="large" />
      </SafeAreaView>
    );
  }

  // Render error state if load is null
  if (!load) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <H4>Shipment Not Found</H4>
        <Button 
          variant="outline" 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Go Back
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.headerCard}>
          <View style={styles.headerRow}>
            <H3>{load.reference || `Load #${load.id}`}</H3>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(load.status) }
            ]}>
              <Caption style={styles.statusText}>{load.status}</Caption>
            </View>
          </View>
          
          {load.description && (
            <Body1 style={styles.description}>{load.description}</Body1>
          )}
        </Card>
        
        <Card style={styles.detailsCard}>
          <H4 style={styles.sectionTitle}>Shipment Details</H4>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Commodity:</Caption>
            <Body1>{load.commodity || 'N/A'}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Weight:</Caption>
            <Body1>{load.weight ? `${load.weight} lbs` : 'N/A'}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Equipment Type:</Caption>
            <Body1>{load.equipmentType || 'N/A'}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Special Instructions:</Caption>
            <Body1>{load.specialInstructions || 'None'}</Body1>
          </View>
        </Card>
        
        <Card style={styles.locationCard}>
          <H4 style={styles.sectionTitle}>Pickup Information</H4>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Location:</Caption>
            <Body1>{load.pickupLocation || 'N/A'}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Date & Time:</Caption>
            <Body1>{formatDate(load.pickupDate)}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Contact:</Caption>
            <Body1>{load.pickupContact || 'N/A'}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Notes:</Caption>
            <Body1>{load.pickupNotes || 'None'}</Body1>
          </View>
        </Card>
        
        <Card style={styles.locationCard}>
          <H4 style={styles.sectionTitle}>Delivery Information</H4>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Location:</Caption>
            <Body1>{load.deliveryLocation || 'N/A'}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Date & Time:</Caption>
            <Body1>{formatDate(load.deliveryDate)}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Contact:</Caption>
            <Body1>{load.deliveryContact || 'N/A'}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Notes:</Caption>
            <Body1>{load.deliveryNotes || 'None'}</Body1>
          </View>
        </Card>
        
        <Card style={styles.pricingCard}>
          <H4 style={styles.sectionTitle}>Pricing Information</H4>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Rate:</Caption>
            <Body1>${load.rate?.toFixed(2) || 'N/A'}</Body1>
          </View>
          
          <View style={styles.detailRow}>
            <Caption style={styles.detailLabel}>Payment Terms:</Caption>
            <Body1>{load.paymentTerms || 'N/A'}</Body1>
          </View>
        </Card>
        
        <View style={styles.buttonContainer}>
          {load.status === LoadStatus.PENDING && (
            <Button
              variant="outline"
              style={styles.actionButton}
              onPress={handleCancelLoad}
            >
              Cancel Shipment
            </Button>
          )}
          
          <Button
            style={styles.actionButton}
            onPress={handleContactBroker}
          >
            Contact Broker
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  headerCard: {
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  description: {
    marginTop: spacing.sm,
    color: colors.grey,
  },
  detailsCard: {
    marginBottom: spacing.md,
  },
  locationCard: {
    marginBottom: spacing.md,
  },
  pricingCard: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.accent,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    width: 140,
    color: colors.grey,
  },
  buttonContainer: {
    marginBottom: spacing.xl,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  backButton: {
    marginTop: spacing.md,
    minWidth: 120,
  },
});

export default LoadDetailsScreen;