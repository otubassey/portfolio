import { CommonModuleEnvironmentKeys } from "@otuekong-portfolio/common";
import { FeaturesGalleryModuleEnvironmentKeys } from "@otuekong-portfolio/features/galleries";
import { RedisEnvironmentKeys, ResendEnvironmentKeys } from "@otuekong-portfolio/infrastructure-server";

export type GalleryModuleEnvironmentKeys = |
	CommonModuleEnvironmentKeys |
	FeaturesGalleryModuleEnvironmentKeys |
	RedisEnvironmentKeys |
	ResendEnvironmentKeys;
