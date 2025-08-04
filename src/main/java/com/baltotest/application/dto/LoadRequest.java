package com.baltotest.application.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Data Transfer Object for load creation requests
 */
public class LoadRequest {
    // Original fields
    public String originAddress;
    public String destinationAddress;
    public LocalDateTime pickupDateTime;
    public LocalDateTime deliveryDateTime;
    public UUID brokerId;
    public UUID customerId;
    public UUID carrierId;
    public String vehicleDetails;
    public String notes;
    
    // Customer Information
    public String customerName;
    public String customerCompany;
    public String customerEmail;
    public String customerPhone;
    
    // Pickup Information
    public String pickupAddress;
    public String pickupCity;
    public String pickupState;
    public String pickupZip;
    public LocalDate pickupDate;
    public String pickupTime;
    public String pickupNotes;
    
    // Delivery Information
    public String deliveryAddress;
    public String deliveryCity;
    public String deliveryState;
    public String deliveryZip;
    public LocalDate deliveryEta;
    public String deliveryTime;
    public String deliveryNotes;
    
    // Vehicle Information
    public List<VIN> vins = new ArrayList<>();
    
    /**
     * Default constructor - initializes the vins list with 3 empty VIN objects
     * to match the template's expectations
     */
    public LoadRequest() {
        // Initialize with 3 empty VIN objects
        vins.add(new VIN());
        vins.add(new VIN());
        vins.add(new VIN());
    }
    
    // Getters and setters for all fields
    
    public String getOriginAddress() {
        return originAddress;
    }
    
    public void setOriginAddress(String originAddress) {
        this.originAddress = originAddress;
    }
    
    public String getDestinationAddress() {
        return destinationAddress;
    }
    
    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }
    
    public LocalDateTime getPickupDateTime() {
        return pickupDateTime;
    }
    
    public void setPickupDateTime(LocalDateTime pickupDateTime) {
        this.pickupDateTime = pickupDateTime;
    }
    
    public LocalDateTime getDeliveryDateTime() {
        return deliveryDateTime;
    }
    
    public void setDeliveryDateTime(LocalDateTime deliveryDateTime) {
        this.deliveryDateTime = deliveryDateTime;
    }
    
    public UUID getBrokerId() {
        return brokerId;
    }
    
    public void setBrokerId(UUID brokerId) {
        this.brokerId = brokerId;
    }
    
    public UUID getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }
    
    public UUID getCarrierId() {
        return carrierId;
    }
    
    public void setCarrierId(UUID carrierId) {
        this.carrierId = carrierId;
    }
    
    public String getVehicleDetails() {
        return vehicleDetails;
    }
    
    public void setVehicleDetails(String vehicleDetails) {
        this.vehicleDetails = vehicleDetails;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public String getCustomerCompany() {
        return customerCompany;
    }
    
    public void setCustomerCompany(String customerCompany) {
        this.customerCompany = customerCompany;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    public String getCustomerPhone() {
        return customerPhone;
    }
    
    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
    
    public String getPickupAddress() {
        return pickupAddress;
    }
    
    public void setPickupAddress(String pickupAddress) {
        this.pickupAddress = pickupAddress;
    }
    
    public String getPickupCity() {
        return pickupCity;
    }
    
    public void setPickupCity(String pickupCity) {
        this.pickupCity = pickupCity;
    }
    
    public String getPickupState() {
        return pickupState;
    }
    
    public void setPickupState(String pickupState) {
        this.pickupState = pickupState;
    }
    
    public String getPickupZip() {
        return pickupZip;
    }
    
    public void setPickupZip(String pickupZip) {
        this.pickupZip = pickupZip;
    }
    
    public LocalDate getPickupDate() {
        return pickupDate;
    }
    
    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }
    
    public String getPickupTime() {
        return pickupTime;
    }
    
    public void setPickupTime(String pickupTime) {
        this.pickupTime = pickupTime;
    }
    
    public String getPickupNotes() {
        return pickupNotes;
    }
    
    public void setPickupNotes(String pickupNotes) {
        this.pickupNotes = pickupNotes;
    }
    
    public String getDeliveryAddress() {
        return deliveryAddress;
    }
    
    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
    
    public String getDeliveryCity() {
        return deliveryCity;
    }
    
    public void setDeliveryCity(String deliveryCity) {
        this.deliveryCity = deliveryCity;
    }
    
    public String getDeliveryState() {
        return deliveryState;
    }
    
    public void setDeliveryState(String deliveryState) {
        this.deliveryState = deliveryState;
    }
    
    public String getDeliveryZip() {
        return deliveryZip;
    }
    
    public void setDeliveryZip(String deliveryZip) {
        this.deliveryZip = deliveryZip;
    }
    
    public LocalDate getDeliveryEta() {
        return deliveryEta;
    }
    
    public void setDeliveryEta(LocalDate deliveryEta) {
        this.deliveryEta = deliveryEta;
    }
    
    public String getDeliveryTime() {
        return deliveryTime;
    }
    
    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
    
    public String getDeliveryNotes() {
        return deliveryNotes;
    }
    
    public void setDeliveryNotes(String deliveryNotes) {
        this.deliveryNotes = deliveryNotes;
    }
    
    public List<VIN> getVins() {
        return vins;
    }
    
    public void setVins(List<VIN> vins) {
        this.vins = vins;
    }
}