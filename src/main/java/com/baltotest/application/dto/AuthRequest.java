package com.baltotest.application.dto;

public class AuthRequest {
    public String email;
    public String password;

    // Default constructor
    public AuthRequest() {}

    // Constructor for testing
    public AuthRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and setters for Jackson serialization
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AuthRequest{email='" + email + "'}";
    }
}
