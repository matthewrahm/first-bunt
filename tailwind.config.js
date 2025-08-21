/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFF9E6',
          100: '#FFF2CC',
          200: '#FFE08A',
          300: '#F5D76E',
          400: '#E6C558',
          500: '#B28D00',
        },
        ink: {
          900: '#0B0B0B',
          800: '#111111',
          700: '#1B1B1B',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      /* Removed unused animations for better performance */
    },
  },
  plugins: [],
}
