"use client";

import { JSX, useEffect } from "react";

import { Chip } from "@otuekong-portfolio/curio";

import { AppDetail } from "../../constants";

import { OnAppDetailSelectHandler } from "../types";

import DetailDisplay from "./detailDisplay";

export interface AppVersionChipProps {
	appDetail: AppDetail;
	onAppDetailSelect: OnAppDetailSelectHandler
	className?: string;
}

function AppVersionChip({
	appDetail,
	onAppDetailSelect,
	className = ""
}: AppVersionChipProps): JSX.Element {

	useEffect(() => {
		if(appDetail) {
			onAppDetailSelect(appDetail);
		}
	}, [appDetail]);

	return (
		<Chip
			className={className}
			color="default"
			label={
				<DetailDisplay
					family={appDetail.family}
					version={appDetail.version}
				/>
			}
			size="medium"
			variant="filled"
		/>
	);
};

export default AppVersionChip;
