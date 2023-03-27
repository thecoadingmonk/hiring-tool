/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          10: "#D8D8D8",
          20: "#E6E6E6",
        },
        font: {
          dark: "#212121",
          white: "#FAFAFA",
          error: "#D86161",
          placeholder: "#7A7A7A",
        },
        primary: {
          900: "#1597E4",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xsm: "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const contentUtilities = {
        ".content": {
          content: "attr(data-content)",
        },
      };

      addUtilities(contentUtilities, ["after"]);
    }),
  ],
};
