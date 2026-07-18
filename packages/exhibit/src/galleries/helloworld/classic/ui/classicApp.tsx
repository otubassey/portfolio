"use client";

import { ThemeProvider } from "@otuekong-portfolio/curio";
import {
	ApplicationContextProvider,
	NavigationProvider
} from "@otuekong-portfolio/features/core";
import {
	APP_MANIFEST_HELLOWORLD_CLASSIC
} from "@otuekong-portfolio/features/helloworld-client";

import ClassicMain from "./classicMain";

function ClassicApp() {
	return (
		<ApplicationContextProvider app={APP_MANIFEST_HELLOWORLD_CLASSIC}>
			<NavigationProvider defaultNavigate>
				<ThemeProvider>
					<ClassicMain />
				</ThemeProvider>
			</NavigationProvider>
		</ApplicationContextProvider>
	);
}

export default ClassicApp;
