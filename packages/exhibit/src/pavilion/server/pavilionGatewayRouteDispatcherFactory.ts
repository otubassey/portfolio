import { ExhibitContext, NextRouteExecutor } from "../../common/server";

import PavilionContainer, { PavilionModuleEnvironmentKeys } from "./pavilionContainer";
import PavilionGatewayRouteDispatcher from "./pavilionGatewayRouteDispatcher";

class PavilionGatewayRouteDispatcherFactory {
	create(): PavilionGatewayRouteDispatcher {
		const container = ExhibitContext.get<PavilionContainer>();
		return new PavilionGatewayRouteDispatcher(
			container.getSupportedClients(),
			container.getControllerRegistry(),
			(container: PavilionContainer) => new NextRouteExecutor<PavilionModuleEnvironmentKeys>(
				container.getEnvironmentRegistry(),
				container.getLoggerProvider()
			)
		);
	}
}

export default new PavilionGatewayRouteDispatcherFactory();
