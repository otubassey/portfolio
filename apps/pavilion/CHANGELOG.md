# Pavilion Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1-rc-2] - 07/18/2026
### Added
* Handling slug routes intended for client apps
* ~~Boostrapping server objects in `instrumentation.ts` file~~
* Adding calling `GET /portfolio/health` as a *cron job*

### Changed
* Boostrapping server objects in `route.ts` files
* Updating gallery app related environment variables
* Updating to new container-module implementation
* Updating to pnpm v11.15.0

### Removed
* `GET /portfolio/health` route

## [1.1.1-rc-1] - 06/07/2026
### Fixed
* Replacing HOF in api route due to Vercel's production compiler expecting static, explicit function declarations

## [1.1.0] - 05/16/2026
### Added
* Adding `/health` route and revalidation every 12 hours
* Adding `postcss` version ^8.5.8

### Changed
* Updating author information in `package.json`
* Updating pnpm version to ^10.33.1
* Replacing the following workspaces below with their replacements:
    * `@otuekong-portfolio/core` - replaced by `@otuekong-portfolio/features`
    * `@otuekong-portfolio/design-system` - replaced by `@otuekong-portfolio/curio`
    * `@otuekong-portfolio/layouts` - replaced by `@otuekong-portfolio/exhibit`
