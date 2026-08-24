import type { BloodGroup } from '../../types';
import { cn } from '../../utils/cn';

interface BloodGroupCardProps {
  group: BloodGroup;
  active?: boolean;
  onClick?: () => void;
}

export default function BloodGroupCard({ group, active, onClick }: BloodGroupCardProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group flex flex-col items-center justify-center gap-1 rounded-2xl border p-5 transition-all duration-200 focus-visible:outline-none',
        active
          ? 'border-crimson-500 bg-crimson-500 text-white shadow-soft scale-[1.03]'
          : 'border-ink-100 bg-white text-ink-900 hover:-translate-y-0.5 hover:border-crimson-200 hover:shadow-card'
      )}
    >
      <span className="font-mono text-2xl font-bold">{group}</span>
      <span className={cn('text-[11px] uppercase tracking-wide', active ? 'text-crimson-100' : 'text-ink-300')}>
        Blood Group
      </span>
    </button>
  );
}
