import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  Droplet,
  ClipboardList,
  Bell,
  BarChart3,
  ScrollText,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import Logo from '../layout/Logo';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../utils/cn';

const items = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Users', to: '/admin/users', icon: Users },
  { label: 'Donors', to: '/admin/donors', icon: HeartHandshake },
  { label: 'Blood Requests', to: '/admin/blood-requests', icon: Droplet },
  { label: 'Donations', to: '/admin/donations', icon: ClipboardList },
  { label: 'Notifications', to: '/admin/notifications', icon: Bell },
  { label: 'Reports', to: '/admin/reports', icon: BarChart3 },
  { label: 'Audit Logs', to: '/admin/audit-logs', icon: ScrollText },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const content = (
    <div className="flex h-full flex-col bg-ink-900 px-4 py-6 text-white">
      <div className="flex items-center justify-between px-2">
        <Logo dark />
        {onClose && (
          <button onClick={onClose} className="rounded-full p-1.5 text-white/70 hover:bg-white/10 lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="mt-8 flex-1 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-crimson-500 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              )
            }
          >
            <item.icon className="h-4.5 w-4.5 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
      >
        <LogOut className="h-4.5 w-4.5" />
        Logout
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/60" onClick={onClose} aria-hidden="true" />
          <div className="absolute left-0 top-0 h-full w-72 animate-slideUp">{content}</div>
        </div>
      )}
    </>
  );
}
