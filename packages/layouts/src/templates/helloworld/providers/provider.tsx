"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@otuekong-portfolio/design-system";

import { AppDetail } from "../constants";

import { AppDetailsProvider } from "./appDetails";

interface ProviderProps {
	appDetails: Array<AppDetail>;
	children: ReactNode;
}

function Provider({
	appDetails,
	children
}: ProviderProps) {
	return (
		<AppDetailsProvider appDetails={appDetails}>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</AppDetailsProvider>
	);
}

export default Provider;
