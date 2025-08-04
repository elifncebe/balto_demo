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

        System.out.println("\n=====================================\n");
        System.out.println("Balto Test Simple App is running!");
        System.out.println("\nAccess the application at: http://localhost:8080");
        System.out.println("For API access: http://localhost:8080/api/status");
        System.out.println("To terminate: http://localhost:8080/shutdown");
        System.out.println("\n=====================================");
    }

    @GetMapping("/")
    public String home() {
        return "<html><body style='font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;'>"
             + "<h1>Balto Test Application</h1>"
             + "<p>The application is running successfully!</p>"
             + "<h2>Available Endpoints:</h2>"
             + "<ul>"
             + "<li><a href='/api/status'>API Status</a></li>"
             + "<li><a href='/hello'>Hello World</a></li>"
             + "<li><a href='/shutdown'>Shutdown Application</a></li>"
             + "</ul>"
             + "</body></html>";
    }

    @GetMapping("/api/status")
    public String status() {
        return "{\"status\": \"UP\", \"application\": \"Balto Test\", \"version\": \"1.0.0\"}";
    }

    @GetMapping("/hello")
    public String hello() {
        return "<html><body style='font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;'>"
             + "<h1>Hello from Balto Test!</h1>"
             + "<p>This is a simple endpoint that works without any authentication.</p>"
             + "<p><a href='/'>Back to home</a></p>"
             + "</body></html>";
    }

    @GetMapping("/shutdown")
    public String shutdown() {
        new Thread(() -> {
            try {
                Thread.sleep(1000);
                System.exit(0);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();

        return "<html><body style='font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;'>"
             + "<h1>Shutting Down...</h1>"
             + "<p>The application will shut down in 1 second.</p>"
             + "</body></html>";
    }
}