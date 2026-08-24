import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import NotificationCard from '../../components/notification/NotificationCard';
import { EmptyState } from '../../components/common/EmptyState';
import Loader from '../../components/common/Loader';
import { useNotificationStore } from '../../store/notificationStore';
import { cn } from '../../utils/cn';
import type { NotificationCategory } from '../../types';

const categories: (NotificationCategory | 'All')[] = ['All', 'Requests', 'Donations', 'System', 'Emergency'];

export default function Notifications() {
  const { items, loading, unreadCount, fetch, markAsRead, markAllAsRead, remove } = useNotificationStore();
  const [category, setCategory] = useState<NotificationCategory | 'All'>('All');

  useEffect(() => {
    fetch();
  }, [fetch]);

  const filtered = items.filter((n) => category === 'All' || n.category === category);

  return (
    <div className="border-t border-ink-50 bg-mist py-10">
      <div className="container-app max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="eyebrow"><Bell className="h-3.5 w-3.5" /> Notification Center</span>
            <h1 className="mt-2 text-3xl font-semibold">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-sm font-semibold text-teal-600 hover:underline">
              Mark All as Read
            </button>
          )}
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors',
                category === c ? 'border-crimson-500 bg-crimson-500 text-white' : 'border-ink-100 text-ink-500 hover:border-crimson-200'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-2.5">
          {loading ? (
            <Loader label="Loading notifications…" />
          ) : filtered.length === 0 ? (
            <EmptyState title="Nothing here yet" description="You're all caught up on this category." />
          ) : (
            filtered.map((n) => (
              <NotificationCard key={n.id} notification={n} onMarkAsRead={markAsRead} onDelete={remove} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
