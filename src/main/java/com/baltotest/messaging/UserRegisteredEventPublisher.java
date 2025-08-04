package com.baltotest.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "true")
public class UserRegisteredEventPublisher implements UserRegisteredEventPublisherInterface {

    private final RabbitTemplate rabbitTemplate;
    private static final String EXCHANGE_NAME = "user-events";
    private static final String ROUTING_KEY = "user.registered";

    public UserRegisteredEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishUserRegistered(String email, String name) {
        UserRegisteredEvent event = new UserRegisteredEvent(email, name);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, event);
    }

    public static class UserRegisteredEvent {
        private final String email;
        private final String name;

        public UserRegisteredEvent(String email, String name) {
            this.email = email;
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public String getName() {
            return name;
        }
    }
}