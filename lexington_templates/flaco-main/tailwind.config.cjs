/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    fontSize: {
        xs: [
          "0.75rem",
          {
            lineHeight: "1rem",
          },
        ],
        sm: [
          "0.875rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "2rem",
          },
        ],
        xl: [
          "1.25rem",
          {
            lineHeight: "2rem",
          },
        ],
        "2xl": [
          "1.5rem",
          {
            lineHeight: "2rem",
          },
        ],
        "3xl": [
          "2rem",
          {
            lineHeight: "2.5rem",
          },
        ],
        "4xl": [
          "2.5rem",
          {
            lineHeight: "3.5rem",
          },
        ],
        "5xl": [
          "3rem",
          {
            lineHeight: "3.5rem",
          },
        ],
        "6xl": [
          "3.75rem",
          {
            lineHeight: "1",
          },
        ],
        "7xl": [
          "4.5rem",
          {
            lineHeight: "1.1",
          },
        ],
        "8xl": [
          "6rem",
          {
            lineHeight: "1",
          },
        ],
        "9xl": [
          "8rem",
          {
            lineHeight: "1",
          },
        ],
        "10xl": [
          "8.5rem",
          {
            lineHeight: "1",
          },
        ],
        "11xl": [
          "9rem",
          {
            lineHeight: "1",
          },
        ],
        "12xl": [
          "9.5rem",
          {
            lineHeight: "1",
          },
        ],
        "13xl": [
          "10rem",
          {
            lineHeight: "1",
          },
        ],
        "14xl": [
          "11rem",
          {
            lineHeight: "1",
          },
        ],
      },
    extend: {
        animation: {
          marquee: 'marquee 8s linear infinite',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        },
        backgroundImage: (theme) => ({
          gradient: "url('/images/gradient.mp4')",
        }),
        colors: {
          darkest: "hsl(0, 0%, 5%)",
          darker: "hsl(0, 0%, 10%)",
          grayest: "hsl(210, 4%, 30%)",
          grayer: "hsl(240, 5%, 32%)",
          gray: "hsl(240, 2%, 68%)",
          lightgray: "hsl(240, 2%, 91%)",
        },
        borderRadius: {
          "4xl": "2rem",
          "5xl": "3rem",
          "6xl": "5rem",
        },
        fontFamily: {
          sans: ["Inter", ...defaultTheme.fontFamily.sans],
          mono: ["JetBrains Mono", ...defaultTheme.fontFamily.sans],
        },
      },
  },
	plugins: [
		 require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
}
