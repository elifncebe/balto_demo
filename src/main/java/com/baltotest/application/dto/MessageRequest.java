package com.baltotest.application.dto;

import java.util.UUID;

public class MessageRequest {
    public UUID loadId;
    public UUID senderId;
    public UUID recipientId;
    public UUID channelId;
    public String content;
    public String attachments;
}