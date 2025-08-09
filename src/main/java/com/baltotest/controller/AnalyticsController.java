package com.baltotest.controller;

import com.baltotest.domain.dto.UserActivityDto;
import com.baltotest.service.UserActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@Controller
public class AnalyticsController {

    private final UserActivityService userActivityService;

    @Autowired
    public AnalyticsController(UserActivityService userActivityService) {
        this.userActivityService = userActivityService;
    }

    @GetMapping("/analytics")
    public String showAnalytics(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Model model) {

        List<UserActivityDto> userActivity;

        if (startDate != null && endDate != null) {
            userActivity = userActivityService.getUserActivityByDateRange(startDate, endDate);
            model.addAttribute("startDate", startDate);
            model.addAttribute("endDate", endDate);
        } else {
            // Default to last 7 days if no date range specified
            LocalDate today = LocalDate.now();
            LocalDate sevenDaysAgo = today.minusDays(7);
            userActivity = userActivityService.getUserActivityByDateRange(sevenDaysAgo, today);
            model.addAttribute("startDate", sevenDaysAgo);
            model.addAttribute("endDate", today);
        }

        model.addAttribute("userActivity", userActivity);
        return "analytics";
    }
}
