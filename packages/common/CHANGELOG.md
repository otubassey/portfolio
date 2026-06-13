# @otuekong-portfolio/common Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1-rc-1] - 06/13/2026
### Added
* Adding new dependencies: `pino` and `pino-pretty`
* Adding `LoggerFactory`
* Adding support for new environment variables in `EnvironmentRegistry`: `CLIENT_LOG_LEVEL`, `LOG_LEVEL`, `NODE_ENV`, and `SERVER_LOG_LEVEL`
* Adding `EmailValidator`, `EmailZodSchema`, and `emailSchemaFactory`

### Changed
* Updating to pnpm v11.6.0
* Porting `EnvironmentRegistry` and `EnvironmentSchema` from `@otuekong-portfolio/infrastructure-server`
* Updating the `Validator` interface and `ZodSchemaValidator` implementation to remove leakage of `zod` into other packages/apps

### Removed
* Unused dependencies: `resend`, `@upstash/redis`, and `@upstash/ratelimit`

## [1.0.0] - 05/16/2026
### Added
* Adding `ErrorMapper` implementation
* Adding `withSchemaValidation` implementation
* Adding `HttpOperationBuilder` implementation
* Adding `DeferredOperationBuilder` implementation
* Adding `ServerComponentClient` implementation
* Adding `HttpClient` implementation
* Adding `OperationPipeline` implementation
* Adding `Validator` and `ZodSchemaValidator` implementations
* Initial commit for this package

### Changed
* Updating author information in `package.json`
