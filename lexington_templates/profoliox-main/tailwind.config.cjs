/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        screens: "url('/path-to/image.png')",
      }),
      colors: {
        blue: {
          "50": "#EBEBFF",
          "100": "#D2D2FE",
          "200": "#A6A4FE",
          "300": "#7E7CFD",
          "400": "#524FFD",
          "500": "#2522FC",
          "600": "#0703E2",
          "700": "#0502AB",
          "800": "#03026F",
          "900": "#020137"
        },
        neutral: {
          25: "#fafafa",
          50: "#E9EAEC",
          100: "#D1D3D6",
          200: "#A6AAB0",
          300: "#787E87",
          400: "#4F5359",
          500: "#282A2D",
          600: "#1F2123",
          700: "#18191B",
          800: "#111213",
          900: "#070808"
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),

    require('@tailwindcss/aspect-ratio'),
  ],
}
