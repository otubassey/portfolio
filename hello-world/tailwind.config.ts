import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        default: "var(--background-default)",
        paper: "var(--background-paper)"
      },
      colors: {
        primaryMain: "var(--primary-main)",
        primaryLight: "var(--primary-light)",
        primaryDark: "var(--primary-dark)",
        primaryContrastText: "var(--primary-contrastText)",
        secondaryMain: "var(--secondary-main)",
        secondaryLight: "var(--secondary-light)",
        secondaryDark: "var(--secondary-dark)",
        secondaryContrastText: "var(--secondary-contrastText)",
        grayMain: "var(--color-gray-main)",
        grayLight: "var(--color-gray-light)",
        grayDark: "var(--color-gray-dark)",
        grayContrastText: "var(--color-gray-contrastText)"
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        disabled: "var(--text-disabled)"
      },
    }
  },
  plugins: [],
};

export default config;
