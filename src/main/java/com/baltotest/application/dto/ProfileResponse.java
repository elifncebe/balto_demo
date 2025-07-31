package com.baltotest.application.dto;

import com.baltotest.domain.entity.Role;

import java.util.UUID;

public class ProfileResponse {
    public UUID id;
    public String name;
    public String email;
    public Role role;
}
