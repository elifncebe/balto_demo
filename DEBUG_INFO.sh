#!/bin/bash

echo "=== DEBUG INFORMATION ===\n"

echo "Java version:"
java -version

echo "\nGradle version:"
./gradlew --version

echo "\nProject structure:"
find src -type f | sort

echo "\nApplication.properties content:"
cat src/main/resources/application.properties

echo "\n=== DEBUGGING STEPS ===\n"
echo "1. Try running the test app: ./RUN_TEST_APP.sh"
echo "2. Try running with minimal config: ./MINIMAL_RUN.sh"
echo "3. Try running the main app with exclusions: ./RUN_MAIN_APP.sh"
echo "4. Try the comprehensive fix: ./FIX_ALL.sh"
