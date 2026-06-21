import {
	CommonModule as ExternalCommonModule,
	EnvironmentRegistry,
	LoggerProvider,
	ZodSchemaTransformer,
	ZodSchemaValidator,
	LoggerFactoryEnvironmentKeys
} from "@otuekong-portfolio/common";
import {
	InfrastructureServerModule,
	RedisClientModule,
	RedisEnvironmentKeys,
	ResendClientModule,
	ResendEnvironmentKeys,
	ServerComponentMonitor
} from "@otuekong-portfolio/infrastructure-server";

import { AppContainer, HealthServiceHandler, CommonModule as InternalCommonModule } from "../common";

import GalleriesModule from "./galleryModule";
import { GalleryEnvironmentJsonSchema } from "./schema";
import { ContactServiceHandler } from "./server";
import { GalleryModuleEnvironmentKeys } from "./types";

class GalleryContainer implements AppContainer {
	public readonly contactServiceHandler: ContactServiceHandler;
	public readonly healthServiceHandler: HealthServiceHandler;
	public readonly loggerProvider: LoggerProvider;

	constructor() {
		const environmentRegistry = new EnvironmentRegistry<GalleryModuleEnvironmentKeys>(
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
		const loggerProvider = {
			getLogger: (scope: string) => logger.getLogger(scope),
			getTransactionLogger: (scope: string) => logger.getTransactionLogger(scope)
		} as const;
		this.loggerProvider = loggerProvider;

		const redisClientModule = new RedisClientModule({
			environmentRegistry: (environmentRegistry as EnvironmentRegistry<RedisEnvironmentKeys>),
			loggerProvider
		});
		const redisClient = redisClientModule.getRedisClient();

		const resendClientModule = new ResendClientModule({
			environmentRegistry: (environmentRegistry as EnvironmentRegistry<ResendEnvironmentKeys>),
			loggerProvider
		});
		const resendClient = resendClientModule.getResendClient();

		const infrastructureServerModule = new InfrastructureServerModule({
			loggerProvider,
			redisClient,
			serverComponentMonitorMapping: new Map<string, ServerComponentMonitor>([
				["redis", redisClient] as const,
				["resend", resendClientModule.getResendClient()] as const
			])
		});

		const internalCommonModule = new InternalCommonModule({
			sendHealthInquiryHandler: infrastructureServerModule.getSystemHealthHandler()
		});
		this.healthServiceHandler = internalCommonModule.getHealthServiceHandler();

		const galleriesModule = new GalleriesModule({
			environmentRegistry,
			resendClient,
			withRateLimitPreHook: infrastructureServerModule.getWithRateLimit()
		});
		this.contactServiceHandler = galleriesModule.getContactServiceHandler();
	}

	public static bootstrap(): GalleryContainer {
		return new GalleryContainer();
	}
}

export default GalleryContainer;
