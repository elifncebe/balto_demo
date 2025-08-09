package com.baltotest.adapter.controller;

import com.baltotest.application.dto.LoadRequest;
import com.baltotest.application.dto.MessageDisplayDTO;
import com.baltotest.application.dto.VIN;
import com.baltotest.application.usecase.LoadUseCase;
import com.baltotest.application.usecase.MessageUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    public String loadDetails(@PathVariable String id, Model model) {
        try {
            // In a real implementation, we would fetch the load and its VINs
            // For now, we'll just create a dummy load object with the ID
            Map<String, Object> load = new HashMap<>();
            load.put("id", id);
            model.addAttribute("load", load);
            
            // Create sample messages for the example conversation
            List<MessageDisplayDTO> messages = createSampleMessages();
            model.addAttribute("messages", messages);
            
            // Explicitly set viewingAllMessages to false to show the message form
            model.addAttribute("viewingAllMessages", false);
            
            return "load-detail";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load details: " + e.getMessage());
            return "error";
        }
    }
    
    /**
     * Creates sample messages for demonstration purposes
     */
    private List<MessageDisplayDTO> createSampleMessages() {
        List<MessageDisplayDTO> messages = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        
        // Initial booking confirmation
        messages.add(new MessageDisplayDTO(
            "Balto System",
            now.minusDays(3),
            "Hi James, thank you for booking your shipment from Middletown CT, to Dallas TX! On this feed we'll keep you updated on ETAs and communications from our truckers!",
            "EMAIL",
            "Delivered",
            false
        ));
        
        // Trucker update 1
        messages.add(new MessageDisplayDTO(
            "Trucker",
            now.minusDays(2),
            "Just entered New York, roughly 12 hours until I reach Middletown CT.",
            "SMS",
            "Delivered",
            false
        ));
        
        // Customer response 1
        messages.add(new MessageDisplayDTO(
            "You",
            now.minusDays(2).plusHours(1),
            "Great, looking forward to being in the loop!",
            "SMS",
            "Delivered",
            true
        ));
        
        // Trucker update 2
        messages.add(new MessageDisplayDTO(
            "Trucker",
            now.minusDays(1),
            "Made it to New Haven - about 2 hours until l arrive, ETA is 3:10pm",
            "SMS",
            "Delivered",
            false
        ));
        
        // Customer response 2
        messages.add(new MessageDisplayDTO(
            "You",
            now.minusDays(1).plusHours(1),
            "Perfect, thanks!",
            "SMS",
            "Delivered",
            true
        ));
        
        return messages;
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
            // Set default values for required fields
            if (loadRequest.getBrokerId() == null) {
                loadRequest.setBrokerId(UUID.randomUUID()); // Use a default broker ID
            }
            
            if (loadRequest.getCustomerId() == null) {
                loadRequest.setCustomerId(UUID.randomUUID()); // Use a default customer ID
            }
            
            // Map the form's detailed address fields to the Load entity's simpler fields
            StringBuilder originAddressBuilder = new StringBuilder();
            if (loadRequest.getPickupAddress() != null) {
                originAddressBuilder.append(loadRequest.getPickupAddress()).append(", ");
            }
            if (loadRequest.getPickupCity() != null) {
                originAddressBuilder.append(loadRequest.getPickupCity()).append(", ");
            }
            if (loadRequest.getPickupState() != null) {
                originAddressBuilder.append(loadRequest.getPickupState()).append(" ");
            }
            if (loadRequest.getPickupZip() != null) {
                originAddressBuilder.append(loadRequest.getPickupZip());
            }
            loadRequest.setOriginAddress(originAddressBuilder.toString().trim());
            
            StringBuilder destinationAddressBuilder = new StringBuilder();
            if (loadRequest.getDeliveryAddress() != null) {
                destinationAddressBuilder.append(loadRequest.getDeliveryAddress()).append(", ");
            }
            if (loadRequest.getDeliveryCity() != null) {
                destinationAddressBuilder.append(loadRequest.getDeliveryCity()).append(", ");
            }
            if (loadRequest.getDeliveryState() != null) {
                destinationAddressBuilder.append(loadRequest.getDeliveryState()).append(" ");
            }
            if (loadRequest.getDeliveryZip() != null) {
                destinationAddressBuilder.append(loadRequest.getDeliveryZip());
            }
            loadRequest.setDestinationAddress(destinationAddressBuilder.toString().trim());
            
            // Convert the VIN list to a string representation for the vehicleDetails field
            if (loadRequest.getVins() != null && !loadRequest.getVins().isEmpty()) {
                StringBuilder vehicleDetailsBuilder = new StringBuilder();
                for (int i = 0; i < loadRequest.getVins().size(); i++) {
                    VIN vin = loadRequest.getVins().get(i);
                    if (vin != null && vin.getVinNumber() != null && !vin.getVinNumber().isEmpty()) {
                        if (i > 0) {
                            vehicleDetailsBuilder.append("; ");
                        }
                        vehicleDetailsBuilder.append("VIN: ").append(vin.getVinNumber());
                        if (vin.getMake() != null) {
                            vehicleDetailsBuilder.append(", Make: ").append(vin.getMake());
                        }
                        if (vin.getModel() != null) {
                            vehicleDetailsBuilder.append(", Model: ").append(vin.getModel());
                        }
                        if (vin.getYear() != null) {
                            vehicleDetailsBuilder.append(", Year: ").append(vin.getYear());
                        }
                        if (vin.getColor() != null) {
                            vehicleDetailsBuilder.append(", Color: ").append(vin.getColor());
                        }
                    }
                }
                loadRequest.setVehicleDetails(vehicleDetailsBuilder.toString());
            }
            
            // Call the LoadUseCase's createLoad method to save the load
            loadUseCase.createLoad(loadRequest);
            
            return "redirect:/dashboard";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to create load: " + e.getMessage());
            model.addAttribute("loadRequest", loadRequest);
            return "create-load";
        }
    }

    /**
     * Legacy analytics page showing broker-level metrics
     * @deprecated Use AnalyticsController instead for real data
     */
    @GetMapping("/legacy-analytics")
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
    public String sendMessage(@PathVariable String id,
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
     * Handle message submission without a specific load
     */
    @PostMapping("/messages/send")
    public String sendGeneralMessage(@RequestParam String content,
                                   @RequestParam String channelType,
                                   @RequestParam(required = false) String recipient,
                                   @RequestParam(required = false) String attachment) {
        try {
            // In a real implementation, we would save the message
            // For now, we'll just redirect back to the messages page
            return "redirect:/messages?success=Message sent successfully";
        } catch (Exception e) {
            return "redirect:/messages?error=Failed to send message: " + e.getMessage();
        }
    }

    /**
     * Handle marking a load as resolved
     */
    @PostMapping("/loads/{id}/resolve")
    public String resolveLoad(@PathVariable String id) {
        try {
            // In a real implementation, we would update the load status
            // For now, we'll just redirect back to the dashboard
            return "redirect:/dashboard";
        } catch (Exception e) {
            return "redirect:/dashboard?error=Failed to resolve load: " + e.getMessage();
        }
    }

    /**
     * View all messages across all loads
     */
    @GetMapping("/messages")
    public String allMessages(Model model) {
        try {
            // Create sample messages for demonstration
            List<MessageDisplayDTO> messages = createSampleMessages();
            model.addAttribute("messages", messages);
            
            // Add a flag to indicate we're viewing all messages (not a specific load)
            model.addAttribute("viewingAllMessages", true);
            
            // Set a title for the page
            model.addAttribute("pageTitle", "All Messages");
            
            return "load-detail";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load messages: " + e.getMessage());
            return "error";
        }
    }
    
    /**
     * View a specific message by ID
     */
    @GetMapping("/messages/{id}")
    public String viewMessage(@PathVariable String id, Model model) {
        try {
            // In a real implementation, we would fetch the specific message by ID
            // For now, we'll just create a sample message with the ID
            List<MessageDisplayDTO> messages = new ArrayList<>();
            LocalDateTime now = LocalDateTime.now();
            
            // Create a single message with the requested ID
            messages.add(new MessageDisplayDTO(
                "Balto System",
                now.minusDays(1),
                "This is message #" + id + ". In a real implementation, this would be fetched from the database.",
                "EMAIL",
                "Delivered",
                false
            ));
            
            model.addAttribute("messages", messages);
            
            // Add a flag to indicate we're viewing a specific message (not a load)
            model.addAttribute("viewingAllMessages", true);
            model.addAttribute("viewingSingleMessage", true);
            model.addAttribute("messageId", id);
            
            // Set a title for the page
            model.addAttribute("pageTitle", "Message #" + id);
            
            return "load-detail";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load message: " + e.getMessage());
            return "error";
        }
    }
    
    /**
     * View a message by number ID
     */
    @GetMapping("/messages/number/{id}")
    public String viewMessageByNumber(@PathVariable String id, Model model) {
        try {
            // In a real implementation, we would fetch the specific message by number ID
            // For now, we'll just create a sample message with the number ID
            List<MessageDisplayDTO> messages = new ArrayList<>();
            LocalDateTime now = LocalDateTime.now();
            
            // Create a single message with the requested number ID
            messages.add(new MessageDisplayDTO(
                "Trucker",
                now.minusDays(1),
                "This is message with number #" + id + ". In a real implementation, this would be fetched from the database.",
                "SMS",
                "Delivered",
                false
            ));
            
            model.addAttribute("messages", messages);
            
            // Add a flag to indicate we're viewing a specific message (not a load)
            model.addAttribute("viewingAllMessages", true);
            model.addAttribute("viewingSingleMessage", true);
            model.addAttribute("messageId", id);
            
            // Set a title for the page
            model.addAttribute("pageTitle", "Message Number #" + id);
            
            return "load-detail";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load message: " + e.getMessage());
            return "error";
        }
    }
    
    /**
     * View messages for a specific load
     */
    @GetMapping("/loads/{id}/messages")
    public String loadMessages(@PathVariable String id, Model model) {
        try {
            // In a real implementation, we would fetch the load and its messages
            // For now, we'll just create a dummy load object with the ID
            Map<String, Object> load = new HashMap<>();
            load.put("id", id);
            model.addAttribute("load", load);
            
            // Create sample messages for the example conversation
            List<MessageDisplayDTO> messages = createSampleMessages();
            model.addAttribute("messages", messages);
            
            // Explicitly set viewingAllMessages to false to show the message form
            model.addAttribute("viewingAllMessages", false);
            
            // Set a title for the page
            model.addAttribute("pageTitle", "Load " + id + " Messages");
            
            return "load-detail";
        } catch (Exception e) {
            model.addAttribute("error", "Failed to load messages: " + e.getMessage());
            return "error";
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