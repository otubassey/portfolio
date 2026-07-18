"use client";

import { ClientApplicationContextState, ExhibitLabel, useApplicationContext, useNavigation } from "@otuekong-portfolio/features/core";

import { HelloworldLayout } from "../../common";

import CompositeHeadlessMain from "./compositeHeadlessMain";

function CompositeMain() {
	const [applicationContextState] = useApplicationContext<ClientApplicationContextState>();
	const navigationState = useNavigation();

	return (
		<HelloworldLayout
			headerProps={{
				children: <ExhibitLabel
					family={applicationContextState.app.family}
					value={applicationContextState.app.label}
				/>
			}}>

			<CompositeHeadlessMain
				applicationContextState={applicationContextState}
				navigationState={navigationState}
			/>

		</HelloworldLayout>
	);
}

export default CompositeMain;
