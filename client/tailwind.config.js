/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#DBEAFE',
        },
        correct: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
        },
        bg: {
          base: '#F8FAFC',
          card: '#FFFFFF',
          code: '#F1F5F9',
          dark: '#0B1120',
          darkCard: '#131C2F',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0,0,0,0.08)',
        'md': '0 4px 20px rgba(37,99,235,0.10)',
        'lg': '0 20px 60px rgba(37,99,235,0.15)',
      }
    },
  },
  plugins: [],
}
