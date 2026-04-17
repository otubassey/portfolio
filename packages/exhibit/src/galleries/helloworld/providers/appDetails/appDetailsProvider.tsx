import { ReactNode } from "react";

import { useIsHydrated } from "@otuekong-portfolio/curio";

import { AppDetail } from "../../constants";

import AppDetailsContext from "./context";
import useAppDetailsState from "./useAppDetailsState";

interface AppDetailsProviderProps {
	appDetails: ReadonlyArray<AppDetail>;
	children: ReactNode;
}

function AppDetailsProvider({
	appDetails,
	children
}: AppDetailsProviderProps) {
	const appDetailsState = useAppDetailsState(appDetails);

	const isHydrated = useIsHydrated();

	if(!isHydrated) {
		return (
			<div className="">
				<div className="opacity-0">Loading...</div>
			</div>
		);
	}

	return (
		<AppDetailsContext value={appDetailsState}>
			{children}
		</AppDetailsContext>
	);
};

export default AppDetailsProvider;
