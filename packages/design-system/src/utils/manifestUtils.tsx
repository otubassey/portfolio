"use client";

import { ComponentParameter, Icon, IconName, IconProps, ICONS_NAME, TypographyColor } from "../components";

const getErrorParameterOptions = (
	options?: Omit<Options, "capitalize">
): ComponentParameter["options"] => {
	const { excludeNone = false } = options || {};
	const list = excludeNone ? [] : [NONE_OPTION];
	[
		{ label: "Sample Error", value: "This field is required." },
		{ label: "Long Error", value: "This is a longer error message to demonstrate text wrapping and layout adjustments when error messages span multiple lines." },
		{ label: "Has Error", value: true },
		{ label: "No Error", value: false }
	].forEach(error => list.push(error));

	return list;
};

const NONE_OPTION = {
	label: "None" as string,
	value: "" as string
} as const;

interface Options {
	capitalize?: boolean;
	excludeNone?: boolean;
}

interface IconConfig {
	name: IconName;
	/** If true, the value will be <Icon name={name} />, otherwise the string "name" */
	asElement?: boolean;
	label?: string;
	iconProps?: Partial<IconProps>;
}

/**
 * Generates standardized icon options for component manifests.
 */
const getIconParameterOptions = (
	icons: Array<IconConfig> | ReadonlyArray<IconConfig>,
	options?: Options
): ComponentParameter["options"] => {
	const { capitalize = false, excludeNone = false } = options || {};
	const list = excludeNone ? [] : [NONE_OPTION];
	icons.forEach(icon => {
		const label = icon.label || icon.name;
		list.push({
			label: capitalize
				? label.charAt(0).toUpperCase() + label.slice(1)
				: label,
			value: icon.asElement
				? (
				<Icon
					className="text-gray-400"
					name={icon.name}
					{...icon.iconProps}
				/>)
				: icon.name
		});
	});
	return list;
}

const getIconNames = (): string => {
	return Object.values(ICONS_NAME)
		.map(name => `'${name}'`)
		.join(" | ");
};

/**
 * Converts a list of strings into a standardized Option array for manifests.
 * Automatically capitalizes the first letter of each label.
 */
const getMappedParameterOptions = (
	values?: Array<string> | ReadonlyArray<string>,
	options?: Options
): Array<{ label: string; value: string }> => {
	const { capitalize = false, excludeNone = false } = options || {};
	const list = excludeNone ? [] : [NONE_OPTION];
	values?.forEach(value => {
		list.push({
			label: capitalize
				? value.charAt(0).toUpperCase() + value.slice(1)
				: value,
			value
		});
	});
	return list;
};

const getEnumParameterType = (
	values?: Array<string> | ReadonlyArray<string>,
	options?: Omit<Options, "excludeNone">
): string => {
	const { capitalize = false} = options || {};
	if(!values || values.length === 0) {
		return "";
	}
	return values?.map(value => (
		capitalize
			? `'${value.charAt(0).toUpperCase() + value.slice(1)}'`
			: `'${value}'`
	))
	.join(" | ");
};

const getTypographyColorOptions = (
	options?: Options
): ComponentParameter["options"] => {
	const { capitalize = false, excludeNone = false } = options || {};
	const list = excludeNone ? [] : [NONE_OPTION];
	Object.values(TypographyColor).forEach(color => {
		list.push({
			label: capitalize
				? color.charAt(0).toUpperCase() + color.slice(1)
				: color,
			value: color
		});
	});
	return list;
};


const ManifestUtils = {
	getEnumParameterType,
	getErrorParameterOptions,
	getIconNames,
	getIconParameterOptions,
	getMappedParameterOptions,
	getTypographyColorOptions
} as const;

export default ManifestUtils;
