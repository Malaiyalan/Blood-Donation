import { bloodRequests } from '../data/mockData';
import type { BloodRequest, Urgency, BloodGroup } from '../types';
import { mockDelay } from './api';

export type CreateBloodRequestPayload = Omit<
  BloodRequest,
  'id' | 'status' | 'createdAt' | 'responders' | 'distanceKm'
>;

export const bloodRequestService = {
  async list(filters?: { urgency?: Urgency | 'All'; bloodGroup?: BloodGroup | 'All' }): Promise<BloodRequest[]> {
    let results = [...bloodRequests];
    if (filters?.urgency && filters.urgency !== 'All') {
      results = results.filter((r) => r.urgency === filters.urgency);
    }
    if (filters?.bloodGroup && filters.bloodGroup !== 'All') {
      results = results.filter((r) => r.bloodGroup === filters.bloodGroup);
    }
    return mockDelay(results, 400);
  },

  async getById(id: string): Promise<BloodRequest | undefined> {
    return mockDelay(bloodRequests.find((r) => r.id === id), 300);
  },

  async create(payload: CreateBloodRequestPayload): Promise<BloodRequest> {
    const newRequest: BloodRequest = {
      ...payload,
      id: `r-${Math.random().toString(36).slice(2, 8)}`,
      status: 'Open',
      createdAt: new Date().toISOString(),
      responders: 0,
      distanceKm: 0,
    };
    return mockDelay(newRequest, 700);
  },
};
