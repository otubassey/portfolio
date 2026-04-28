import { lazy } from "react";

import { HELLOWORLD_CLASSIC_APP_MANIFEST, HELLOWORLD_COMPOSITE_APP_MANIFEST } from "@otuekong-portfolio/features";

import { AppDetail } from "./types";

const APP_DETAILS: ReadonlyArray<AppDetail> = [
	{
		component: lazy(() => import("../galleries/helloworld")
			.then(exportedComponents => ({ default: exportedComponents.HelloworldClassicHeadlessMain }))),
		manifest: HELLOWORLD_CLASSIC_APP_MANIFEST
	},
	{
		component: lazy(() => import("../galleries/helloworld")
			.then(exportedComponents => ({ default: exportedComponents.HelloworldCompositeHeadlessMain }))),
		manifest: HELLOWORLD_COMPOSITE_APP_MANIFEST
	}
] as const;

export default APP_DETAILS;
