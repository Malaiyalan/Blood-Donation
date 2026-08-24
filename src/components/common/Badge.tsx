import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Tone = 'crimson' | 'teal' | 'amber' | 'green' | 'gray' | 'ink';

const toneClasses: Record<Tone, string> = {
  crimson: 'bg-crimson-50 text-crimson-700',
  teal: 'bg-teal-50 text-teal-600',
  amber: 'bg-amber-400/15 text-amber-600',
  green: 'bg-emerald-50 text-emerald-600',
  gray: 'bg-mist text-ink-500',
  ink: 'bg-ink-900 text-white',
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}

export default function Badge({ children, tone = 'gray', dot, className }: BadgeProps) {
  return (
    <span className={cn('badge', toneClasses[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

const urgencyTone: Record<string, Tone> = {
  Normal: 'teal',
  Urgent: 'amber',
  Critical: 'crimson',
};

export function UrgencyBadge({ urgency }: { urgency: string }) {
  return (
    <Badge tone={urgencyTone[urgency] || 'gray'} dot>
      {urgency}
    </Badge>
  );
}

const statusTone: Record<string, Tone> = {
  Open: 'teal',
  Matched: 'amber',
  Fulfilled: 'green',
  Completed: 'green',
  Scheduled: 'teal',
  Cancelled: 'gray',
  Expired: 'gray',
  Active: 'green',
  Blocked: 'crimson',
  Available: 'green',
  Unavailable: 'gray',
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={statusTone[status] || 'gray'} dot>{status}</Badge>;
}
