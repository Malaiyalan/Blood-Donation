import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import NotificationBell from '../notification/NotificationBell';
import Avatar from '../common/Avatar';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-mist">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-ink-100 bg-white px-4 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-2 text-ink-700 hover:bg-mist lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="hidden text-sm font-medium text-ink-500 lg:block">Admin Console</p>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <Avatar name="Admin User" size="sm" />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
