import { IconName } from "@otuekong-portfolio/curio";

/**
 * Represents the active state and structural position of a navigation node.
 */
export interface Breadcrumb {
	name: string;
	active: boolean;
	icon: IconName | null;
	parent: string | null;
}

export interface BreadcrumbTree extends Breadcrumb {
	children: ReadonlyArray<BreadcrumbTree>;
}

/**
 * A generic type that represents breadcrumbs grouped by a set of keys.
 * Includes a mandatory "Uncategorized" bucket for items not found in the registry.
 */
export type GroupedBreadcrumbs<K extends string> = Record<K | "Uncategorized", ReadonlyArray<Breadcrumb>>;

export type OnNavigateHandler = (targetName: string) => void;

export type OnToggleIsMobileMenuOpenHandler = (value?: unknown) => void;

export interface NavigationState {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	firstActiveBreadcrumb: Breadcrumb | undefined;
	isMobileMenuOpen: boolean;
	lastActiveBreadcrumb: Breadcrumb | undefined;
	onNavigate: OnNavigateHandler;
	toggleIsMobileMenuOpen: OnToggleIsMobileMenuOpenHandler;
}
