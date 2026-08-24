import { create } from 'zustand';
import type { AppNotification } from '../types';
import { notificationService } from '../services/notification.service';

interface NotificationState {
  items: AppNotification[];
  loading: boolean;
  unreadCount: number;
  fetch: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  items: [],
  loading: false,
  unreadCount: 0,

  fetch: async () => {
    set({ loading: true });
    const items = await notificationService.list();
    set({ items, loading: false, unreadCount: items.filter((n) => !n.read).length });
  },

  markAsRead: async (id) => {
    await notificationService.markAsRead(id);
    const items = get().items.map((n) => (n.id === id ? { ...n, read: true } : n));
    set({ items, unreadCount: items.filter((n) => !n.read).length });
  },

  markAllAsRead: async () => {
    await notificationService.markAllAsRead();
    const items = get().items.map((n) => ({ ...n, read: true }));
    set({ items, unreadCount: 0 });
  },

  remove: async (id) => {
    await notificationService.remove(id);
    const items = get().items.filter((n) => n.id !== id);
    set({ items, unreadCount: items.filter((n) => !n.read).length });
  },
}));
