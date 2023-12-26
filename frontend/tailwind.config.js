/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'poppins':['Roboto','Arial','sans-serif']
    },
    extend: {
      rotate:{
        '360':'360deg'
      }
    },
  },
  plugins: [],
}

