package com.baltotest.domain.port;

import com.baltotest.domain.entity.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepositoryPort {
    Optional<User> findByEmail(String email);
    Optional<User> findById(UUID id);
    User save(User user);
}
