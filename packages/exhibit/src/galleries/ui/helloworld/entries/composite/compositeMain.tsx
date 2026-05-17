"use client";

import { ExhibitLabel, useApplicationContext, useNavigation } from "@otuekong-portfolio/features";

import { HelloworldLayout } from "../components";

import CompositeHeadlessMain from "./compositeHeadlessMain";

function CompositeMain() {
	const { app } = useApplicationContext();
	const navigationState = useNavigation();

	return (
		<HelloworldLayout
			headerProps={{
				children: <ExhibitLabel
					family={app.family}
					value={app.label}
				/>
			}}>

			<CompositeHeadlessMain
				navigationState={navigationState}
			/>

		</HelloworldLayout>
	);
}

export default CompositeMain;
