# Summary of Changes

## Issue
The application was getting stuck during startup at 80% execution with the following message:
```
<==========---> 80% EXECUTING [2m 6s]
> :bootRun
```

This was happening because the application was trying to connect to RabbitMQ, but either RabbitMQ was not running or the connection details were incorrect.

## Previous Changes
In a previous update, we made the following changes to address RabbitMQ connection issues:

1. Made all RabbitMQ-related components conditional based on a property `spring.rabbitmq.enabled`:
   - Added `@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "true", matchIfMissing = false)` to:
     - RabbitMqConfig
     - UserRegisteredEventListener
     - MessageEventListener
     - UserRegisteredEventPublisher
     - MessageEventPublisher

2. Added RabbitMQ configuration properties to application.properties:
   - Set `spring.rabbitmq.enabled=false` by default
   - Added sensible defaults for RabbitMQ connection properties

## Current Issue
After the previous changes, we encountered a new issue:
```
Parameter 1 of constructor in com.baltotest.adapter.controller.AuthController required a bean of type 'com.baltotest.messaging.UserRegisteredEventPublisher' that could not be found.
```

This happened because the AuthController was directly depending on the UserRegisteredEventPublisher, which is not available when RabbitMQ is disabled.

## Solution
To resolve this issue, we made the following changes:

1. Created an interface `UserRegisteredEventPublisherInterface` with the method:
   ```java
   void publishUserRegistered(String email, String name);
   ```

2. Updated the existing `UserRegisteredEventPublisher` to implement this interface.

3. Created a no-op implementation `NoOpUserRegisteredEventPublisher` that:
   - Implements the same interface
   - Is conditionally created when RabbitMQ is disabled (`spring.rabbitmq.enabled=false`)
   - Simply logs a message instead of trying to publish to RabbitMQ

4. Updated the `AuthController` to depend on the interface instead of the concrete implementation:
   ```java
   private final UserRegisteredEventPublisherInterface eventPublisher;

   public AuthController(AuthUseCase authUseCase, UserRegisteredEventPublisherInterface eventPublisher) {
       this.authUseCase = authUseCase;
       this.eventPublisher = eventPublisher;
   }
   ```

## How It Works
With these changes:

1. When `spring.rabbitmq.enabled=true`:
   - The real `UserRegisteredEventPublisher` is created and injected into the `AuthController`
   - Events are published to RabbitMQ

2. When `spring.rabbitmq.enabled=false` (default):
   - The `NoOpUserRegisteredEventPublisher` is created and injected into the `AuthController`
   - Events are logged but not published to RabbitMQ
   - The application doesn't try to connect to RabbitMQ

This approach follows the Dependency Inversion Principle, where high-level modules (AuthController) depend on abstractions (UserRegisteredEventPublisherInterface) rather than concrete implementations.

## Benefits
1. The application can start successfully even if RabbitMQ is not available
2. RabbitMQ functionality can be easily enabled when needed
3. The code is more maintainable and follows SOLID principles
4. The application is more resilient to infrastructure changes