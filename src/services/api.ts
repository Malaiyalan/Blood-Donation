import axios from 'axios';

// Base URL is read from the environment so a real Node.js backend can be
// plugged in later without touching any UI code. Until then, every service
// in this folder resolves against local mock data instead of firing requests.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Placeholder for attaching an auth token once real authentication exists.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lifedrop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralised place to handle 401s, network errors, etc. once the
    // real backend is connected.
    return Promise.reject(error);
  }
);

/** Small helper used by every mock service to simulate network latency. */
export function mockDelay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export default api;
