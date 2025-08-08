package com.baltotest.application.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for displaying messages in the UI
 * This class is designed to match the expectations of the load-detail.html template
 */
public class MessageDisplayDTO {
    public String senderName;
    public LocalDateTime timestamp;
    public String content;
    public String channelType;
    public String deliveryStatus;
    public boolean sentByCurrentUser;

    /**
     * Constructor for creating a message display DTO
     */
    public MessageDisplayDTO(String senderName, LocalDateTime timestamp, String content, 
                            String channelType, String deliveryStatus, boolean sentByCurrentUser) {
        this.senderName = senderName;
        this.timestamp = timestamp;
        this.content = content;
        this.channelType = channelType;
        this.deliveryStatus = deliveryStatus;
        this.sentByCurrentUser = sentByCurrentUser;
    }
}