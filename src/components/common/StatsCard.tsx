import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Card from './Card';

interface StatsCardProps {
  icon: ReactNode;
  value: number;
  suffix?: string;
  label: string;
  tone?: 'crimson' | 'teal' | 'amber' | 'ink';
}

const toneClasses = {
  crimson: 'bg-crimson-50 text-crimson-600',
  teal: 'bg-teal-50 text-teal-600',
  amber: 'bg-amber-400/15 text-amber-600',
  ink: 'bg-ink-100 text-ink-700',
};

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);
  return value;
}

export default function StatsCard({ icon, value, suffix = '', label, tone = 'crimson' }: StatsCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayValue = useCountUp(value, visible);

  return (
    <div ref={ref}>
      <Card hoverable padding="lg" className="text-center animate-slideUp">
        <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses[tone]}`}>
          {icon}
        </div>
        <p className="font-mono text-3xl font-semibold text-ink-900">
          {displayValue.toLocaleString('en-IN')}
          {suffix}
        </p>
        <p className="mt-1.5 text-sm text-ink-500">{label}</p>
      </Card>
    </div>
  );
}
