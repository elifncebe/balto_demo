# Balto Login Instructions

## Issue Description

You encountered the following error when trying to access the application:

```json
{"data":null,"meta":{"timestamp":"2025-08-04T06:07:43.254971","version":"1.0"},"errors":[{"code":"INTERNAL_SERVER_ERROR","message":"An error occurred"}]}
```

And you asked about the username and password for the application.

## Solution

The Balto application does not have any default users. You need to register a new user first before you can log in.

### Step 1: Register a New User

Use the following curl command to register a new user:

```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"your.email@example.com","password":"your_password","role":"CUSTOMER"}'
```

Replace `Your Name`, `your.email@example.com`, and `your_password` with your desired values. The `role` can be either `CUSTOMER` or `BROKER`.

### Step 2: Log In with Your Credentials

After registering, you can log in using the following curl command:

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your.email@example.com","password":"your_password"}'
```

Use the same email and password you provided during registration.

### Step 3: Use the JWT Token

Upon successful login, you will receive a JWT token in the response. Use this token for authenticated requests by including it in the Authorization header:

```bash
curl -X GET "http://localhost:8080/profile?userId=<user-uuid>" \
  -H "Authorization: Bearer your.jwt.token"
```

Replace `<user-uuid>` with your user ID and `your.jwt.token` with the token you received from the login response.

## Using the Frontend

If you're using the frontend application, you can:

1. Navigate to http://localhost:8080/ in your web browser
2. Click on the "Register" tab if you don't have an account
3. Fill in your details and create an account
4. Log in with your email and password

## Troubleshooting

If you encounter issues:

1. Make sure the application is running correctly
2. Check that the database is properly configured and accessible
3. Verify that you're using the correct endpoint URLs
4. Ensure your JSON payload is properly formatted

For more detailed information, please refer to the [README.md](README.md) file in the project root.