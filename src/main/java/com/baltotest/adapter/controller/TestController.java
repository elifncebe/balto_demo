package com.baltotest.adapter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Simple controller to test that endpoints are working correctly
 */
@RestController
public class TestController {

    @GetMapping("/test")
    public Map<String, String> test() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Application is running correctly");
        return response;
    }

    @GetMapping("/shutdown")
    public Map<String, String> shutdown() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Shutdown requested");

        // Start a new thread to shut down the application after response is sent
        new Thread(() -> {
            try {
                Thread.sleep(500); // Wait for response to be sent
                System.exit(0); // Force exit with success code
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();

        return response;
    }
}
