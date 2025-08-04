#!/bin/bash

echo "Fixing security configuration file name issue..."

# Check if the source file exists
if [ -f "src/main/java/com/baltotest/config/SecurityConfig.java" ]; then
    # Rename the file to match the class name
    mv "src/main/java/com/baltotest/config/SecurityConfig.java" "src/main/java/com/baltotest/config/WebSecurityConfig.java"
    echo "Renamed SecurityConfig.java to WebSecurityConfig.java"
else
    echo "SecurityConfig.java not found, might already be fixed."
fi

echo "Done. Now try running the application with: ./gradlew bootRun"
