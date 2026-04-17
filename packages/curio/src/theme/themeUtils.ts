"use client";

export const THEME_LOCAL_STORAGE_KEY = "app-portfolio-system-theme-preference";

export const ThemeName = {
	DARK: "dark",
	LIGHT: "light"
} as const;

export type ThemeType = typeof ThemeName[keyof typeof ThemeName];

export const INITIAL_THEME: ThemeType = ThemeName.LIGHT;

export const INITIAL_THEME_CONTEXT = {
	isDarkMode: false,
	themeName: INITIAL_THEME,
	toggleTheme: (name?: ThemeType) => (name ? name : INITIAL_THEME)
} as const;

export const getSystemTheme = () => (
	window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light"
);

export const getInitialTheme = (): ThemeType => {
	try {
    	const stored = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    	if(stored === "light" || stored === "dark") {
			return stored as ThemeType;
		}
    	return getSystemTheme();
  	} catch (e) {
    	return "light" as ThemeType;
  	}
};

export const applyTheme = (theme: ThemeType) => {
	const root = document.documentElement;

	root.setAttribute("data-theme", theme);

	root.classList.remove("light", "dark");

	root.classList.add(theme);
	localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
};

export const THEME_BLOCKING_SCRIPT = `
	(function() {
    	const THEME_LOCAL_STORAGE_KEY = "${THEME_LOCAL_STORAGE_KEY}";
    	const getSystemTheme = ${getSystemTheme.toString()};
    	const getInitialTheme = ${getInitialTheme.toString()};
    	const applyTheme = ${applyTheme.toString()};

    	applyTheme(getInitialTheme());
  	})()
`;
