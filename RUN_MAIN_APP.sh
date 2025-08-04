#!/bin/bash

echo "=== RUNNING MAIN BALTO TEST APPLICATION ===\n"

# Create WebSecurityConfig if it doesn't exist
mkdir -p src/main/java/com/baltotest/config
cat > src/main/java/com/baltotest/config/WebSecurityConfig.java << 'EOF'
package com.baltotest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll()
                )
                .build();
    }
}
EOF

# Set system properties to disable security and database
export SPRING_AUTOCONFIGURE_EXCLUDE=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
export SPRING_SECURITY_ENABLED=false
export MANAGEMENT_SECURITY_ENABLED=false

# Run the main application
echo "Running main Balto Test application..."
./gradlew bootRun --args='--spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration'
