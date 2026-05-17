import { ReactNode } from "react";

import { useIsHydrated } from "@otuekong-portfolio/curio";

import { useApplicationContext } from "../applicationContext";

import NavigationContext from "./context";
import useNavigationState from "./useNavigationState";

interface NavigationProviderProps {
	children: ReactNode;
	defaultNavigate?: boolean;
}

function NavigationProvider({
	children,
	defaultNavigate = false
}: NavigationProviderProps) {
	const { app } = useApplicationContext();
	const navigationState = useNavigationState(app, {defaultNavigate});
	const isHydrated = useIsHydrated();

	if(!isHydrated) {
		return (
			<div className="">
				<div className="opacity-0">Loading...</div>
			</div>
		);
	}

	return (
		<NavigationContext value={navigationState}>
			{children}
		</NavigationContext>
	);
};

export default NavigationProvider;
