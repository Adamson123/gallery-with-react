/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{html,jsx}",
    "./src/Practice Website/*.{html,jsx}",
    "./src/components/*.{html,jsx}",
  ],
  theme: {
    screens: {
      sm: "360px",
      md: "700px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [],
};
