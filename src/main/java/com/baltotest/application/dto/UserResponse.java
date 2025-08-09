package com.baltotest.application.dto;

import java.util.UUID;
import com.baltotest.domain.entity.Role;

public class UserResponse {
    public UUID id;
    public String name;
    public String email;
    public Role role;
    public String location;

    public UserResponse(UUID id, String name, String email, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
    
    public UserResponse(UUID id, String name, String email, Role role, String location) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.location = location;
    }
}
