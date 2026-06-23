import { JSX, LazyExoticComponent } from "react";

import { CommonModuleEnvironmentKeys } from "@otuekong-portfolio/common";
import { AppManifest, FeaturesGalleryModuleEnvironmentKeys } from "@otuekong-portfolio/features";
import { RedisEnvironmentKeys, ResendEnvironmentKeys } from "@otuekong-portfolio/infrastructure-server";

export interface AppDetail {
	component: LazyExoticComponent<(props?: any) => JSX.Element>;
	manifest: AppManifest;
}

export type PavilionModuleEnvironmentKeys = |
	CommonModuleEnvironmentKeys |
	FeaturesGalleryModuleEnvironmentKeys |
	RedisEnvironmentKeys |
	ResendEnvironmentKeys;
