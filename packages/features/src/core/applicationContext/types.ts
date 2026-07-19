import { JSX, LazyExoticComponent } from "react";

import { IconName } from "@otuekong-portfolio/curio";

/**
 * The recursive structural map of an application's internal hierarchy.
 * Describes the relationship between views, sections, and nested pages.
 */
export interface AppBlueprint {
	name: string;
	hide?: boolean;
	icon?: IconName;
	sections?: ReadonlyArray<AppBlueprint>;
}

export interface AppDetail {
	component: LazyExoticComponent<(props?: any) => JSX.Element>;
	manifest: HostedAppManifest;
}

type AppRole = "CONTAINER_APP" | "HOSTED_APP" | "INTERNAL_TOOL_APP";

interface Manifest {
	readonly name: string;
	readonly label: string | null;
	readonly role: AppRole;
}

export interface FamilyAppManifest extends Manifest {
	readonly family: string;
	readonly blueprints: ReadonlyArray<AppBlueprint>;
	readonly role: "HOSTED_APP" | "INTERNAL_TOOL_APP";
}

/**
 * The formal declaration of a functional, hosted application's identity and structure.
 * Represents a modular component that belongs to a specific portfolio gallery family and
 * exposes architectural blueprints for rendering routing elements like breadcrumbs.
 */
export interface HostedAppManifest extends FamilyAppManifest {
	readonly role: "HOSTED_APP";
}

export interface HostedAppManifestSummary {
	family: string;
	name: string;
	label: string | null;
}

/**
 * The formal declaration of the root container shell's structure and app inventory.
 * Represents the layout engine infrastructure that orchestrates independent sub-apps,
 * housing a registry of available target systems for dynamic rendering of portfolio apps.
 */
export interface ContainerManifest extends Manifest {
  	readonly hostedApps: ReadonlyArray<AppDetail>;
	readonly role: "CONTAINER_APP";
}

/**
 * The formal declaration of a functional, internal tool application's identity and structure.
 * Represents a modular component that belongs to a family of internal tools and
 * exposes architectural blueprints for rendering routing elements like breadcrumbs.
 */
export interface InternalToolAppManifest extends FamilyAppManifest {
	readonly role: "INTERNAL_TOOL_APP";
}

export type ClientAppManifest = HostedAppManifest | InternalToolAppManifest;

export type AppManifest = ContainerManifest | ClientAppManifest;

interface BaseApplicationContextState {
	readonly app: AppManifest;
	readonly role: AppRole;
}

export interface ClientApplicationContextState extends BaseApplicationContextState {
	readonly app: ClientAppManifest;
	readonly role: "HOSTED_APP" | "INTERNAL_TOOL_APP";
}

export interface ContainerApplicationContextState extends BaseApplicationContextState {
	readonly app: ContainerManifest;
	readonly selectedApp: AppDetail | null;
	readonly role: "CONTAINER_APP";
}

export type ApplicationContextState = ClientApplicationContextState | ContainerApplicationContextState;

export type ApplicationContextValue = readonly [
	ApplicationContextState,
	(action: AppDetail | null) => void
];
