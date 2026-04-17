"use client";

import { Fragment, JSX, useRef } from "react";

import { ListSubHeader, Menu, MenuItem, Text, useToggle } from "@otuekong-portfolio/curio";

import { AppDetail, AppDetailsByFamily } from "../../constants";

import { MenuButton } from "../components";
import { OnAppDetailSelectHandler } from "../types";

import DetailDisplay from "./detailDisplay";

interface AppVersionSelectorProps {
	appDetailsByFamily: AppDetailsByFamily;
	onAppDetailSelect: OnAppDetailSelectHandler;
	appDetail: AppDetail | null;
}

// TODO: Include error handling here, if need be
function AppVersionSelector({
	appDetailsByFamily,
	onAppDetailSelect,
	appDetail: selectedAppDetail
}: AppVersionSelectorProps): JSX.Element {
	const anchorRef = useRef<HTMLButtonElement>(null);

	const [showPortfolioProjectDropdown, toggleShowPortfolioProjectDropdown] = useToggle(false);

    return (
		<div className="relative">
			<MenuButton
				ref={anchorRef}
				endIcon={showPortfolioProjectDropdown ? "chevron-up" : "chevron-down"}
				endIconProps={{ size: 14 }}
				onClick={toggleShowPortfolioProjectDropdown}>

				{!selectedAppDetail
				? (
				<Text className="italic">
					Select App
				</Text>)
				: (
				<DetailDisplay
					family={selectedAppDetail.family}
					version={selectedAppDetail.version}
				/>)}

			</MenuButton>

			<Menu
				anchorRef={anchorRef}
				highlightedIndex={-1}
				onChange={() => {}} // TODO: Implement keyboard navigation and selection
				onClose={() => toggleShowPortfolioProjectDropdown(false)}
				onHighlightedIndexChange={() => {}}
				open={showPortfolioProjectDropdown}>
				{Object.entries(appDetailsByFamily).map(([family, appDetails]) => (

				<Fragment key={family}>
					<ListSubHeader>{family}</ListSubHeader>
					{appDetails.map(appDetail => (
					<MenuItem
						key={appDetail.version}
						onClick={() => {
							onAppDetailSelect(appDetail as AppDetail);
							toggleShowPortfolioProjectDropdown(false);
						}}
						selected={appDetail.version === selectedAppDetail?.version}>
						{appDetail.name}
					</MenuItem>
					))}
				</Fragment>
				))}

			</Menu>
		</div>
    );
}

export default AppVersionSelector;
