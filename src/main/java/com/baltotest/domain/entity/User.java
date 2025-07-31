package com.baltotest.domain.entity;

import jakarta.persistence.*;
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
