import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sap: {
          blue: {
            50: "#e6f0fa",
            100: "#c2d9f2",
            200: "#9fc2ea",
            300: "#7babe1",
            400: "#5894d9",
            500: "#3581d0",
            600: "#1a67b9",
            700: "#0050a3",
            800: "#00438c",
            900: "#003775",
          },
          gold: {
            400: "#f5c846",
            500: "#f0b428",
            600: "#e09d1b",
          },
          success: "#007b55",
          warning: "#ffab00",
          error: "#bb0000",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
