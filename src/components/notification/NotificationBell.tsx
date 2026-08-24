import { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotificationStore } from '../../store/notificationStore';
import NotificationCard from './NotificationCard';
import { EmptyState } from '../common/EmptyState';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { items, unreadCount, fetch, markAsRead } = useNotificationStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-500 hover:bg-mist hover:text-ink-900"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-80 animate-slideUp rounded-2xl border border-ink-100 bg-white p-3 shadow-soft sm:w-96">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-ink-900">Notifications</p>
            <Link to="/notifications" onClick={() => setOpen(false)} className="text-xs font-medium text-teal-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto">
            {items.length === 0 ? (
              <EmptyState title="You're all caught up" description="No new notifications right now." />
            ) : (
              items.slice(0, 5).map((n) => (
                <NotificationCard key={n.id} notification={n} onMarkAsRead={markAsRead} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
