#!/bin/bash

echo "===== BALTO TEST SIMPLE RUN =====\n"

# Try the bypass mode first
echo "Running application in bypass mode (no Spring Boot)..."
./gradlew bypassRun

# If the above failed, try running SimpleApp
if [ $? -ne 0 ]; then
    echo "\nBypass mode failed, trying simple mode...\n"
    ./gradlew bootRun -PmainClass=com.baltotest.SimpleApp --args='--spring.profiles.active=simple'
fi
