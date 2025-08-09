package com.baltotest.domain.dto;

import com.baltotest.domain.entity.Role;
import java.time.LocalDateTime;

public class UserActivityDto {
    private String name;
    private Role role;
    private int loadsCreated;
    private int messagesSent;
    private LocalDateTime lastActive;

    public UserActivityDto() {
    }

    public UserActivityDto(String name, Role role, int loadsCreated, int messagesSent, LocalDateTime lastActive) {
        this.name = name;
        this.role = role;
        this.loadsCreated = loadsCreated;
        this.messagesSent = messagesSent;
        this.lastActive = lastActive;
    }

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public int getLoadsCreated() { return loadsCreated; }
    public void setLoadsCreated(int loadsCreated) { this.loadsCreated = loadsCreated; }

    public int getMessagesSent() { return messagesSent; }
    public void setMessagesSent(int messagesSent) { this.messagesSent = messagesSent; }

    public LocalDateTime getLastActive() { return lastActive; }
    public void setLastActive(LocalDateTime lastActive) { this.lastActive = lastActive; }
}
