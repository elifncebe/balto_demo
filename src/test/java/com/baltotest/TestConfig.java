package com.baltotest;

import org.mockito.Mockito;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

@TestConfiguration
public class TestConfig {

    @Bean
    @Primary
    public ConnectionFactory connectionFactory() {
        return Mockito.mock(ConnectionFactory.class);
    }

    @Bean
    @Primary
    public MessageConverter messageConverter() {
        return Mockito.mock(MessageConverter.class);
    }

    @Bean
    @Primary
    public RabbitTemplate rabbitTemplate() {
        return Mockito.mock(RabbitTemplate.class);
    }

    @Bean
    @Primary
    public TopicExchange userEventsExchange() {
        return Mockito.mock(TopicExchange.class);
    }

    @Bean
    @Primary
    public TopicExchange messageEventsExchange() {
        return Mockito.mock(TopicExchange.class);
    }

    @Bean
    @Primary
    public Queue userRegisteredQueue() {
        return Mockito.mock(Queue.class);
    }

    @Bean
    @Primary
    public Queue messageSentQueue() {
        return Mockito.mock(Queue.class);
    }

    @Bean
    @Primary
    public Queue loadStatusQueue() {
        return Mockito.mock(Queue.class);
    }

    @Bean
    @Primary
    public Queue loadEtaQueue() {
        return Mockito.mock(Queue.class);
    }

    @Bean
    @Primary
    public Binding userRegisteredBinding() {
        return Mockito.mock(Binding.class);
    }

    @Bean
    @Primary
    public Binding messageSentBinding() {
        return Mockito.mock(Binding.class);
    }

    @Bean
    @Primary
    public Binding loadStatusBinding() {
        return Mockito.mock(Binding.class);
    }

    @Bean
    @Primary
    public Binding loadEtaBinding() {
        return Mockito.mock(Binding.class);
    }

    @Bean
    @Primary
    public com.baltotest.messaging.UserRegisteredEventPublisher userRegisteredEventPublisher() {
        return Mockito.mock(com.baltotest.messaging.UserRegisteredEventPublisher.class);
    }

    @Bean
    @Primary
    public com.baltotest.messaging.UserRegisteredEventListener userRegisteredEventListener() {
        return Mockito.mock(com.baltotest.messaging.UserRegisteredEventListener.class);
    }

    @Bean
    @Primary
    public com.baltotest.messaging.MessageEventPublisher messageEventPublisher() {
        return Mockito.mock(com.baltotest.messaging.MessageEventPublisher.class);
    }

    @Bean
    @Primary
    public com.baltotest.messaging.MessageEventListener messageEventListener() {
        return Mockito.mock(com.baltotest.messaging.MessageEventListener.class);
    }
}