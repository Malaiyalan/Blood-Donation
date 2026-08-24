import { notifications } from '../../data/mockData';
import Card from '../../components/common/Card';
import NotificationCard from '../../components/notification/NotificationCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Bell } from 'lucide-react';

export default function AdminNotifications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Notifications</h1>
        <p className="mt-1 text-sm text-ink-500">System-wide notification activity across the platform.</p>
      </div>

      <Card padding="md">
        {notifications.length === 0 ? (
          <EmptyState icon={<Bell className="h-6 w-6" />} title="No notifications yet" />
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <NotificationCard key={n.id} notification={n} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
