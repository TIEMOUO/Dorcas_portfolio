/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B1220',
          soft: '#0F1B33',
        },
        blueprint: {
          50: '#EEF3FF',
          100: '#DCE6FF',
          200: '#B7CBFF',
          300: '#8FAEFA',
          400: '#5A7EF0',
          500: '#3357D9',
          600: '#1E3A8A',
          700: '#172C69',
          800: '#111F4C',
          900: '#0B1533',
        },
        cyan: {
          soft: '#5EEAD4',
          DEFAULT: '#22D3EE',
        },
        violet: {
          soft: '#C4B5FD',
          DEFAULT: '#A78BFA',
        },
        surface: {
          light: '#F7F8FC',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
        body: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'grid-dot': 'radial-gradient(circle, rgba(30,58,138,0.16) 1px, transparent 1px)',
        'grid-dot-dark': 'radial-gradient(circle, rgba(94,234,212,0.14) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '24px 24px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        draw: {
          from: { strokeDashoffset: 1000 },
          to: { strokeDashoffset: 0 },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        draw: 'draw 2.4s ease forwards',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
