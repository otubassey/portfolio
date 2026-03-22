"use client";

import { useReducer } from "react";

import { MainViewSectionType, MainViewType } from "../constants";

interface ViewNavigationState {
	view: MainViewType | null;
	viewSection: MainViewSectionType | null;
}

export const ViewNavigationAction = {
	VIEW_SET: "View Set",
	VIEW_SECTION_SET: "View Section Set"
} as const;

type ViewNavigationActionType =
	| {
		type: typeof ViewNavigationAction.VIEW_SET;
		payload: ViewNavigationState["view"];
	}
	| {
		type: typeof ViewNavigationAction.VIEW_SECTION_SET;
		payload: ViewNavigationState["viewSection"];
	};

const INITIAL_STATE: ViewNavigationState = {
	view: null,
	viewSection: null
} as const;

function viewNavigationReducer(
	state: ViewNavigationState,
	action: ViewNavigationActionType
): ViewNavigationState {
	switch(action.type) {
		case ViewNavigationAction.VIEW_SET:
			return {
				...state,
				view: action.payload,
				viewSection: null
			};
		case ViewNavigationAction.VIEW_SECTION_SET:
			return {
				...state,
				viewSection: action.payload
			};
		default:
			return state;
	}
}

function useViewNavigation() {
	return useReducer(viewNavigationReducer, INITIAL_STATE);
}

export default useViewNavigation;
