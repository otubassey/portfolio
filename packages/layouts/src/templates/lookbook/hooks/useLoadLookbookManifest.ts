"use client";

import { useEffect } from "react";

import { useAsync } from "@otuekong-portfolio/common";
import { ComponentRegistryType } from "@otuekong-portfolio/design-system";

function useLoadLookbookManifest(
	lookbookRegistry: ComponentRegistryType,
	selectedComponent: string | null
) {
	const {
		data: manifest,
		error: manifestError,
		execute,
		isLoading: isLoadingManifest,
	} = useAsync(async (componentName: string) => {
		if(!componentName) {
			return null;
		}

		const componentAsyncFactory = lookbookRegistry?.[componentName];
		if(!componentAsyncFactory) {
			throw new Error(`Component "${componentName}" not found in lookbook registry.`);
		}

		const { manifest } = await componentAsyncFactory();

		return manifest;
	}, {manual: true});

	useEffect(() => {
		if(selectedComponent) {
			execute(selectedComponent);
		}
	}, [selectedComponent]);

	return {
		isLoadingManifest,
		loadManifest: execute,
		manifest,
		manifestError
	};
}

export default useLoadLookbookManifest;
