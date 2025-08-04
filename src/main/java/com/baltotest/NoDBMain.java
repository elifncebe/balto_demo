package com.baltotest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * A simplified Spring Boot application without database dependencies
 */
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class,
    SecurityAutoConfiguration.class
})
@RestController
public class NoDBMain {

    public static void main(String[] args) {
        SpringApplication.run(NoDBMain.class, args);
        System.out.println("NoDBMain application started - runs without database dependencies");
    }

    @GetMapping("/")
    public String home() {
        return "<html><body><h1>Balto Test Application</h1>" +
               "<p>Application running in No-Database mode</p>" +
               "<p>This is a simplified version without database connections</p>" +
               "</body></html>";
    }

    @GetMapping("/api/status")
    public String status() {
        return "{\"status\": \"UP\", \"message\": \"NoDBMain application running\"}";
    }

    @GetMapping("/bye")
    public String shutdown() {
        new Thread(() -> {
            try {
                Thread.sleep(1000);
                System.exit(0);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();

        return "<html><body><h1>Shutting down...</h1>" +
               "<p>The application will shut down in 1 second</p>" +
               "</body></html>";
    }
}