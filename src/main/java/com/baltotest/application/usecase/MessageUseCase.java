package com.baltotest.application.usecase;

import com.baltotest.application.dto.MessageRequest;
import com.baltotest.application.dto.MessageResponse;

import java.util.List;
import java.util.UUID;

public interface MessageUseCase {
    MessageResponse sendMessage(MessageRequest request);
    MessageResponse getMessage(UUID messageId);
    List<MessageResponse> getMessagesByLoad(UUID loadId);
    List<MessageResponse> getMessagesBySender(UUID senderId);
    List<MessageResponse> getMessagesByRecipient(UUID recipientId);
    List<MessageResponse> getMessagesByChannel(UUID channelId);
    List<MessageResponse> getUnreadMessagesByRecipient(UUID recipientId);
    List<MessageResponse> getUnreadMessagesByLoad(UUID loadId);
    long countUnreadMessagesByRecipient(UUID recipientId);
    MessageResponse markAsRead(UUID messageId);
    void deleteMessage(UUID messageId);
}