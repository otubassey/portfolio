"use client";

import { createContext } from "react";

import { INITIAL_THEME_CONTEXT, ThemeType } from "./themeUtils";

export type OnToggleTheme = (theme?: ThemeType) => void;

export interface ThemeContextType {
	isDarkMode: boolean;
	themeName: ThemeType;
	toggleTheme: OnToggleTheme;
}

const ThemeContext = createContext<ThemeContextType>(INITIAL_THEME_CONTEXT);

export default ThemeContext;
