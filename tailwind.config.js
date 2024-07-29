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
        'primary': '#FF4D30',
        'secondary': '#315F74',
      },
      textColor: {
        'black': '#333132',
        'white': '#FFFFFF',
        'highlight': '#FF4D30',
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
        'poppins': ['Poppins', 'Montserrat', 'Manrope'],
      },
      borderRadius: {
        'br-100': '6.25rem',
        'br-50': '3.125rem',
        'br-20': '1.25rem', 
        'br-10': '0.625rem',
      },
      keyframes: {
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});