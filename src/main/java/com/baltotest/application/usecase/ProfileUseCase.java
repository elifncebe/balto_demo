package com.baltotest.application.usecase;

import com.baltotest.application.dto.UserResponse;

import java.util.UUID;

public interface ProfileUseCase {
    UserResponse getProfile(UUID userId);
    UserResponse updateProfile(UUID userId, String name, String phone, String location);
}
