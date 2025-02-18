const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    // ...
    flowbite.content(),
  ],

  theme: {
    extend: {
      backgroundImage: {
        'slide-1': "url('./assets/slide1.jpg')",
        'slide-2': "url('./assets/slide2.jpg')",
        'slide-3': "url('./assets/slide3.jpg')",
        'slide-4': "url('./assets/slide4.jpg')",
        'slide-5': "url('./assets/slide5.jpg')",
        'slide-6': "url('./assets/slide6.jpg')",
        'slide-7': "url('./assets/slide7.jpg')",
        'slide-8': "url('./assets/slide8.jpg')",
        'features': "url('./assets/features.jpg')",
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}

