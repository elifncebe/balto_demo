package com.baltotest.application.service;

import com.baltotest.application.dto.*;
import com.baltotest.application.usecase.MessageUseCase;
import com.baltotest.domain.entity.Channel;
import com.baltotest.domain.entity.Load;
import com.baltotest.domain.entity.Message;
import com.baltotest.domain.entity.User;
import com.baltotest.domain.port.ChannelRepositoryPort;
import com.baltotest.domain.port.LoadRepositoryPort;
import com.baltotest.domain.port.MessageRepositoryPort;
import com.baltotest.domain.port.UserRepositoryPort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MessageService implements MessageUseCase {

    private final MessageRepositoryPort messageRepository;
    private final LoadRepositoryPort loadRepository;
    private final UserRepositoryPort userRepository;
    private final ChannelRepositoryPort channelRepository;

    public MessageService(
            MessageRepositoryPort messageRepository,
            LoadRepositoryPort loadRepository,
            UserRepositoryPort userRepository,
            ChannelRepositoryPort channelRepository) {
        this.messageRepository = messageRepository;
        this.loadRepository = loadRepository;
        this.userRepository = userRepository;
        this.channelRepository = channelRepository;
    }

    @Override
    public MessageResponse sendMessage(MessageRequest request) {
        Load load = loadRepository.findById(request.loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        User sender = userRepository.findById(request.senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User recipient = userRepository.findById(request.recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        Channel channel = channelRepository.findById(request.channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        
        Message message = new Message();
        message.setLoad(load);
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setChannel(channel);
        message.setContent(request.content);
        message.setAttachments(request.attachments);
        message.setRead(false);
        message.setSentAt(LocalDateTime.now());
        
        Message savedMessage = messageRepository.save(message);
        return mapToMessageResponse(savedMessage);
    }

    @Override
    public MessageResponse getMessage(UUID messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        return mapToMessageResponse(message);
    }

    @Override
    public List<MessageResponse> getMessagesByLoad(UUID loadId) {
        Load load = loadRepository.findById(loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        return messageRepository.findByLoad(load).stream()
                .map(this::mapToMessageResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageResponse> getMessagesBySender(UUID senderId) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        return messageRepository.findBySender(sender).stream()
                .map(this::mapToMessageResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageResponse> getMessagesByRecipient(UUID recipientId) {
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        return messageRepository.findByRecipient(recipient).stream()
                .map(this::mapToMessageResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageResponse> getMessagesByChannel(UUID channelId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        return messageRepository.findByChannel(channel).stream()
                .map(this::mapToMessageResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageResponse> getUnreadMessagesByRecipient(UUID recipientId) {
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        return messageRepository.findByRecipientAndRead(recipient, false).stream()
                .map(this::mapToMessageResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageResponse> getUnreadMessagesByLoad(UUID loadId) {
        Load load = loadRepository.findById(loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        return messageRepository.findByLoadAndRead(load, false).stream()
                .map(this::mapToMessageResponse)
                .collect(Collectors.toList());
    }

    @Override
    public long countUnreadMessagesByRecipient(UUID recipientId) {
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        return messageRepository.countUnreadByRecipient(recipient);
    }

    @Override
    public MessageResponse markAsRead(UUID messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.markAsRead();
        Message updatedMessage = messageRepository.save(message);
        return mapToMessageResponse(updatedMessage);
    }

    @Override
    public void deleteMessage(UUID messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        messageRepository.delete(message);
    }
    
    private MessageResponse mapToMessageResponse(Message message) {
        MessageResponse response = new MessageResponse();
        response.id = message.getId();
        response.load = mapToLoadResponse(message.getLoad());
        response.sender = mapToUserResponse(message.getSender());
        response.recipient = mapToUserResponse(message.getRecipient());
        response.channel = mapToChannelResponse(message.getChannel());
        response.content = message.getContent();
        response.attachments = message.getAttachments();
        response.read = message.isRead();
        response.readAt = message.getReadAt();
        response.sentAt = message.getSentAt();
        response.createdAt = message.getCreatedAt();
        response.updatedAt = message.getUpdatedAt();
        return response;
    }
    
    private LoadResponse mapToLoadResponse(Load load) {
        LoadResponse response = new LoadResponse();
        response.id = load.getId();
        response.originAddress = load.getOriginAddress();
        response.destinationAddress = load.getDestinationAddress();
        // Convert LocalDate to LocalDateTime
        response.pickupDate = load.getPickupDate().atStartOfDay();
        response.deliveryDate = load.getDeliveryDate();
        response.estimatedDeliveryDate = load.getEstimatedDeliveryDate();
        response.status = load.getStatus();
        response.vehicleDetails = load.getVehicleDetails();
        response.notes = load.getNotes();
        response.createdAt = load.getCreatedAt();
        response.updatedAt = load.getUpdatedAt();
        
        // To avoid circular references, we don't include the full user objects
        response.broker = mapToUserResponse(load.getBroker());
        response.customer = mapToUserResponse(load.getCustomer());
        if (load.getCarrier() != null) {
            response.carrier = mapToUserResponse(load.getCarrier());
        }
        
        return response;
    }
    
    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole()
        );
    }
    
    private ChannelResponse mapToChannelResponse(Channel channel) {
        ChannelResponse response = new ChannelResponse();
        response.id = channel.getId();
        response.type = channel.getType();
        response.name = channel.getName();
        response.description = channel.getDescription();
        response.configuration = channel.getConfiguration();
        response.active = channel.isActive();
        response.createdAt = channel.getCreatedAt();
        response.updatedAt = channel.getUpdatedAt();
        return response;
    }
}