import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
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
import { messaging } from '@logistics/features';
import { Message, Load, LoadStatus, Role } from '@logistics/utils';
import { apiService } from '@logistics/utils';

type RootStackParamList = {
  Dashboard: undefined;
  LoadDetails: { loadId: string };
  Profile: undefined;
  Messaging: undefined;
  ChatDetail: { loadId: string };
};

type ChatDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ChatDetail'>;
  route: RouteProp<RootStackParamList, 'ChatDetail'>;
};

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  content: string;
  timestamp: string;
  isRead: boolean;
}

const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({ route, navigation }) => {
  const { loadId } = route.params;
  const [load, setLoad] = useState<Load | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  const flatListRef = useRef<FlatList>(null);

  // Fetch load details and messages on component mount
  useEffect(() => {
    fetchLoadDetails();
    fetchMessages();
  }, [loadId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Fetch load details from API
  const fetchLoadDetails = async () => {
    try {
      // This would be a real API call in production
      // const response = await apiService.get(`/api/loads/${loadId}`);
      // setLoad(response.data);
      
      // For now, use mock data
      setTimeout(() => {
        const mockLoad: Load = {
          id: loadId,
          reference: `LOAD-${loadId.padStart(3, '0')}`,
          status: loadId === '1' ? LoadStatus.PENDING : 
                  loadId === '2' ? LoadStatus.IN_TRANSIT : 
                  LoadStatus.DELIVERED,
          pickupLocation: loadId === '1' ? 'New York, NY' : 
                         loadId === '2' ? 'Chicago, IL' : 
                         'San Francisco, CA',
          pickupDate: loadId === '1' ? '2025-08-10T10:00:00' : 
                     loadId === '2' ? '2025-08-09T08:00:00' : 
                     '2025-08-05T09:00:00',
          deliveryLocation: loadId === '1' ? 'Boston, MA' : 
                           loadId === '2' ? 'Detroit, MI' : 
                           'Los Angeles, CA',
          deliveryDate: loadId === '1' ? '2025-08-11T14:00:00' : 
                       loadId === '2' ? '2025-08-09T16:00:00' : 
                       '2025-08-05T17:00:00',
          customerId: 'customer-1',
          brokerId: 'broker-1',
        };
        
        setLoad(mockLoad);
      }, 500);
    } catch (error) {
      console.error('Error fetching load details:', error);
      Alert.alert(
        'Error',
        'Failed to load shipment details. Please try again later.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  };

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      
      // This would be a real API call in production
      // const response = await apiService.get(`/api/messages/load/${loadId}`);
      // setMessages(response.data);
      
      // For now, use mock data
      setTimeout(() => {
        const mockMessages: ChatMessage[] = [
          {
            id: '1',
            senderId: 'broker-1',
            senderName: 'Jane Smith',
            senderRole: Role.BROKER,
            content: 'Hello! I\'m your broker for this shipment.',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(), // 3 days ago
            isRead: true,
          },
          {
            id: '2',
            senderId: 'customer-1',
            senderName: 'John Doe',
            senderRole: Role.CUSTOMER,
            content: 'Hi Jane, thanks for reaching out.',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000 + 30 * 60000).toISOString(), // 3 days ago + 30 min
            isRead: true,
          },
          {
            id: '3',
            senderId: 'broker-1',
            senderName: 'Jane Smith',
            senderRole: Role.BROKER,
            content: 'I wanted to confirm the pickup details for your shipment.',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(), // 2 days ago
            isRead: true,
          },
          {
            id: '4',
            senderId: 'customer-1',
            senderName: 'John Doe',
            senderRole: Role.CUSTOMER,
            content: 'Everything looks good on my end. The pickup location is correct.',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000 + 45 * 60000).toISOString(), // 2 days ago + 45 min
            isRead: true,
          },
          {
            id: '5',
            senderId: 'broker-1',
            senderName: 'Jane Smith',
            senderRole: Role.BROKER,
            content: 'Great! I\'ve assigned a carrier to your load.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(), // 1 day ago
            isRead: true,
          },
          {
            id: '6',
            senderId: 'broker-1',
            senderName: 'Jane Smith',
            senderRole: Role.BROKER,
            content: loadId === '1' 
              ? 'Can you confirm the pickup time?' 
              : loadId === '2' 
              ? 'The driver is on the way.' 
              : 'Delivery confirmed. Thank you!',
            timestamp: new Date(Date.now() - (loadId === '1' ? 30 : loadId === '2' ? 120 : 2 * 24 * 60) * 60000).toISOString(),
            isRead: loadId !== '1',
          },
        ];
        
        setMessages(mockMessages);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching messages:', error);
      Alert.alert(
        'Error',
        'Failed to load messages. Please try again later.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsSending(true);
    
    try {
      // This would be a real API call in production
      // await apiService.post(`/api/messages/load/${loadId}`, {
      //   content: newMessage,
      // });
      
      // For now, just simulate the API call
      setTimeout(() => {
        const mockMessage: ChatMessage = {
          id: `new-${Date.now()}`,
          senderId: 'customer-1',
          senderName: 'John Doe',
          senderRole: Role.CUSTOMER,
          content: newMessage,
          timestamp: new Date().toISOString(),
          isRead: false,
        };
        
        setMessages([...messages, mockMessage]);
        setNewMessage('');
        setIsSending(false);
        
        // Scroll to bottom
        if (flatListRef.current) {
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }
      }, 500);
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert(
        'Error',
        'Failed to send message. Please try again.',
        [{ text: 'OK' }]
      );
      setIsSending(false);
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
    
    // If this week, show day name and time
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return `${date.toLocaleDateString([], { weekday: 'short' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show date and time
    return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
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

  // Render message item
  const renderMessageItem = ({ item }: { item: ChatMessage }) => {
    const isCustomer = item.senderRole === Role.CUSTOMER;
    
    return (
      <View style={[
        styles.messageContainer,
        isCustomer ? styles.customerMessage : styles.brokerMessage
      ]}>
        <View style={[
          styles.messageBubble,
          isCustomer ? styles.customerBubble : styles.brokerBubble
        ]}>
          {!isCustomer && (
            <Caption style={styles.senderName}>{item.senderName}</Caption>
          )}
          <Body1 style={styles.messageText}>{item.content}</Body1>
          <Caption style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Caption>
        </View>
      </View>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <H4 style={styles.emptyText}>No messages yet</H4>
      <Body1 style={styles.emptySubtext}>
        Start the conversation by sending a message.
      </Body1>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.accent} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <H3 style={styles.title}>
            {load?.reference || `Load #${loadId}`}
          </H3>
          {load && (
            <Caption style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(load.status) }
            ]}>
              {load.status}
            </Caption>
          )}
        </View>
      </View>
      
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            ListEmptyComponent={renderEmptyState}
          />
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              (!newMessage.trim() || isSending) && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!newMessage.trim() || isSending}
          >
            {isSending ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Ionicons name="send" size={20} color={colors.white} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.accent,
    marginRight: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    overflow: 'hidden',
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  messageContainer: {
    marginBottom: spacing.md,
    flexDirection: 'row',
  },
  customerMessage: {
    justifyContent: 'flex-end',
  },
  brokerMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: 16,
  },
  customerBubble: {
    backgroundColor: colors.accent,
    borderBottomRightRadius: 4,
  },
  brokerBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
  },
  senderName: {
    color: colors.grey,
    marginBottom: spacing.xs,
  },
  messageText: {
    color: (props) => props.style?.backgroundColor === colors.accent ? colors.white : colors.darkGrey,
  },
  timestamp: {
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
    fontSize: 10,
    color: (props) => props.style?.backgroundColor === colors.accent ? colors.white : colors.grey,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  input: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.accent,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: colors.grey,
    opacity: 0.7,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginTop: spacing.xxl,
  },
  emptyText: {
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    textAlign: 'center',
    color: colors.grey,
  },
});

export default ChatDetailScreen;