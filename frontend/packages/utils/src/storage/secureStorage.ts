/**
 * Secure storage utility for the logistics platform
 * Provides platform-specific implementations for web and mobile
 */

import { Platform } from 'react-native';

// Constants
const TOKEN_KEY = 'logistics_platform_token';
const USER_KEY = 'logistics_platform_user';

/**
 * Interface for storage operations
 */
export interface StorageInterface {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

/**
 * Web storage implementation using httpOnly cookies for tokens
 * and localStorage for other data
 */
class WebStorage implements StorageInterface {
  /**
   * Get item from storage
   * @param key - Storage key
   * @returns Stored value or null
   */
  async getItem(key: string): Promise<string | null> {
    // For token, we rely on httpOnly cookies which are automatically
    // sent with requests and not accessible via JavaScript
    if (key === TOKEN_KEY) {
      // We can't directly access httpOnly cookies, so we return a placeholder
      // The actual token will be sent automatically with requests
      return localStorage.getItem('has_auth_token') ? 'token_exists' : null;
    }
    
    return localStorage.getItem(key);
  }

  /**
   * Set item in storage
   * @param key - Storage key
   * @param value - Value to store
   */
  async setItem(key: string, value: string): Promise<void> {
    // For token, we set a flag in localStorage to indicate that a token exists
    // The actual token is stored in an httpOnly cookie by the server
    if (key === TOKEN_KEY) {
      localStorage.setItem('has_auth_token', 'true');
      return;
    }
    
    localStorage.setItem(key, value);
  }

  /**
   * Remove item from storage
   * @param key - Storage key
   */
  async removeItem(key: string): Promise<void> {
    // For token, we remove the flag from localStorage
    // The actual token cookie will be cleared by the server
    if (key === TOKEN_KEY) {
      localStorage.removeItem('has_auth_token');
      return;
    }
    
    localStorage.removeItem(key);
  }
}

/**
 * Mobile storage implementation using Expo SecureStore
 */
class MobileStorage implements StorageInterface {
  /**
   * Get item from secure storage
   * @param key - Storage key
   * @returns Stored value or null
   */
  async getItem(key: string): Promise<string | null> {
    try {
      // Dynamically import Expo SecureStore to avoid issues in web environments
      const { getItemAsync } = await import('expo-secure-store');
      return await getItemAsync(key);
    } catch (error) {
      console.error('Error getting item from secure storage:', error);
      return null;
    }
  }

  /**
   * Set item in secure storage
   * @param key - Storage key
   * @param value - Value to store
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      const { setItemAsync } = await import('expo-secure-store');
      await setItemAsync(key, value);
    } catch (error) {
      console.error('Error setting item in secure storage:', error);
    }
  }

  /**
   * Remove item from secure storage
   * @param key - Storage key
   */
  async removeItem(key: string): Promise<void> {
    try {
      const { deleteItemAsync } = await import('expo-secure-store');
      await deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing item from secure storage:', error);
    }
  }
}

/**
 * Create platform-specific storage implementation
 */
export const createStorage = (): StorageInterface => {
  if (Platform.OS === 'web') {
    return new WebStorage();
  } else {
    return new MobileStorage();
  }
};

/**
 * Default storage instance
 */
export const storage = createStorage();

/**
 * Helper functions for common storage operations
 */

/**
 * Get stored authentication token
 * @returns Stored token or null
 */
export const getToken = async (): Promise<string | null> => {
  return await storage.getItem(TOKEN_KEY);
};

/**
 * Set authentication token in storage
 * @param token - JWT token
 */
export const setToken = async (token: string): Promise<void> => {
  await storage.setItem(TOKEN_KEY, token);
};

/**
 * Remove authentication token from storage
 */
export const removeToken = async (): Promise<void> => {
  await storage.removeItem(TOKEN_KEY);
};

/**
 * Get stored user data
 * @returns User data or null
 */
export const getUser = async (): Promise<any | null> => {
  const userData = await storage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Set user data in storage
 * @param user - User data
 */
export const setUser = async (user: any): Promise<void> => {
  await storage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Remove user data from storage
 */
export const removeUser = async (): Promise<void> => {
  await storage.removeItem(USER_KEY);
};

export default {
  storage,
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
};