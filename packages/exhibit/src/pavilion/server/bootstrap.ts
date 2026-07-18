import { ExhibitContext } from "../../common/server";

import PavilionContainer from "./pavilionContainer";

const Bootstrap = {
	run: () => (
		ExhibitContext.registerFactory(() => (
			PavilionContainer.bootstrap()
		))
	)
};

export default Bootstrap;
