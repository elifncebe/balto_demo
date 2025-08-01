package com.baltotest;

import org.mockito.Mockito;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

@TestConfiguration
@EnableAutoConfiguration(exclude = {RabbitAutoConfiguration.class})
public class TestConfig {

    // Mock only the essential beans that are required by other components
    @Bean
    @Primary
    public com.baltotest.messaging.UserRegisteredEventPublisher userRegisteredEventPublisher() {
        return Mockito.mock(com.baltotest.messaging.UserRegisteredEventPublisher.class);
    }

    @Bean
    @Primary
    public com.baltotest.messaging.MessageEventPublisher messageEventPublisher() {
        return Mockito.mock(com.baltotest.messaging.MessageEventPublisher.class);
    }
}