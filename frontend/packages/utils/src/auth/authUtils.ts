/**
 * Authentication utilities for the logistics platform
 */

import axios from 'axios';
import { 
  getToken, 
  setToken, 
  removeToken, 
  getUser, 
  setUser, 
  removeUser 
} from '../storage/secureStorage';
import { 
  User, 
  Role, 
  AuthRequest, 
  RegisterRequest, 
  AuthResponse, 
  JwtPayload 
} from '../types';

// Constants
const AUTH_ENDPOINT = '/api/auth';

/**
 * Parse JWT token to get payload
 * @param token - JWT token
 * @returns Token payload or null if invalid
 */
export const parseToken = (token: string): JwtPayload | null => {
  if (!token) return null;
  
  try {
    // JWT token is split into three parts: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // For browser environments
    if (typeof window !== 'undefined' && window.atob) {
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload);
    } 
    // For Node.js environments
    else if (typeof Buffer !== 'undefined') {
      const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
      return JSON.parse(jsonPayload);
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns True if authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken();
  if (!token) return false;
  
  // For web, we rely on httpOnly cookies, so we just check if the flag exists
  if (token === 'token_exists') return true;
  
  // For mobile, we check if the token is expired
  const payload = parseToken(token);
  if (!payload || !payload.exp) return false;
  
  const expirationTime = payload.exp * 1000; // Convert to milliseconds
  return Date.now() < expirationTime;
};

/**
 * Get user role from token
 * @returns User role or null
 */
export const getUserRole = async (): Promise<Role | null> => {
  // First try to get from stored user data
  const user = await getUser();
  if (user && user.role) return user.role as Role;
  
  // If not available, try to get from token
  const token = await getToken();
  if (!token || token === 'token_exists') return null;
  
  const payload = parseToken(token);
  return payload?.role || null;
};

/**
 * Check if user has specific role
 * @param role - Role to check
 * @returns True if user has role
 */
export const hasRole = async (role: Role): Promise<boolean> => {
  const userRole = await getUserRole();
  return userRole === role;
};

/**
 * Check if user is a broker
 * @returns True if user is a broker
 */
export const isBroker = async (): Promise<boolean> => {
  return await hasRole(Role.BROKER);
};

/**
 * Check if user is a customer
 * @returns True if user is a customer
 */
export const isCustomer = async (): Promise<boolean> => {
  return await hasRole(Role.CUSTOMER);
};

/**
 * Login user
 * @param email - User email
 * @param password - User password
 * @returns User data
 */
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post<AuthResponse>(`${AUTH_ENDPOINT}/login`, {
      email,
      password,
    });
    
    const { token, user } = response.data;
    await setToken(token);
    
    // If user data is not provided in the response, extract from token
    const userData = user || extractUserFromToken(token);
    
    await setUser(userData);
    return userData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register user
 * @param name - User name
 * @param email - User email
 * @param password - User password
 * @param role - User role
 * @param phone - User phone (optional)
 * @param company - User company (optional)
 * @returns User data
 */
export const register = async (
  name: string, 
  email: string, 
  password: string, 
  role: Role,
  phone?: string,
  company?: string
): Promise<User> => {
  try {
    const response = await axios.post<AuthResponse>(`${AUTH_ENDPOINT}/register`, {
      name,
      email,
      password,
      role,
      phone,
      company,
    });
    
    const { token, user } = response.data;
    await setToken(token);
    
    // If user data is not provided in the response, extract from token
    const userData = user || extractUserFromToken(token);
    
    await setUser(userData);
    return userData;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  // For web, we need to call the logout endpoint to clear the httpOnly cookie
  if (await getToken() === 'token_exists') {
    try {
      await axios.post(`${AUTH_ENDPOINT}/logout`);
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API call fails
    }
  }
  
  await removeToken();
  await removeUser();
};

/**
 * Extract user information from token
 * @param token - JWT token
 * @returns User data
 */
const extractUserFromToken = (token: string): User => {
  const payload = parseToken(token);
  if (!payload) {
    throw new Error('Invalid token');
  }
  
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.email.split('@')[0], // Fallback name if not provided
    role: payload.role,
  };
};

export default {
  parseToken,
  isAuthenticated,
  getUserRole,
  hasRole,
  isBroker,
  isCustomer,
  login,
  register,
  logout,
};