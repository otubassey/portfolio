import { HostedAppManifest } from "../../../../core/applicationContext";

import { PORTFOLIO_BLUEPRINT } from "../../common/ui";

import { APP_NAME } from "../appName";

const APP_MANIFEST_CLASSIC: HostedAppManifest = Object.freeze({
	family: "Helloworld",
	name: APP_NAME,
	label: "Classic",
	blueprints: [
		PORTFOLIO_BLUEPRINT
	],
	role: "HOSTED_APP"
} as const);

export default APP_MANIFEST_CLASSIC;
