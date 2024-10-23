import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,svg}"],
  theme: {
    colors: {
      creme: {
        DEFAULT: "#DCD7C4",
        dark: "#C3BDA9",
      },
      black: {
        DEFAULT: "#111111",
        light: "#292929",
      },
      white: "#ffffff",
    },
    extend: {
      backgroundImage: {
        "whotels-splash": "url('/whotels/img/splash.png')",
      },
    },
  },
};
export default config;
