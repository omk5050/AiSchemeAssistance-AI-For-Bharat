/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        govblue: "#1f4e79",
        govlight: "#f5f7fa"
      }
    },
  },
  plugins: [],
}