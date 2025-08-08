/**
 * API client utility for the logistics platform
 * Handles API requests, authentication, and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../storage/secureStorage';

/**
 * Create an axios instance with default configuration
 */
export const createApiClient = (baseURL = '/api'): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  client.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      
      // For web with httpOnly cookies, the token is sent automatically
      // For mobile, we need to add the token to the Authorization header
      if (token && token !== 'token_exists') {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle specific error cases
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
            // Unauthorized - token expired or invalid
            // This could trigger a logout or token refresh
            console.error('Authentication error:', data?.message || 'Unauthorized');
            // You could dispatch an event or call a callback here
            break;
          case 403:
            // Forbidden - user doesn't have permission
            console.error('Permission error:', data?.message || 'Forbidden');
            break;
          case 404:
            // Not found
            console.error('Resource not found:', data?.message || 'Not found');
            break;
          case 500:
            // Server error
            console.error('Server error:', data?.message || 'Internal server error');
            break;
          default:
            console.error(`Error ${status}:`, data?.message || 'Unknown error');
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.message || 'No response from server');
      } else {
        // Something happened in setting up the request
        console.error('Request error:', error.message);
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Default API client instance
 */
export const api = createApiClient();

/**
 * API methods for common operations
 */
export const apiService = {
  /**
   * Perform a GET request
   * @param url - The URL to request
   * @param params - Query parameters
   * @param config - Additional axios config
   */
  get: <T = any>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, { ...config, params });
  },

  /**
   * Perform a POST request
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Additional axios config
   */
  post: <T = any>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
  },

  /**
   * Perform a PUT request
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Additional axios config
   */
  put: <T = any>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return api.put<T>(url, data, config);
  },

  /**
   * Perform a PATCH request
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Additional axios config
   */
  patch: <T = any>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return api.patch<T>(url, data, config);
  },

  /**
   * Perform a DELETE request
   * @param url - The URL to request
   * @param config - Additional axios config
   */
  delete: <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return api.delete<T>(url, config);
  },
};

export default apiService;