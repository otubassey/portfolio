import { SendEmailInquiryController } from "@otuekong-portfolio/archives/serverIndex";
import {
	EnvironmentRegistry,
	LoggerProvider,
	LoggerFactoryEnvironmentKeys,
	ZodSchemaTransformer,
	ZodSchemaValidator
} from "@otuekong-portfolio/common/core";
import {
	CommonModule as ExternalCommonModule
} from "@otuekong-portfolio/common/server";
import {
	type HelloworldClassicModuleParametersEnvironmentKeys as FeaturesHelloworldClassicModuleParametersEnvironmentKeys
} from "@otuekong-portfolio/features/helloworld-classic-server";
import {
	SystemHealthController as HelloworldSystemHealthController
} from "@otuekong-portfolio/features/helloworld-server";
import {
	InfrastructureServerModule,
	InfrastructureServerModuleEnvironmentKeys
} from "@otuekong-portfolio/infrastructure-server";

import { AppContainer } from "../../../../common/server";

import { GalleryEnvironmentJsonSchema } from "../../../schema";

import HelloworldClassicModule from "./helloworldClassicModule";

export type HelloworldClassicContainerEnvironmentKeys =
	| FeaturesHelloworldClassicModuleParametersEnvironmentKeys
	| InfrastructureServerModuleEnvironmentKeys
	| LoggerFactoryEnvironmentKeys;

class HelloworldClassicContainer implements AppContainer {
	private readonly environmentRegistry: EnvironmentRegistry<HelloworldClassicContainerEnvironmentKeys>;
	private readonly helloworldClassicModule: HelloworldClassicModule;
	private readonly loggerProvider: LoggerProvider;

	constructor() {
		const environmentRegistry = new EnvironmentRegistry<HelloworldClassicContainerEnvironmentKeys>(
			GalleryEnvironmentJsonSchema,
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

		const helloworldClassicModule = new HelloworldClassicModule({
			environmentRegistry: (environmentRegistry as EnvironmentRegistry<FeaturesHelloworldClassicModuleParametersEnvironmentKeys>),
			healthClient: infrastructureServerModule.getSystemHealthClient(),
			resendClient: infrastructureServerModule.getResendClientModule().getResendClient(),
			withRateLimitPreHook: infrastructureServerModule.getWithRateLimit()
		});

		this.environmentRegistry = environmentRegistry;
		this.helloworldClassicModule = helloworldClassicModule;
		this.loggerProvider = loggerProvider;
	}

	public getEnvironmentRegistry(): EnvironmentRegistry<HelloworldClassicContainerEnvironmentKeys> {
		return this.environmentRegistry;
	}

	public getLoggerProvider(): LoggerProvider {
		return this.loggerProvider;
	}

	public getSendEmailInquiryController(): SendEmailInquiryController {
		return this.helloworldClassicModule.getSendEmailInquiryController();
	}

	public getSystemHealthController(): HelloworldSystemHealthController {
		return this.helloworldClassicModule.getSystemHealthController();
	}

	public static bootstrap(): HelloworldClassicContainer {
		return new HelloworldClassicContainer();
	}
}

export default HelloworldClassicContainer;
