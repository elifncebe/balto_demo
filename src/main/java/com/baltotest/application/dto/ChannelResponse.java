package com.baltotest.application.dto;

import com.baltotest.domain.entity.ChannelType;

import java.time.LocalDateTime;
import java.util.UUID;

public class ChannelResponse {
    public UUID id;
    public ChannelType type;
    public String name;
    public String description;
    public String configuration;
    public boolean active;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
}