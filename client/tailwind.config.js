const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      orange: colors.orange,
      blue: colors.blue,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      teal: colors.teal,
    },
    extend: {
      minWidth: {
        '128': '28rem',
      },
      spacing: {
        '128': '28rem',
      },
      fontFamily: {
        header: ["Montserrat", "sans-serif"],
        body: ["Courier New", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
