"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@otuekong-portfolio/curio";

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
