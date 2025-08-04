package com.baltotest.application.dto;

/**
 * Response object for authentication operations
 */
public class AuthResponse {
    public String token;

    /**
     * Constructor
     * @param token JWT token for authenticated user
     */
    public AuthResponse(String token) {
        this.token = token;
    }
    
    /**
     * Getter for token
     * @return JWT token
     */
    public String getToken() {
        return token;
    }

    /**
     * Setter for token
     * @param token JWT token
     */
    public void setToken(String token) {
        this.token = token;
    }
}
