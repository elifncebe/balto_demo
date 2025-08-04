package com.baltotest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Frontend controller that serves the main React application index page for various routes.
 * This allows client-side routing to work properly.
 */
@Controller
public class FrontendController {

    @GetMapping("/app")
    public String home() {
        return "index";
    }

    @GetMapping("/app/login")
    public String login() {
        return "index";
    }

    @GetMapping("/app/register")
    public String register() {
        return "index";
    }

    @GetMapping("/app/dashboard")
    public String dashboard() {
        return "index";
    }
}
