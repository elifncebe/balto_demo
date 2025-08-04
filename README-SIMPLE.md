# Balto Test - Simplified Access Guide

This guide provides simple instructions for running the application without dealing with complex configuration issues.

## Quick Start

### Option 1: Using the provided scripts

**On Unix/Mac:**
```bash
chmod +x run-simple.sh
./run-simple.sh
```

**On Windows:**
```
run-simple.bat
```

### Option 2: Running with Gradle (with simplified configuration)

```bash
./gradlew bootRun --args='--spring.profiles.active=simple'
```

### Option 3: Running manually

```bash
# Compile the application
./gradlew compileJava

# Run the SimpleApp class directly
java -cp build/classes/java/main:build/resources/main -Dspring.profiles.active=simple com.baltotest.SimpleApp
```

## Access the Application

Once started, the application will be available at:

- http://localhost:8080 - Home page
- http://localhost:8080/hello - Test endpoint
- http://localhost:8080/api/status - API status endpoint
- http://localhost:8080/shutdown - Shutdown the application

## Troubleshooting

1. If you see "<==========---> 80% EXECUTING" in Gradle, that's normal! The application is running.

2. If you get port conflicts, you can change the port by setting the `server.port` property:
   ```
   ./gradlew bootRun --args='--spring.profiles.active=simple --server.port=8081'
   ```

3. If you get database errors, make sure you're using the simple profile that bypasses database connectivity.

4. To stop the application:
   - Access the /shutdown endpoint
   - Or press Ctrl+C in the terminal
