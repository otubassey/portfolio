import { ComponentName } from "@otuekong-portfolio/curio";

import { AppManifest } from "../applicationContext";

const APP_MANIFEST: AppManifest = {
	family: "Internal Tools",
	name: "lookbook",
	blueprints: [
		{
			name: "Components",
			icon: "palette",
			hide: false,
			sections: Object.values(ComponentName)
				.map(name => ({name}))
		}
	],
	label: "Lookbook"
} as const;

export default APP_MANIFEST;
