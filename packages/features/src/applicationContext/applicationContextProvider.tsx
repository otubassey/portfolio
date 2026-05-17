import { ReactNode, useMemo } from "react";

import { useIsHydrated } from "@otuekong-portfolio/curio";

import AppContext from "./context";
import { ApplicationContextType, AppManifest } from "./types";

interface ApplicationContextProviderProps {
	app: AppManifest;
	children: ReactNode;
}

function ApplicationContextProvider({
	app,
	children
}: ApplicationContextProviderProps) {
	const isHydrated = useIsHydrated();
	const appContext = useMemo<ApplicationContextType>(() => ({app}), [app]);

	if(!isHydrated) {
		return (
			<div className="">
				<div className="opacity-0">Loading...</div>
			</div>
		);
	}

	return (
		<AppContext value={appContext}>
			{children}
		</AppContext>
	);
};

export default ApplicationContextProvider;
