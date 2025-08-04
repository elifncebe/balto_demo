#!/bin/bash

echo "Starting Balto Test Application..."

# First fix the security config file name issue if it exists
if [ -f "src/main/java/com/baltotest/config/SecurityConfig.java" ]; then
    echo "Fixing security configuration file name..."
    mv "src/main/java/com/baltotest/config/SecurityConfig.java" "src/main/java/com/baltotest/config/WebSecurityConfig.java"
fi

# Try different options for running
echo "Trying to run with SimpleApp..."
./gradlew bootRun -PmainClass=com.baltotest.SimpleApp --args='--spring.profiles.active=simple'

if [ $? -ne 0 ]; then
    echo "\nSimpleApp failed, trying BypassMain...\n"
    ./gradlew bypassRun
fi
