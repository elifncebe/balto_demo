# Balto Test Quick Start

To quickly run the application, choose one of these options:

## Option 1: Quickstart Script

```bash
chmod +x QUICKSTART.sh
./QUICKSTART.sh
```

This will create all necessary files and run the SimpleApp, which doesn't require database or security configuration.

## Option 2: Run Bypass Mode

```bash
chmod +x run-bypass.sh
./run-bypass.sh
```

This runs a minimal Java application without Spring Boot, which is useful for testing that the environment is working correctly.

## Option 3: Run Simple Mode

```bash
chmod +x run-simple.sh
./run-simple.sh
```

This runs the SimpleApp with Spring Boot but without database dependencies.

## Accessing the Application

Once running, the application is available at:

- http://localhost:8080 - Home page
- http://localhost:8080/hello - Hello endpoint
- http://localhost:8080/api/status - API status endpoint
- http://localhost:8080/shutdown - Shutdown the application
