"use client";

import { JSX, MouseEvent } from "react";

import { Button, CssUtils, IconName, Text, ToggleIconButton, useTheme } from "@otuekong-portfolio/curio";

import { AppPageDetail, AppDetailsByFamily, MainPageType, AppDetail } from "../../constants";

import { OnAppDetailSelectHandler, OnPageSelectHandler } from "../types";

import { AppVersionDisplay } from "../appVersionDisplay";

import AuthorInfo from "./authorInfo";

export interface DesktopHeaderProps {
	appDetailsByFamily: AppDetailsByFamily;
	onAppDetailSelect: OnAppDetailSelectHandler;
	onPageSelect: OnPageSelectHandler;
	activePage: MainPageType | null;
	appDetail: AppDetail | null;
	pageDetails: ReadonlyArray<AppPageDetail>;
	className?: string;
}

function DesktopHeader({
	appDetailsByFamily,
	onAppDetailSelect,
	onPageSelect,
	activePage,
	appDetail,
	pageDetails,
	className
}: DesktopHeaderProps): JSX.Element {
	const { isDarkMode, toggleTheme } = useTheme();

	const handlePageSelect = (event: MouseEvent<HTMLButtonElement>) => {
		const pageName = event.currentTarget.getAttribute("data-page") || "";
		onPageSelect(pageName as MainPageType);
	};

	return (
		<header
			className={CssUtils.mergeClasses(
				"hidden lg:flex",
				"items-center justify-between px-8 py-3",
				className
			)}>
			<div className="flex items-center justify-between w-full">
				<AuthorInfo />

				{pageDetails.length > 1 && (
				<nav className="flex gap-2">
					{pageDetails.map(pageDetail => (
					<Button
						key={pageDetail.name}
						aria-label={`Switch to ${pageDetail.name} view`}
						className={CssUtils.mergeClasses(
							"flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
							activePage === pageDetail.name
								? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
								: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
						)}
						data-page={pageDetail.name}
						disabled={pageDetails.length === 1}
						onClick={handlePageSelect}
						startIcon={pageDetail.icon as IconName}
						variant="text">
						{/* TODO: On hover make the color match the icon */}
						<Text
							className="hidden sm:inline ml-2"
							color={activePage === pageDetail.name ? "primary" : "default"}>
							{pageDetail.name}
						</Text>
					</Button>
					))}
				</nav>
				)}

				<div className="flex items-center gap-3">
					<div className="w-64">
						<AppVersionDisplay
							appDetail={appDetail}
							appDetailsByFamily={appDetailsByFamily}
							onAppDetailSelect={onAppDetailSelect}
						/>
					</div>

					<ToggleIconButton
						checked={isDarkMode}
						icon="moon"
						checkedIcon="sun"
						onToggle={toggleTheme}
					/>
				</div>
			</div>
		</header>
	);
}

export default DesktopHeader;
