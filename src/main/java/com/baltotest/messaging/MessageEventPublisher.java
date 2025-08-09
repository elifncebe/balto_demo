package com.baltotest.messaging;

import com.baltotest.domain.dto.MessageResponse;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.UUID;

@Component
@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "true", matchIfMissing = false)
public class MessageEventPublisher {

    private static final String MESSAGE_EVENTS_EXCHANGE = "message-events-exchange";
    private static final String MESSAGE_SENT_ROUTING_KEY = "message.sent";
    private static final String LOAD_STATUS_ROUTING_KEY = "load.status";
    private static final String LOAD_ETA_ROUTING_KEY = "load.eta";

    private final RabbitTemplate rabbitTemplate;

    @Autowired
    public MessageEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishMessageSent(MessageResponse message) {
        rabbitTemplate.convertAndSend(MESSAGE_EVENTS_EXCHANGE, MESSAGE_SENT_ROUTING_KEY, message);
    }

    public void publishStatusUpdate(UUID loadId, String status) {
        StatusUpdateEvent event = new StatusUpdateEvent(loadId, status);
        rabbitTemplate.convertAndSend(MESSAGE_EVENTS_EXCHANGE, LOAD_STATUS_ROUTING_KEY, event);
    }

    public void publishEtaUpdate(UUID loadId, LocalDate estimatedDeliveryDate) {
        EtaUpdateEvent event = new EtaUpdateEvent(loadId, estimatedDeliveryDate);
        rabbitTemplate.convertAndSend(MESSAGE_EVENTS_EXCHANGE, LOAD_ETA_ROUTING_KEY, event);
    }

    // Event classes
    public static class StatusUpdateEvent {
        private UUID loadId;
        private String status;

        public StatusUpdateEvent() {
        }

        public StatusUpdateEvent(UUID loadId, String status) {
            this.loadId = loadId;
            this.status = status;
        }

        public UUID getLoadId() {
            return loadId;
        }

        public void setLoadId(UUID loadId) {
            this.loadId = loadId;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }

    public static class EtaUpdateEvent {
        private UUID loadId;
        private LocalDate estimatedDeliveryDate;

        public EtaUpdateEvent() {
        }

        public EtaUpdateEvent(UUID loadId, LocalDate estimatedDeliveryDate) {
            this.loadId = loadId;
            this.estimatedDeliveryDate = estimatedDeliveryDate;
        }

        public UUID getLoadId() {
            return loadId;
        }

        public void setLoadId(UUID loadId) {
            this.loadId = loadId;
        }

        public LocalDate getEstimatedDeliveryDate() {
            return estimatedDeliveryDate;
        }

        public void setEstimatedDeliveryDate(LocalDate estimatedDeliveryDate) {
            this.estimatedDeliveryDate = estimatedDeliveryDate;
        }
    }
}

