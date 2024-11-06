/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: '#5D7285',
        darkPrimary: "#EFF2F4",
        lightActive: '#0C7FDA'
      }
    },
  },
  plugins: [],
}