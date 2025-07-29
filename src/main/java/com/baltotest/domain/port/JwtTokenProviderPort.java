package com.baltotest.domain.port;

import java.util.UUID;

public interface JwtTokenProviderPort {
    String generateToken(UUID userId);
    UUID getUserIdFromToken(String token);
}
