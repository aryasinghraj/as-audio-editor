/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          bg: 'rgba(18, 24, 38, 0.65)',
          border: 'rgba(255, 255, 255, 0.12)',
          card: 'rgba(255, 255, 255, 0.05)',
          hover: 'rgba(255, 255, 255, 0.15)',
          accent: '#6366f1',
          cyan: '#06b6d4',
          pink: '#ec4899',
          purple: '#a855f7'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        curved: ['Pacifico', 'Caveat', 'cursive']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(35px)' }
        }
      }
    },
  },
  plugins: [],
}
