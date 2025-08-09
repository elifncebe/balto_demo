package com.baltotest.application.service;

import com.baltotest.domain.entity.User;
import com.baltotest.application.dto.UserResponse;
import com.baltotest.application.usecase.ProfileUseCase;
import java.util.UUID;
import com.baltotest.domain.port.UserRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class ProfileService implements ProfileUseCase {

    private final UserRepositoryPort userRepository;

    public ProfileService(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse getProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getLocation());
    }

    @Override
    public UserResponse updateProfile(UUID userId, String name, String phone, String location) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(name);
        user.setPhone(phone);
        if (location != null) {
            user.setLocation(location);
        }
        User updated = userRepository.save(user);
        return new UserResponse(updated.getId(), updated.getName(), updated.getEmail(), updated.getRole(), updated.getLocation());
    }
}
