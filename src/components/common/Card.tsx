import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({ hoverable, padding = 'md', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'card',
        paddingClasses[padding],
        hoverable && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
