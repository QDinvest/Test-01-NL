/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neuro-black': '#050509',
        'neuro-purple': {
          100: '#efd7ff',
          200: '#dfb0ff',
          300: '#d088ff',
          400: '#c55fff',
          500: '#b32cf7',
          600: '#9e20e0',
          700: '#8318bb',
          800: '#681296',
          900: '#4e0c71',
        },
        'neuro-violet': {
          100: '#efd7ff',
          200: '#dfb0ff',
          300: '#d088ff',
          400: '#c55fff',
          500: '#b32cf7',
          600: '#9e20e0',
          700: '#8318bb',
          800: '#681296',
          900: '#4e0c71',
        },
        'neuro-deep': {
          500: '#2A1E40',
          600: '#4A2D7C',
          700: '#6B3FAF'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(179, 44, 247, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(179, 44, 247, 0.1) 1px, transparent 1px)',
        'neuro-gradient': 'linear-gradient(135deg, #2A1E40, #4A2D7C, #6B3FAF)',
      },
      boxShadow: {
        'neon-purple': '0 0 5px #b32cf7, 0 0 10px #b32cf7, 0 0 15px #b32cf7, 0 0 20px #b32cf7',
        'neon-violet': '0 0 5px #b32cf7, 0 0 10px #b32cf7, 0 0 15px #b32cf7, 0 0 20px #b32cf7',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbitX: {
          '0%': { transform: 'rotateX(0deg) translateZ(100px)' },
          '100%': { transform: 'rotateX(360deg) translateZ(100px)' },
        },
        orbitY: {
          '0%': { transform: 'rotateY(0deg) translateZ(100px)' },
          '100%': { transform: 'rotateY(360deg) translateZ(100px)' },
        },
        radarScan: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(179, 44, 247, 0.7))' },
          '50%': { filter: 'drop-shadow(0 0 15px rgba(179, 44, 247, 1))' },
        },
      },
      animation: {
        pulse: 'pulse 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        orbitX: 'orbitX 15s linear infinite',
        orbitY: 'orbitY 12s linear infinite',
        radarScan: 'radarScan 4s linear infinite',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};