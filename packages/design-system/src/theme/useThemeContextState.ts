"use client";

import { useState, useEffect, useCallback } from "react";

import { useIsHydrated } from "@otuekong-portfolio/common";

import { ThemeContextType } from "./context";
import { applyTheme, getInitialTheme, INITIAL_THEME, ThemeName, ThemeType } from "./themeUtils";

const useThemeContextState = (): ThemeContextType => {
	const isHydrated = useIsHydrated();
	const [themeName, setThemeName] = useState<ThemeType>(INITIAL_THEME);

	useEffect(() => {
		if(isHydrated) {
			const initialTheme = getInitialTheme();
			setThemeName(initialTheme);
			applyTheme(initialTheme);
		}
	}, [isHydrated]);

	const toggleTheme = useCallback((name?: ThemeType) => {
		setThemeName(previousThemeName => {
			const nextThemeNameToSet = previousThemeName === ThemeName.DARK
				? ThemeName.LIGHT
				: ThemeName.DARK;

			applyTheme(nextThemeNameToSet);

			return nextThemeNameToSet;
		});
	}, []);

	return {
		themeName,
		toggleTheme,
		isDarkMode: themeName === ThemeName.DARK
	};
};

export default useThemeContextState;
