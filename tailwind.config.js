/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", 
    './app/*.{js,jsx,ts,tsx}',
    "./components/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {      
      colors: {
        "off-white": "#F5F5F5",
        "off-black": "#1E1E1E",
        "main-black": "#1C1C1C",
        "gray": "#c9c9c9",
        "white": "#FFF",
        "green": "#46FF6F",
      }
    },
  },
  plugins: [],
}

