"use client";

import { ThemeProvider } from "@otuekong-portfolio/curio";
import {
	ApplicationContextProvider,
	HELLOWORLD_CLASSIC_APP_MANIFEST,
	NavigationProvider
} from "@otuekong-portfolio/features";

import ClassicMain from "./classicMain";

function ClassicApp() {
	return (
		<ApplicationContextProvider app={HELLOWORLD_CLASSIC_APP_MANIFEST}>
			<NavigationProvider defaultNavigate>
				<ThemeProvider>
					<ClassicMain />
				</ThemeProvider>
			</NavigationProvider>
		</ApplicationContextProvider>
	);
}

export default ClassicApp;
