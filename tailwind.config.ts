import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
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
  },
};
export default config;
