import { NextRouteExecutor } from "../../../../common/server";

import ClassicStaticRouteDispatcher from "./classicStaticRouteDispatcher";
import HelloworldClassicContainer, { HelloworldClassicContainerEnvironmentKeys } from "./helloworldClassicContainer";

class ClassicStaticRouteDispatcherFactory {
	create(): ClassicStaticRouteDispatcher {
		return new ClassicStaticRouteDispatcher(
			(container: HelloworldClassicContainer) => new NextRouteExecutor<HelloworldClassicContainerEnvironmentKeys>(
				container.getEnvironmentRegistry(),
				container.getLoggerProvider()
			)
		);
	}
}

export default new ClassicStaticRouteDispatcherFactory();
