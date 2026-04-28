"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useToggle } from "@otuekong-portfolio/curio";

import { AppManifest } from "../applicationContext";

import BreadcrumbUtils from "./breadcrumbUtils";
import { Breadcrumb, NavigationState } from "./types";

const transformAppToBreadcrumbs = (
	app: AppManifest
): ReadonlyArray<Breadcrumb> => (
	app.blueprints.flatMap(blueprint => BreadcrumbUtils.fromBlueprint(blueprint))
);

interface UseNavigationStateOptions {
	defaultNavigate: boolean;
}

function useNavigationState(
	app: AppManifest,
	options?: UseNavigationStateOptions
): NavigationState {
	const [breadcrumbs, setBreadcrumbs] = useState<ReadonlyArray<Breadcrumb>>(() => (
		transformAppToBreadcrumbs(app)
	));

	const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggle(false);

	const handleNavigate = useCallback((targetName: string) => {
		setBreadcrumbs((previousBreadcrumbs) => {
			const breadcrumbMap = new Map(
				previousBreadcrumbs.map(breadcrumbs => ([
					breadcrumbs.name,
					{ ...breadcrumbs, active: false }
				]))
			);

			const findFirstLeafBreadcrumb = (name: string): string => {
				const firstChild = previousBreadcrumbs
					.find(previousBreadcrumb => previousBreadcrumb.parent === name);
				return firstChild ? findFirstLeafBreadcrumb(firstChild.name) : name;
			};

			const hasChildren = previousBreadcrumbs
				.some(previousBreadcrumb => previousBreadcrumb.parent === targetName);
        	const finalDestination = hasChildren ? findFirstLeafBreadcrumb(targetName) : targetName;

			const activateChain = (name: string) => {
				const node = breadcrumbMap.get(name);
				if(node) {
					node.active = true;
					if(node.parent) {
						activateChain(node.parent);
					}
				}
			};

			activateChain(finalDestination);
			return Array.from(breadcrumbMap.values());
		});
	}, []);

	useEffect(() => {
		if(!app) return;

		const nextBreadcrumbs = transformAppToBreadcrumbs(app);
		setBreadcrumbs(nextBreadcrumbs);

		if(options?.defaultNavigate && nextBreadcrumbs.length > 0) {
			const firstLeaf = nextBreadcrumbs.find(breadcrumb =>
				!nextBreadcrumbs.some(child => child.parent === breadcrumb.name)
			);

			if(firstLeaf) {
				handleNavigate(firstLeaf.name);
			}
		}
	}, [app, options?.defaultNavigate]);

	return useMemo(() => ({
		breadcrumbs,
		firstActiveBreadcrumb: BreadcrumbUtils.getFirstActive(breadcrumbs),
		isMobileMenuOpen,
		lastActiveBreadcrumb: BreadcrumbUtils.getLastActive(breadcrumbs),
		onNavigate: handleNavigate,
		toggleIsMobileMenuOpen
	} as const), [breadcrumbs, isMobileMenuOpen]);
}

export default useNavigationState;
