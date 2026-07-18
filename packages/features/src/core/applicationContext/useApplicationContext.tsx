"use client";

import { useContext } from "react";

import AppContext from "./context";
import {
	AppDetail,
	ApplicationContextState,
	ApplicationContextValue,
	ClientApplicationContextState,
	ContainerApplicationContextState
} from "./types";

export function useApplicationContext<T extends ContainerApplicationContextState>(): readonly [T, (action: AppDetail | null) => void];
export function useApplicationContext<T extends ClientApplicationContextState>(): readonly [T, (action: AppDetail | null) => void];
export function useApplicationContext(): ApplicationContextValue;

export function useApplicationContext<T extends ApplicationContextState>(): readonly [T, (action: AppDetail | null) => void] {
	const context = useContext(AppContext);

	if(!context) {
		throw new Error("useApplicationContext must be used within an ApplicationContextProvider");
	}

	return context as unknown as readonly [T, (action: AppDetail | null) => void];
}

export default useApplicationContext;
