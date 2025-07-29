package com.baltotest.adapter.repository;

import com.baltotest.domain.entity.User;
import com.baltotest.domain.port.UserRepositoryPort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaUserRepository extends JpaRepository<User, UUID>, UserRepositoryPort {
    Optional<User> findByEmail(String email);
}
