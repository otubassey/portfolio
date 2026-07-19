import { NextRouteExecutor } from "../../../../common/server";

import CompositeStaticRouteDispatcher from "./compositeStaticRouteDispatcher";
import HelloworldCompositeContainer, { HelloworldCompositeContainerEnvironmentKeys } from "./helloworldCompositeContainer";

class CompositeStaticRouteDispatcherFactory {
	create(): CompositeStaticRouteDispatcher {
		return new CompositeStaticRouteDispatcher(
			(container: HelloworldCompositeContainer) => new NextRouteExecutor<HelloworldCompositeContainerEnvironmentKeys>(
				container.getEnvironmentRegistry(),
				container.getLoggerProvider()
			)
		);
	}
}

export default new CompositeStaticRouteDispatcherFactory();
