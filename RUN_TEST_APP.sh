#!/bin/bash

echo "=== RUNNING TEST APP ===\n"

# Run the test app
echo "Running TestApp..."
./gradlew bootRun -PmainClass=com.baltotest.TestApp --args='--spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration'
