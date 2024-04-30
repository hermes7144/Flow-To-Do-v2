/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        brand: '#fe5a4a',
      },
      backgroundImage: {
        // banner: `url('../background.png')`,
        todo: `url('../todo.png')`,
      },
    },
  },
  plugins: [],
}

