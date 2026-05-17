"use client";

import { use, useContext } from "react";

import ThemeContext from "./context";

function useTheme() {
	const context = useContext(ThemeContext);

	if(context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
}

useTheme.displayName = "useTheme";

export default useTheme;
