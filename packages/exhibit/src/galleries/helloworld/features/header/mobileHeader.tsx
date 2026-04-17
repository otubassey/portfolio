"use client";

import { JSX, MouseEvent } from "react";

import {
	CssUtils,
	Icon,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListSubHeader,
	Text,
	ToggleIconButton,
	useTheme,
	StringUtils
} from "@otuekong-portfolio/curio";

import { AppPageDetail, AppDetailsByFamily, MainPageSectionType, MainPageType, AppDetail } from "../../constants";

import { AppVersionDisplay } from "../appVersionDisplay";
import { MenuButton } from "../components";
import {
	OnAppDetailSelectHandler,
	OnPageSectionSelectHandler,
	OnPageSelectHandler
} from "../types";

import AuthorInfo from "./authorInfo";

const extractPageSections = (
	pageDetails: ReadonlyArray<AppPageDetail>,
	activePage: MainPageType | null
) => {
	if(pageDetails.length === 1 || !activePage) {
		return pageDetails[0]?.sections || [];
	}
	const matchingPageDetail = pageDetails.find(pageDetail => (
		StringUtils.equalsIgnoreCase(pageDetail.name, activePage)
	));
	return matchingPageDetail?.sections || [];
};

export interface MobileHeaderProps {
	appDetailsByFamily: AppDetailsByFamily;
	isMenuOpen: boolean;
	onAppDetailSelect: OnAppDetailSelectHandler;
	onMobilePageSectionSelect: OnPageSectionSelectHandler;
	onPageSelect: OnPageSelectHandler;
	activePage: MainPageType | null;
	activePageSection: MainPageSectionType | null;
	appDetail: AppDetail | null;
	pageDetails: ReadonlyArray<AppPageDetail>;
	toggleIsMenuOpen: (value?: unknown) => void;
	className?: string;
}

function MobileHeader({
	appDetailsByFamily,
	isMenuOpen,
	onAppDetailSelect,
	onMobilePageSectionSelect,
	onPageSelect,
	activePage,
	activePageSection,
	appDetail,
	pageDetails,
	toggleIsMenuOpen,
	className
}: MobileHeaderProps): JSX.Element {
	const { isDarkMode, toggleTheme } = useTheme();

	const handlePageSectionChange = (event: MouseEvent<HTMLButtonElement>) => {
		const pageSectionName = event.currentTarget.getAttribute("data-page-section") || "";
		onMobilePageSectionSelect(pageSectionName as MainPageSectionType);
		toggleIsMenuOpen(false);
	};

	const handlePageChange = (event: MouseEvent<HTMLButtonElement>) => {
		const pageName = event.currentTarget.getAttribute("data-page") || "";
		onPageSelect(pageName as MainPageType);
		toggleIsMenuOpen(false);
	};

	const handleToggleIsDarkMode = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		toggleTheme();
		toggleIsMenuOpen(false);
	};

	const activePageSections = extractPageSections(pageDetails, activePage);

	return (
		<header
			className={CssUtils.mergeClasses(
				"lg:hidden fixed top-0 left-0 right-0 px-4",
				"shadow-sm",
				className
			)}>
			<div className="flex items-center justify-between px-4 py-3">
				<AuthorInfo />

				<ToggleIconButton
					aria-label="Toggle menu"
					checked={isMenuOpen}
					checkedIcon="close"
					color="inherit"
					icon="menu"
					onToggle={toggleIsMenuOpen}
				/>
			</div>

			{isMenuOpen && (
			<nav>
				<div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
					<AppVersionDisplay
						appDetail={appDetail}
						appDetailsByFamily={appDetailsByFamily}
						onAppDetailSelect={onAppDetailSelect}
					/>
				</div>

				<List>
					{pageDetails.length > 1 && (
					<>
						<ListSubHeader
							className="px-3 border-t border-gray-200 dark:border-gray-700"
							color="inherit"
							disableSticky>
							<ListItemText
								primary="Pages"
								primaryTextProps={{
									muted: true,
									size: "small"
								}}
							/>
						</ListSubHeader>
						{pageDetails.map((pageDetail) => (
							<ListItem key={pageDetail.name}>
								<ListItemButton
									color={StringUtils.equalsIgnoreCase(activePage, pageDetail.name) ? "primary" : "inherit"}
									data-page={pageDetail.name}
									fullWidth
									onClick={handlePageChange}
									selected={StringUtils.equalsIgnoreCase(activePage, pageDetail.name)}
									startIcon={pageDetail.icon}>
									<ListItemText
										primary={pageDetail.name}
										primaryTextProps={{
											color: StringUtils.equalsIgnoreCase(activePage, pageDetail.name) ? "primary" : "default"
										}}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</>
					)}

					<ListSubHeader
						className="px-3 border-t border-gray-200 dark:border-gray-700"
						color="inherit"
						disableSticky>
						<ListItemText
							primary="Sections"
							primaryTextProps={{
								muted: true,
								size: "small"
							}}
						/>
					</ListSubHeader>
					<div className="max-h-64 overflow-y-auto">
						{activePageSections.map((pageSection) => (
						<ListItem key={pageSection.name}>
							<ListItemButton
								color={StringUtils.equalsIgnoreCase(activePageSection, pageSection.name) ? "primary" : "inherit"}
								data-page-section={pageSection.name}
								fullWidth
								onClick={handlePageSectionChange}
								selected={StringUtils.equalsIgnoreCase(activePageSection, pageSection.name)}
								startIcon={pageSection.icon}>
								<ListItemText
									primary={pageSection.name}
									primaryTextProps={{
										color: "default"
									}}
								/>
							</ListItemButton>
						</ListItem>
						))}
					</div>
				</List>

				<div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
					<MenuButton
						onClick={handleToggleIsDarkMode}>
						<span className="flex items-center justify-between w-full">
							<Text size="small">Theme</Text>
							<span className="flex items-center gap-2 min-w-0">
								<Icon name={isDarkMode ? "sun" : "moon"} size={14} className="flex-shrink-0" />
								<Text size="small">{isDarkMode ? "Light" : "Dark"}</Text>
							</span>
						</span>
					</MenuButton>
				</div>
			</nav>
			)}
		</header>
	);
}

export default MobileHeader;
