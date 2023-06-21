/** @type {import('tailwindcss').Config} */
export default {
  content:["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    screens: {

      'sm' : '320px',
      // => @media (min-width: 320px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
    },
  },
  plugins: [],
}

