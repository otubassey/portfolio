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
	type HelloworldCompositeModuleParametersEnvironmentKeys as FeaturesHelloworldCompositeModuleParametersEnvironmentKeys
} from "@otuekong-portfolio/features/helloworld-composite-server";
import {
	SystemHealthController as HelloworldSystemHealthController
} from "@otuekong-portfolio/features/helloworld-server";
import {
	InfrastructureServerModule,
	InfrastructureServerModuleEnvironmentKeys
} from "@otuekong-portfolio/infrastructure-server";

import { AppContainer } from "../../../../common/server";

import { GalleryEnvironmentJsonSchema } from "../../../schema";

import HelloworldCompositeModule from "./helloworldCompositeModule";

export type HelloworldCompositeContainerEnvironmentKeys =
	| FeaturesHelloworldCompositeModuleParametersEnvironmentKeys
	| InfrastructureServerModuleEnvironmentKeys
	| LoggerFactoryEnvironmentKeys;

class HelloworldCompositeContainer implements AppContainer {
	private readonly environmentRegistry: EnvironmentRegistry<HelloworldCompositeContainerEnvironmentKeys>;
	private readonly helloworldCompositeModule: HelloworldCompositeModule;
	private readonly loggerProvider: LoggerProvider;

	constructor() {
		const environmentRegistry = new EnvironmentRegistry<HelloworldCompositeContainerEnvironmentKeys>(
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

		const helloworldCompositeModule = new HelloworldCompositeModule({
			environmentRegistry: (environmentRegistry as EnvironmentRegistry<FeaturesHelloworldCompositeModuleParametersEnvironmentKeys>),
			healthClient: infrastructureServerModule.getSystemHealthClient(),
			resendClient: infrastructureServerModule.getResendClientModule().getResendClient(),
			withRateLimitPreHook: infrastructureServerModule.getWithRateLimit()
		});

		this.environmentRegistry = environmentRegistry;
		this.helloworldCompositeModule = helloworldCompositeModule;
		this.loggerProvider = loggerProvider;
	}

	public getEnvironmentRegistry(): EnvironmentRegistry<HelloworldCompositeContainerEnvironmentKeys> {
		return this.environmentRegistry;
	}

	public getLoggerProvider(): LoggerProvider {
		return this.loggerProvider;
	}

	public getSendEmailInquiryController(): SendEmailInquiryController {
		return this.helloworldCompositeModule.getSendEmailInquiryController();
	}

	public getSystemHealthController(): HelloworldSystemHealthController {
		return this.helloworldCompositeModule.getSystemHealthController();
	}

	public static bootstrap(): HelloworldCompositeContainer {
		return new HelloworldCompositeContainer();
	}
}

export default HelloworldCompositeContainer;
