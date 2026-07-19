import { lazy } from "react";

import { AppDetail, ContainerManifest } from "@otuekong-portfolio/features/core";
import { APP_NAME_PAVILION } from "@otuekong-portfolio/features/pavilion";
import { APP_MANIFEST_HELLOWORLD_CLASSIC, APP_MANIFEST_HELLOWORLD_COMPOSITE } from "@otuekong-portfolio/features/helloworld-client";

const APP_DETAILS: ReadonlyArray<AppDetail> = Object.freeze([
	{
		component: lazy(() => import("../../galleries/helloworld")
			.then(exportedComponents => ({ default: exportedComponents.HelloworldClassicHeadlessMain }))),
		manifest: APP_MANIFEST_HELLOWORLD_CLASSIC
	},
	{
		component: lazy(() => import("../../galleries/helloworld")
			.then(exportedComponents => ({ default: exportedComponents.HelloworldCompositeHeadlessMain }))),
		manifest: APP_MANIFEST_HELLOWORLD_COMPOSITE
	}
] as const);

const APP_MANIFEST_PAVILION: ContainerManifest = Object.freeze({
	name: APP_NAME_PAVILION,
	label: "Pavilion",
	hostedApps: APP_DETAILS,
	role: "CONTAINER_APP"
} as const);

export default APP_MANIFEST_PAVILION;
