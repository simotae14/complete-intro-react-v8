/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      animation: {
        'spin-medium': 'spin 1s linear infinite;',
      },
      keyframes: {
        spin: {
          to: {
            transform: 'rotate(360deg)'
          }
        }
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
