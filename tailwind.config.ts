import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f0f0f',
        secondary: '#1a1a1a',
        accent: '#e50914',
        'glass-light': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        xl: '20px',
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }: any) {
      addComponents({
        '.glass': {
          '@apply bg-glass-dark/30 backdrop-blur-xl border border-glass-light/20 rounded-2xl': {},
        },
        '.glass-sm': {
          '@apply bg-glass-dark/20 backdrop-blur-lg border border-glass-light/10 rounded-xl': {},
        },
        '.glass-lg': {
          '@apply bg-glass-dark/40 backdrop-blur-2xl border border-glass-light/30 rounded-3xl': {},
        },
        '.card-hover': {
          '@apply transition-all duration-300 hover:scale-105 hover:shadow-2xl': {},
        },
        '.btn-primary': {
          '@apply px-6 py-3 bg-accent hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95': {},
        },
        '.btn-secondary': {
          '@apply px-6 py-3 glass text-white rounded-lg font-semibold transition-all duration-300 hover:bg-glass-dark/50': {},
        },
      });
    },
  ],
};

export default config;
