package com.baltotest.adapter.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/dashboard-simple")
public class DashboardController {

    @GetMapping
    public String dashboard() {
        // For now, just return a simple dashboard view
        return "dashboard";
    }
}
