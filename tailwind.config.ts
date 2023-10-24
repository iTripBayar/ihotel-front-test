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
        'spin-slow': 'spin 5s linear infinite',
        'to-left': 'to-left 5s linear',
        open: 'open 0.5s ease-in-out',
        openSearch: 'openSearch 0.5s ease-in-out',

        close: 'close 0.5s ease-in-out',
        closeSearch: 'closeSearch 0.5s ease-in-out',

        'burger-top':
          'burger-top 8s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite',
        'burger-top1':
          'burger-top1 8s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite',
        'burger-top2':
          'burger-top2 8s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite',
        brotate: 'brotate 7s linear infinite',
      },
      keyframes: {
        // translate-x-[-50%] translate-y-[-50%]
        brotate: {
          '0%': {
            transform: 'rotate(0)',
          },

          to: {
            transform: 'rotate(360deg)',
          },
        },
        'burger-top': {
          '75%': {
            transform: 'translateY(-50%)',
          },
          '90%': {
            transform: 'translateY(-6px)',
          },
          to: {
            transform: 'translateY(-50%)',
          },
        },
        'burger-top1': {
          '70%': {
            transform: 'translateY(0px)',
          },
          '90%': {
            transform: 'translateY(-5px)',
          },
          to: {
            transform: 'translateY(0px)',
          },
        },
        'burger-top2': {
          '80%': {
            transform: 'translateY(0px)',
          },
          '90%': {
            transform: 'translateY(-5px)',
          },
          to: {
            transform: 'translateY(0px)',
          },
        },
        open: {
          '0%': {
            height: '45px',
          },
          to: {
            height: '159px',
          },
        },
        openSearch: {
          '0%': {
            height: '33px',
          },
          to: {
            height: '149px',
          },
        },
        closeSearch: {
          '0%': {
            height: '149px',
          },
          to: {
            height: '33px',
          },
        },
        close: {
          '0%': {
            height: '159px',
          },
          to: {
            height: '45px',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0%',
          },
          to: {
            opacity: '100%',
          },
        },
        'to-left': {
          '50%': {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-100px)',
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
