import { ExhibitContext } from "../../../../common/server";

import HelloworldClassicContainer from "./helloworldClassicContainer";

// TODO: things to consider
// This could be called in the `app/layout.tsx` file to boostrap logger that could be needed by the client.
// However, there are numerous other constructs that are bundled with this container that are unnecessary for the client
// Consider splitting the boostrap solution into client vs server.
const Bootstrap = {
	run: () => (
		ExhibitContext.registerFactory(() => (
			HelloworldClassicContainer.bootstrap()
		))
	)
};

export default Bootstrap;
