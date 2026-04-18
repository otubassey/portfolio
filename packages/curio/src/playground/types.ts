export interface Example<T> {
	name: string;
	description?: string;
	props: T;
	code?: string;
}

export interface PropDefinition {
	name: string;
	type: "string" | "number" | "boolean" | "select" | "color";
	defaultValue: any;
	options?: any[]; // For select type
	description?: string;
}
