# @otuekong-portfolio/exhibit Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1-rc-2] - 07/18/2026
### Added
* Adding the following constructs:
	* `ClassicStaticRouteDispatcher`
	* `ClassicStaticRouteDispatcherFactory`
	* `CommonModule`
	* `CompositeStaticRouteDispatcher`
	* `CompositeStaticRouteDispatcherFactory`
	* `ExhibitContext`
	* `GallerySchema`
	* `HelloworldClassicContainer`
	* `HelloworldClassicModule`
	* `HelloworldCompositeContainer`
	* `HelloworldCompositeModule`
	* `NextHttpMapper`
	* `NextRouteExecutor`
	* `PavilionContainer`
	* `PavilionGatewayRouteDispatcher`
	* `PavilionGatewayRouteDispatcherFactory`
	* `PavilionModule`
	* `PavilionSchema`
* Introducing `ContainerManifest` for container apps like *Pavilion*
* Adding the following JsonSchema properties
	* APP_NAME
	* CRON_SECRET
* Adding typescript build script
* Adding `AppContainer` interface

### Changed
* Updating `ExhibitContext` to look up its internal registry using the global Symbol, to fix the runtime boundaries issue
* Updating **Helloworld Gallery* apps to account for new headers
* Renaming `NextRouteHandler` to `NextRequestAdapter`
* Updating `openapi` doc to account for new headers and appropriate responses
* Package restructuring
* Updating project exports
* Properly typing `SystemHealthHttpClient`
* Updating to split schema into build vs runtime to avoid vercel's build time failures due to secret environment variables
* Consuming new `container-module` pattern
* Updating `tsconfig.ts` to properly resolve other packages within this repo
* Updating to pnpm v11.15.0

### Removed
* Remove `ContactServiceHandler`
* Remove `HealthServiceHandler`
* Remove `createNextRoute`
* Unused configured `SystemHealthService`

## [1.0.1-rc-1] - 06/07/2026
### Added
* Adding and bootstrapping `HealthServiceHandler`

### Changed
* Updating `ContactServiceHandler.sendEmailInquiry` to accept a `NextRequest` so it no longer returns an HOF

## [1.0.0] - 05/16/2026
### Added
* Adding the following dependencies:
	* `@otuekong-portfolio/common`
	* `@otuekong-portfolio/infrastructure-server`
	* `next`
	* `@vercel/functions`
* Adding and configuring `SystemHealthService` and `SystemHealthHttpClient`
* Adding and configuring `ContactServiceHandler`
* Adding `createNextRoute` utility
* Adding `NextRouteHandler`
* Adding `openapi.yaml` for the Portfolio API
* Adding Postman collection and environment variable files

### Changed
* Updating author information in `package.json`
* Project folder restructuring to make room for ui-api and server implementations
* Updating Header and Sidebar components for Lookbook to use new Navigation solution
* Updating from importing archives components to importing features components for `PortfolioView`
* Updating pnpm version to ^10.33.1
* Renaming and restructuring of the former `layers` package

### Removed
* Removing `AppRegistry` as its no longer in-use
