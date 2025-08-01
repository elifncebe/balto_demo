package com.baltotest.application.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class LoadRequest {
    public String originAddress;
    public String destinationAddress;
    public LocalDateTime pickupDate;
    public LocalDateTime deliveryDate;
    public UUID brokerId;
    public UUID customerId;
    public UUID carrierId;
    public String vehicleDetails;
    public String notes;
}