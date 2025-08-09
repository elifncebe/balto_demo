package com.baltotest.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String hashedPassword;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String phone;

    @Column(nullable = true)
    private String location = "Princeton, NJ"; // Default location

    @Column(nullable = true)
    private LocalDateTime lastActive;

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getHashedPassword() { return hashedPassword; }
    public Role getRole() { return role; }
    public String getPhone() { return phone; }
    public String getLocation() { return location; }
    public LocalDateTime getLastActive() { return lastActive; }

    public void setId(UUID id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setHashedPassword(String hashedPassword) { this.hashedPassword = hashedPassword; }
    public void setRole(Role role) { this.role = role; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setLocation(String location) { this.location = location; }
    public void setLastActive(LocalDateTime lastActive) { this.lastActive = lastActive; }

    /**
     * Updates the lastActive timestamp to the current time
     */
    public void updateLastActive() {
        this.lastActive = LocalDateTime.now();
    }
}
