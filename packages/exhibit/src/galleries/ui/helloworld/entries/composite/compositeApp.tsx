"use client";

import { ThemeProvider } from "@otuekong-portfolio/curio";
import {
	ApplicationContextProvider,
	HELLOWORLD_COMPOSITE_APP_MANIFEST,
	NavigationProvider
} from "@otuekong-portfolio/features";

import CompositeMain from "./compositeMain";

function CompositeApp() {
	return (
		<ApplicationContextProvider app={HELLOWORLD_COMPOSITE_APP_MANIFEST}>
			<NavigationProvider defaultNavigate>
				<ThemeProvider>
					<CompositeMain />
				</ThemeProvider>
			</NavigationProvider>
		</ApplicationContextProvider>
	);
}

export default CompositeApp;
