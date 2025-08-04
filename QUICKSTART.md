# Balto Test Quick Start Guide

## Option 1: Run Standalone Java Application (No Spring Boot)

```bash
# No build tools required, just Java!
java standalone.java
```

This will start a simple HTTP server on port 8080 that you can access at http://localhost:8080.

## Option 2: Use the Minimal Solution Script

```bash
# Make the script executable
chmod +x minimal-solution.sh

# Run the script to create and set up a minimal Spring Boot app
./minimal-solution.sh

# Then run using Gradle
./gradlew bootRun
```

## Option 3: Fix the Existing Application

```bash
# Make the script executable
chmod +x fix-app.sh

# Run the script to fix the application
./fix-app.sh

# Then run the fixed application
./run.sh
```

## Accessing the Application

Once running, access the application at:

- http://localhost:8080 - Home page
- http://localhost:8080/hello - Hello endpoint
- http://localhost:8080/quit or http://localhost:8080/shutdown - Shutdown the server

## Troubleshooting

1. **Port in use**: If port 8080 is already in use, change the port in the configuration or kill the process using that port.

2. **Java version**: Make sure you're using Java 17 or higher.

3. **Gradle issues**: If you're having issues with Gradle, try running the standalone Java application which doesn't require Gradle.

4. **Database errors**: These solutions don't connect to a database to avoid related issues.

5. **Security errors**: Security has been disabled in these solutions to avoid related issues.

## Why the Regular Application Doesn't Complete

When running a Spring Boot web application with `./gradlew bootRun`, the task appears to be stuck at 80% execution. This is normal and expected behavior for a web application. The application is running successfully and waiting for incoming requests.

The Gradle task remains at 80% because Spring Boot applications are designed to keep running until explicitly shut down, and the bootRun task reflects this by staying active while the application is running.
