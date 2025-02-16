import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hwiui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/playground/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundColor: ({ theme }) => ({
        ...theme("colors"),
        main: "var(--background-main)",
        paper: "var(--background-paper)"
      }),
      colors: {
        action: {
          active: "rgba(var(--mainRGB), 0.54)",
          disabled: "rgba(var(--mainRGB), 0.26)",
          focus: "rgba(var(--mainRGB), 0.12)",
          hover: "rgba(var(--mainRGB), 0.04)",
          selected: "rgba(var(--mainRGB), 0.08)"
        },
        divider: {
          DEFAULT: "var(--divider-main)"
        },
        error: {
          DEFAULT: "var(--error-main)",
          actionActive: "rgba(var(--error-mainRGB), 0.54)",
          actionDisabled: "rgba(var(--error-mainRGB), 0.26)",
          actionFocus: "rgba(var(--error-mainRGB), 0.12)",
          actionHover: "rgba(var(--error-mainRGB), 0.04)",
          actionSelected: "rgba(var(--error-mainRGB), 0.08)",
          contrastText: "var(--error-contrastText)",
          dark: "var(--error-dark)",
          light: "var(--error-light)"
        },
        info: {
          DEFAULT: "var(--info-main)",
          actionActive: "rgba(var(--info-mainRGB), 0.54)",
          actionDisabled: "rgba(var(--info-mainRGB), 0.26)",
          actionFocus: "rgba(var(--info-mainRGB), 0.12)",
          actionHover: "rgba(var(--info-mainRGB), 0.04)",
          actionSelected: "rgba(var(--info-mainRGB), 0.08)",
          contrastText: "var(--info-contrastText)",
          dark: "var(--info-dark)",
          light: "var(--info-light)"
        },
        primary: {
          DEFAULT: "var(--primary-main)",
          actionActive: "rgba(var(--primary-mainRGB), 0.54)",
          actionDisabled: "rgba(var(--primary-mainRGB), 0.26)",
          actionFocus: "rgba(var(--primary-mainRGB), 0.12)",
          actionHover: "rgba(var(--primary-mainRGB), 0.04)",
          actionSelected: "rgba(var(--primary-mainRGB), 0.08)",
          contrastText: "var(--primary-contrastText)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)"
        },
        secondary: {
          DEFAULT: "var(--secondary-main)",
          actionActive: "rgba(var(--secondary-mainRGB), 0.54)",
          actionDisabled: "rgba(var(--secondary-mainRGB), 0.26)",
          actionFocus: "rgba(var(--secondary-mainRGB), 0.12)",
          actionHover: "rgba(var(--secondary-mainRGB), 0.04)",
          actionSelected: "rgba(var(--secondary-mainRGB), 0.08)",
          contrastText: "var(--secondary-contrastText)",
          dark: "var(--secondary-dark)",
          light: "var(--secondary-light)"
        },
        success: {
          DEFAULT: "var(--success-main)",
          actionActive: "rgba(var(--success-mainRGB), 0.54)",
          actionDisabled: "rgba(var(--success-mainRGB), 0.26)",
          actionFocus: "rgba(var(--success-mainRGB), 0.12)",
          actionHover: "rgba(var(--success-mainRGB), 0.04)",
          actionSelected: "rgba(var(--success-mainRGB), 0.08)",
          contrastText: "var(--success-contrastText)",
          dark: "var(--success-dark)",
          light: "var(--success-light)"
        },
        typography: {
          DEFAULT: "var(--typography-main)",
          actionActive: "rgba(var(--typography-mainRGB), 0.54)",
          actionDisabled: "rgba(var(--typography-mainRGB), 0.26)",
          actionFocus: "rgba(var(--typography-mainRGB), 0.12)",
          actionHover: "rgba(var(--typography-mainRGB), 0.04)",
          actionSelected: "rgba(var(--typography-mainRGB), 0.08)",
          hint: "var(--typography-hint)",
          textDisabled: "rgba(var(--typography-mainRGB), 0.38)",
          textPrimary: "rgba(var(--typography-mainRGB), 0.87)",
          textSecondary: "rgba(var(--typography-mainRGB), 0.6)",
          subTitle: "var(--typography-subTitle)",
          title: "var(--typography-title)"
        },
        warning: {
          DEFAULT: "var(--warning-main)",
          actionActive: "rgba(var(--warning-mainRGB), 0.54)",
          actionDisabled: "rgba(var(--warning-mainRGB), 0.26)",
          actionFocus: "rgba(var(--warning-mainRGB), 0.12)",
          actionHover: "rgba(var(--warning-mainRGB), 0.04)",
          actionSelected: "rgba(var(--warning-mainRGB), 0.08)",
          contrastText: "var(--warning-contrastText)",
          dark: "var(--warning-dark)",
          light: "var(--warning-light)"
        }
      }
    }
  },
  plugins: []
};

export default config;
