import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      boxShadow: {
        "b16-light": "0px 0px 16px rgba(0, 0, 0, 0.1);", // gray border
        "b16-dark": "0px 0px 16px rgba(255, 255, 255, 0.1);", // white border
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // eslint-disable-next-line quotes
        "campaign-primary": "url('/assets/img/campaign_primary.webp')",
        // eslint-disable-next-line quotes
        "campaign-secondary": "url('/assets/img/campaign_secondary.webp')",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        "14": "repeat(14, minmax(0, 1fr))",
      },
      spacing: {
        // gap x / y
        "7.5": "30px",
        "112": "28rem",
        "128": "32rem",
        // Example: Creating a custom "tw-translate-x" class
        half: "50%",
        invertedhalf: "-50%",
        onethird: "33.3%",
      },
      aspectRatio: {
        "3/1": "3 / 1",
        "4/3": "4 / 3",
        "16/9": "16 / 9",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
      },
      colors: {
        primary: {
          50: "#d7d7d7", // pagination button background
          100: "#c1c1c1",
          200: "#9f9f9f", // hover (lighter)
          300: "#6c6c6c", // hover
          400: "#2453C2", // pressed
          500: "#457DFF", // default state
          600: "#1A45AA",
          700: "#8CAFFF", // default disabled state
        },
        light: {
          500: "#F3F8FB",
        },
        secondary: {
          100: "#ff7575",
          200: "#ff5b5b",
          500: "#DE0A0A",
        },
        contrastText: "#fff",
        success: {
          500: "#096D6A",
        },
        warning: {
          500: "#F5B000",
        },
        danger: {
          300: "#FA7F7F",
          400: "#EB5757",
          500: "#CF1C0C",
        },
        info: {
          500: "#23AA01",
        },
        gray: {
          100: "#F6F6F6",
          200: "#F3F6F9", // disabled button
          300: "#E7EAED", // disabled text
          400: "#9FA1A7", // placeholder text
          500: "#7D7D83", // table header
          600: "#50565c", // dark text
          700: "#A0A5AB", // gray text
          800: "#E0E0E0", // card border
        },
        disabled: {
          500: "#A0A5AB",
        },
        black: {
          300: "#494E53",
          400: "#393939", // page title
          500: "#000000", // sidebar text
        },
        lightgreen: {
          500: "#A4A537",
        },
        white: "#fff",
        default: "#3F4355", // default color text
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
