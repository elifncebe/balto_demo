import { Platform } from 'react-native';
import axios from 'axios';

// Constants
const AUTH_ENDPOINT = '/api/auth';
const TOKEN_KEY = 'logistics_platform_token';
const USER_KEY = 'logistics_platform_user';

/**
 * Platform-specific storage implementation
 */
export const storage = {
  /**
   * Get item from storage
   * @param {string} key - Storage key
   * @returns {Promise<string|null>} - Stored value or null
   */
  getItem: async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      // For React Native, we would use Expo SecureStore or AsyncStorage
      // This is a placeholder that would be replaced with actual implementation
      try {
        const { getItemAsync } = require('expo-secure-store');
        return await getItemAsync(key);
      } catch (error) {
        console.error('Error getting item from secure storage:', error);
        return null;
      }
    }
  },

  /**
   * Set item in storage
   * @param {string} key - Storage key
   * @param {string} value - Value to store
   * @returns {Promise<void>}
   */
  setItem: async (key, value) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return Promise.resolve();
    } else {
      // For React Native, we would use Expo SecureStore or AsyncStorage
      try {
        const { setItemAsync } = require('expo-secure-store');
        await setItemAsync(key, value);
      } catch (error) {
        console.error('Error setting item in secure storage:', error);
      }
    }
  },

  /**
   * Remove item from storage
   * @param {string} key - Storage key
   * @returns {Promise<void>}
   */
  removeItem: async (key) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return Promise.resolve();
    } else {
      // For React Native, we would use Expo SecureStore or AsyncStorage
      try {
        const { deleteItemAsync } = require('expo-secure-store');
        await deleteItemAsync(key);
      } catch (error) {
        console.error('Error removing item from secure storage:', error);
      }
    }
  },
};

/**
 * Parse JWT token to get payload
 * @param {string} token - JWT token
 * @returns {Object|null} - Token payload or null if invalid
 */
export const parseToken = (token) => {
  if (!token) return null;
  
  try {
    // JWT token is split into three parts: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

/**
 * Get stored authentication token
 * @returns {Promise<string|null>} - Stored token or null
 */
export const getToken = async () => {
  return await storage.getItem(TOKEN_KEY);
};

/**
 * Set authentication token in storage
 * @param {string} token - JWT token
 * @returns {Promise<void>}
 */
export const setToken = async (token) => {
  await storage.setItem(TOKEN_KEY, token);
};

/**
 * Remove authentication token from storage
 * @returns {Promise<void>}
 */
export const removeToken = async () => {
  await storage.removeItem(TOKEN_KEY);
};

/**
 * Get stored user data
 * @returns {Promise<Object|null>} - User data or null
 */
export const getUser = async () => {
  const userData = await storage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Set user data in storage
 * @param {Object} user - User data
 * @returns {Promise<void>}
 */
export const setUser = async (user) => {
  await storage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Remove user data from storage
 * @returns {Promise<void>}
 */
export const removeUser = async () => {
  await storage.removeItem(USER_KEY);
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} - True if authenticated
 */
export const isAuthenticated = async () => {
  const token = await getToken();
  if (!token) return false;
  
  // Check if token is expired
  const payload = parseToken(token);
  if (!payload || !payload.exp) return false;
  
  const expirationTime = payload.exp * 1000; // Convert to milliseconds
  return Date.now() < expirationTime;
};

/**
 * Get user role from token
 * @returns {Promise<string|null>} - User role or null
 */
export const getUserRole = async () => {
  const token = await getToken();
  if (!token) return null;
  
  const payload = parseToken(token);
  return payload?.role || null;
};

/**
 * Check if user has specific role
 * @param {string} role - Role to check
 * @returns {Promise<boolean>} - True if user has role
 */
export const hasRole = async (role) => {
  const userRole = await getUserRole();
  return userRole === role;
};

/**
 * Check if user is a broker
 * @returns {Promise<boolean>} - True if user is a broker
 */
export const isBroker = async () => {
  return await hasRole('BROKER');
};

/**
 * Check if user is a customer
 * @returns {Promise<boolean>} - True if user is a customer
 */
export const isCustomer = async () => {
  return await hasRole('CUSTOMER');
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${AUTH_ENDPOINT}/login`, {
      email,
      password,
    });
    
    const { token } = response.data;
    await setToken(token);
    
    // Extract user info from token
    const payload = parseToken(token);
    const user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    
    await setUser(user);
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register user
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} role - User role
 * @returns {Promise<Object>} - User data
 */
export const register = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${AUTH_ENDPOINT}/register`, {
      name,
      email,
      password,
      role,
    });
    
    const { token } = response.data;
    await setToken(token);
    
    // Extract user info from token
    const payload = parseToken(token);
    const user = {
      id: payload.sub,
      name,
      email,
      role,
    };
    
    await setUser(user);
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  await removeToken();
  await removeUser();
};

export default {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  isAuthenticated,
  getUserRole,
  hasRole,
  isBroker,
  isCustomer,
  login,
  register,
  logout,
};