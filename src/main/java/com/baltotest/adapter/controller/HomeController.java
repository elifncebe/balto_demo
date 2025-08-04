package com.baltotest.adapter.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Simple controller to handle the home page request
 */
@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String home() {
        return "<html><body>" +
               "<h1>Balto Test Application</h1>" +
               "<p>The application is running successfully!</p>" +
               "<p>This is a test application with RabbitMQ integration disabled.</p>" +
               "<p><a href='/actuator'>View Actuator Endpoints</a></p>" +
               "</body></html>";
    }

    @GetMapping("/api/health")
    @ResponseBody
    public String health() {
        return "{\"status\": \"UP\", \"message\": \"Application is running\"}";
    }
}
