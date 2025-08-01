# Balto Test Application

A Spring Boot application that provides user authentication and profile management through a RESTful API.

## Overview

Balto Test is a Java-based web application built with Spring Boot that implements a secure user authentication system with JWT tokens and provides profile management capabilities. The application follows a clean architecture pattern and uses JPA for database operations.

## Features

- User registration and authentication
- JWT-based security
- User profile management
- Role-based access control (BROKER and CUSTOMER roles)
- Support for both PostgreSQL and H2 in-memory database
- Asynchronous messaging with RabbitMQ
- Standardized API responses following the superdiapatch format

## Technologies Used

- Java 17
- Spring Boot 3.5.4
- Spring Security
- Spring Data JPA
- JWT (JSON Web Tokens)
- PostgreSQL / H2 Database
- Gradle

## Prerequisites

- JDK 17 or later
- Gradle 7.x or later
- PostgreSQL (optional, can use H2 in-memory database for testing)

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/balto-test.git
   cd balto-test
   ```

2. Build the application:
   ```
   ./gradlew build
   ```

3. Run the application:

   **Option 1: Using PostgreSQL (Default)**
   
   Make sure PostgreSQL is running and accessible with the credentials in `application.properties`, then run:
   ```
   ./gradlew bootRun
   ```

   **Option 2: Using H2 In-Memory Database (Easier for Testing)**
   ```
   ./gradlew bootRun --args='--spring.profiles.active=h2'
   ```

## Usage

The application runs on `http://localhost:8080` by default.

### Authentication

1. **Register a new user**:
   ```
   curl -X POST http://localhost:8080/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"securepassword","role":"CUSTOMER"}'
   ```

2. **Login**:
   ```
   curl -X POST http://localhost:8080/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"securepassword"}'
   ```

### Profile Management

1. **Get User Profile**:
   ```
   curl -X GET "http://localhost:8080/profile?userId=<user-uuid>" \
     -H "Authorization: Bearer your.jwt.token"
   ```

2. **Update User Profile**:
   ```
   curl -X PUT "http://localhost:8080/profile?userId=<user-uuid>" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your.jwt.token" \
     -d '{"name":"John Updated","phone":"123-456-7890"}'
   ```

## Project Structure

The application follows a clean architecture pattern with the following main packages:

- `com.baltotest.domain.entity`: Domain entities (User, Role)
- `com.baltotest.domain.port`: Domain ports (interfaces)
- `com.baltotest.application.usecase`: Application use cases
- `com.baltotest.application.service`: Service implementations
- `com.baltotest.application.dto`: Data transfer objects
- `com.baltotest.adapter.controller`: REST controllers
- `com.baltotest.adapter.repository`: JPA repositories
- `com.baltotest.adapter.out.security`: Security configuration and JWT implementation

## Database Configuration

### PostgreSQL (Default)

The application is configured to use PostgreSQL by default. Update the following properties in `application.properties` to match your PostgreSQL setup:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### H2 In-Memory Database (For Testing)

For testing purposes, you can use the H2 in-memory database by activating the `h2` profile:

```
./gradlew bootRun --args='--spring.profiles.active=h2'
```

When using H2, you can access the database console at `http://localhost:8080/h2-console` with these settings:
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

## Documentation

For more detailed information, please refer to:

- [Application Usage Guide](APPLICATION_USAGE_GUIDE.md): Detailed guide on how to use the application, including all available endpoints and example requests/responses.
- [Summary of Changes](SUMMARY_OF_CHANGES.md): Summary of recent changes and recommendations for using the application.

## Troubleshooting

- If the application doesn't start, check if PostgreSQL is running and accessible with the credentials in `application.properties`
- If you get authentication errors, make sure your JWT token is valid and properly formatted in the Authorization header
- For any other issues, check the application logs for detailed error messages

