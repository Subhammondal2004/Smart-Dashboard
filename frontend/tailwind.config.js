/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        background: '#f3f4f6',

        foreground: '#111827',

        card: '#ffffff',

        'card-foreground': '#111827',

        popover: '#ffffff',

        'popover-foreground': '#111827',

        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },

        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#111827',
        },

        muted: {
          DEFAULT: '#f8fafc',
          foreground: '#6b7280',
        },

        accent: {
          DEFAULT: '#eff6ff',
          foreground: '#1d4ed8',
        },

        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },

        border: '#e5e7eb',

        input: '#e5e7eb',

        ring: '#2563eb',

        success: '#22c55e',

        warning: '#f59e0b',
      },

      boxShadow: {
        card:
          '0 1px 3px rgba(0,0,0,0.1)',
        soft:
          '0 10px 25px rgba(0,0,0,0.08)',
      },

      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },

  plugins: [],
};