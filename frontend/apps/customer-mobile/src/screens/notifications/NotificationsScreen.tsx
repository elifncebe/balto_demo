import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { 
  Card, 
  H3, 
  H4, 
  Body1, 
  Caption, 
  LoadingIndicator,
  colors,
  spacing
} from '@logistics/ui';
import { notifications } from '@logistics/features';
import { apiService } from '@logistics/utils';

type RootStackParamList = {
  Dashboard: undefined;
  LoadDetails: { loadId: string };
  Profile: undefined;
  Messaging: undefined;
  Notifications: undefined;
};

type NotificationsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Notifications'>;
};

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  relatedEntityId?: string;
  relatedEntityType?: 'LOAD' | 'MESSAGE' | 'USER';
  timestamp: string;
  isRead: boolean;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      
      // This would be a real API call in production
      // const response = await apiService.get('/api/notifications');
      // setNotifications(response.data);
      
      // For now, use mock data
      setTimeout(() => {
        const mockNotifications: Notification[] = [
          {
            id: '1',
            title: 'Load Status Updated',
            message: 'Your load LOAD-002 is now in transit.',
            type: 'INFO',
            relatedEntityId: '2',
            relatedEntityType: 'LOAD',
            timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
            isRead: false,
          },
          {
            id: '2',
            title: 'New Message',
            message: 'You have a new message from your broker regarding LOAD-001.',
            type: 'INFO',
            relatedEntityId: '1',
            relatedEntityType: 'MESSAGE',
            timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(), // 2 hours ago
            isRead: false,
          },
          {
            id: '3',
            title: 'Delivery Confirmed',
            message: 'Your load LOAD-003 has been delivered successfully.',
            type: 'SUCCESS',
            relatedEntityId: '3',
            relatedEntityType: 'LOAD',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(), // 2 days ago
            isRead: true,
          },
          {
            id: '4',
            title: 'Payment Processed',
            message: 'Payment for LOAD-003 has been processed.',
            type: 'SUCCESS',
            relatedEntityId: '3',
            relatedEntityType: 'LOAD',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(), // 3 days ago
            isRead: true,
          },
          {
            id: '5',
            title: 'Pickup Delayed',
            message: 'The pickup for LOAD-001 has been delayed by 1 hour.',
            type: 'WARNING',
            relatedEntityId: '1',
            relatedEntityType: 'LOAD',
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60000).toISOString(), // 4 days ago
            isRead: true,
          },
        ];
        
        setNotifications(mockNotifications);
        setIsLoading(false);
        setIsRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert(
        'Error',
        'Failed to load notifications. Please try again later.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchNotifications();
  };

  // Mark notification as read
  const markAsRead = async (notification: Notification) => {
    try {
      // This would be a real API call in production
      // await apiService.patch(`/api/notifications/${notification.id}/read`);
      
      // For now, just update the local state
      setNotifications(
        notifications.map(n => 
          n.id === notification.id 
            ? { ...n, isRead: true } 
            : n
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Handle notification press
  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    markAsRead(notification);
    
    // Navigate based on notification type
    if (notification.relatedEntityType === 'LOAD' && notification.relatedEntityId) {
      navigation.navigate('LoadDetails', { loadId: notification.relatedEntityId });
    } else if (notification.relatedEntityType === 'MESSAGE' && notification.relatedEntityId) {
      navigation.navigate('Messaging');
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this week, show day name
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Get icon and color based on notification type
  const getNotificationTypeInfo = (type: Notification['type']) => {
    switch (type) {
      case 'INFO':
        return { icon: 'information-circle', color: colors.info };
      case 'WARNING':
        return { icon: 'warning', color: colors.warning };
      case 'ERROR':
        return { icon: 'alert-circle', color: colors.error };
      case 'SUCCESS':
        return { icon: 'checkmark-circle', color: colors.success };
      default:
        return { icon: 'information-circle', color: colors.info };
    }
  };

  // Render notification item
  const renderNotificationItem = ({ item }: { item: Notification }) => {
    const { icon, color } = getNotificationTypeInfo(item.type);
    
    return (
      <TouchableOpacity onPress={() => handleNotificationPress(item)}>
        <Card style={[
          styles.notificationCard,
          !item.isRead && styles.unreadCard
        ]}>
          <View style={styles.notificationHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={24} color={color} />
            </View>
            <View style={styles.notificationContent}>
              <Body1 
                style={[
                  styles.notificationTitle,
                  !item.isRead && styles.unreadText
                ]}
              >
                {item.title}
              </Body1>
              <Body1 style={styles.notificationMessage}>{item.message}</Body1>
            </View>
            <Caption style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Caption>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <H4 style={styles.emptyText}>No notifications</H4>
      <Body1 style={styles.emptySubtext}>
        You don't have any notifications at the moment.
      </Body1>
    </View>
  );

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      // This would be a real API call in production
      // await apiService.patch('/api/notifications/read-all');
      
      // For now, just update the local state
      setNotifications(
        notifications.map(n => ({ ...n, isRead: true }))
      );
      
      Alert.alert(
        'Success',
        'All notifications marked as read.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      Alert.alert(
        'Error',
        'Failed to mark notifications as read. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <H3 style={styles.title}>Notifications</H3>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Body1 style={styles.markAllRead}>Mark all as read</Body1>
          </TouchableOpacity>
        )}
      </View>
      
      {isLoading && !isRefreshing ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
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
  markAllRead: {
    color: colors.accent,
  },
  listContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  notificationCard: {
    marginBottom: spacing.md,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  unreadText: {
    color: colors.darkGrey,
  },
  notificationMessage: {
    color: colors.grey,
  },
  timestamp: {
    marginLeft: spacing.sm,
    color: colors.grey,
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
    color: colors.grey,
  },
});

export default NotificationsScreen;