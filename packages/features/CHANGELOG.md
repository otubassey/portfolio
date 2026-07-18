# @otuekong-portfolio/features Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1-rc-1] - 07/18/2026
### Added
* adding the following constructs:
	* `FeaturesModule`
	* `GalleryModule`
	* `CommonModule` for `galleries/helloworld`
	* `HelloworldClassicModule`
	* `HelloworldCompositeModule`
	* `HelloworldModule`
	* `PortfolioRequestValidator`
	* `SystemHealthController`
	* `SystemHealthService`
* Adding `useApplicationContextState` to help manage app context state for container apps
* Adding typescript build script

### Changed
* Updating to handle expected headers for routes
* Updating `useNavigationState` to handle the new `applicationContext` from `useApplicationContext`
* Updating `useApplicationContext` to provide the appropriate context needed by an app
* Updating `AppManifest` to include *role*
* Updating project exports
* Updating package structure
* Consuming new `container-module` pattern
* Updating `tsconfig.ts` to properly resolve other packages within this repo
* Updating to pnpm v11.15.0

## [1.0.0] - 05/16/2026
### Added
* Adding BreadcrumbUtils for operating on breadcrumbs
* Adding GalleryDirectory for displaying and selecting apps by family
* Adding application-level Navigation with breadcrumbs
* Exporting ConfiguredSendEmailHandler from `@otuekong-portfolio/archives`

### Changed
* Updating author information in `package.json`
* Project folder restructuring: moving all current contents into the `ui` folder
* Renaming `Subtitle` component in `PropsSection` to `Subheading`
* Replacing AppDetailsContext with both ApplicationContext and NavigationContext
* Updating pnpm version to ^10.33.1
* Renaming and restructuring of the former `core` package

### Fixed
* Fix showing `ComponentHeading` in `DocumentationSection` when `isManifestLoading` is `true`
