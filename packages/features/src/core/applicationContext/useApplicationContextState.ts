"use client";

import { useReducer } from "react";

import { AppNameGalleries } from "../../galleries";

import {
	AppDetail,
	ApplicationContextState,
	ApplicationContextValue,
	AppManifest,
	ClientAppManifest,
	ContainerManifest
} from "./types";

export interface UseApplicationContextStateOptions {
	/**
	 * Controls initial application selection.
	 * Pass a specific app name string, `true` to auto-select index 0, or `false`/`null` to start blank.
	 */
	readonly defaultAppName?: AppNameGalleries | boolean | null;
}

function applicationContextStateReducer<T extends ApplicationContextState>(
	state: T,
	selectedApp: AppDetail | null
): ApplicationContextState {
	if(state.role !== "CONTAINER_APP") {
		return state;
	}
	return {...state, selectedApp};
}

function getInitialState(
	app: AppManifest,
	options?: UseApplicationContextStateOptions
): ApplicationContextState {
	if(app.role !== "CONTAINER_APP") {
		return {
			app: app as ClientAppManifest,
			role: app.role
		};
	}

	let selectedApp: AppDetail | null = null;
	const fallbackMode = options?.defaultAppName;

	if(fallbackMode === true && app.hostedApps.length > 0) {
		// Auto-select index 0
		selectedApp = app.hostedApps[0];
	} else if (typeof fallbackMode === "string") {
		// Explicit matching name query string lookup
		selectedApp = app.hostedApps.find(item => item.manifest.name === fallbackMode)
			|| null;
	}

	return {
		app: app as ContainerManifest,
		role: "CONTAINER_APP",
		selectedApp
	};
}


function useApplicationContextState(
	app: AppManifest,
	options?: UseApplicationContextStateOptions
): ApplicationContextValue {
	return useReducer(
		applicationContextStateReducer,
		getInitialState(app, options)
	);
}

export default useApplicationContextState;
