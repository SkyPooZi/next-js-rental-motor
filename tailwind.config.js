/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      margin: {
        'view-pc': '9.625rem',
        'section': '3.125rem',
      },
      colors: {
        'primary': '#EB6957',
        'secondary': '#315F74',
      },
      textColor: {
        'black': '#333132',
        'white': '#FFFFFF',
        'highlight': '#EB6957',
      },
      fontSize: {
        'fz-large': '2rem',
        'fz-medium': '1.2rem',
        'fz-small': '1rem',
      },
      fontWeight: {
        'extra-bold': '800',
        'bold': '700',
        'semi-bold': '600',
        'medium': '500',
        'regular': '400',
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
        'uni-sans': ['Uni Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'dosis': ['Dosis', 'sans-serif'],
      },
      borderRadius: {
        'br-100': '6.25rem',
        'br-50': '3.125rem',
        'br-20': '1.25rem',
        'br-10': '0.625rem',
      },
      keyframes: {
        wave: {
          '0%': { 'background-position-x': '740px' },
          '100%': { 'background-position-x': '0px' },
        },
        rotateMove: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(1turn)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wave: 'wave 2.5s linear infinite',
        rotateMove: 'rotateMove 10s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});