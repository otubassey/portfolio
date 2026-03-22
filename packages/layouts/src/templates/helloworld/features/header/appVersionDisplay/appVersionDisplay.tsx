import { useEffect } from "react";

import { Chip } from "@otuekong-portfolio/design-system";

import { AppDetail, AppDetailsByFamily } from "../../../constants";

import { OnAppDetailSelectHandler } from "../../types";

import AppVersionChip from "./appVersionChip";
import AppVersionSelectorV1 from "./appVersionSelector";

export interface AppVersionDisplayProps {
	appDetailsByFamily: AppDetailsByFamily;
	onAppDetailSelect: OnAppDetailSelectHandler;
	appDetail: AppDetail | null;
}

function AppVersionDisplay({
	appDetailsByFamily,
	onAppDetailSelect,
	appDetail
}: AppVersionDisplayProps) {
	const noAppDetailsAvailable = !appDetailsByFamily || !Object.keys(appDetailsByFamily).length;

	useEffect(() => {
		if(noAppDetailsAvailable) {
			onAppDetailSelect(null);
		}
	}, []);

	if(noAppDetailsAvailable) {
		return (
			<Chip color="warning" icon="warning" label="No projects available" />
		);
	}

	if(Object.keys(appDetailsByFamily).length === 1
		&& appDetailsByFamily[Object.keys(appDetailsByFamily)[0]].length === 1) {
		if(!appDetail) {
			const matchingFamily = Object.keys(appDetailsByFamily)[0];
			return (
				<AppVersionChip
					appDetail={appDetailsByFamily[matchingFamily][0]}
					onAppDetailSelect={onAppDetailSelect}
				/>
			);
		}
		return (
			<AppVersionChip
				appDetail={appDetail}
				onAppDetailSelect={onAppDetailSelect}
			/>
		);
	}

	return (
		<AppVersionSelectorV1
			appDetail={appDetail}
			appDetailsByFamily={appDetailsByFamily}
			onAppDetailSelect={onAppDetailSelect}
		/>
	);
}

export default AppVersionDisplay;
