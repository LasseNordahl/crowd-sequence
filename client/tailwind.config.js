module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
