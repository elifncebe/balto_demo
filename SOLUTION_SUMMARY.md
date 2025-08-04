# Solution Summary

## Issue
The application was getting stuck during startup with the following error:
```
2025-08-03T20:59:13.548-04:00  INFO 83482 --- [ntContainer#2-1] o.s.a.r.l.SimpleMessageListenerContainer : Restarting Consumer@5944fbf0: tags=[[]], channel=null, acknowledgeMode=AUTO local queue size=0
2025-08-03T20:59:13.549-04:00  INFO 83482 --- [ntContainer#2-2] o.s.a.r.c.CachingConnectionFactory       : Attempting to connect to: [localhost:5672]
2025-08-03T20:59:13.550-04:00 ERROR 83482 --- [ntContainer#2-2] o.s.a.r.l.SimpleMessageListenerContainer : Failed to check/redeclare auto-delete queue(s).
2025-08-03T20:59:13.550-04:00  INFO 83482 --- [ntContainer#2-2] o.s.a.r.c.CachingConnectionFactory       : Attempting to connect to: [localhost:5672]
```

The application was trying to connect to RabbitMQ at localhost:5672, but either RabbitMQ was not running or the connection details were incorrect. This caused the application to get stuck during startup.

## Root Cause
The application was configured to use RabbitMQ for messaging (as seen in RabbitMqConfig.java), but there were no connection properties defined in application.properties. The application was trying to connect to the default RabbitMQ host (localhost) and port (5672), but RabbitMQ was not available at that location.

## Solution
The solution was to make RabbitMQ optional by:

1. Making all RabbitMQ-related components conditional based on a property `spring.rabbitmq.enabled`:
   - Added `@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "true", matchIfMissing = false)` to:
     - RabbitMqConfig
     - UserRegisteredEventListener
     - MessageEventListener
     - UserRegisteredEventPublisher
     - MessageEventPublisher

2. Adding RabbitMQ configuration properties to application.properties:
   - Set `spring.rabbitmq.enabled=false` by default
   - Added sensible defaults for RabbitMQ connection properties:
     - spring.rabbitmq.host=localhost
     - spring.rabbitmq.port=5672
     - spring.rabbitmq.username=guest
     - spring.rabbitmq.password=guest

## How It Works
With these changes:
1. The `spring.rabbitmq.enabled` property is set to `false` by default
2. All RabbitMQ-related components are annotated with `@ConditionalOnProperty` that checks this property
3. Since the property is `false`, none of these components will be initialized during application startup
4. This prevents the application from trying to connect to RabbitMQ, which was causing it to get stuck

## Future Use
If RabbitMQ functionality is needed in the future:
1. Set `spring.rabbitmq.enabled=true` in application.properties
2. Ensure RabbitMQ is running with the specified connection properties
3. The application will then initialize all RabbitMQ-related components and connect to RabbitMQ

This solution provides flexibility while ensuring the application can start successfully even if RabbitMQ is not available.