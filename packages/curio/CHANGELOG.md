# @otuekong-portfolio/curio Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-SNAPSHOT] - Unreleased
### Added
* Adding a `Badge` component and its manifest
* Adding `@otuekong-portfolio/common` to dependency list

### Changed
* Renaming `StatusChip` component to `StatusPill`
* Renaming `Chip` component to `Pill`
* Renaming chip related tokens in `base.css` to pill
* Updating `Chip` component to use `Surface`, fix styles, and remove event handling
* Updating `CssUtils` to expose a `transparentize` method
* Including `Badge` to the `ComponentRegistry` to be display in `Lookbook`
* Updating the components below to display `ExperienceBadge` component along `BioSection` component:
	* `PortfolioViewSidebar`
	* `MobileHomeSection`
* Updating author information in `package.json`
* Update `useAsyc` to handle the error updates
* Update `subtitle` and `subtitleProps` to `subheading` and `subheadingPRops` in the follwoing components:
	* `Section`
	* `SectionHeading`
* Update to include the shade behavior to Surface components. Below are the list of components impacted:
	* Surface
	* Section
* Update `EmailTextField` component to rename `customError` to `error` to match the `TextField` component
* Update `Alert` component
	* Adding className, detailProps, and messageProps
	* Displaying "detail" within a `Typography`
	* Adding the ability to display `transactionId` for easy tracking/troubleshooting
* Update pnpm version to ^10.33.1
* Initial commit of merging former design-system and common packages alongside work towards themeing

### Fixed
* Fixing `--portfolio-surface-bg-dark` css town
* Fix `useIsTruncated` to ensure the state only updates when the truncation status actually flips, and it uses `useLayoutEffect` to decouple logic from the ref assignment.
* Fix `Typography` to memo-ize bits to prevent unnecessary changes from `useIsTruncated` and to stablize the props to createElement
* Fix `Tooltip` to only display when there's a content and always display a span to prevent `Typography` from unmounting and remounting.

### Removed
* Remove the unused `phone` icon
