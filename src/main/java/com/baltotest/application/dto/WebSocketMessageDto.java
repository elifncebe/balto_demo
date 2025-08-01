package com.baltotest.application.dto;

import java.util.UUID;

public class WebSocketMessageDto {
    public UUID loadId;
    public UUID senderId;
    public UUID recipientId;
    public UUID channelId;
    public String content;
    public String attachments;
    public String messageType; // "CHAT", "STATUS_UPDATE", "ETA_UPDATE", etc.
    
    // Default constructor for JSON deserialization
    public WebSocketMessageDto() {
    }
    
    public WebSocketMessageDto(UUID loadId, UUID senderId, UUID recipientId, UUID channelId, 
                              String content, String attachments, String messageType) {
        this.loadId = loadId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.channelId = channelId;
        this.content = content;
        this.attachments = attachments;
        this.messageType = messageType;
    }
}