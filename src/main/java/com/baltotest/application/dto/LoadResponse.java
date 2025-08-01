package com.baltotest.application.dto;

import com.baltotest.domain.entity.LoadStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public class LoadResponse {
    public UUID id;
    public String originAddress;
    public String destinationAddress;
    public LocalDateTime pickupDate;
    public LocalDateTime deliveryDate;
    public LocalDateTime estimatedDeliveryDate;
    public LoadStatus status;
    public UserResponse broker;
    public UserResponse customer;
    public UserResponse carrier;
    public String vehicleDetails;
    public String notes;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
}