# Portfolio Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-SNAPSHOT] - Unreleased
### Changed
* Update Alert component
	* Adding className, detailProps, and messageProps
	* Displaying "detail" within a Typography
* Update pnpm version to ^10.33.1
* Initial commit of merging former design-system and common packages alongside work towards themeing

### Fixed
* Fix `useIsTruncated` to ensure the state only updates when the truncation status actually flips, and it uses `useLayoutEffect` to decouple logic from the ref assignment.
* Fix `Typography` to memo-ize bits to prevent unnecessary changes from `useIsTruncated` and to stablize the props to createElement
* Fix `Tooltip` to only display when there's a content and always display a span to prevent `Typography` from unmounting and remounting.
