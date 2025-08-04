package com.baltotest.application.dto;

/**
 * Data Transfer Object for Vehicle Identification Number (VIN) information
 */
public class VIN {
    public String vinNumber;
    public String make;
    public String model;
    public Integer year;
    public String color;
    public String notes;
    
    /**
     * Default constructor
     */
    public VIN() {
    }
    
    /**
     * Getter for vinNumber
     */
    public String getVinNumber() {
        return vinNumber;
    }
    
    /**
     * Setter for vinNumber
     */
    public void setVinNumber(String vinNumber) {
        this.vinNumber = vinNumber;
    }
    
    /**
     * Getter for make
     */
    public String getMake() {
        return make;
    }
    
    /**
     * Setter for make
     */
    public void setMake(String make) {
        this.make = make;
    }
    
    /**
     * Getter for model
     */
    public String getModel() {
        return model;
    }
    
    /**
     * Setter for model
     */
    public void setModel(String model) {
        this.model = model;
    }
    
    /**
     * Getter for year
     */
    public Integer getYear() {
        return year;
    }
    
    /**
     * Setter for year
     */
    public void setYear(Integer year) {
        this.year = year;
    }
    
    /**
     * Getter for color
     */
    public String getColor() {
        return color;
    }
    
    /**
     * Setter for color
     */
    public void setColor(String color) {
        this.color = color;
    }
    
    /**
     * Getter for notes
     */
    public String getNotes() {
        return notes;
    }
    
    /**
     * Setter for notes
     */
    public void setNotes(String notes) {
        this.notes = notes;
    }
}