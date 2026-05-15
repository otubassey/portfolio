import { AppManifest } from "../../../applicationContext/types";

import { PORTFOLIO_BLUEPRINT } from "../common";

import { HELLOWORLD_COMPONENTS } from "./componentRegistry";

const COMPOSITE_APP_MANIFEST: AppManifest = {
	family: "Helloworld",
	name: "helloworld-composite",
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
	label: "Composite"
} as const;

export default COMPOSITE_APP_MANIFEST;
