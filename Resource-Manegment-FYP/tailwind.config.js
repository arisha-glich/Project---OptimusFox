/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enable dark mode with class-based toggling
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3490dc',
          dark: '#2779bd',
        },
        secondary: {
          DEFAULT: '#ffed4a',
          dark: '#f9c30f',
        },
        accent: {
          DEFAULT: '#38c172',
          dark: '#2f9d69',
        },
        darkblue: '#001f3f', // Custom dark mode color
        // Add other custom colors if needed
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark'],
      // Add other variants if needed
    },
  },
  plugins: [],
};
