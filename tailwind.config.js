/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'wallpaper': "url('/backgro.jpg')" // Replace 'image.jpg' with the name of your image file
      })
    },
  },
  plugins: [],
}