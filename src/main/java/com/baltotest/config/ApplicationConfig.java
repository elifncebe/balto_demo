package com.baltotest.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

@Configuration
public class ApplicationConfig {

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        // Log that the application is fully initialized and ready
        System.out.println("\n====================================");
        System.out.println("Application is ready and fully initialized!");
        System.out.println("Try these working endpoints:");
        System.out.println("  - http://localhost:8080/hello     (Simple test endpoint)");
        System.out.println("  - http://localhost:8080/terminate (Gracefully shut down)");
        System.out.println("\nPress Ctrl+C to stop the application");
        System.out.println("====================================\n");
    }
}
