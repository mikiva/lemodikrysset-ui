/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "7": "repeat(7, minmax(0, 1fr))",
        "8": "repeat(8, minmax(0, 1fr))",
        "9": "repeat(9, minmax(0, 1fr))",
        "keyboard": "repeat(3, minmax(0, 1fr))"
      },
      gridTemplateColumns: {
        "keyboard": "repeat(22, minmax(0, 1fr))"
      },
      maxWidth: {
        "gamewidth": "500px"
      },
    },
  },
  plugins: [
  ],
}
