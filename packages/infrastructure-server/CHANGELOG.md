# @otuekong-portfolio/infrastructure-server Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1-rc-1] - 06/20/2026
### Added
* Adding `InfrastructureServerModule`
* Adding `RedisClientModule`
* Adding `ResendClientModule`

### Changed
* Consuming new `container-module` pattern
* Updating `tsconfig.ts` to properly resolve other packages within this repo
* Updating to pnpm v11.8.0
* Importing and using `EnvironmentRegistry` from `@otuekong-portfolio/common`
* Replacing `console.log` with using `LoggerFactory`

### Removed
* Unused `zod` dependency
* Config directory containing `EnvironmentRegistry` and `EnvironmentSchema`

## [1.0.0] - 05/16/2026
### Added
* Adding new environment variable to registry
* Adding and configuring implementation of `SystemHealthClient` and `SystemHealthHandler`
* Adding implementation of `EnvironmentRegistry`
* Adding implementation of `ResendClient`
* Adding implementation of `RedisRateLimiter`
* Adding implementation of `RedisClient`
* Adding implementation of `RateLimiterFactory`
* Adding implementation of `withRateLimitFactory` operation pre-hook
* Initial commit for this package

### Changed
* Updating author information in `package.json`
