/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        marqueeLeft: 'marqueeLeft 20s linear infinite',
        marqueeRight: 'marqueeRight 20s linear infinite',
        animationPaused: 'paused', //stops on hover

          scrollerDown: 'scrollerDown 12s linear infinite',
          scrollerUp: 'scrollerUp 12s linear infinite',

      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(-0%)' },
        },
        scrollerDown: {
          '0%': {
            transform: 'translateY(-10em)'
          },
          '100%': {
            transform: 'translateY(14em)'
          },
        },
        scrollerUp: {
          '0%': {
            transform: 'translateY(10em)'
          },
          '100%': {
            transform: 'translateY(-14em)'
          },
        },
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "6xl": "5rem",
      },
      boxShadow: {
        // The shadow has no color
        // This way you can use the color you want
        button: "0px 1px 2px, 0px 0px 0px 1px inset, 0px 0px 0px 1px inset;",
        box: "0px 1px 8px,  0px -1px 1px inset;",
      },
      dropShadow: {
        // The shadow has no color
        // This way you can use the color you want
        box: "0px 1px 8px,  0px -1px 1px inset;",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        indigo: {
          '50': 'hsl(245, 100%, 97%)',
          '100': 'hsl(240, 100%, 95%)',
          '200': 'hsl(241, 100%, 92%)',
          '300': 'hsl(242, 100%, 85%)',
          '400': 'hsl(244, 100%, 76%)',
          '500': 'hsl(248, 98%, 66%)',
          '600': 'hsl(252, 91%, 57%)',
          '700': 'hsl(253, 76%, 50%)',
          '800': 'hsl(253, 76%, 42%)',
          '900': 'hsl(254, 74%, 35%)',
          '950': 'hsl(251, 79%, 23%)',
      },
        blue: {
          '50': 'hsl(225, 100%, 97%)',
          '100': 'hsl(225, 95%, 93%)',
          '200': 'hsl(223, 97%, 87%)',
          '300': 'hsl(221, 96%, 78%)',
          '400': 'hsl(223, 95%, 68%)',
          '500': 'hsl(227, 92%, 62%)',
          '600': 'hsl(230, 84%, 53%)',
          '700': 'hsl(234, 77%, 48%)',
          '800': 'hsl(235, 71%, 40%)',
          '900': 'hsl(234, 64%, 33%)',
          '950': 'hsl(236, 57%, 21%)',
          '1000': 'hsl( 239, 51%, 18%)',
      },
        gray: {
          '50': 'hsl(225, 25%, 97%)',
    '100': 'hsl(223, 24%, 94%)',
    '200': 'hsl(219, 26%, 87%)',
    '300': 'hsl(221, 25%, 78%)',
    '400': 'hsl(222, 24%, 68%)',
    '500': 'hsl(226, 23%, 60%)',
    '600': 'hsl(229, 21%, 53%)',
    '700': 'hsl(234, 19%, 48%)',
    '800': 'hsl(234, 18%, 40%)',
    '900': 'hsl(234, 17%, 33%)',
    '950': 'hsl(236, 14%, 21%)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide')
  ],
}
