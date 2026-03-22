"use client";

import { ReactNode } from "react";

import { useIsHydrated } from "@otuekong-portfolio/common";

import ThemeContext from "./context";
import useThemeContextState from "./useThemeContextState";

interface ThemeProviderProps {
	children: ReactNode;
}

function ThemeProvider({
	children
}: ThemeProviderProps) {
	const themeContextState = useThemeContextState();
	const isHydrated = useIsHydrated();

	if(!isHydrated) {
		return (
			<div className="">
				<div className="opacity-0">Loading...</div>
			</div>
		);
	}

	return (
		<ThemeContext value={themeContextState}>
			{children}
		</ThemeContext>
	);
}

export default ThemeProvider;
