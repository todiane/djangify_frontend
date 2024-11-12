// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        'text-secondary': '#4b5563',
        error: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b'
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        'lg': '0.5rem',
        'sm': '0.25rem'
      }
    },
    'djangify': {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        'text-secondary': '#4b5563',
        error: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b'
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        'lg': '0.5rem',
        'sm': '0.25rem'
      },
      'djangify': {
        'teal': '#0C8C9D',
        'grey': '#737373',
        'font': '#403F3F'
      },
      fontSize: {
        'menu': '20px',
        'body': '18px'
      }
    }
  },
  plugins: [typography, animate],
} satisfies Config;

export default config;