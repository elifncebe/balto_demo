package com.baltotest.messaging;

import com.baltotest.application.dto.MessageResponse;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "true", matchIfMissing = false)
public class MessageEventListener {

    private static final String MESSAGE_QUEUE = "message-sent-queue";
    private static final String STATUS_QUEUE = "load-status-queue";
    private static final String ETA_QUEUE = "load-eta-queue";

    @RabbitListener(queues = MESSAGE_QUEUE)
    public void handleMessageSent(MessageResponse message) {
        // Log the message
        System.out.println("Received message: " + message.content);
        
        // Here you would typically perform some action in response to the message
        // For example, sending a notification, updating a cache, etc.
    }

    @RabbitListener(queues = STATUS_QUEUE)
    public void handleStatusUpdate(MessageEventPublisher.StatusUpdateEvent event) {
        // Log the status update
        System.out.println("Received status update for load " + event.getLoadId() + ": " + event.getStatus());
        
        // Here you would typically perform some action in response to the status update
        // For example, sending a notification, updating a cache, etc.
    }

    @RabbitListener(queues = ETA_QUEUE)
    public void handleEtaUpdate(MessageEventPublisher.EtaUpdateEvent event) {
        // Log the ETA update
        System.out.println("Received ETA update for load " + event.getLoadId() + ": " + event.getEstimatedDeliveryDate());
        
        // Here you would typically perform some action in response to the ETA update
        // For example, sending a notification, updating a cache, etc.
    }
}