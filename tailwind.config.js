/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      default: "1rem",
      sm: "2rem",
      lg: "3rem",
      xl: "4rem",
    },
    extend: {
      colors: {
        purple: "#633CFF",
        "purple-hover-color": "#BEADFF",
        "light-purple": "#EFEBFF",
        "normal-gray": "#737373",
        "dark-gray": "#333",
        "light-gray": "#FAFAFA",
        borders: "#D9D9D9",
        violet: {
          600: "#BEADFF",
        },
        red: "#FF3939",
        button: "#633cff",
      },
    },
  },
  plugins: [],
};
