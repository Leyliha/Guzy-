/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-md': { max: '768px' },
      },
      gridTemplateColumns: {
        "auto": "repeat(auto-fit, minmax(220px, 1fr))",
        "repeat": "repeat(auto-fit, minmax(2, 1fr))",
      }
    },
  },
  plugins: [],
}

