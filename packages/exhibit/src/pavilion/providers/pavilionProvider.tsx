"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@otuekong-portfolio/curio";

interface PavilionProviderProps {
	children: ReactNode;
}

function PavilionProvider({
	children
}: PavilionProviderProps) {
	return (
		<ThemeProvider>
			{children}
		</ThemeProvider>
	);
}

export default PavilionProvider;
