import { JSX, LazyExoticComponent } from "react";

import { AppManifest } from "@otuekong-portfolio/features";

export interface AppDetail {
	component: LazyExoticComponent<(props?: any) => JSX.Element>;
	manifest: AppManifest;
}
