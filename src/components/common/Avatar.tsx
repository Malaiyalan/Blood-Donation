import { initials } from '../../utils/format';
import { cn } from '../../utils/cn';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-16 w-16 text-lg',
};

const palette = ['bg-crimson-100 text-crimson-700', 'bg-teal-100 text-teal-600', 'bg-amber-400/20 text-amber-600', 'bg-ink-100 text-ink-700'];

function colorFor(name: string) {
  const idx = name.charCodeAt(0) % palette.length;
  return palette[idx];
}

export default function Avatar({ name, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-semibold',
        sizeClasses[size],
        colorFor(name),
        className
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}
