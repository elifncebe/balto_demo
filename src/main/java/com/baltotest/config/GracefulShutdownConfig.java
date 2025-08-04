package com.baltotest.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class GracefulShutdownConfig {

    @Autowired
    private ApplicationContext applicationContext;

    @EventListener(ContextRefreshedEvent.class)
    public void setupShutdownHook() {
        // Create a shutdown hook file that can be deleted to trigger shutdown
        try {
            Path shutdownFilePath = Paths.get("shutdown.signal");
            if (!Files.exists(shutdownFilePath)) {
                Files.createFile(shutdownFilePath);
                System.out.println("\nCreated shutdown file: " + shutdownFilePath.toAbsolutePath());
                System.out.println("Delete this file to gracefully shut down the application\n");
            }

            // Create a watchdog thread to monitor the shutdown file
            Thread watchdog = new Thread(() -> {
                File shutdownFile = shutdownFilePath.toFile();
                while (shutdownFile.exists()) {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }

                // File was deleted, trigger shutdown
                System.out.println("\nShutdown signal detected. Gracefully shutting down the application...\n");
                SpringApplication.exit(applicationContext, () -> 0);
            });

            watchdog.setDaemon(true);
            watchdog.start();

        } catch (IOException e) {
            System.err.println("Failed to create shutdown file: " + e.getMessage());
        }
    }
}
