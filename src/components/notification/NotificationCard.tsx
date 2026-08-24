import { AlertCircle, HeartHandshake, CheckCircle2, Settings, Info, Trash2 } from 'lucide-react';
import type { AppNotification } from '../../types';
import { cn } from '../../utils/cn';

const iconMap = {
  urgent: <AlertCircle className="h-5 w-5 text-crimson-500" />,
  accepted: <HeartHandshake className="h-5 w-5 text-teal-500" />,
  completed: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  system: <Settings className="h-5 w-5 text-ink-500" />,
  info: <Info className="h-5 w-5 text-amber-500" />,
};

interface NotificationCardProps {
  notification: AppNotification;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  return (
    <div
      className={cn(
        'group flex items-start gap-3 rounded-2xl border p-4 transition-colors',
        notification.read ? 'border-ink-50 bg-white' : 'border-crimson-100 bg-crimson-50/30'
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist">
        {iconMap[notification.icon]}
      </div>
      <button
        className="flex-1 min-w-0 text-left"
        onClick={() => !notification.read && onMarkAsRead?.(notification.id)}
      >
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-ink-900">{notification.title}</p>
          {!notification.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-500" />}
        </div>
        <p className="mt-0.5 truncate text-sm text-ink-500">{notification.message}</p>
        <p className="mt-1 text-xs text-ink-300">{notification.timeAgo}</p>
      </button>
      <button
        onClick={() => onDelete?.(notification.id)}
        aria-label="Delete notification"
        className="rounded-full p-1.5 text-ink-300 opacity-0 hover:bg-mist hover:text-crimson-600 group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
