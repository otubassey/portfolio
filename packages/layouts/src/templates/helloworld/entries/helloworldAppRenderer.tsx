import { lazy } from "react";

import { Alert } from "@otuekong-portfolio/design-system";

import { Footer, Header } from "../features";
import { HELLOWORLD_V1_APP_DETAILS, HELLOWORLD_V2_APP_DETAILS } from "../data";
import { AppDetailsProvider, useAppDetails } from "../providers";

type AppVersion = keyof typeof COMPONENTS;

const COMPONENTS = {
	v1: lazy(() => import("./v1/helloworldV1Content").then(m => ({ default: m.default }))),
	v2: lazy(() => import("./v2/helloworldV2Content").then(m => ({ default: m.default })))
};

const HELLOWORLD_APP_DETAILS = [
	...HELLOWORLD_V1_APP_DETAILS,
	...HELLOWORLD_V2_APP_DETAILS
] as const;

function HelloworldApp() {
	const {
		selectedAppDetail,
		selectedPage,
		selectedPageSection
	} = useAppDetails();

	const version = (selectedAppDetail?.version ?? "v1") as AppVersion;
	const ComponentToRender = COMPONENTS[version];

	console.log("tagged-HelloworldAppRenderer: vals =", {
		selectedAppDetail,
		selectedPage,
		selectedPageSection,
		ComponentToRender
	});

	if(!ComponentToRender) {
		return (
			<Alert
				severity="error"
				message={`Unsupported Version: No orchestrator found for Helloworld ${selectedAppDetail?.version || "unknown"}.`}
			/>
		);
	}

	return (
		<ComponentToRender />
	);
}

function HelloworldAppRenderer() {
	return (
		<AppDetailsProvider appDetails={HELLOWORLD_APP_DETAILS}>
			<Header />

			<HelloworldApp />

			<Footer />

		</AppDetailsProvider>
	);
}

export default HelloworldAppRenderer;
