package com.baltotest.domain.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "loads")
public class Load {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    
    @Column(nullable = false)
    private String originAddress;
    
    @Column(nullable = false)
    private String destinationAddress;
    
    @Column(nullable = false)
    private LocalDateTime pickupDate;
    
    @Column(nullable = false)
    private LocalDateTime deliveryDate;
    
    @Column
    private LocalDateTime estimatedDeliveryDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoadStatus status;
    
    @ManyToOne
    @JoinColumn(name = "broker_id", nullable = false)
    private User broker;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;
    
    @ManyToOne
    @JoinColumn(name = "carrier_id")
    private User carrier;
    
    @Column
    private String vehicleDetails;
    
    @Column
    private String notes;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Getters and Setters
    public UUID getId() { return id; }
    public String getOriginAddress() { return originAddress; }
    public String getDestinationAddress() { return destinationAddress; }
    public LocalDateTime getPickupDate() { return pickupDate; }
    public LocalDateTime getDeliveryDate() { return deliveryDate; }
    public LocalDateTime getEstimatedDeliveryDate() { return estimatedDeliveryDate; }
    public LoadStatus getStatus() { return status; }
    public User getBroker() { return broker; }
    public User getCustomer() { return customer; }
    public User getCarrier() { return carrier; }
    public String getVehicleDetails() { return vehicleDetails; }
    public String getNotes() { return notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setId(UUID id) { this.id = id; }
    public void setOriginAddress(String originAddress) { this.originAddress = originAddress; }
    public void setDestinationAddress(String destinationAddress) { this.destinationAddress = destinationAddress; }
    public void setPickupDate(LocalDateTime pickupDate) { this.pickupDate = pickupDate; }
    public void setDeliveryDate(LocalDateTime deliveryDate) { this.deliveryDate = deliveryDate; }
    public void setEstimatedDeliveryDate(LocalDateTime estimatedDeliveryDate) { this.estimatedDeliveryDate = estimatedDeliveryDate; }
    public void setStatus(LoadStatus status) { this.status = status; }
    public void setBroker(User broker) { this.broker = broker; }
    public void setCustomer(User customer) { this.customer = customer; }
    public void setCarrier(User carrier) { this.carrier = carrier; }
    public void setVehicleDetails(String vehicleDetails) { this.vehicleDetails = vehicleDetails; }
    public void setNotes(String notes) { this.notes = notes; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}