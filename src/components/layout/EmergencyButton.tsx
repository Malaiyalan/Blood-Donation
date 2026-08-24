import { Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';

export default function EmergencyButton() {
  return (
    <Link
      to="/request-blood"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-crimson-500 px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      <Droplet className="h-4 w-4" />
      <span className="hidden sm:inline">Emergency Request</span>
      <span className="sm:hidden">Emergency</span>
    </Link>
  );
}
