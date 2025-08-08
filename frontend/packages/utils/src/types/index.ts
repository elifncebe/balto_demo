/**
 * Common TypeScript interfaces for the logistics platform
 */

/**
 * User roles in the system
 */
export enum Role {
  BROKER = 'BROKER',
  CUSTOMER = 'CUSTOMER',
  CARRIER = 'CARRIER',
  DISPATCHER = 'DISPATCHER',
}

/**
 * User interface representing a user in the system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  company?: string;
}

/**
 * Load status enum
 */
export enum LoadStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

/**
 * Load interface representing a shipment in the system
 */
export interface Load {
  id: string;
  reference?: string;
  description?: string;
  status: LoadStatus;
  
  // Pickup information
  pickupLocation: string;
  pickupDate: string;
  pickupContact?: string;
  pickupNotes?: string;
  
  // Delivery information
  deliveryLocation: string;
  deliveryDate: string;
  deliveryContact?: string;
  deliveryNotes?: string;
  
  // Shipment details
  commodity?: string;
  weight?: number;
  equipmentType?: string;
  specialInstructions?: string;
  
  // Pricing
  rate?: number;
  paymentTerms?: string;
  
  // Relationships
  customerId: string;
  carrierId?: string;
  brokerId?: string;
  dispatcherId?: string;
}

/**
 * Message interface for chat functionality
 */
export interface Message {
  id: string;
  loadId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  content: string;
  timestamp: string;
  isRead: boolean;
}

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  relatedEntityId?: string;
  relatedEntityType?: 'LOAD' | 'MESSAGE' | 'USER';
  timestamp: string;
  isRead: boolean;
}

/**
 * Authentication request interfaces
 */
export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  company?: string;
}

/**
 * Authentication response interface
 */
export interface AuthResponse {
  token: string;
  user?: User;
}

/**
 * JWT payload interface
 */
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: Role;
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
}

export default {
  Role,
  LoadStatus,
};