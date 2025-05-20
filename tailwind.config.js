/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/styles/main.css",
    "./src/styles/globals.css",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        success: 'rgb(var(--color-success))',
        danger: 'rgb(var(--color-danger))',
        warning: 'rgb(var(--color-warning))',
        info: 'rgb(var(--color-info))',
      },
    },
  },
  plugins: [],
}
