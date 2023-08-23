/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/*/.js",
  ],
  theme: {
    colors: {
      primary: "#FFC244",
      secondary: "#00846B",
      b_hover: "#00846B",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
