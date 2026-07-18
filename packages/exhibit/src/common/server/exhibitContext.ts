import { ConfigurationError } from "@otuekong-portfolio/common";

import AppContainer from "./appContainer";

const GLOBAL_EXHIBIT_KEY = Symbol.for("portfolio.exhibit.context_anchor");

interface ExhibitRegistry {
	instance: any | null;
	factory: (() => any) | null;
}

const _global = (typeof window === "undefined" ? global : globalThis) as any;

const registry: ExhibitRegistry = _global[GLOBAL_EXHIBIT_KEY] || (_global[GLOBAL_EXHIBIT_KEY] = {
	instance: null,
	factory: null
});

class ExhibitContext {
	public static registerFactory(factoryFn: () => any): void {
		registry.factory = factoryFn;
	}

	public static get<T extends AppContainer>(): T {
		if(!registry.instance) {
			if(!registry.factory) {
				throw new ConfigurationError(
					"Missing the factory required to create instance in ExhibitContext",
					"Critical Error: ExhibitContext.get() called, " +
					"but no factory was registered. Call registerFactory first!"
				);
			}

			registry.instance = registry.factory();
		}

		return registry.instance as T;
	}
}

export default ExhibitContext;
