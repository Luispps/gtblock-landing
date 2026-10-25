/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#121210',
        gold: {
          600: '#d4af37', // approximate gold
          500: '#e5c100',
          400: '#ffdf00',
          700: '#b8860b',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #d4af37, #ffdf00, #b8860b)',
      },
      fontFamily: {
        heading: ['"Neue Machina"', 'Syne', 'Space Grotesk', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
