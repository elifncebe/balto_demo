package com.baltotest.application.usecase;

import com.baltotest.application.dto.*;

public interface AuthUseCase {
    AuthResponse login(AuthRequest request);
    AuthResponse register(RegisterRequest request);
}
