/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#FDF2F4',
          100: '#FBE4E8',
          200: '#F5C1CA',
          300: '#EB93A2',
          400: '#DD5F75',
          500: '#C81E3A',
          600: '#AC1830',
          700: '#8A1327',
          800: '#6B0F1F',
          900: '#4E0B17',
        },
        ink: {
          50: '#F5F6F8',
          100: '#E7E8ED',
          300: '#9498A8',
          500: '#575C6E',
          700: '#2E3140',
          900: '#14161F',
        },
        teal: {
          50: '#EAF6F5',
          100: '#CFEBE9',
          400: '#2FA6A3',
          500: '#0E7C7B',
          600: '#0B6362',
        },
        sand: '#FBFAF8',
        mist: '#F3F0EA',
        amber: {
          400: '#EFB25B',
          500: '#E8A33D',
          600: '#C7852A',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(20,22,31,0.06), 0 8px 24px -8px rgba(20,22,31,0.08)',
        card: '0 1px 3px rgba(20,22,31,0.06), 0 1px 2px rgba(20,22,31,0.04)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseLine: { '0%,100%': { opacity: 0.35 }, '50%': { opacity: 1 } },
        heartbeat: { '0%,100%': { transform: 'scale(1)' }, '25%': { transform: 'scale(1.12)' }, '40%': { transform: 'scale(1)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
        slideUp: 'slideUp 0.5s ease-out both',
        pulseLine: 'pulseLine 2s ease-in-out infinite',
        heartbeat: 'heartbeat 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
