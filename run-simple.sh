#!/bin/bash

echo "Starting simple Balto Test application..."

# Clean and compile
./gradlew clean compileJava

# Run the simple application with gradle
./gradlew bootRun -PmainClass=com.baltotest.SimpleApp --args='--spring.profiles.active=simple'
