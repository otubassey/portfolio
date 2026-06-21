import { ConfigurationError } from "@otuekong-portfolio/common";

import AppContainer from "./appContainer";

class ExhibitContext {
	private static instance: any | null = null;
	private static factory: (() => any) | null = null;

	public static registerFactory(factoryFn: () => any): void {
		this.factory = factoryFn;
	}

	public static get<T extends AppContainer>(): T {
		// If this specific worker thread hasn't built the container yet, build it now
		if(!this.instance) {
			if(!this.factory) {
				throw new ConfigurationError(
					"Missing the factory required to create instance in ExhibitContext",
					"Critical Error: ExhibitContext.get() called, " +
					"but no factory was registered. Call registerFactory first!"
				);
			}

			// Execute the closure to assemble the graph for this context
			this.instance = this.factory();
		}

		return this.instance as T;
	}
}

export default ExhibitContext;
