"use client";

import { KeyboardEvent, MouseEvent, ReactNode, Ref } from "react";

import { useStableValue } from "../../hooks";
import { CssUtils } from "../../utils";

import { ButtonBase, ButtonBaseProps } from "../buttonBase";
import { IconName } from "../icon";
import { InputIcon } from "../inputIcon";
import { useMenu } from "../menu";
import { Typography } from "../typography";

export interface MenuItemProps extends ButtonBaseProps<"button"> {
	children: ReactNode;
	autoFocus?: boolean;
	className?: string;
	disabled?: boolean;
	divider?: boolean;
	endIcon?: ReactNode | IconName;
	onClick?: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
	ref?: Ref<HTMLButtonElement>;
	role?: "menuitem" | "option";
	selected?: boolean;
	startIcon?: ReactNode | IconName;
	value?: any;
}

const MenuItem = ({
	children,
	autoFocus = false,
	className = "",
	disabled = false,
	divider = false,
	endIcon,
	id,
	onClick,
	ref,
	role = "menuitem",
	selected: selectedProp,
	startIcon,
	value,
	...props
}: MenuItemProps) => {
	const {
		getNextIndex,
		highlightedIndex,
		menuId,
		selected: selectedMenuValue,
		handleSelect
	} = useMenu<any>();

	const index = useStableValue(getNextIndex);

	const generatedId = id || (menuId && index !== undefined ? `${menuId}-option-${index}` : undefined);
	const isHighlighted = highlightedIndex === index || autoFocus;
	const isSelected = typeof selectedProp === "boolean"
		? selectedProp
		: (value !== undefined && value === selectedMenuValue);

	const handleAction = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
		if(disabled) return;

		if(value !== undefined) {
			handleSelect(value);
		}

		onClick?.(event);
	};

	return (
		<ButtonBase
			{...props}
			ref={ref}
			aria-checked={role === "menuitem" ? isSelected : undefined}
			aria-selected={isHighlighted}
			autoFocus={autoFocus}
			className={CssUtils.mergeClasses(
				"relative flex items-center px-4 py-2 text-sm cursor-pointer outline-none transition-colors",
				"hover:bg-green-100 dark:hover:bg-gray-700. w-full",
				isHighlighted ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700",
				isSelected
					? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
					: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",

				divider && "border-b border-gray-200 dark:border-gray-700",
				className
			)}
			disabled={disabled}
			id={generatedId}
			onClick={handleAction}
			onKeyDown={(event) => event.key === "Enter" && handleAction(event)}
			role={role}
			tabIndex={(isSelected || index === 0) ? 0 : -1}>

			<InputIcon className="opacity-70 pointer-events-none" icon={startIcon} size={18} />

			<Typography
				className={CssUtils.mergeClasses(
					"flex-1 pointer-events-none",
					Boolean(startIcon) && "pl-2",
					Boolean(endIcon) && "pr-2"
				)}
				component="span"
				variant="body2"
				weight={isSelected ? "medium" : "normal"}>
				{children}
			</Typography>

			<InputIcon className="opacity-70 pointer-events-none" icon={endIcon} size={18} />

		</ButtonBase>
	);
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
