/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
   
    extend: {
      animation: {
        marquee: "marquee 12s linear infinite",
        marquee2: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
      colors: {
        black: "#010101",
        accent: {
          '50': 'hsl(22, 100%, 96%)',
    '100': 'hsl(25, 100%, 91%)',
    '200': 'hsl(22, 100%, 82%)',
    '300': 'hsl(20, 100%, 71%)',
    '400': 'hsl(16, 100%, 60%)',
    '500': 'hsl(14, 100%, 52%)',
    '600': 'hsl(9, 100%, 50%)',
    '700': 'hsl(6, 98%, 40%)',
    '800': 'hsl(4, 87%, 34%)',
    '900': 'hsl(4, 83%, 28%)',
    '950': 'hsl(1, 89%, 15%)',
        },
      },
      fontFamily: {
        serif: ["Newsreader", ...defaultTheme.fontFamily.serif],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
