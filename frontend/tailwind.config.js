/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        customBg: "#F0F0D7", // Add your custom color here
        customButton: "#D0DDD0",
        customHoverButton: "#AAB99A",
        textt: "#727D73",
      },
    },
  },
  plugins: [],
};
