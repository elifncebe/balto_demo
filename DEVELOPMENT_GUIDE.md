# Development Guide

## Running the Application

### Using Gradle

The application can be run using the Gradle `bootRun` task:

```bash
./gradlew bootRun
```

#### Important Notes About bootRun

When running the application with `./gradlew bootRun`, you'll see output similar to this when the application has started:

```
<==========---> 80% EXECUTING [some time]
> :bootRun
```

**This is normal and expected behavior for a web application.** The application is running successfully and is waiting for incoming requests. The Gradle task remains at 80% execution because:

1. Spring Boot applications are designed to keep running until explicitly shut down
2. The Gradle bootRun task is designed to keep running while the application is running
3. This is the intended behavior for web applications that need to stay running to serve requests

The application is fully functional at this point, and you can access it at http://localhost:8080 (or whatever port is configured).

### Stopping the Application

To stop the application, you can:

1. Press `Ctrl+C` in the terminal where you started the application. This will send a termination signal to the application and stop it gracefully.

2. If that doesn't work, or if you've lost the terminal session, you can find and kill the process:
   ```bash
   # Find the Java process running your application
   ps aux | grep java
   
   # Kill the process using its PID
   kill <PID>
   ```

The application will shut down gracefully, closing any open connections and resources.

## RabbitMQ Configuration

The application is configured to work with or without RabbitMQ:

- By default, RabbitMQ is disabled (`spring.rabbitmq.enabled=false` in `application.properties`).
- If you want to use RabbitMQ, set `spring.rabbitmq.enabled=true` in `application.properties` and ensure RabbitMQ is running with the configured connection details.

## Development Profile

When running the application with `./gradlew bootRun`, the `dev` profile is automatically activated. This profile can be used to configure development-specific settings in `application-dev.properties` if needed.