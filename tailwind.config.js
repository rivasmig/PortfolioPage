/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom colors for theming later
      colors: {
        'frutiger-blue': '#00a8ff',
        'frutiger-green': '#00d2d3',
        'frutiger-purple': '#5f27cd',
      },
      // Custom animations
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'rotate-slow': 'rotate 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}