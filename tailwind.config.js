/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // just in time compiler faster build times
  content: [
    "./src/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    colors: {
      primary: "#242734",
      secondary: "#1E212E",
      accent: "#FF4A57",
      text: "#EDEDED",
      detail: "#EFEDFDB5",
      header: "#EDEDED",

      red: "#FF0000",
      green: "#00FF00",
      blue: "#0000FF",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    fontSize: {
      base: "1rem",

      detail: "20px",
      aroundXl: "40px",
      xl: "60px",

      fontHeader: "20px",
      fontHeaderLogo: "32px",

      arrow: "45px",

      link: "30px",
    },
    extend: {
      padding: {
        spacing: "10%",
      },
    },
  },
  plugins: [],
};