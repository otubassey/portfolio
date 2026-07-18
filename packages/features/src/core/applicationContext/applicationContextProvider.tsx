import { ReactNode } from "react";

import { useIsHydrated } from "@otuekong-portfolio/curio";

import AppContext from "./context";
import { AppManifest } from "./types";
import useApplicationContextState, { UseApplicationContextStateOptions } from "./useApplicationContextState";

interface ApplicationContextProviderProps {
	app: AppManifest;
	children: ReactNode;
	/**
	 * Only applies to a Container app
	 */
	defaultAppName?: UseApplicationContextStateOptions["defaultAppName"];
}

function ApplicationContextProvider({
	app,
	children,
	defaultAppName = false
}: ApplicationContextProviderProps) {
	const isHydrated = useIsHydrated();
	const contextValue = useApplicationContextState(app, {defaultAppName});

	if(!isHydrated) {
		return (
			<div className="">
				<div className="opacity-0">Loading...</div>
			</div>
		);
	}

	return (
		<AppContext value={contextValue}>
			{children}
		</AppContext>
	);
};

export default ApplicationContextProvider;
