# Balto Test Application Usage Guide

## Base URL
The application runs on `http://localhost:8080` by default.

## Available Endpoints

### Authentication Endpoints
These endpoints are publicly accessible without authentication:

1. **Register a new user**
   - URL: `http://localhost:8080/auth/signup`
   - Method: `POST`
   - Request Body:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "securepassword",
       "role": "CUSTOMER"
     }
     ```
   - Response:
     ```json
     {
       "token": "your.jwt.token"
     }
     ```

2. **Login**
   - URL: `http://localhost:8080/auth/login`
   - Method: `POST`
   - Request Body:
     ```json
     {
       "email": "john@example.com",
       "password": "securepassword"
     }
     ```
   - Response:
     ```json
     {
       "token": "your.jwt.token"
     }
     ```

### Profile Endpoints
These endpoints require authentication. You need to include the JWT token in the Authorization header:

1. **Get User Profile**
   - URL: `http://localhost:8080/profile?userId=<user-uuid>`
   - Method: `GET`
   - Headers:
     ```
     Authorization: Bearer your.jwt.token
     ```
   - Response:
     ```json
     {
       "id": "user-uuid",
       "name": "John Doe",
       "email": "john@example.com",
       "role": "CUSTOMER"
     }
     ```

2. **Update User Profile**
   - URL: `http://localhost:8080/profile?userId=<user-uuid>`
   - Method: `PUT`
   - Headers:
     ```
     Authorization: Bearer your.jwt.token
     ```
   - Request Body:
     ```json
     {
       "name": "John Updated",
       "phone": "123-456-7890"
     }
     ```
   - Response:
     ```json
     {
       "id": "user-uuid",
       "name": "John Updated",
       "email": "john@example.com",
       "role": "CUSTOMER"
     }
     ```

## Testing the Application

### Option 1: Using PostgreSQL (Default)

1. Make sure PostgreSQL is running and accessible with the credentials in `application.properties`

2. Start the application using:
   ```
   ./gradlew bootRun
   ```

### Option 2: Using H2 In-Memory Database (Easier for Testing)

1. Start the application with the H2 profile:
   ```
   ./gradlew bootRun --args='--spring.profiles.active=h2'
   ```

2. Access the H2 console at `http://localhost:8080/h2-console` with these settings:
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: `password`

2. Register a new user using the `/auth/signup` endpoint
   ```
   curl -X POST http://localhost:8080/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"securepassword","role":"CUSTOMER"}'
   ```

3. Login using the `/auth/login` endpoint
   ```
   curl -X POST http://localhost:8080/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"securepassword"}'
   ```

4. Save the JWT token from the response

5. Use the token to access protected endpoints
   ```
   curl -X GET "http://localhost:8080/profile?userId=<user-uuid>" \
     -H "Authorization: Bearer your.jwt.token"
   ```

## Troubleshooting

- If the application doesn't start, check if PostgreSQL is running and accessible with the credentials in `application.properties`
- If you get authentication errors, make sure your JWT token is valid and properly formatted in the Authorization header
- For any other issues, check the application logs for detailed error messages