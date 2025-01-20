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
  plugins: [require("daisyui")],
  // daisyui: {
  //   themes: ["light"], // Use the "light" theme
  //   // themes: ["corporate"], // Use the "light" theme
  //   // themes: ["dark"], // Use the "light" theme
  // },
  daisyui: {
    themes: [
      {
        myCustomTheme: {
          primary   : "#1E40AF",   // Dark blue
          secondary : "#64748B",   // Grayish blue
          accent    : "#2563EB",   // Bright blue
          neutral   : "#1E293B",   // Very dark blue-gray
          "base-100": "#FFFFFF",   // White background
          info      : "#3ABFF8",
          success   : "#36D399",
          warning   : "#FBBD23",
          error     : "#F87272",
        },
      },
    ],
    base: true, // Include daisyUI base styles
  },
};