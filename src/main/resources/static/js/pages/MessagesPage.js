// Messages Page Component

function MessagesPage() {
    const auth = useAuth();
    const [messages, setMessages] = React.useState([]);
    const [selectedContact, setSelectedContact] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [newMessage, setNewMessage] = React.useState('');
    const messageEndRef = React.useRef(null);

    // Scroll to bottom of messages when new message is added
    React.useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedContact]);

    // Fetch messages on component mount
    React.useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            // Mock data for now, in production this would call the API
            setTimeout(() => {
                const mockMessages = [
                    {
                        id: 1,
                        contactId: 'JD',
                        contactName: 'John Driver',
                        avatar: 'JD',
                        messages: [
                            { id: 1, text: 'I'll be arriving at the pickup location in about 15 minutes.', time: '10:30 AM', isSender: false },
                            { id: 2, text: 'Great, I'll be ready. Is there anything specific I need to prepare?', time: '10:32 AM', isSender: true },
                            { id: 3, text: 'Just make sure the loading dock is clear and the paperwork is ready.', time: '10:35 AM', isSender: false },
                            { id: 4, text: 'Perfect, everything is set. See you soon.', time: '10:36 AM', isSender: true }
                        ],
                        lastMessageTime: '10:30 AM',
                        unread: 0
                    },
                    {
                        id: 2,
                        contactId: 'SD',
                        contactName: 'Sarah Dispatcher',
                        avatar: 'SD',
                        messages: [
                            { id: 1, text: 'Your shipment #12344 has been delivered successfully.', time: 'Yesterday', isSender: false },
                            { id: 2, text: 'Thank you for the update!', time: 'Yesterday', isSender: true }
                        ],
                        lastMessageTime: 'Yesterday',
                        unread: 0
                    },
                    {
                        id: 3,
                        contactId: 'MC',
                        contactName: 'Mike Coordinator',
                        avatar: 'MC',
                        messages: [
                            { id: 1, text: 'We've assigned your new shipment to our top driver.', time: 'Aug 3', isSender: false },
                            { id: 2, text: 'That's great news! When will they be in contact?', time: 'Aug 3', isSender: true },
                            { id: 3, text: 'They should reach out to you within the next hour.', time: 'Aug 3', isSender: false }
                        ],
                        lastMessageTime: 'Aug 3',
                        unread: 0
                    },
                    {
                        id: 4,
                        contactId: 'TS',
                        contactName: 'Tom Support',
                        avatar: 'TS',
                        messages: [
                            { id: 1, text: 'Thanks for reaching out. How can I assist you today?', time: 'Aug 1', isSender: false }
                        ],
                        lastMessageTime: 'Aug 1',
                        unread: 0
                    }
                ];

                setMessages(mockMessages);
                setSelectedContact(mockMessages[0]);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setIsLoading(false);
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedContact) return;

        const updatedMessages = [...messages];
        const contactIndex = updatedMessages.findIndex(m => m.id === selectedContact.id);

        if (contactIndex >= 0) {
            const newMessageObj = {
                id: Date.now(),
                text: newMessage,
                time: 'Just now',
                isSender: true
            };

            updatedMessages[contactIndex].messages.push(newMessageObj);
            updatedMessages[contactIndex].lastMessageTime = 'Just now';

            setMessages(updatedMessages);
            setSelectedContact(updatedMessages[contactIndex]);
            setNewMessage('');
        }
    };

    return (
        <div className="messages-container">
            <div className="messages-header">
                <h1>Messages</h1>
                {selectedContact && (
                    <div className="selected-contact-header">
                        <div className="avatar">{selectedContact.avatar}</div>
                        <h2>{selectedContact.contactName}</h2>
                    </div>
                )}
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading messages...</p>
                </div>
            ) : (
                <div className="messages-content">
                    <div className="messages-list">
                        {messages.map(contact => (
                            <div 
                                key={contact.id} 
                                className={`message-thread ${selectedContact?.id === contact.id ? 'active' : ''}`}
                                onClick={() => setSelectedContact(contact)}
                            >
                                <div className="avatar-container">
                                    <div className="avatar">{contact.avatar}</div>
                                </div>
                                <div className="message-preview">
                                    <div className="message-info">
                                        <h3 className="contact-name">{contact.contactName}</h3>
                                        <span className="message-time">{contact.lastMessageTime}</span>
                                    </div>
                                    <p className="message-snippet">
                                        {contact.messages[contact.messages.length - 1].text}
                                    </p>
                                </div>
                                {contact.unread > 0 && (
                                    <div className="unread-badge">{contact.unread}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {selectedContact ? (
                        <div className="conversation-container">
                            <div className="message-conversation">
                                {selectedContact.messages.map(msg => (
                                    <div key={msg.id} className={`message-bubble ${msg.isSender ? 'sent' : 'received'}`}>
                                        <div className="message-text">{msg.text}</div>
                                        <div className="message-time">{msg.time}</div>
                                    </div>
                                ))}
                                <div ref={messageEndRef}></div>
                            </div>

                            <div className="message-input-container">
                                <input 
                                    type="text" 
                                    className="message-input" 
                                    placeholder="Type a message..." 
                                    value={newMessage} 
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button className="send-button" onClick={handleSendMessage}>
                                    <i className="bi bi-arrow-right-circle-fill"></i>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="no-conversation-selected">
                            <div className="no-conversation-icon">💬</div>
                            <h3>Select a conversation</h3>
                            <p>Choose a contact from the list to view your conversation history</p>
                        </div>
                    )}
                </div>
            )}

            <nav className="mobile-nav">
                <button className="nav-item" onClick={() => window.location.hash = ''}>
                    📦
                    <span>Shipments</span>
                </button>
                <button className="nav-item active">
                    💬
                    <span>Messages</span>
                </button>
                <button className="nav-item" onClick={() => window.location.hash = 'profile'}>
                    👤
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}

    // Fetch messages on component mount
    React.useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            // Mock data for now, in production this would call the API
            setTimeout(() => {
                const mockMessages = [
                    {
                        id: 1,
                        contactId: 'JD',
                        contactName: 'John Driver',
                        avatar: 'JD',
                        messages: [
                            { id: 1, text: 'I'll be arriving at the pickup location in about 15 minutes.', time: '10:30 AM', isSender: false },
                            { id: 2, text: 'Great, I'll be ready. Is there anything specific I need to prepare?', time: '10:32 AM', isSender: true },
                            { id: 3, text: 'Just make sure the loading dock is clear and the paperwork is ready.', time: '10:35 AM', isSender: false },
                            { id: 4, text: 'Perfect, everything is set. See you soon.', time: '10:36 AM', isSender: true }
                        ],
                        lastMessageTime: '10:30 AM',
                        unread: 0
                    },
                    {
                        id: 2,
                        contactId: 'SD',
                        contactName: 'Sarah Dispatcher',
                        avatar: 'SD',
                        messages: [
                            { id: 1, text: 'Your shipment #12344 has been delivered successfully.', time: 'Yesterday', isSender: false },
                            { id: 2, text: 'Thank you for the update!', time: 'Yesterday', isSender: true }
                        ],
                        lastMessageTime: 'Yesterday',
                        unread: 0
                    },
                    {
                        id: 3,
                        contactId: 'MC',
                        contactName: 'Mike Coordinator',
                        avatar: 'MC',
                        messages: [
                            { id: 1, text: 'We've assigned your new shipment to our top driver.', time: 'Aug 3', isSender: false },
                            { id: 2, text: 'That's great news! When will they be in contact?', time: 'Aug 3', isSender: true },
                            { id: 3, text: 'They should reach out to you within the next hour.', time: 'Aug 3', isSender: false }
                        ],
                        lastMessageTime: 'Aug 3',
                        unread: 0
                    },
                    {
                        id: 4,
                        contactId: 'TS',
                        contactName: 'Tom Support',
                        avatar: 'TS',
                        messages: [
                            { id: 1, text: 'Thanks for reaching out. How can I assist you today?', time: 'Aug 1', isSender: false }
                        ],
                        lastMessageTime: 'Aug 1',
                        unread: 0
                    }
                ];

                setMessages(mockMessages);
                setSelectedContact(mockMessages[0]);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setIsLoading(false);
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedContact) return;

        const updatedMessages = [...messages];
        const contactIndex = updatedMessages.findIndex(m => m.id === selectedContact.id);

        if (contactIndex >= 0) {
            const newMessageObj = {
                id: Date.now(),
                text: newMessage,
                time: 'Just now',
                isSender: true
            };

            updatedMessages[contactIndex].messages.push(newMessageObj);
            updatedMessages[contactIndex].lastMessageTime = 'Just now';

            setMessages(updatedMessages);
            setSelectedContact(updatedMessages[contactIndex]);
            setNewMessage('');
        }
    };

    return (
        <div className="messages-container">
            <div className="messages-header">
                <h1>Messages</h1>
                {selectedContact && (
                    <div className="selected-contact-header">
                        <div className="avatar">{selectedContact.avatar}</div>
                        <h2>{selectedContact.contactName}</h2>
                    </div>
                )}
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading messages...</p>
                </div>
            ) : (
                <div className="messages-content">
                    <div className="messages-list">
                        {messages.map(contact => (
                            <div 
                                key={contact.id} 
                                className={`message-thread ${selectedContact?.id === contact.id ? 'active' : ''}`}
                                onClick={() => setSelectedContact(contact)}
                            >
                                <div className="avatar-container">
                                    <div className="avatar">{contact.avatar}</div>
                                </div>
                                <div className="message-preview">
                                    <div className="message-info">
                                        <h3 className="contact-name">{contact.contactName}</h3>
                                        <span className="message-time">{contact.lastMessageTime}</span>
                                    </div>
                                    <p className="message-snippet">
                                        {contact.messages[contact.messages.length - 1].text}
                                    </p>
                                </div>
                                {contact.unread > 0 && (
                                    <div className="unread-badge">{contact.unread}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {selectedContact ? (
                        <div className="conversation-container">
                            <div className="message-conversation">
                                {selectedContact.messages.map(msg => (
                                    <div key={msg.id} className={`message-bubble ${msg.isSender ? 'sent' : 'received'}`}>
                                        <div className="message-text">{msg.text}</div>
                                        <div className="message-time">{msg.time}</div>
                                    </div>
                                ))}
                                <div ref={messageEndRef}></div>
                            </div>

                            <div className="message-input-container">
                                <input 
                                    type="text" 
                                    className="message-input" 
                                    placeholder="Type a message..." 
                                    value={newMessage} 
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button className="send-button" onClick={handleSendMessage}>
                                    <i className="bi bi-arrow-right-circle-fill"></i>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="no-conversation-selected">
                            <div className="no-conversation-icon">💬</div>
                            <h3>Select a conversation</h3>
                            <p>Choose a contact from the list to view your conversation history</p>
                        </div>
                    )}
                </div>
            )}

            <nav className="mobile-nav">
                <button className="nav-item">
                    📦
                    <span>Shipments</span>
                </button>
                <button className="nav-item active">
                    💬
                    <span>Messages</span>
                </button>
                <button className="nav-item">
                    👤
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}
