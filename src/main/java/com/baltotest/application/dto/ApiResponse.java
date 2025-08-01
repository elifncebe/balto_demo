package com.baltotest.application.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * A standardized response wrapper for all API responses.
 * This follows the "superdiapatch" API format.
 * 
 * @param <T> The type of data contained in the response
 */
public class ApiResponse<T> {
    public T data;
    public Meta meta;
    public List<Error> errors;
    
    public ApiResponse() {
        this.meta = new Meta();
        this.errors = new ArrayList<>();
    }
    
    public ApiResponse(T data) {
        this();
        this.data = data;
    }
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data);
    }
    
    public static <T> ApiResponse<T> error(String code, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.errors.add(new Error(code, message));
        return response;
    }
    
    public static class Meta {
        public LocalDateTime timestamp;
        public String version;
        
        public Meta() {
            this.timestamp = LocalDateTime.now();
            this.version = "1.0";
        }
    }
    
    public static class Error {
        public String code;
        public String message;
        
        public Error(String code, String message) {
            this.code = code;
            this.message = message;
        }
    }
}