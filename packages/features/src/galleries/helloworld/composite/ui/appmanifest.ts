import { HostedAppManifest } from "../../../../core/applicationContext/types";

import { PORTFOLIO_BLUEPRINT } from "../../common/ui";

import { APP_NAME } from "../appName";

import { HELLOWORLD_COMPONENTS } from "./componentRegistry";

const APP_MANIFEST_COMPOSITE: HostedAppManifest = Object.freeze({
	family: "Helloworld",
	name: APP_NAME,
	label: "Composite",
	blueprints: [
		PORTFOLIO_BLUEPRINT,
		{
			name: "Lookbook",
			icon: "palette",
			hide: false,
			sections: HELLOWORLD_COMPONENTS
				.map(name => ({name}))
		}
	],
	role: "HOSTED_APP"
} as const);

export default APP_MANIFEST_COMPOSITE;
