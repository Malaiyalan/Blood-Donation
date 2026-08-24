import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import Logo from './Logo';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

interface NavItem {
  label: string;
  to: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isAuthenticated: boolean;
  onLogout?: () => void;
}

export default function MobileMenu({ open, onClose, navItems, isAuthenticated, onLogout }: MobileMenuProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-200 md:hidden',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <div className="absolute inset-0 bg-ink-900/50" onClick={onClose} aria-hidden="true" />
      <div
        className={cn(
          'absolute right-0 top-0 h-full w-[82%] max-w-xs transform bg-white p-6 shadow-soft transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button onClick={onClose} aria-label="Close menu" className="rounded-full p-1.5 text-ink-500 hover:bg-mist">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3 text-base font-medium',
                  isActive ? 'bg-crimson-50 text-crimson-600' : 'text-ink-700 hover:bg-mist'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          {isAuthenticated ? (
            <Button variant="outline" onClick={onLogout} fullWidth>
              Log out
            </Button>
          ) : (
            <>
              <NavLink to="/login" onClick={onClose} className="btn-outline w-full text-center">
                Login
              </NavLink>
              <NavLink to="/register" onClick={onClose} className="btn-primary w-full text-center">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
