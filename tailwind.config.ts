import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // content: ["./pages/*.{html,js,jsx}"],
    './pages/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'main-text': '#212529',
        'primary-blue': '#3C76FE',
        'main-gray': '#F2F2F2',
        'sub-text': '#444444',
        'main-online': '#0FBB50',
        'main-pending': '#FFD93D',
        'main-offline': '#F5754A',
        'main-data': '#D9D9D9',
        footer: '#343A40',
      },
      animation: {
        'slide-left':
          'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'slide-right':
          'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'slide-bottom':
          'slide-bottom 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'slide-top':
          'slide-top 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        fade: 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0%',
          },
          to: {
            opacity: '100%',
          },
        },
        'slide-left': {
          '0%': {
            transform: 'translateX(100px)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        'slide-right': {
          '0%': {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(200px)',
          },
        },
        'slide-bottom': {
          '0%': {
            transform: 'translateY(-50px)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        'slide-top': {
          '0%': {
            transform: 'translateY(-50px)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
      },
    },
    screens: {
      xs: '320px', // => @media (min-width: 320px) { ... }
      '2xs': '360px',
      sm: '576px', // => @media (min-width: 5760px) { ... }
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '1024px', // => @media (min-width: 1024px) { ... }
      xl: '1280px', // => @media (min-width: 1280px) { ... }
      '2xl': '1536px', // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
