package com.baltotest.adapter.controller;

import com.baltotest.application.usecase.ProfileUseCase;
import com.baltotest.domain.dto.UpdateProfileRequest;
import com.baltotest.application.dto.UserResponse;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileUseCase profileUseCase;

    public ProfileController(ProfileUseCase profileUseCase) {
        this.profileUseCase = profileUseCase;
    }

    @GetMapping
    public ResponseEntity<UserResponse> getProfile(@RequestParam UUID userId) {
        return ResponseEntity.ok(profileUseCase.getProfile(userId));
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateProfile(
        @RequestParam UUID userId,
        @RequestBody UpdateProfileRequest request) {
        UserResponse response = profileUseCase.updateProfile(userId, request.getName(), request.getPhone());
        return ResponseEntity.ok(response);
    }
}
