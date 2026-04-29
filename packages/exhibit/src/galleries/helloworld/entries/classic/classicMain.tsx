import { ExhibitLabel, useApplicationContext, useNavigation } from "@otuekong-portfolio/features";

import { HelloworldLayout } from "../components";

import ClassicHeadlessMain from "./classicHeadlessMain";

function ClassicMain() {
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

			<ClassicHeadlessMain
				navigationState={navigationState}
			/>

		</HelloworldLayout>
	);
}

export default ClassicMain;
