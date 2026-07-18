"use client";

import { ThemeProvider } from "@otuekong-portfolio/curio";
import {
	ApplicationContextProvider,
	NavigationProvider
} from "@otuekong-portfolio/features/core";
import {
	APP_MANIFEST_HELLOWORLD_COMPOSITE
} from "@otuekong-portfolio/features/helloworld-client";

import CompositeMain from "./compositeMain";

function CompositeApp() {
	return (
		<ApplicationContextProvider app={APP_MANIFEST_HELLOWORLD_COMPOSITE}>
			<NavigationProvider defaultNavigate>
				<ThemeProvider>
					<CompositeMain />
				</ThemeProvider>
			</NavigationProvider>
		</ApplicationContextProvider>
	);
}

export default CompositeApp;
