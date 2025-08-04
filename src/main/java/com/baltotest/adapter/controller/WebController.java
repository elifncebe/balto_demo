package com.baltotest.adapter.controller;

import com.baltotest.application.dto.LoadRequest;
import com.baltotest.application.usecase.LoadUseCase;
import com.baltotest.application.usecase.MessageUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.UUID;

/**
 * Controller to handle web pages for authenticated users
 */
@Controller
public class WebController {

    private final LoadUseCase loadUseCase;
    private final MessageUseCase messageUseCase;

    @Autowired
    public WebController(LoadUseCase loadUseCase, MessageUseCase messageUseCase) {
        this.loadUseCase = loadUseCase;
        this.messageUseCase = messageUseCase;
    }

    /**
     * Dashboard page showing list of loads
     */
    @GetMapping("/dashboard")
    public String dashboard(Model model, 
                           @RequestParam(required = false) String status,
                           @RequestParam(required = false) LocalDate pickupDate) {
        try {
            // In a real implementation, we would filter loads based on status and pickupDate
            // For now, we'll just add empty loads list to the model
            model.addAttribute("loads", Collections.emptyList());
            return "dashboard";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load dashboard: " + e.getMessage());
            return "error";
        }
    }

    /**
     * Load details page showing information about a specific load
     */
    @GetMapping("/loads/{id}")
    public String loadDetails(@PathVariable UUID id, Model model) {
        try {
            // In a real implementation, we would fetch the load and its VINs
            // For now, we'll just return the template
            model.addAttribute("load", null);
            model.addAttribute("messages", Collections.emptyList());
            return "load-detail";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load details: " + e.getMessage());
            return "error";
        }
    }

    /**
     * Create new load page
     */
    @GetMapping("/loads/new")
    public String createLoadForm(Model model) {
        try {
            // Initialize an empty load request for the form
            model.addAttribute("loadRequest", new LoadRequest());
            return "create-load";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load form: " + e.getMessage());
            return "error";
        }
    }

    /**
     * Handle load creation form submission
     */
    @PostMapping("/web/loads/create")
    public String createLoad(@ModelAttribute LoadRequest loadRequest, Model model) {
        try {
            // In a real implementation, we would save the load
            // For now, we'll just redirect to the dashboard
            return "redirect:/dashboard";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to create load: " + e.getMessage());
            model.addAttribute("loadRequest", loadRequest);
            return "create-load";
        }
    }

    /**
     * Analytics page showing broker-level metrics
     */
    @GetMapping("/analytics")
    public String analytics(Model model,
                           @RequestParam(required = false) LocalDate startDate,
                           @RequestParam(required = false) LocalDate endDate) {
        try {
            // In a real implementation, we would fetch analytics data
            // For now, we'll just add placeholder data to the model
            model.addAttribute("startDate", startDate);
            model.addAttribute("endDate", endDate);
            model.addAttribute("totalVins", 247);
            model.addAttribute("vinChangePercentage", "+12%");
            model.addAttribute("returnVisits", "85%");
            model.addAttribute("visitChangePercentage", "+5%");
            model.addAttribute("inboundMessages", "1,243");
            model.addAttribute("messageChangePercentage", "+18%");
            model.addAttribute("avgDeliveryDelay", "1.2s");
            model.addAttribute("delayChangePercentage", "+0.3s");
            model.addAttribute("vinsByMonth", Collections.emptyList());
            model.addAttribute("userActivity", Collections.emptyList());
            return "analytics";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load analytics: " + e.getMessage());
            return "error";
        }
    }

    /**
     * Handle message submission for a load
     */
    @PostMapping("/loads/{id}/message")
    public String sendMessage(@PathVariable UUID id,
                             @RequestParam String content,
                             @RequestParam String channelType,
                             @RequestParam(required = false) String attachment) {
        try {
            // In a real implementation, we would save the message
            // For now, we'll just redirect back to the load details page
            return "redirect:/loads/" + id;
        } catch (Exception e) {
            return "redirect:/loads/" + id + "?error=Failed to send message: " + e.getMessage();
        }
    }

    /**
     * Handle marking a load as resolved
     */
    @PostMapping("/loads/{id}/resolve")
    public String resolveLoad(@PathVariable UUID id) {
        try {
            // In a real implementation, we would update the load status
            // For now, we'll just redirect back to the dashboard
            return "redirect:/dashboard";
        } catch (Exception e) {
            return "redirect:/dashboard?error=Failed to resolve load: " + e.getMessage();
        }
    }

    /**
     * Error page
     */
    @GetMapping("/error")
    public String error() {
        return "error";
    }
}