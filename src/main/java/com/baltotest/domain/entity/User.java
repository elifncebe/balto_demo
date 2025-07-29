package com.baltotest.domain.entity;

import java.util.UUID;

public class User {
    private UUID id;
    private String name;
    private String email;
    private String hashedPassword;
    private Role role;
    private String phone;

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getHashedPassword() { return hashedPassword; }
    public Role getRole() { return role; }
    public String getPhone() { return phone; }

    public void setId(UUID id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setHashedPassword(String hashedPassword) { this.hashedPassword = hashedPassword; }
    public void setRole(Role role) { this.role = role; }
    public void setPhone(String phone) { this.phone = phone; }
}
