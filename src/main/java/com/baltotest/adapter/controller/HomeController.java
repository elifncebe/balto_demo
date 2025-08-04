package com.baltotest.adapter.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller to handle the home page and login requests
 */
@Controller
public class HomeController {

    /**
     * Serves the login page for unauthenticated users
     */
    @GetMapping("/")
    public String home() {
        return "login";
    }
    
    /**
     * Explicit mapping for login page
     */
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/api/health")
    @ResponseBody
    public String health() {
        return "{\"status\": \"UP\", \"message\": \"Application is running\"}";
    }
}
