package com.baltotest.adapter.controller;

import com.baltotest.application.usecase.AuthUseCase;
import com.baltotest.application.dto.AuthRequest;
import com.baltotest.application.dto.AuthResponse;
import com.baltotest.application.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthUseCase authUseCase;

    public AuthController(AuthUseCase authUseCase) {
        this.authUseCase = authUseCase;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authUseCase.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authUseCase.login(request));
    }
}
