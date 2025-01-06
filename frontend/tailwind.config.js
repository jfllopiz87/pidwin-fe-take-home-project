/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      lineHeight: {
        '2': '0.625rem',
      },
      fontSize: {
        '2': '0.625rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      letterSpacing: {
        '1': '0.063em',
        '2': '0.0125em',
      },
      spacing: {
          '7': '1.969rem',
          '9': '2.469rem',
          '11': '2.688rem',
          '14': '3.625rem',
          '15': '3.75rem',
          '79': '19.688rem',
          '85': '21.25rem',
      },
      keyframes: {
        flipDown: {
          '0%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0)' },
        },
        flipUp: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        bounceSides: {
          '0%': { left: '0' },
          '10%': { left: '2px' },
          '30%': { left: '-2px' },
          '50%': { left: '2px' },
          '70%': { left: '-2px' },
          '90%': { left: '2px' },
          '100%': { left: '0px' },
        },
      },
      animation: {
        'flip-down': 'flipDown 0.25s ease-in-out forwards',
        'flip-up': 'flipUp 0.25s ease-in-out forwards',
        'bounce-sides': 'bounceSides .5s ease-in-out forwards',
      }
    },
    colors: {
      'white': '#FAFAFA',
      'black': '#121213',
      'black-disabled': '#1A1A1A',
      'green': '#538D4E',
      'mustard': '#B59F3B',
      'red': '#FF624D',
      'dark-gray': '#3A3A3C',
      'light-gray': '#5C5C62',
    }
  },
  plugins: [
  ]
}