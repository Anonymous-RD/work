/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-mode="light"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your file extensions
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

