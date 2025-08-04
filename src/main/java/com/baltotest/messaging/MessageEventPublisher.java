package com.baltotest.messaging;

import com.baltotest.application.dto.MessageResponse;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "true", matchIfMissing = false)
public class MessageEventPublisher {

    private final RabbitTemplate rabbitTemplate;
    private static final String EXCHANGE_NAME = "message-events";
    private static final String MESSAGE_ROUTING_KEY = "message.sent";
    private static final String STATUS_ROUTING_KEY = "load.status.updated";
    private static final String ETA_ROUTING_KEY = "load.eta.updated";

    public MessageEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishMessageSent(MessageResponse message) {
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, MESSAGE_ROUTING_KEY, message);
        
        // Also send to load-specific and user-specific routing keys
        if (message.load != null && message.load.id != null) {
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "load." + message.load.id, message);
        }
        
        if (message.recipient != null && message.recipient.id != null) {
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "user." + message.recipient.id, message);
        }
    }

    public void publishStatusUpdate(UUID loadId, String status) {
        StatusUpdateEvent event = new StatusUpdateEvent(loadId, status);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, STATUS_ROUTING_KEY, event);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, "load." + loadId, event);
    }

    public void publishEtaUpdate(UUID loadId, String estimatedDeliveryDate) {
        EtaUpdateEvent event = new EtaUpdateEvent(loadId, estimatedDeliveryDate);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ETA_ROUTING_KEY, event);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, "load." + loadId, event);
    }

    public static class StatusUpdateEvent {
        private final UUID loadId;
        private final String status;

        public StatusUpdateEvent(UUID loadId, String status) {
            this.loadId = loadId;
            this.status = status;
        }

        public UUID getLoadId() {
            return loadId;
        }

        public String getStatus() {
            return status;
        }
    }

    public static class EtaUpdateEvent {
        private final UUID loadId;
        private final String estimatedDeliveryDate;

        public EtaUpdateEvent(UUID loadId, String estimatedDeliveryDate) {
            this.loadId = loadId;
            this.estimatedDeliveryDate = estimatedDeliveryDate;
        }

        public UUID getLoadId() {
            return loadId;
        }

        public String getEstimatedDeliveryDate() {
            return estimatedDeliveryDate;
        }
    }
}