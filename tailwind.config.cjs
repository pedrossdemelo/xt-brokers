/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

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
    },
    extend: {
      colors: {
        app: token("app"),
        surface: {
          DEFAULT: token("surface"),
          hover: token("surface-hover"),
        },
        elevated: token("elevated"),
        muted: {
          DEFAULT: token("muted"),
          strong: token("muted-strong"),
        },
        inverse: token("inverse"),
        overlay: token("overlay"),
        fg: {
          DEFAULT: token("fg"),
          muted: token("fg-muted"),
          subtle: token("fg-subtle"),
          "on-inverse": token("fg-on-inverse"),
          "on-primary": token("fg-on-primary"),
        },
        "border-default": token("border-default"),
        "border-strong": token("border-strong"),
        "border-focus": token("border-focus"),
        primary: {
          DEFAULT: token("primary"),
          hover: token("primary-hover"),
          ring: token("primary-ring"),
          "subtle-bg": token("primary-subtle-bg"),
          "subtle-fg": token("primary-subtle-fg"),
        },
        success: {
          DEFAULT: token("success"),
          strong: token("success-strong"),
          bg: token("success-bg"),
          "bg-hover": token("success-bg-hover"),
        },
        danger: {
          DEFAULT: token("danger"),
          strong: token("danger-strong"),
          fg: token("danger-fg"),
          hover: token("danger-hover"),
          ring: token("danger-ring"),
          "subtle-bg": token("danger-subtle-bg"),
          "subtle-fg": token("danger-subtle-fg"),
        },
        gain: token("success"),
        loss: token("danger"),
      },
    },
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
