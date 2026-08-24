import type { ReactNode } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  title?: string;
  children: ReactNode;
  onReset?: () => void;
}

export default function FilterPanel({ title = 'Filters', children, onReset }: FilterPanelProps) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <SlidersHorizontal className="h-4 w-4 text-crimson-500" />
          {title}
        </div>
        {onReset && (
          <button onClick={onReset} className="text-xs font-medium text-teal-600 hover:underline">
            Reset
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
