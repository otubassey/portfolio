import { ExhibitContext } from "../../../../common/server";

import HelloworldCompositeContainer from "./helloworldCompositeContainer";

const Bootstrap = {
	run: () => (
		ExhibitContext.registerFactory(() => (
			HelloworldCompositeContainer.bootstrap()
		))
	)
};

export default Bootstrap;
