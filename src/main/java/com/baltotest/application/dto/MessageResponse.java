package com.baltotest.application.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class MessageResponse {
    public UUID id;
    public LoadResponse load;
    public UserResponse sender;
    public UserResponse recipient;
    public ChannelResponse channel;
    public String content;
    public String attachments;
    public boolean read;
    public LocalDateTime readAt;
    public LocalDateTime sentAt;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
}