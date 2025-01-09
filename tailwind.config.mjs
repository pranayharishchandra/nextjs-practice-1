/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. added font and 
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // 2. template
      gridTemplateColumns: {
        '70/30': '70% 28%'
      },
    },
  },
  plugins: [],
};