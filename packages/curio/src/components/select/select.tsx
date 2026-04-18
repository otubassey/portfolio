"use client";

import { ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { Dropdown, DropdownProps } from "../dropdown";
import { Label, LabelProps } from "../label";
import { MenuItem, MenuItemProps } from "../menuItem";

const mapLabelColor = (disabled?: boolean, error?: boolean) => {
	if(disabled) return "muted";
	if(error) return "error";
	return "default";
};

export interface SelectOption {
	label: string;
	value: string;
}

export interface SelectProps {
	onChange: (value: string) => void;
	value: string;
	children?: ReactNode;
	disabled?: boolean;
	dropdownProps?: Partial<DropdownProps>
	error?: boolean;
	fullWidth?: boolean;
	label?: string;
	labelProps?: Partial<LabelProps>;
	menuItemProps?: Partial<MenuItemProps>;
	noneLabel?: boolean | string;
	options?: ReadonlyArray<SelectOption>;
	placeholder?: string;
	ref?: Ref<HTMLDivElement>;
	required?: boolean;
}

const Select = ({
	onChange,
	value,
	children,
	disabled = false,
	dropdownProps,
	error = false,
	fullWidth = false,
	label,
	labelProps,
	menuItemProps,
	noneLabel: noneLabelProp,
	options: optionsProp,
	placeholder: placeholderProp,
	ref,
	required
}: SelectProps) => {
	const options = optionsProp || [];
	const selectedOption = options.find((opt) => opt.value === value) || null;
	const noneLabel = noneLabelProp === true ? "None" : (noneLabelProp || null);
	const placeholder = placeholderProp || "Select...";
	const {className: menuItemClassName, ...otherMenuItemProps} = menuItemProps ?? {};

	return (
		<div
			ref={ref}
			className={CssUtils.mergeClasses(
				"flex flex-col gap-1.5",
				fullWidth && "w-full"
			)}>
			{label && (
			<Label
				{...labelProps}
				color={mapLabelColor(disabled, error)}
				required={required}>
				{label}
			</Label>
			)}

			<Dropdown
				{...dropdownProps}
				buttonProps={{
					...(dropdownProps?.buttonProps ?? {}),
					color: error ? "error" : "inherit"
				}}
				disabled={disabled}
				fullWidth={fullWidth}
				label={selectedOption?.label || placeholder}
				onChange={onChange}
				variant="select">

				{noneLabel && (
				<MenuItem
					{...otherMenuItemProps}
					className={menuItemClassName}
					role="option"
					selected={!value}
					value="">
					{noneLabel}
				</MenuItem>
				)}

				{children
				? children
				: (options.map(option => (
				<MenuItem
					{...otherMenuItemProps}
					key={option.label}
					className={menuItemClassName}
					role="option"
					selected={option.value === value}
					value={option.value}>
					{option.label}
				</MenuItem>
				)))}

			</Dropdown>
		</div>
	);
};

Select.displayName = "Select";

export default Select;
