import axios from 'axios';
import { getToken } from './auth';

/**
 * Create an axios instance with default configuration
 */
export const createApiClient = (baseURL = '/api') => {
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
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle specific error cases
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
            // Unauthorized - token expired or invalid
            // This could trigger a logout or token refresh
            console.error('Authentication error:', data.message || 'Unauthorized');
            break;
          case 403:
            // Forbidden - user doesn't have permission
            console.error('Permission error:', data.message || 'Forbidden');
            break;
          case 404:
            // Not found
            console.error('Resource not found:', data.message || 'Not found');
            break;
          case 500:
            // Server error
            console.error('Server error:', data.message || 'Internal server error');
            break;
          default:
            console.error(`Error ${status}:`, data.message || 'Unknown error');
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
   * @param {string} url - The URL to request
   * @param {Object} params - Query parameters
   * @param {Object} config - Additional axios config
   */
  get: (url, params = {}, config = {}) => {
    return api.get(url, { ...config, params });
  },

  /**
   * Perform a POST request
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} config - Additional axios config
   */
  post: (url, data = {}, config = {}) => {
    return api.post(url, data, config);
  },

  /**
   * Perform a PUT request
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} config - Additional axios config
   */
  put: (url, data = {}, config = {}) => {
    return api.put(url, data, config);
  },

  /**
   * Perform a PATCH request
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} config - Additional axios config
   */
  patch: (url, data = {}, config = {}) => {
    return api.patch(url, data, config);
  },

  /**
   * Perform a DELETE request
   * @param {string} url - The URL to request
   * @param {Object} config - Additional axios config
   */
  delete: (url, config = {}) => {
    return api.delete(url, config);
  },
};

export default apiService;