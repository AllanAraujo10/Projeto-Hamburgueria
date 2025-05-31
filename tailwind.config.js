/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: { 
      colors: {
        goldenrod: '#DAA520',
      },
      fontFamily:{
        'sans': ['Roboto','sans-sarif']
      },
      backgroundImage:{
        "home":"Url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

