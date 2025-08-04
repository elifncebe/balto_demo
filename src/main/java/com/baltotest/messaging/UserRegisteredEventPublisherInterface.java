package com.baltotest.messaging;

/**
 * Interface for publishing user registered events.
 * This allows for different implementations based on configuration.
 */
public interface UserRegisteredEventPublisherInterface {
    
    /**
     * Publishes a user registered event.
     * 
     * @param email The email of the registered user
     * @param name The name of the registered user
     */
    void publishUserRegistered(String email, String name);
}