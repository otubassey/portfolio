# Portfolio Monorepo

This monorepo serves as the foundation for my digital portfolio, housing a collection of nested monorepos, each dedicated to a specific theme or project.

The [monorepo starter guide](https://monorepo.guide/getting-started) was followed to set this up.

## Nested Monorepo Structure

Each nested monorepo represents a distinct theme or project within my portfolio. These monorepos are organized to promote modularity, resuability, and efficient development.

## Portfolio Monorepo Structure

Below are the locations for the various packages and nested monorepos:

- `/apps` - a directory will contain all the themed monorepos. Basically any user-facing appilication would live here.
- `/services` - a directory where back-end services should live
- `/packages` - a directory where packages designed to be consumed by other packages (published OR internal) live
