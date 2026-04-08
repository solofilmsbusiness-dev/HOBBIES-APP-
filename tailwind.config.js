/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**",
    "!./ios/**",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

