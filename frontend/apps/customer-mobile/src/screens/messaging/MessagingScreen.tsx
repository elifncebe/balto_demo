import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
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
import { messaging } from '@logistics/features';
import { Message, Load, LoadStatus } from '@logistics/utils';

type RootStackParamList = {
  Dashboard: undefined;
  LoadDetails: { loadId: string };
  Profile: undefined;
  Messaging: undefined;
  ChatDetail: { loadId: string };
};

type MessagingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Messaging'>;
};

interface ChatPreview {
  loadId: string;
  loadReference: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: LoadStatus;
}

const MessagingScreen: React.FC<MessagingScreenProps> = ({ navigation }) => {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch chats on component mount
  useEffect(() => {
    fetchChats();
  }, []);

  // Fetch chats from API
  const fetchChats = async () => {
    try {
      setIsLoading(true);
      
      // This would be a real API call in production
      // const response = await apiService.get('/api/messages/chats');
      // setChats(response.data);
      
      // For now, use mock data
      setTimeout(() => {
        const mockChats: ChatPreview[] = [
          {
            loadId: '1',
            loadReference: 'LOAD-001',
            lastMessage: 'Can you confirm the pickup time?',
            timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
            unreadCount: 2,
            status: LoadStatus.PENDING,
          },
          {
            loadId: '2',
            loadReference: 'LOAD-002',
            lastMessage: 'The driver is on the way.',
            timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(), // 2 hours ago
            unreadCount: 0,
            status: LoadStatus.IN_TRANSIT,
          },
          {
            loadId: '3',
            loadReference: 'LOAD-003',
            lastMessage: 'Delivery confirmed. Thank you!',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(), // 2 days ago
            unreadCount: 0,
            status: LoadStatus.DELIVERED,
          },
        ];
        
        setChats(mockChats);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching chats:', error);
      Alert.alert(
        'Error',
        'Failed to load messages. Please try again later.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
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

  // Handle chat selection
  const handleChatSelect = (chat: ChatPreview) => {
    navigation.navigate('ChatDetail', { loadId: chat.loadId });
  };

  // Render chat item
  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity onPress={() => handleChatSelect(item)}>
      <Card style={styles.chatCard}>
        <View style={styles.chatHeader}>
          <View style={styles.chatTitleContainer}>
            <H4>{item.loadReference}</H4>
            <Caption style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) }
            ]}>
              {item.status}
            </Caption>
          </View>
          <Caption>{formatTimestamp(item.timestamp)}</Caption>
        </View>
        
        <View style={styles.chatPreview}>
          <Body1 
            numberOfLines={1} 
            style={[
              styles.messagePreview,
              item.unreadCount > 0 && styles.unreadMessage
            ]}
          >
            {item.lastMessage}
          </Body1>
          
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Caption style={styles.unreadCount}>{item.unreadCount}</Caption>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <H4 style={styles.emptyText}>No messages</H4>
      <Body1 style={styles.emptySubtext}>
        You don't have any active conversations.
      </Body1>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <H3 style={styles.title}>Messages</H3>
      </View>
      
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.loadId}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
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
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  title: {
    color: colors.accent,
  },
  listContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  chatCard: {
    marginBottom: spacing.md,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  chatTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    overflow: 'hidden',
    color: colors.white,
  },
  chatPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagePreview: {
    flex: 1,
    color: colors.grey,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  unreadBadge: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  unreadCount: {
    color: colors.white,
    fontWeight: 'bold',
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

export default MessagingScreen;