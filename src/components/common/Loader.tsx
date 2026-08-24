import { Loader2, Droplet } from 'lucide-react';

export default function Loader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-300">
      <div className="relative">
        <Droplet className="h-8 w-8 text-crimson-200" />
        <Loader2 className="absolute -right-1 -top-1 h-4 w-4 animate-spin text-crimson-500" />
      </div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
