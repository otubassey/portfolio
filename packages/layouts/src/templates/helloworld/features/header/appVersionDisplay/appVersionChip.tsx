"use client";

import React, { JSX, useEffect } from "react";

import { Chip } from "@otuekong-portfolio/design-system";

import { AppVersionDisplayDetail, OnAppVersionDisplayDetailSelectHandler } from "../../types";

import DetailDisplay from "./detailDisplay";

export interface AppVersionChipProps {
	appDetail: AppVersionDisplayDetail;
	onAppDetailSelect: OnAppVersionDisplayDetailSelectHandler
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
