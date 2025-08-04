#!/bin/bash

echo "=== BALTO TEST MINIMAL RUN ===\n"

# Create a minimal SimpleApp with almost no dependencies
cat > src/main/java/com/baltotest/SimpleApp.java << 'EOF'
package com.baltotest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(
    exclude = {
        DataSourceAutoConfiguration.class,
        HibernateJpaAutoConfiguration.class,
        SecurityAutoConfiguration.class
    }
)
@RestController
public class SimpleApp {

    public static void main(String[] args) {
        SpringApplication.run(SimpleApp.class, args);
        System.out.println("\nBalto Test Simple App is running!");
    }

    @GetMapping("/")
    public String home() {
        return "<h1>Balto Test App</h1>";
    }
}
EOF

# Set system properties to disable security and change port
export SPRING_PROFILES_ACTIVE=simple
export SERVER_PORT=8888
export SPRING_SECURITY_ENABLED=false
export MANAGEMENT_SECURITY_ENABLED=false

# Run the application
echo "Running Balto Test with SimpleApp..."
./gradlew bootRun -PmainClass=com.baltotest.SimpleApp --args='--spring.profiles.active=simple --server.port=8888'
