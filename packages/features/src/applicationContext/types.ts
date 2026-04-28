import { IconName } from "@otuekong-portfolio/curio";

/**
 * The recursive structural map of an application's internal hierarchy.
 * Describes the relationship between views, sections, and nested pages.
 */
export interface AppBlueprint {
	name: string;
	hide?: boolean;
	icon?: IconName;
	sections?: ReadonlyArray<AppBlueprint>;
}

/**
 * The formal declaration of an application's identity and structure.
 */
export interface AppManifest {
	family: string;
	name: string;
	blueprints: ReadonlyArray<AppBlueprint>;
	label: string | null;
}

export interface AppManifestSummary {
	family: string;
	name: string;
	label: string | null;
}

export interface ApplicationContextType {
	app: AppManifest;
}
