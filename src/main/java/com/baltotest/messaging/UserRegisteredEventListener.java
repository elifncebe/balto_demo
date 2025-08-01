package com.baltotest.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class UserRegisteredEventListener {

    private static final String QUEUE_NAME = "user-registered-queue";

    @RabbitListener(queues = QUEUE_NAME)
    public void handleUserRegisteredEvent(UserRegisteredEventPublisher.UserRegisteredEvent event) {
        // Log the event
        System.out.println("Received user registered event: " + event.getEmail() + " - " + event.getName());
        
        // Here you would typically perform some action in response to the event
        // For example, sending a welcome email, creating a default profile, etc.
    }
}