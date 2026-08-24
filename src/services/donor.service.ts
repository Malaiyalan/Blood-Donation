import { donors, bloodGroupStats } from '../data/mockData';
import type { Donor, BloodGroup } from '../types';
import { mockDelay } from './api';

export interface DonorFilters {
  bloodGroup?: BloodGroup | 'All';
  maxDistanceKm?: number;
  availableOnly?: boolean;
  query?: string;
}

export const donorService = {
  async search(filters: DonorFilters = {}): Promise<Donor[]> {
    let results = [...donors];
    if (filters.bloodGroup && filters.bloodGroup !== 'All') {
      results = results.filter((d) => d.bloodGroup === filters.bloodGroup);
    }
    if (filters.maxDistanceKm) {
      results = results.filter((d) => d.distanceKm <= filters.maxDistanceKm!);
    }
    if (filters.availableOnly) {
      results = results.filter((d) => d.available);
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter((d) => d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q));
    }
    return mockDelay(results, 400);
  },

  async getById(id: string): Promise<Donor | undefined> {
    return mockDelay(donors.find((d) => d.id === id), 300);
  },

  async bloodGroupStats() {
    return mockDelay(bloodGroupStats, 300);
  },
};
