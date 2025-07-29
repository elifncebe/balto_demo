package com.baltotest.application.service;

import com.baltotest.application.usecase.AuthUseCase;
import com.baltotest.application.dto.AuthRequest;
import com.baltotest.application.dto.AuthResponse;
import com.baltotest.application.dto.RegisterRequest;
import com.baltotest.domain.entity.User;
import com.baltotest.domain.port.UserRepositoryPort;
import com.baltotest.application.port.out.JwtTokenProviderPort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService implements AuthUseCase {

    private final UserRepositoryPort userRepository;
    private final JwtTokenProviderPort jwtProvider;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepositoryPort userRepositoryPort, JwtService jwtService, BCryptPasswordEncoder passwordEncoder) {
        this.userRepositoryPort = userRepositoryPort;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setRole(request.role);
        user.setHashedPassword(passwordEncoder.encode(request.password));
        userRepository.save(user);
        String token = jwtProvider.generateToken(user.getId());
        return new AuthResponse(token);
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(request.password, user.getHashedPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtProvider.generateToken(user.getId());
        return new AuthResponse(token);
    }
}
