# @otuekong-portfolio/features Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-SNAPSHOT] - Unreleased
### Added
* Adding BreadcrumbUtils for operating on breadcrumbs
* Adding GalleryDirectory for displaying and selecting apps by family
* Adding application-level Navigation with breadcrumbs

### Changed
* Replacing AppDetailsContext with both ApplicationContext and NavigationContext
* Updating pnpm version to ^10.33.1
* Renaming and restructuring of the former `core` package

### Fixed
* Fix showing `ComponentHeading` in `DocumentationSection` when `isManifestLoading` is `true`
