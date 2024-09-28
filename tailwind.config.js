/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'DEFAULT': '#DA584B',
          '50': '#F4CCC8',
          '100': '#EBA59E',
          '200': '#E27D73',
          '300': '#DA584B',
        },
        secondary: {
          'DEFAULT': '#70B252',
          '50': '#C8E1BC',
          '100': '#AAD199',
          '200': '#8DC275',
          '300': '#70B252',
        },
        tertiary: {
          'DEFAULT': '#E5B454',
          '50': '#F9EED7',
          '100': '#F2DAAB',
          '200': '#EBC77F',
          '300': '#E5B454',
        },
        neutral: {
          'DEFAULT': '#2C2F33',
          '50': '#FFFFFF',
          '100': '#94979A',
          '200': '#393D41',
          '300': '#2C2F33',
          '400': '#222528',
        },
      },
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

