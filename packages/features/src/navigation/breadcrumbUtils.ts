import { AppBlueprint } from "../applicationContext";

import { Breadcrumb, BreadcrumbTree } from "./types";

/**
 * Flattens a blueprint into a list of Breadcrumb states.
 * This can be used to initialize the state for any app.
 */
const fromBlueprint = (
	blueprint: AppBlueprint,
	parent: string | null = null
): ReadonlyArray<Breadcrumb> => {
	const current: Breadcrumb = {
		name: blueprint.name,
		active: false,
		icon: blueprint.icon ?? null,
		parent: parent
	};

	const children = blueprint.sections?.flatMap((section) =>
		fromBlueprint(section, blueprint.name)
	) ?? [];

	return [current, ...children] as const;
};

/**
 * Finds the first active node in the flat list.
 * This represents the top-level "View" or "Root" currently in focus.
 */
const getFirstActive = (
	breadcrumbs: ReadonlyArray<Breadcrumb>
): Breadcrumb | undefined => (breadcrumbs.find(b => b.active));

/**
 * Finds the current active leaf node from a flat list of breadcrumbs.
 * Because of the depth-first generation, the last active node is the leaf.
 */
const getLastActive = (
	breadcrumbs: ReadonlyArray<Breadcrumb>
): Breadcrumb | undefined => ([...breadcrumbs].reverse().find(breadcrumb => breadcrumb.active));

const filterByParent = (
	breadcrumbs: ReadonlyArray<Breadcrumb>,
	parent: string
): ReadonlyArray<Breadcrumb> => (
	breadcrumbs.filter(breadcrumb => (
		breadcrumb.parent === parent
		|| (!breadcrumb.parent && breadcrumb.name === parent)
	))
);

/**
 * Filters for navigable items by excluding root-level collapsibles.
 */
const getNavigableItems = (
	breadcrumbs: ReadonlyArray<Breadcrumb>
): ReadonlyArray<Breadcrumb> => (
	breadcrumbs.filter(breadcrumb => Boolean(breadcrumb.parent))
);

/**
 * Transforms a flat array of Breadcrumbs into a nested tree structure.
 * Useful for rendering hierarchical menus like NavigationList.
 */
const groupByFamily = (
	breadcrumbs: ReadonlyArray<Breadcrumb>
): ReadonlyArray<BreadcrumbTree> => {
	const childrenMap = new Map<string | null, Array<string>>();
	const breadcrumbMap = new Map<string, Breadcrumb>();

	breadcrumbs.forEach((breadcrumb) => {
		breadcrumbMap.set(breadcrumb.name, breadcrumb);

		const siblings = childrenMap.get(breadcrumb.parent) ?? [];
		siblings.push(breadcrumb.name);
		childrenMap.set(breadcrumb.parent, siblings);
	});

	const buildTree = (name: string): BreadcrumbTree => {
		const breadcrumb = breadcrumbMap.get(name)!;
		const childNames = childrenMap.get(name) ?? [];

		return {
			...breadcrumb,
			// Map children recursively and cast to ReadonlyArray
			children: childNames.map(buildTree) as ReadonlyArray<BreadcrumbTree>
		};
	};

	const rootNames = childrenMap.get(null) ?? [];
	return rootNames.map(buildTree) as ReadonlyArray<BreadcrumbTree>;
};

/**
 * Groups breadcrumbs based on a provided registry mapping.
 */
const groupByRegistry = <K extends string>(
	breadcrumbs: ReadonlyArray<Breadcrumb>,
	registry: Record<K, ReadonlyArray<string>>
): Record<K | "Uncategorized", ReadonlyArray<Breadcrumb>> => {
	const result = Object.keys(registry).reduce((acc, key) => {
		acc[key as K] = [];
		return acc;
	}, {} as Record<K | "Uncategorized", Breadcrumb[]>);

	result["Uncategorized"] = [];

	// Use a Map for O(1) lookup speed to find which category a name belongs to
	const nameToCategoryMap = new Map<string, K>();
	Object.entries(registry).forEach(([category, names]) => {
		(names as ReadonlyArray<string>).forEach(name => nameToCategoryMap.set(name, category as K));
	});

	breadcrumbs.forEach((breadcrumb) => {
		const category = nameToCategoryMap.get(breadcrumb.name) ?? "Uncategorized";
		result[category].push(breadcrumb);
	});

	return result;
};

const BreadcrumbUtils = {
	filterByParent,
	fromBlueprint,
	getFirstActive,
	getLastActive,
	getNavigableItems,
	groupByFamily,
	groupByRegistry
} as const;

export default BreadcrumbUtils;
