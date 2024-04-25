/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans"],
        Protest: ["Protest Riot", "cursive"],
      },
      colors: {
        bone_white: "#f9f6ee",
        custom_blue: "#0a2342",
        custom_pink: "#b9324f",
      },
      keyframes: {
        slideup: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slidedown: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        linksAnimation: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        slideup: "slideup 1s ease var(--slideup-delay,0) forwards",
        slidedown: "slidedown 1s ease var(--slidedown-delay,0) forwards",
        linksAnimation: "linksAnimation 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
