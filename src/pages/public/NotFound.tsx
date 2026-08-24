import { Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-crimson-50 text-crimson-500">
        <Droplet className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink-500">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}
