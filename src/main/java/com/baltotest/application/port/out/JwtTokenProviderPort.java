package com.baltotest.application.port.out;

import java.util.UUID;

public interface JwtTokenProviderPort {
    // ...existing code...
    boolean validateToken(String token);
    String extractUsername(String token);
    String generateToken(UUID userId);
    // ...existing code...
}
