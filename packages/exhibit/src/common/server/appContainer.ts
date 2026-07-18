import { LoggerProvider } from "@otuekong-portfolio/common";

interface AppContainer {
	getLoggerProvider: () => LoggerProvider;
}

export type { AppContainer as default };
