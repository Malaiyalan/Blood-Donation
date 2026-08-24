import { Link } from 'react-router-dom';

export default function Logo({ dark }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 2C16 2 6 15 6 21a10 10 0 0 0 20 0C26 15 16 2 16 2z" fill="#C81E3A" />
        <path d="M16 8c-.8 1.3-5 8-5 12a5 5 0 0 0 5.6 4.95" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55" />
      </svg>
      <span className={`font-display text-xl font-semibold tracking-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
        LifeDrop
      </span>
    </Link>
  );
}
