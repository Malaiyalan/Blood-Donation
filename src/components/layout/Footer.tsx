import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Logo from './Logo';

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Find Blood', to: '/find-blood' },
      { label: 'Request Blood', to: '/request-blood' },
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Register as Donor', to: '/register' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', to: '/login' },
      { label: 'Create Account', to: '/register' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'My Donations', to: '/my-donations' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-50 bg-white">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-500">
            Connecting blood donors with people who need blood quickly and safely, one drop at a time.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-ink-900">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-ink-500 hover:text-crimson-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-sm font-semibold text-ink-900">Emergency</p>
          <p className="mt-4 text-sm text-ink-500">
            Need blood urgently? Post a request and we'll notify compatible donors near you within minutes.
          </p>
          <Link to="/request-blood" className="btn-primary mt-4 inline-flex">
            Request Blood
          </Link>
        </div>
      </div>
      <div className="border-t border-ink-50 py-6">
        <div className="container-app flex flex-col items-center justify-between gap-3 text-xs text-ink-300 sm:flex-row">
          <p>© 2026 LifeDrop. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 fill-crimson-500 text-crimson-500" /> for every donor and every life saved.
          </p>
        </div>
      </div>
    </footer>
  );
}
