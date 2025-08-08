/**
 * Utils package entry point for the logistics platform
 * Exports all utilities and types
 */

// Export types
export * from './types';

// Export storage utilities
export {
  storage,
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
} from './storage/secureStorage';

// Export authentication utilities
export {
  parseToken,
  isAuthenticated,
  getUserRole,
  hasRole,
  isBroker,
  isCustomer,
  login,
  register,
  logout,
} from './auth/authUtils';

// Export API client
export {
  createApiClient,
  api,
  apiService,
} from './api/apiClient';

// Default export
export default {
  // Types
  types: require('./types'),
  
  // Storage
  storage: require('./storage/secureStorage').default,
  
  // Auth
  auth: require('./auth/authUtils').default,
  
  // API
  api: require('./api/apiClient').default,
};