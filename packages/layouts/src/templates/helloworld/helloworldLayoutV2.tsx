"use client";

import { useEffect, useMemo, useState } from "react";

import { useAppDetails } from "./providers";

import { Footer, Header, Main, PageContainer } from "./features";
import { AppDetail, MainViewSectionType, MainViewType } from "./constants";
import { ViewNavigationAction, useViewNavigation } from "./hooks";

interface HelloworldLayoutProps {}

function HelloworldLayout({}: HelloworldLayoutProps) {
	const [selectedAppDetail, setSelectedAppDetail] = useState<AppDetail | null>(null);

	const [selectedViewNavigation, dispatchSelectedViewNavigation] = useViewNavigation();

	const { registry } = useAppDetails();

	const pageDetails = useMemo(() => {
		if(!selectedAppDetail) {
			return [];
		}
		return registry.getPageDetailsForApp(selectedAppDetail.name);
	}, [registry, selectedAppDetail]);

	const handleViewSelect = (viewName: MainViewType | null) => {
		dispatchSelectedViewNavigation({
			type: ViewNavigationAction.VIEW_SET,
			payload: viewName
		});
	};

	const handleViewSectionSelect = (viewSectionName: MainViewSectionType | null) => {
		dispatchSelectedViewNavigation({
			type: ViewNavigationAction.VIEW_SECTION_SET,
			payload: viewSectionName
		});
	};

	useEffect(() => {
		if(!selectedAppDetail) {
			const firstAppDetail = registry.getFirstAppSummary();
			setSelectedAppDetail(firstAppDetail);
		}
	}, [registry]);

	useEffect(() => {
		if(pageDetails.length > 0) {
			// let nextViewName = currentViewName;
			let nextViewName = selectedViewNavigation.view;
			// if(!currentViewName) {
			if(!selectedViewNavigation.view) {
				nextViewName = pageDetails[0].name;
				// setCurrentViewName(nextViewName);
				handleViewSelect(nextViewName);
			}
			// if(!currentViewSection) {
			if(!selectedViewNavigation.viewSection) {
				const firstPageDetail = pageDetails.find(pageDetail => pageDetail.name === nextViewName);
				if(firstPageDetail?.sections.length) {
					// setCurrentViewSection(firstPageDetail.sections[0].name);
					handleViewSectionSelect(firstPageDetail.sections[0].name);
				}
			}
		}
	}, [pageDetails]);

	console.log("tagged-HelloworldLayout: vals =", {
		selectedAppDetail,
		// currentViewName,
		selectedViewNavigation,
		// currentViewSection,
		pageDetails
	});

	return (
		<PageContainer>
			<Header
				// activeView={currentViewName}
				activePage={selectedViewNavigation.view}
				// activePageSection={currentViewSection}
				activePageSection={selectedViewNavigation.viewSection}
				appDetail={selectedAppDetail}
				appDetailsByFamily={registry.getAppsByFamily()}
				onAppDetailSelect={setSelectedAppDetail}
				// onMobileViewSectionSelect={setCurrentViewSection}
				onMobilePageSectionSelect={handleViewSectionSelect}
				// onViewSelect={setCurrentViewName}
				onPageSelect={handleViewSelect}
				pageDetails={pageDetails}
			/>

			<Main
				// activeView={currentViewName}
				activeView={selectedViewNavigation.view}
				// activeViewSection={currentViewSection}
				activeViewSection={selectedViewNavigation.viewSection}
				// onDesktopViewSectionSelect={setCurrentViewSection}
				onDesktopViewSectionSelect={handleViewSectionSelect}
			/>

			<Footer />
		</PageContainer>
	);
}

export default HelloworldLayout;
