"use client";

import {
	ComponentPropsWithRef,
	ElementType,
	isValidElement,
	MouseEvent,
	MouseEventHandler,
	ReactNode,
	Ref,
	useCallback
} from "react";

import { IconName } from "../icon";
import { IconButton, IconButtonProps } from "../iconButton";

type ToggleIconButtonOwnProps<T extends ElementType = "button"> =
	Omit<IconButtonProps<T>, "icon" | "onClick" | "children">
	& {
		checkedIcon: IconName | ReactNode;
		icon: IconName | ReactNode;
		onToggle: () => void;
		checked?: boolean;
		onClick?: MouseEventHandler<any>;
		ref?: Ref<any>;
	};

export type ToggleIconButtonProps<T extends ElementType> = ToggleIconButtonOwnProps<T> &
    Omit<ComponentPropsWithRef<T>, keyof ToggleIconButtonOwnProps<T>>;

const ToggleIconButton = <T extends ElementType = "button">({
	checkedIcon,
	icon,
	onToggle,
	"aria-label": ariaLabel = "Toggle button",
	checked = false,
	onClick,
	ref,
	...props
}: ToggleIconButtonProps<T>) => {
	const handleClick = useCallback((event: MouseEvent<any>) => {
		onClick?.(event);
		onToggle();
	}, [checked, onClick, onToggle]);

	const activeIcon = checked ? (checkedIcon || icon) : icon;

	return (
		<IconButton
			ref={ref}
			aria-label={ariaLabel}
			aria-pressed={checked}
			icon={typeof activeIcon === "string" ? activeIcon as IconName : undefined}
			onClick={handleClick}
			{...props}>
			{isValidElement(activeIcon) ? activeIcon : null}
		</IconButton>
	);
};

ToggleIconButton.displayName = "ToggleIconButton";

export default ToggleIconButton;
