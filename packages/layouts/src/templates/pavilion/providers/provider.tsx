"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@otuekong-portfolio/design-system";

interface ProviderProps {
	children: ReactNode;
}

function Provider({
	children
}: ProviderProps) {
	return (
		<ThemeProvider>
			{children}
		</ThemeProvider>
	);
}

export default Provider;
