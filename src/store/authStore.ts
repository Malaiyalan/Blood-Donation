import { create } from 'zustand';
import type { User } from '../types';
import { authService, type LoginPayload, type RegisterPayload } from '../services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  loginAsAdmin: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
  error: null,

  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { user, token } = await authService.login(payload);
      localStorage.setItem('lifedrop_token', token);
      set({ user, isAuthenticated: true, isAdmin: false, loading: false });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Unable to sign in.', loading: false });
      throw e;
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { user, token } = await authService.register(payload);
      localStorage.setItem('lifedrop_token', token);
      set({ user, isAuthenticated: true, isAdmin: false, loading: false });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Unable to create account.', loading: false });
      throw e;
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },

  loginAsAdmin: () => {
    set({ isAuthenticated: true, isAdmin: true, user: null });
  },

  clearError: () => set({ error: null }),
}));
