/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/*/.js",
  ],
  theme: {
    colors: {
      secondary: "#00846B",
      primary: "ffc244",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
