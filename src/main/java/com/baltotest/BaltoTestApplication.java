package com.baltotest;

import com.baltotest.domain.entity.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.baltotest.domain.port.UserRepositoryPort;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@SpringBootApplication(
    exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class}
)
public class BaltoTestApplication {
    public static void main(String[] args) {
        SpringApplication.run(BaltoTestApplication.class, args);
    }

    @Bean
    public UserRepositoryPort userRepositoryPort() {
        return new UserRepositoryPort() {
            private final Map<UUID, User> usersById = new ConcurrentHashMap<>();
            private final Map<String, User> usersByEmail = new ConcurrentHashMap<>();

            @Override
            public Optional<User> findByEmail(String email) {
                return Optional.ofNullable(usersByEmail.get(email));
            }

            @Override
            public Optional<User> findById(UUID id) {
                return Optional.ofNullable(usersById.get(id));
            }

            @Override
            public User save(User user) {
                if (user.getId() == null) {
                    user.setId(UUID.randomUUID());
                }
                usersById.put(user.getId(), user);
                usersByEmail.put(user.getEmail(), user);
                return user;
            }
        };
    }
}
