// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Updated from purge to content
  darkMode: 'media', // Set to 'media', 'class', or remove if not needed
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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
