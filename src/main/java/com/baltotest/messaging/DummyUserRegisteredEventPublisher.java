package com.baltotest.messaging;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "false", matchIfMissing = true)
public class DummyUserRegisteredEventPublisher implements UserRegisteredEventPublisherInterface {

    @Override
    public void publishUserRegistered(String email, String name) {
        // No-op implementation when RabbitMQ is disabled
        System.out.println("RabbitMQ disabled: Would have published user registered event for " + email);
    }
}
