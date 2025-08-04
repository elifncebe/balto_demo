#!/bin/bash
#!/bin/bash

echo "Running Balto Test in bypass mode (no Spring dependencies)..."

# Compile the application
./gradlew clean compileJava

# Run using the bypass main class
./gradlew bypassRun
echo "Starting Balto Test in bypass mode (no Spring)..."

# First compile
javac -d build/classes/java/main src/main/java/com/baltotest/BypassMain.java

# Then run
java -cp build/classes/java/main com.baltotest.BypassMain

echo "Application finished."
