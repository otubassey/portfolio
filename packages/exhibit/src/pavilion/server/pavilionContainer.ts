import {
	EnvironmentRegistry,
	LoggerProvider,
	ZodSchemaTransformer,
	ZodSchemaValidator,
	LoggerFactoryEnvironmentKeys
} from "@otuekong-portfolio/common/core";
import {
	CommonModule as ExternalCommonModule
} from "@otuekong-portfolio/common/server";
import { FeaturesGalleryModuleEnvironmentKeys } from "@otuekong-portfolio/features/galleries-server";
import {
	ControllerRegistry,
	InfrastructureServerModule,
	InfrastructureServerModuleEnvironmentKeys,
	SupportedApiClient
} from "@otuekong-portfolio/infrastructure-server";

import { AppContainer } from "../../common/server";

import { PavilionEnvironmentJsonSchema } from "../schema";

import PavilionModule from "./pavilionModule";

export type PavilionModuleEnvironmentKeys =
	| FeaturesGalleryModuleEnvironmentKeys
	| InfrastructureServerModuleEnvironmentKeys
	| LoggerFactoryEnvironmentKeys;

class PavilionContainer implements AppContainer {
	private readonly environmentRegistry: EnvironmentRegistry<PavilionModuleEnvironmentKeys>;
	private readonly loggerProvider: LoggerProvider;
	private readonly pavilionModule: PavilionModule;

	constructor() {
		const environmentRegistry = new EnvironmentRegistry<PavilionModuleEnvironmentKeys>(
			PavilionEnvironmentJsonSchema,
			new ZodSchemaTransformer(),
			(zodSchema, key) => (
				new ZodSchemaValidator<any>(zodSchema.shape[key])
			)
		);

		const commonModule = new ExternalCommonModule({
			environmentRegistry: (environmentRegistry as EnvironmentRegistry<LoggerFactoryEnvironmentKeys>)
		});

		const logger = commonModule.getLoggerFactory();
		const loggerProvider = Object.freeze({
			getLogger: (scope: string) => logger.getLogger(scope),
			getTransactionLogger: (scope: string) => logger.getTransactionLogger(scope)
		} as const);

		const infrastructureServerModule = new InfrastructureServerModule({
			environmentRegistry: (environmentRegistry as EnvironmentRegistry<InfrastructureServerModuleEnvironmentKeys>),
			loggerProvider
		});

		const pavilionModule = new PavilionModule({
			environmentRegistry: (environmentRegistry as EnvironmentRegistry<FeaturesGalleryModuleEnvironmentKeys>),
			healthClient: infrastructureServerModule.getSystemHealthClient(),
			resendClient: infrastructureServerModule.getResendClientModule().getResendClient(),
			withRateLimitPreHook: infrastructureServerModule.getWithRateLimit()
		});

		this.environmentRegistry = environmentRegistry;
		this.loggerProvider = loggerProvider;
		this.pavilionModule = pavilionModule;
	}

	public getControllerRegistry(): ControllerRegistry {
		return this.pavilionModule.getControllerRegistry();
	}

	public getEnvironmentRegistry(): EnvironmentRegistry<PavilionModuleEnvironmentKeys> {
		return this.environmentRegistry;
	}

	public getLoggerProvider(): LoggerProvider {
		return this.loggerProvider;
	}

	public getSupportedClients(): ReadonlyArray<SupportedApiClient> {
		return this.pavilionModule.getSupportedClients();
	}

	public static bootstrap(): PavilionContainer {
		return new PavilionContainer();
	}
}

export default PavilionContainer;
