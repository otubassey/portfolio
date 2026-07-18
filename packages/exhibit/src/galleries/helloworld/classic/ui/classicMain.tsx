import { ClientApplicationContextState, ExhibitLabel, useApplicationContext, useNavigation } from "@otuekong-portfolio/features/core";

import { HelloworldLayout } from "../../common";

import ClassicHeadlessMain from "./classicHeadlessMain";

function ClassicMain() {
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

			<ClassicHeadlessMain
				applicationContextState={applicationContextState}
				navigationState={navigationState}
			/>

		</HelloworldLayout>
	);
}

export default ClassicMain;
