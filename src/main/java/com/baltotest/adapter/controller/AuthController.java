package com.baltotest.adapter.controller;

import com.baltotest.application.usecase.AuthUseCase;
import com.baltotest.application.dto.ApiResponse;
import com.baltotest.application.dto.AuthRequest;
import com.baltotest.application.dto.AuthResponse;
import com.baltotest.application.dto.RegisterRequest;
import com.baltotest.messaging.UserRegisteredEventPublisherInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthUseCase authUseCase;
    private final UserRegisteredEventPublisherInterface eventPublisher;

    public AuthController(AuthUseCase authUseCase, UserRegisteredEventPublisherInterface eventPublisher) {
        this.authUseCase = authUseCase;
        this.eventPublisher = eventPublisher;
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthResponse>> signup(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authUseCase.register(request);
            // Publish event to RabbitMQ
            eventPublisher.publishUserRegistered(request.email, request.name);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().contains("constraint") && e.getMessage().contains("email")) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("DUPLICATE_EMAIL", "This email is already registered. Please use a different email or try logging in."));
            }
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        try {
            System.out.println("Login attempt for email: " + request.email);
            AuthResponse response = authUseCase.login(request);
            System.out.println("Login successful for email: " + request.email);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            System.out.println("Login failed for email: " + request.email + ", error: " + e.getMessage());
            e.printStackTrace();
            throw e; // Let the exception handler deal with it
        }
    }
}
