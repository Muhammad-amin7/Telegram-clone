// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Make sure it scans your React components
    ],
    theme: {
      extend: {
         colors: {
           // Define custom colors based on previous example for consistency
           'tg-bg': 'rgb(33, 33, 33)',
           'tg-secondary-bg': 'rgb(45, 45, 45)',
           'tg-hover-bg': 'rgb(60, 60, 60)',
           'tg-active-bg': 'rgb(80, 80, 80)', // Added for active chat state
           'tg-accent': 'rgb(33, 33, 33)', // Adjusted violet rgb(131,120,219) -> rgb(135, 116, 225) matches common Telegram violet better
           'tg-text-primary': '#ffffff',
           'tg-text-secondary': 'rgb(170, 170, 170)',
           'tg-handle': 'rgb(55, 55, 55)',
           'tg-handle-hover': 'rgb(80, 80, 80)',
         }
      },
    },
    plugins: [],
  }