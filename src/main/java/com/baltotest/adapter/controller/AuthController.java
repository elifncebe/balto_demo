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
        AuthResponse response = authUseCase.register(request);
        // Publish event to RabbitMQ
        eventPublisher.publishUserRegistered(request.email, request.name);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authUseCase.login(request)));
    }
}
