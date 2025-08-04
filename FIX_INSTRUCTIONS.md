# How to Fix the WebSecurityConfig Issue

The main issue is that the class name `WebSecurityConfig` doesn't match the file name `SecurityConfig.java`. In Java, public classes must be declared in files with matching names.

## Option 1: Quick Fix Script

Use the provided script to automatically fix the issue:

```bash
chmod +x fix-security-issue.sh
./fix-security-issue.sh
```

Then run the application:

```bash
./gradlew bootRun
```

## Option 2: Manual Fix

1. Rename the file `src/main/java/com/baltotest/config/SecurityConfig.java` to `WebSecurityConfig.java`:

   ```bash
   mv src/main/java/com/baltotest/config/SecurityConfig.java src/main/java/com/baltotest/config/WebSecurityConfig.java
   ```

2. Run the application:

   ```bash
   ./gradlew bootRun
   ```

## Option 3: Alternative Fix

Instead of renaming the file, you could change the class name in the file to match the file name:

1. Edit `src/main/java/com/baltotest/config/SecurityConfig.java`
2. Change `public class WebSecurityConfig {` to `public class SecurityConfig {`
3. Run the application

## Verify Success

Once fixed, the application should compile and run correctly. You can access:

- http://localhost:8080/hello - Basic hello endpoint
- http://localhost:8080/terminate - Endpoint to shut down the application
