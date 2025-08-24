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
        silver: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
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
};
