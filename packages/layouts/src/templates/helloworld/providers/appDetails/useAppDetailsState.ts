"use client";

import { useEffect, useMemo, useReducer } from "react";

import { useToggle } from "@otuekong-portfolio/common";

import { AppDetail, MainPageSectionType, MainPageType } from "../../constants";
import { AppRegistry } from "../../utils";

import { AppDetailsState } from "./types";

export const AppDetailsAction = {
	APP_DETAIL_SET: "App Detail Set",
	PAGE_SECTION_SET: "Page Section Set",
	PAGE_SET: "Page Set"
} as const;

type AppDetailsActionType =
	| {
		type: typeof AppDetailsAction.APP_DETAIL_SET;
		payload: AppDetailsState["selectedAppDetail"];
	}
	| {
		type: typeof AppDetailsAction.PAGE_SET;
		payload: AppDetailsState["selectedPage"];
	}
	| {
		type: typeof AppDetailsAction.PAGE_SECTION_SET;
		payload: AppDetailsState["selectedPageSection"];
	};

const INITIAL_STATE = {
	appDetailsByFamily: {},
	onAppDetailSelect: () => {},
	onPageSectionSelect: () => {},
	onPageSelect: () => {},
	pageDetails: [],
	registry: {},
	selectedAppDetail: null,
	selectedPage: null,
	selectedPageSection: null
} as unknown as AppDetailsState;

function appDetailsStateReducer(
	state: AppDetailsState,
	action: AppDetailsActionType
): AppDetailsState {
	switch(action.type) {
		case AppDetailsAction.APP_DETAIL_SET:
			return {
				...state,
				selectedAppDetail: action.payload,
				selectedPage: action.payload === state.selectedAppDetail ? state.selectedPage : null,
				selectedPageSection: action.payload === state.selectedAppDetail ? state.selectedPageSection : null
			};
		case AppDetailsAction.PAGE_SET:
			return {
				...state,
				selectedPage: action.payload,
				selectedPageSection: action.payload === state.selectedPage ? state.selectedPageSection : null
			};
		case AppDetailsAction.PAGE_SECTION_SET:
			return {
				...state,
				selectedPageSection: action.payload
			};
		default:
			return state;
	}
}

function useAppDetailsState(appDetails: ReadonlyArray<AppDetail>): AppDetailsState {
	const [state, dispatch] = useReducer(appDetailsStateReducer, INITIAL_STATE);

	const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggle(false);

	const registry = useMemo(() => new AppRegistry(appDetails), [appDetails]);

	const pageDetails = useMemo(() => {
		if(!state.selectedAppDetail) {
			return [];
		}
		return registry.getPageDetailsForApp(state.selectedAppDetail.name);
	}, [registry, state.selectedAppDetail]);

	const handleAppDetailSelect = (appDetail: AppDetail | null) => {
		dispatch({
			type: AppDetailsAction.APP_DETAIL_SET,
			payload: appDetail
		});
	};

	const handlePageSectionSelect = (pageSection: MainPageSectionType | null) => {
		dispatch({
			type: AppDetailsAction.PAGE_SECTION_SET,
			payload: pageSection
		});
	};

	const handlePageSelect = (page: MainPageType | null) => {
		dispatch({
			type: AppDetailsAction.PAGE_SET,
			payload: page
		});
	};

	const appDetailsState = useMemo(() => ({
		appDetailsByFamily: registry.getAppsByFamily(),
		isMobileMenuOpen,
		onAppDetailSelect: handleAppDetailSelect,
		onPageSectionSelect: handlePageSectionSelect,
		onPageSelect: handlePageSelect,
		pageDetails,
		registry,
		selectedAppDetail: state.selectedAppDetail,
		selectedPage: state.selectedPage,
		selectedPageSection: state.selectedPageSection,
		toggleIsMobileMenuOpen
	} as const), [isMobileMenuOpen, pageDetails, registry, state.selectedAppDetail, state.selectedPage, state.selectedPageSection]);

	useEffect(() => {
		if(!state.selectedAppDetail) {
			const firstAppDetail = registry.getFirstAppSummary();
			handleAppDetailSelect(firstAppDetail);
		}
	}, [registry]);

	useEffect(() => {
		if(pageDetails.length > 0 && !state.selectedPage) {
			handlePageSelect(pageDetails[0].name);
		}
	}, [pageDetails]);

	useEffect(() => {
		if(pageDetails.length > 0 && state.selectedPage && !state.selectedPageSection) {
			const currentPage = pageDetails.find(pageDetail => pageDetail.name === state.selectedPage);
			if(currentPage?.sections.length) {
				handlePageSectionSelect(currentPage.sections[0].name);
			}
		}
	}, [state.selectedPage]);

	return appDetailsState;
}

export default useAppDetailsState;
