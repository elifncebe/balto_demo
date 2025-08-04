package com.baltotest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class SimpleController {

    @GetMapping("/hello")
    public ResponseEntity<Map<String, String>> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from Balto Test Application!");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/terminate")
    public ResponseEntity<Map<String, String>> terminate() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Application is shutting down");
        response.put("status", "success");

        // Start a new thread to shut down the application after response is sent
        new Thread(() -> {
            try {
                Thread.sleep(500); // Wait for response to be sent
                System.exit(0); // Force exit with success code
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();

        return ResponseEntity.ok(response);
    }
}
