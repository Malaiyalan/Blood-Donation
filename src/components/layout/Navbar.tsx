import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, User as UserIcon } from 'lucide-react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import NotificationBell from '../notification/NotificationBell';
import Avatar from '../common/Avatar';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../utils/cn';

const publicNav = [
  { label: 'Home', to: '/' },
  { label: 'Find Blood', to: '/find-blood' },
  { label: 'Donate', to: '/register' },
  { label: 'Request Blood', to: '/request-blood' },
  { label: 'How It Works', to: '/how-it-works' },
];

const authedNav = [
  { label: 'Home', to: '/' },
  { label: 'Find Blood', to: '/find-blood' },
  { label: 'Donate', to: '/dashboard' },
  { label: 'Request Blood', to: '/request-blood' },
  { label: 'My Donations', to: '/donations' },
  { label: 'Profile', to: '/profile' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const navItems = isAuthenticated ? authedNav : publicNav;

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-ink-50 bg-sand/90 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-crimson-600' : 'text-ink-500 hover:text-ink-900'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <div className="hidden sm:block">
              <NotificationBell />
            </div>
          )}

          {isAuthenticated ? (
            <NavLink to="/profile" className="hidden items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-mist sm:flex">
              <Avatar name={user?.name || 'You'} size="sm" />
            </NavLink>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <NavLink to="/login" className="btn-ghost">
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary">
                Register
              </NavLink>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-mist md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
    </header>
  );
}

export { UserIcon };
