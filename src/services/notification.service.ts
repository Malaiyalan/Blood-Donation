import { notifications } from '../data/mockData';
import type { AppNotification } from '../types';
import { mockDelay } from './api';

export const notificationService = {
  async list(): Promise<AppNotification[]> {
    return mockDelay(notifications, 300);
  },

  async markAsRead(id: string): Promise<void> {
    const n = notifications.find((x) => x.id === id);
    if (n) n.read = true;
    return mockDelay(undefined, 150);
  },

  async markAllAsRead(): Promise<void> {
    notifications.forEach((n) => (n.read = true));
    return mockDelay(undefined, 150);
  },

  async remove(id: string): Promise<void> {
    const idx = notifications.findIndex((x) => x.id === id);
    if (idx !== -1) notifications.splice(idx, 1);
    return mockDelay(undefined, 150);
  },
};
