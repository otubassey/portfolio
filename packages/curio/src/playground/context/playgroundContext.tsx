"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";

import { ComponentManifest, ComponentParameter, ComponentParameterOption } from "../../components";

interface PlaygroundContextValue {
	onPropsChange: (name: string, value: any) => void;
	controlProps: Record<string, any>;
	previewProps: Record<string, any>;
	manifest?: ComponentManifest | null;
}

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

function getDefaultValueByType(type: string): any {
	if(type.includes("|") || type.includes("'") || type.includes('"')) return undefined;

	switch (type.toLowerCase()) {
		case "string": return "";
		case "number": return 0;
		case "boolean": return false;
		case "array": return [];
		default: return undefined;
	}
}

function mapInitialProps(manifest: ComponentManifest | null | undefined): Record<string, any> {
	const initialProps: Record<string, any> = {};
	const parameters = manifest?.parameters ?? [];

	if(parameters.length === 0) {
		return initialProps;
	}

	const resolveValue = (param: ComponentParameter): any => {
		if(param.value !== undefined || param.defaultValue !== undefined) {
			return param.value ?? param.defaultValue;
		}
		if(param.required && Array.isArray(param.options) && param.options.length > 0) {
			const first = param.options[0];
			return typeof first === "object"
				? (first as ComponentParameterOption).value
				: first;
		}
		return getDefaultValueByType(param.type);
	};

	// Call factories once with empty/partial props to discover their priority
	const executionQueue = parameters.map(parameter => {
		const isFactory = typeof parameter === "function";
		// Discovery call for factories to get metadata (priority/name)
		const param = isFactory ? parameter(initialProps) : parameter;

		return {
			original: parameter,
			name: param.name,
			// Default priority: Statics run at 0, Factories run at 1
			priority: param.priority ?? (isFactory ? 1 : 0)
		};
	});

	executionQueue.sort((a, b) => a.priority - b.priority);

	// Phase 3: Ordered Execution
	executionQueue.forEach((item) => {
		const param = typeof item.original === "function"
			? item.original(initialProps)
			: item.original;

		// Apply synchronization with 'syncWith'
		if(param.syncWith && initialProps[param.syncWith] !== undefined) {
			initialProps[param.name] = initialProps[param.syncWith];
		} else {
			initialProps[param.name] = resolveValue(param);
		}
	});

	return initialProps;
}

interface PlaygroundProviderProps {
	children: ReactNode;
	manifest?: ComponentManifest | null;
}

const PlaygroundProvider = ({
	children,
	manifest
}: PlaygroundProviderProps) => {
	const [controlProps, setControlProps] = useState<Record<string, any>>(mapInitialProps(manifest));

	const previewProps = useMemo(() => {
		const finalProps = { ...controlProps };

		if(manifest?.actionMappings) {
			Object.entries(manifest.actionMappings).forEach(([callbackName, reducer]) => {
				finalProps[callbackName] = (...args: any[]) => {
					const updates = reducer({ props: controlProps, args });
					handlePropsChange(updates);
				};
			});
		}

		return finalProps;
	}, [controlProps, manifest]);

	const handlePropsChange = useCallback((updates: Record<string, any> | string, value?: any) => {
		setControlProps(previousProps => {
			const newValues = typeof updates === "string" ? { [updates]: value } : updates;
			const nextProps = { ...previousProps, ...newValues };

			// update any dependent props that needs to sync with this change
			Object.keys(newValues).forEach(updatedName => {
				manifest?.parameters.forEach(parameter => {
					const param: ComponentParameter = typeof parameter === "function"
						? parameter(nextProps)
						: parameter;
					if(param.syncWith === updatedName) {
						nextProps[param.name] = newValues[updatedName];
					}
				});
			});

			return nextProps;
		});
	}, [manifest?.parameters]);

	return (
		<PlaygroundContext
			value={{
				controlProps,
				manifest,
				onPropsChange: handlePropsChange,
				previewProps
			}}>
			{children}
		</PlaygroundContext>
	);
};

PlaygroundProvider.displayName = "PlaygroundProvider";

const usePlayground = () => {
	const context = useContext(PlaygroundContext);
	if(!context) {
		throw new Error("usePlayground must be used within a PlaygroundProvider");
	}
	return context;
};

usePlayground.displayName = "usePlayground";

export {
	PlaygroundProvider,
	usePlayground
};
