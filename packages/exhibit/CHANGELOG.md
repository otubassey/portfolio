# @otuekong-portfolio/exhibit Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1-rc-2] - 06/20/2026
### Added
* Adding and configuring `ExhibitContext`
* Adding `AppContainer` interface
* Adding `GallerySchema`
* Adding `GalleryModule`
* Adding `GalleryContainer`
* Adding `CommonModule`

### Changed
* Consuming new `container-module` pattern
* Updating `tsconfig.ts` to properly resolve other packages within this repo
* Updating to pnpm v11.8.0

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
