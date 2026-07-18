"use client";

import {
	ThemeProvider
} from "@otuekong-portfolio/curio";
import {
	ApplicationContextProvider,
	NavigationProvider
} from "@otuekong-portfolio/features/core";
import {
	LOOKBOOK_APP_MANIFEST,
} from "@otuekong-portfolio/features/lookbook";

import LookbookMain from "./lookbookMain";

export interface LookbookAppProps {}

function LookbookApp({}: LookbookAppProps) {
	return (
		<ApplicationContextProvider app={LOOKBOOK_APP_MANIFEST}>
			<NavigationProvider defaultNavigate>
				<ThemeProvider>
					<LookbookMain />
				</ThemeProvider>
			</NavigationProvider>
		</ApplicationContextProvider>
	);
}

export default LookbookApp;
