import { AppManifest } from "../../../applicationContext/types";

import { PORTFOLIO_BLUEPRINT } from "../common";

const CLASSIC_APP_MANIFEST: AppManifest = {
	family: "Helloworld",
	name: "helloworld-classic",
	blueprints: [
		PORTFOLIO_BLUEPRINT
	],
	label: "Classic"
} as const;

export default CLASSIC_APP_MANIFEST;
