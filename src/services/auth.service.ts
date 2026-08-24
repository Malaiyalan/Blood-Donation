import { currentUser } from '../data/mockData';
import type { User } from '../types';
import { mockDelay } from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  bloodGroup: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  willingToDonate: boolean;
}

/**
 * Mock auth service. Replace the bodies of these functions with real calls,
 * e.g. `return api.post('/auth/login', payload).then(res => res.data)`
 * once a Node.js backend is available.
 */
export const authService = {
  async login(payload: LoginPayload): Promise<{ user: User; token: string }> {
    if (!payload.email || !payload.password) {
      throw new Error('Email and password are required.');
    }
    return mockDelay({ user: currentUser, token: 'mock-jwt-token' });
  },

  async register(_payload: RegisterPayload): Promise<{ user: User; token: string }> {
    return mockDelay({ user: currentUser, token: 'mock-jwt-token' });
  },

  async logout(): Promise<void> {
    localStorage.removeItem('lifedrop_token');
    return mockDelay(undefined, 200);
  },

  async me(): Promise<User> {
    return mockDelay(currentUser, 300);
  },
};
