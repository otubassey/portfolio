# @otuekong-portfolio/common Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1-rc-1] - 07/18/2026
### Added
* Adding the following to *errors*
	* `MissingDependencyError` has been added
	* `MissingHeaderError` has been added
	* `UnauthorizedError` has been added
	* `UnimplementedError` has been added
	* Builders to existing errors
	* a collection of error names
* Adding `StringUtils` construct
* Adding `MapUtils` construct
* Adding `HttpRequestUtils` construct and `KnownHttpHeaders` collection
* Adding `HttpOperationBuilderFactory` construct
* Adding `FetchHttpOperation` construct
* Adding `HttpOperation` interface
* Adding a `ZodSchemaTransformer` to transform from `JsonSchema` to `ZodObject`
* Adding the module: `CommonModule`
* Adding typescript build script
* Adding new dependencies: `pino` and `pino-pretty`
* Adding `LoggerFactory`
* Adding support for new environment variables in `EnvironmentRegistry`: `CLIENT_LOG_LEVEL`, `LOG_LEVEL`, `NODE_ENV`, and `SERVER_LOG_LEVEL`
* Adding `EmailValidator`, `EmailZodSchema`, and `emailSchemaFactory`

### Changed
* Updating `OperationPipeline` to only handle *ExecutionResult* when no *PostHook* is provided
* Updating `ErrorMapper` to remove unused `fromResponse`
* Package restructuring
* Updating project exports
* Updating `FetchHttpOperation` to handle 404 HTML scenarios
* Decoupling the `HttpOperation` state from its builder: `HttpOperationBuilder`
* Updating `ZodSchemaValidator` with the following changes:
	* implementation to add `ConfigurationError` for missing `schema`
	* proper handling of validation error
* Replacing `ExecutionResult` interface with `OperationResult`
* Refactoring `LoggerFactory` with the following changes:
	* Consuming changes to `EnvironmentRegistry`
	* To adhere to the new `container-module` pattern
* Refactoring `BaseError` to move away from anonymous classes causing typescript build issues
* Refactoring `EnvironmentRegistry` with the following changes:
	* To adhere to the new `container-module` pattern
	* To support different validation strategies
	* To receiving `JsonSchema` for validating app environment variables
* Updating `tsconfig.ts` to properly resolve other packages within this repo
* Updating to pnpm v11.15.0
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
