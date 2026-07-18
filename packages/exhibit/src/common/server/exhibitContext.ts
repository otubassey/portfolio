import { ConfigurationError } from "@otuekong-portfolio/common";

import AppContainer from "./appContainer";

const GLOBAL_EXHIBIT_KEY = Symbol.for("portfolio.exhibit.context.state");

interface ExhibitGlobalState {
	instance: any | null;
	factory: (() => any) | null;
}

const globalSymbols = globalThis as any;
if(!globalSymbols[GLOBAL_EXHIBIT_KEY]) {
	globalSymbols[GLOBAL_EXHIBIT_KEY] = {
		instance: null,
		factory: null
	};
}

const state: ExhibitGlobalState = globalSymbols[GLOBAL_EXHIBIT_KEY];

class ExhibitContext {
	public static registerFactory(factoryFn: () => any): void {
		state.factory = factoryFn;
	}

	public static get<T extends AppContainer>(): T {
		// Check the global state bucket
		if(!state.instance) {
			if(!state.factory) {
				throw new ConfigurationError(
					"Missing the factory required to create instance in ExhibitContext",
					"Critical Error: ExhibitContext.get() called, " +
					"but no factory was registered. Call registerFactory first!"
				);
			}

			state.instance = state.factory();
		}

		return state.instance as T;
	}
}

export default ExhibitContext;
