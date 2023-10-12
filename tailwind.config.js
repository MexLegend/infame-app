/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mayennesans': ['Mayennesans', 'sans-serif']
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

