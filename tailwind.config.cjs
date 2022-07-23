/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    }
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:focus", "&:hover"]);
      addVariant("touch", "@media (pointer: coarse)");
      addVariant("mouse", "@media (pointer: fine)");
    }),
  ],
};
