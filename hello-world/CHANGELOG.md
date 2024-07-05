# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-rc10] - 2024-07-04
1. Fixing vercel's 'ReferenceError: navigator is not defined'

## [0.1.0-rc9] - 2024-07-04

### Fixed
1. Scrolling issue on mobile devices
2. Navigation FAB hiding after an icon has been touched on a mobile
3. Updating configuration provider to reflect changes to the device type when there's a switch

## [0.1.0-rc8] - 2024-07-03

### Fixed
1. Scrolling issue on mobile devices

## [0.1.0-rc8] - 2024-06-15

### Fixed
1. Helloworld carousel fix
    - when you click the next and/or previous buttons fast enough, you can create multiple tweens - that is, a single content would show multiple times
2. Scrolling issue on mobile devices

## [0.1.0-rc7] - 2024-06-15

### Fixed
1. Scrolling issue on mobile devices

## [0.1.0-rc6] - 2024-06-15

### Fixing
1. Scrolling issue on mobile devices - adding alert to figure stuff out

## [0.1.0-rc5] - 2024-06-15

### Fixing
1. Scrolling issue on mobile devices - adding alert to figure stuff out

## [0.1.0-rc4] - 2024-06-15

### Fixing
1. Scrolling issue on mobile devices - adding alert to figure stuff out

## [0.1.0-rc3] - 2024-06-09

### Added
1. Settings Component
    - This component is intended to handle application configurations such as theme selections
    - A modal is displayed for non-mobile screen and an entire page component is displayed for mobile screens 

### Fixed
1. Carousel
    - refactored this to gain finer controller over the content display
2. HelloWorldSnippet
    - refactored to align with the newly refacted carousel component 
3. Fixes navigation on mobile screens

## [0.1.0-rc2] - 2024-05-06

### Added
1. Initial commit
    * Adding components for each section
    * Updating implementation of IconButton in Location
