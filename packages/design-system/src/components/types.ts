import { ComponentType, ReactNode } from "react";

import { ComponentType as DSComponentType } from "../constants";

export interface ComponentParameterOption {
	label: string;
	value: any;
}

export interface ComponentParameter {
	control: "readonly" | "select" | "switch" | "none";
	description: string;
	name: string;
	required: boolean;
	type: string;
	defaultValue?: any;
	options?:
		| Array<any>
		| Array<ComponentParameterOption>
		| ReadonlyArray<any>
		| ReadonlyArray<ComponentParameterOption>;
	/** Determines execution order (lower numbers run first). Defaults: Static=0, Factory=1 */
	priority?: number;
	/** If control is 'readonly', it can sync with another prop's value */
	syncWith?: string;
	value?: any;
}

export interface CodeExample {
	code: string;
	title: string;
	/** Optional: allows rendering the live code alongside the string snippet */
	render?: ReactNode;
}

export interface ActionMappingContext<T> {
	/** The current state of all props in the playground */
	props: T;
	/** The raw arguments passed from the component's callback (e.g., [event] or [index, metadata]) */
	args: any[];
}

export type ComponentParameterFactory = (props: Record<string, any>) => ComponentParameter;

export interface ComponentManifest<T = any> {
	category: "Data Display" | "Feedback" | "Inputs" | "Layout" | "Navigation";
	codeExamples: Array<CodeExample>;
	component: ComponentType<T>;
	description: string;
	name: DSComponentType;
	parameters:
		| Array<ComponentParameter | ComponentParameterFactory>
		| ReadonlyArray<ComponentParameter | ComponentParameterFactory>;
	status: "stable" | "unstable";
	actionMappings?: {
		/**
		 * Function that receives the context and returns the partial or full updated props
		 */
		[callbackName: string]: (context: ActionMappingContext<T>) => Partial<T>;
	};
	extends?: Array<DSComponentType>;
}
