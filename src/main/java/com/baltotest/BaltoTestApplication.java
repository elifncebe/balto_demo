package com.baltotest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = {
    RabbitAutoConfiguration.class,
    SecurityAutoConfiguration.class
})
@EntityScan(basePackages = "com.baltotest.domain.entity")
@EnableJpaRepositories(basePackages = {"com.baltotest.adapter.repository", "com.baltotest.domain.repository"})
@ComponentScan(basePackages = "com.baltotest", 
    excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, 
            classes = {SimpleApp.class, NoDBMain.class, TestApp.class}),
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, 
            classes = {com.baltotest.config.NullSecurityConfig.class})
    })
public class BaltoTestApplication {
    public static void main(String[] args) {
        // Ensure security is disabled
        System.setProperty("spring.security.enabled", "false");
        System.setProperty("management.security.enabled", "false");

        SpringApplication.run(BaltoTestApplication.class, args);

        System.out.println("\n=====================================");
        System.out.println("Balto Test Application Started Successfully!");
        System.out.println("=====================================");
        System.out.println("Access the application at: http://localhost:8080");
        System.out.println("Try the hello endpoint at: http://localhost:8080/hello");
        System.out.println("To terminate: http://localhost:8080/terminate");
        System.out.println("=====================================");
    }
}
