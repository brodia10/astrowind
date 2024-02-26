/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    extend: {
       colors: {
        black: "#273846",
        wood: {
          50: "#FFFFFF",
          100: "#FEFDFB",
          200: "#FCFAF7",
          300: "#FCFAF7",
          400: "#FBF8F4",
          500: "#FAF6F0",
          600: "#E2CAA7",
          700: "#C99F5E",
          800: "#916B30",
          900: "#493518",
        },
        mist: {
          50: "#F8FBFC",
          100: "#F2F7F8",
          200: "#E4EFF1",
          300: "#D7E7EA",
          400: "#C9DEE3",
          500: "#B9D5DB",
          600: "#9AC2CB",
          700: "#78AEBA",
          800: "#5393A2",
          900: "#3D6B76",
        },
        salmon: {
          50: "#FEF5F0",
          100: "#FEEEE7",
          200: "#FDD9C9",
          300: "#FBC7B1",
          400: "#FAB699",
          500: "#F9A27D",
          600: "#F67037",
          700: "#D7470A",
          800: "#8D2F07",
          900: "#491803",
        },
        glow: {
          50: "#FEFAF0",
          100: "#FEF6E7",
          200: "#FCECCA",
          300: "#FBE4B2",
          400: "#F9D995",
          500: "#F8D17D",
          600: "#F4B734",
          700: "#D5950B",
          800: "#8C6208",
          900: "#493304",
        },
      },
       fontFamily: {
        sans: ["inter", ...defaultTheme.fontFamily.sans],
        serif: ["Gilda Display", ...defaultTheme.fontFamily.sans],
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
