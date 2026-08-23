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
        // Artisanal Hearth design tokens
        "background": "#131313",
        "surface": "#131313",
        "surface-bright": "#3a3939",
        "surface-dim": "#131313",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "surface-variant": "#353534",
        "on-background": "#e5e2e1",
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#e4beba",
        "inverse-surface": "#e5e2e1",
        "inverse-on-surface": "#313030",
        
        // Brand & Accents
        "primary": "#ffb3ac",
        "primary-container": "#d32f2f",
        "on-primary": "#680008",
        "on-primary-container": "#fff2f0",
        "primary-fixed": "#ffdad6",
        "primary-fixed-dim": "#ffb3ac",
        "inverse-primary": "#ba1a20",
        
        "secondary": "#ffb955",
        "secondary-container": "#dc9100",
        "on-secondary": "#452b00",
        "on-secondary-container": "#4f3100",
        "secondary-fixed": "#ffddb4",
        "secondary-fixed-dim": "#ffb955",
        
        "tertiary": "#b7ccb9",
        "tertiary-container": "#617565",
        "on-tertiary": "#233427",
        "on-tertiary-container": "#e5fbe7",
        "tertiary-fixed": "#d3e8d5",
        "tertiary-fixed-dim": "#b7ccb9",
        
        "outline": "#ab8985",
        "outline-variant": "#5b403d",
        "surface-tint": "#ffb3ac",
        
        "error": "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",

        // Charcoal & Cream aliases
        charcoal: {
          950: '#0b0c0e',
          900: '#121316',
          850: '#17181d',
          800: '#1e2026',
          750: '#262932',
          700: '#2a2d36',
          600: '#3a3e4a',
          500: '#525866',
        },
        cream: {
          50: '#fbfaf7',
          100: '#f8f6f0',
          200: '#f0ece0',
          300: '#e4dcce',
          400: '#cdc0ad',
          500: '#b8a68f',
          600: '#9d8870',
        },
        pizza: {
          red: {
            light: '#ff4d6d',
            DEFAULT: '#d32f2f',
            dark: '#be123c',
            deep: '#9f1239',
          },
          amber: {
            light: '#fde68a',
            DEFAULT: '#f5a623',
            dark: '#dc9100',
          },
          gold: '#eab308'
        }
      },
      fontFamily: {
        headline: ['Bebas Neue', 'Impact', 'sans-serif'],
        display: ['Bebas Neue', 'Outfit', 'sans-serif'],
        body: ['Hanken Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Hanken Grotesk', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-lg': ['84px', { lineHeight: '80px', letterSpacing: '-0.02em', fontWeight: '400' }],
        'headline-xl': ['48px', { lineHeight: '48px', letterSpacing: '0.02em', fontWeight: '400' }],
        'headline-lg': ['32px', { lineHeight: '36px', fontWeight: '400' }],
        'headline-lg-mobile': ['28px', { lineHeight: '32px', fontWeight: '400' }],
        'title-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '700' }],
      },
      spacing: {
        'unit': '8px',
        'gutter': '24px',
        'margin-mobile': '20px',
        'margin-desktop': '64px',
        'stack-sm': '12px',
        'stack-md': '24px',
        'stack-lg': '48px',
      },
      boxShadow: {
        'glow-red': '0 0 35px -5px rgba(211, 47, 47, 0.45)',
        'glow-amber': '0 0 35px -5px rgba(245, 166, 35, 0.45)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSlow 3s ease-in-out infinite',
        'glowing-line': 'moveLine 3s linear infinite',
        'scooter-bob': 'scooterBob 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        moveLine: {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
        scooterBob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
