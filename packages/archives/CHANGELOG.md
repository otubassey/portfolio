# @otuekong-portfolio/archives Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1-rc-1] - 06/20/2026
### Added
* Adding typescript build script
* Adding a `ArchivesModule` and `ContactModule`

### Changed
* Consuming changes to `EnvironmentRegistry`
* Updating to importing `withRateLimit` preHook through the new name: `withRateLimitPreHook`
* Updating `tsconfig.ts` to properly resolve other packages within this repo
* Updating to pnpm v11.8.0
* Importing and using `EnvironmentRegistry` from `@otuekong-portfolio/common`
* Refactoring based on changes to `ZodSchemaValidator`

## [1.0.0] - 05/16/2026
### Added
* Adding a `ExperienceBadge` component
* Adding a `useContactSendEmail` hook
* Adding and configuring `ContactService` and `ContactHttpClient`
* Adding and configuring `SendEmailHandler`
* Adding `ContactFormSchema` for validation
* Adding the following dependencies:
	* `zod`
	* `@otuekong-portfolio/common`
	* `@otuekong-portfolio/infrastructure-server`

### Changed
* Updating `Alert` in `ContactFormCard` to auto-dismiss on succesful email sent
* Applying 'Chip' to 'Pill' changes
* Renaming `TechnologyChips` component to `TechnologyPills`
* Updating `BioSection` component to display both bio text and `children`, when provided
* Updating bio text to abstract metadata
* Updating author information in `package.json`
* Implementing the send email functionality from `ContactFormCard`
* Restructuring of `/src/contact/` folder into: `core`, `server`, and `ui`
* Applying `Section` component changes
	* renaming `subtitle` to `subheading`
	* renaming `subtitleProps` to `subheadingProps`
* Updating pnpm version to ^10.33.1
* Initial commit for this package - abstracting all domain related core pieces

### Removed
* Removed the display of phone number and email address to avoid continuous spam
