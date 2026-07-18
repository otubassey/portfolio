"use client";

import { ThemeProvider } from "@otuekong-portfolio/curio";
import {
	ApplicationContextProvider,
	NavigationProvider
} from "@otuekong-portfolio/features/core";

import APP_MANIFEST_PAVILION from "./appmanifest";
import PavilionMain from "./pavilionMain";

function PavilionApp() {
	return (
		<ApplicationContextProvider app={APP_MANIFEST_PAVILION} defaultAppName="helloworld-classic">
			<NavigationProvider defaultNavigate>
				<ThemeProvider>
					<PavilionMain />
				</ThemeProvider>
			</NavigationProvider>
		</ApplicationContextProvider>
	);
}

export default PavilionApp;
