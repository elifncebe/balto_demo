import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Card, 
  Button, 
  H3, 
  H4, 
  Body1, 
  Caption, 
  LoadingIndicator 
} from 'shared-components';
import { apiService } from 'shared-components/src/utils/api';
import { colors, spacing } from 'shared-components/src/styles/theme';

const LoadDetailsScreen = ({ route, navigation }) => {
  const { loadId } = route.params;
  const [load, setLoad] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch load details on component mount
  useEffect(() => {
    fetchLoadDetails();
  }, [loadId]);

  // Fetch load details from API
  const fetchLoadDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get(`/api/loads/${loadId}`);
      setLoad(response.data);
    } catch (error) {
      console.error('Error fetching load details:', error);
      Alert.alert(
        'Error',
        'Failed to load shipment details. Please try again later.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
              await apiService.patch(`/api/loads/${loadId}/cancel`);
              Alert.alert(
                'Success',
                'Shipment has been cancelled successfully.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
              );
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
        
        {load.status === 'PENDING' && (
          <Button
            variant="outline"
            style={styles.cancelButton}
            onPress={handleCancelLoad}
          >
            Cancel Shipment
          </Button>
        )}
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
    color: colors.customer,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    width: 140,
    color: colors.grey,
  },
  cancelButton: {
    marginBottom: spacing.xl,
  },
  backButton: {
    marginTop: spacing.md,
    minWidth: 120,
  },
});

export default LoadDetailsScreen;