package com.baltotest.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "load_id", nullable = false)
    private Load load;
    
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
    
    @ManyToOne
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;
    
    @ManyToOne
    @JoinColumn(name = "channel_id", nullable = false)
    private Channel channel;
    
    @Column(nullable = false, length = 4000)
    private String content;
    
    @Column
    private String attachments; // JSON array of attachment URLs or IDs
    
    @Column(nullable = false)
    private boolean read;
    
    @Column
    private LocalDateTime readAt;
    
    @Column(nullable = false)
    private LocalDateTime sentAt;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Getters and Setters
    public UUID getId() { return id; }
    public Load getLoad() { return load; }
    public User getSender() { return sender; }
    public User getRecipient() { return recipient; }
    public Channel getChannel() { return channel; }
    public String getContent() { return content; }
    public String getAttachments() { return attachments; }
    public boolean isRead() { return read; }
    public LocalDateTime getReadAt() { return readAt; }
    public LocalDateTime getSentAt() { return sentAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setId(UUID id) { this.id = id; }
    public void setLoad(Load load) { this.load = load; }
    public void setSender(User sender) { this.sender = sender; }
    public void setRecipient(User recipient) { this.recipient = recipient; }
    public void setChannel(Channel channel) { this.channel = channel; }
    public void setContent(String content) { this.content = content; }
    public void setAttachments(String attachments) { this.attachments = attachments; }
    public void setRead(boolean read) { this.read = read; }
    public void setReadAt(LocalDateTime readAt) { this.readAt = readAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (sentAt == null) {
            sentAt = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public void markAsRead() {
        if (!read) {
            read = true;
            readAt = LocalDateTime.now();
        }
    }
}