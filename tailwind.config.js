/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e6f9f7',
          100: '#c5f1ec',
          500: '#0f766e',
          700: '#0a4f4a',
          900: '#082a28'
        },
        accent: '#c27b2f'
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Prata', 'serif']
      }
    }
  },
  plugins: []
};
