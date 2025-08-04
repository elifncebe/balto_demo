#!/bin/bash

echo "=== RUNNING BALTO WITH FRONTEND FOCUS ===\n"

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

# Ensure template directory exists
mkdir -p src/main/resources/templates

# Run the application with frontend profile
echo "Running with frontend development mode..."
./gradlew bootRun --args='--spring.profiles.active=frontend,simple --spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration'
