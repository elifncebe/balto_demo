package com.baltotest.application.dto;

import com.baltotest.domain.entity.ChannelType;

public class ChannelRequest {
    public ChannelType type;
    public String name;
    public String description;
    public String configuration;
    public boolean active;
}