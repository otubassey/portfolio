# @otuekong-portfolio/features Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1-rc-1] - 06/20/2026
### Added
* Adding `FeaturesModule`
* Adding `GalleryModule`

### Changed
* Updating package structure
* Consuming new `container-module` pattern
* Updating `tsconfig.ts` to properly resolve other packages within this repo
* Updating to pnpm v11.8.0

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
