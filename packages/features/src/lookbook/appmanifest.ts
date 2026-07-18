import { ComponentName } from "@otuekong-portfolio/curio";

import { InternalToolAppManifest } from "../core/applicationContext";

const APP_MANIFEST: InternalToolAppManifest = Object.freeze({
	family: "Internal Tools",
	name: "lookbook",
	label: "Lookbook",
	blueprints: [
		{
			name: "Components",
			icon: "palette",
			hide: false,
			sections: Object.values(ComponentName)
				.map(name => ({name}))
		}
	],
	role: "INTERNAL_TOOL_APP"
} as const);

export default APP_MANIFEST;
