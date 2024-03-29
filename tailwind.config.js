const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        boardmd: "415px",
        boardsm: "350px",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        keyboard: "repeat(3, minmax(0, 1fr))",
      },
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
      },
      gridTemplateColumns: {
        keyboard: "repeat(22, minmax(0, 1fr))",
      },
      maxWidth: {
        gamewidth: "499px",
        appWidth: "1070px",
      },
      backgroundColor: {
        inactive: "black",
      },
      keyframes: {
        pop: {
          "0%": { scale: "0.8", opacity: "0" },
          "40%": { scale: "1.15", opacity: "1" },
        },
        shake: {
          "10%,90%": {
            transform: "translateX(-1px)",
          },

          "20%, 80%": {
            transform: "translateX(2px)",
          },

          "30%, 50%, 70%": {
            transform: "translateX(-3px)",
          },
          "40%, 60%": {
            transform: "translateX(3px)",
          },
        },
        toast: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        pop: "pop 0.1s",
        shake: "shake 0.5s",
      },
      transitionperty: {
        cell: "background-color",
      },
    },
  },
  plugins: [],
};
