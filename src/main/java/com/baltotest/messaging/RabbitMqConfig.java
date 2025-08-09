package com.baltotest.messaging;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "true", matchIfMissing = false)
public class RabbitMqConfig {

    // User events
    private static final String USER_EVENTS_EXCHANGE = "user-events";
    private static final String USER_REGISTERED_QUEUE = "user-registered-queue";
    private static final String USER_REGISTERED_ROUTING_KEY = "user.registered";

    // Message events
    private static final String MESSAGE_EVENTS_EXCHANGE = "message-events-exchange";
    private static final String MESSAGE_SENT_QUEUE = "message-sent-queue";
    private static final String LOAD_STATUS_QUEUE = "load-status-queue";
    private static final String LOAD_ETA_QUEUE = "load-eta-queue";
    private static final String MESSAGE_SENT_ROUTING_KEY = "message.sent";
    private static final String LOAD_STATUS_ROUTING_KEY = "load.status.updated";
    private static final String LOAD_ETA_ROUTING_KEY = "load.eta.updated";

    // User events configuration
    @Bean
    public TopicExchange userEventsExchange() {
        return new TopicExchange(USER_EVENTS_EXCHANGE);
    }

    @Bean
    public Queue userRegisteredQueue() {
        return new Queue(USER_REGISTERED_QUEUE, true);
    }

    @Bean
    public Binding userRegisteredBinding(Queue userRegisteredQueue, TopicExchange userEventsExchange) {
        return BindingBuilder.bind(userRegisteredQueue)
                .to(userEventsExchange)
                .with(USER_REGISTERED_ROUTING_KEY);
    }

    // Message events configuration
    @Bean
    public TopicExchange messageEventsExchange() {
        return new TopicExchange(MESSAGE_EVENTS_EXCHANGE);
    }

    @Bean
    public Queue messageSentQueue() {
        return new Queue(MESSAGE_SENT_QUEUE, true);
    }

    @Bean
    public Queue loadStatusQueue() {
        return new Queue(LOAD_STATUS_QUEUE, true);
    }

    @Bean
    public Queue loadEtaQueue() {
        return new Queue(LOAD_ETA_QUEUE, true);
    }

    @Bean
    public Binding messageSentBinding(Queue messageSentQueue, TopicExchange messageEventsExchange) {
        return BindingBuilder.bind(messageSentQueue)
                .to(messageEventsExchange)
                .with(MESSAGE_SENT_ROUTING_KEY);
    }

    @Bean
    public Binding loadStatusBinding(Queue loadStatusQueue, TopicExchange messageEventsExchange) {
        return BindingBuilder.bind(loadStatusQueue)
                .to(messageEventsExchange)
                .with(LOAD_STATUS_ROUTING_KEY);
    }

    @Bean
    public Binding loadEtaBinding(Queue loadEtaQueue, TopicExchange messageEventsExchange) {
        return BindingBuilder.bind(loadEtaQueue)
                .to(messageEventsExchange)
                .with(LOAD_ETA_ROUTING_KEY);
    }

    // Common configuration
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter jsonMessageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter);
        return rabbitTemplate;
    }
}