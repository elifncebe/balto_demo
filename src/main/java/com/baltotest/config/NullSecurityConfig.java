package com.baltotest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuration that completely disables Spring Security
 */
@Configuration
public class NullSecurityConfig {

    @Bean
    @Primary
    public SecurityFilterChain nullSecurityFilterChain(HttpSecurity http) throws Exception {
        // Disable CSRF and allow all requests
        http.csrf().disable();
        http.authorizeRequests().anyRequest().permitAll();

        return http.build();
    }
}
