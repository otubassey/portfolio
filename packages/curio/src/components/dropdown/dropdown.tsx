"use client";

import { Children, KeyboardEvent, ReactElement, ReactNode, Ref, useId, useRef, useState } from "react";

import { useToggle } from "../../hooks";
import { CssUtils } from "../../utils";

import { Button, ButtonProps } from "../button";
import { Icon } from "../icon";
import { Menu, MenuProps } from "../menu";
import { MenuItemProps } from "../menuItem";
import { Typography } from "../typography";

export type DropdownVariant = "menu" | "select";

export interface DropdownProps {
	children: ReactNode;
	label: ReactNode;
	buttonProps?: Partial<ButtonProps>;
	className?: string;
	disabled?: boolean;
	fullWidth?: boolean;
	menuProps?: Partial<MenuProps>;
	onChange?: (value: string) => void;
	ref?: Ref<HTMLDivElement>;
	variant?: DropdownVariant;
}

const Dropdown = ({
	children,
	label,
	buttonProps,
	className,
	disabled,
	fullWidth,
	menuProps,
	onChange,
	ref,
	variant = "menu"
}: DropdownProps) => {
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const [isOpen, toggleIsOpen] = useToggle(false);

	const menuId = useId();
	const triggerId = useId();

	const items = Children.toArray(children);
	const {className: menuClassName, ...restMenuProps} = menuProps || {};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if(disabled) return;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				if(!isOpen) {
					toggleIsOpen(true);
				}
				setHighlightedIndex((previousHighlightedIndex) => (
					previousHighlightedIndex < items.length - 1
						? previousHighlightedIndex + 1
						: 0
				));
				break;
			case "ArrowUp":
				event.preventDefault();
				if(!isOpen) {
					toggleIsOpen(true);
				}
				setHighlightedIndex((previousHighlightedIndex) => (
					previousHighlightedIndex > 0
						? previousHighlightedIndex - 1
						: items.length - 1
				));
				break;
			case "Enter":
			case " ":
				event.preventDefault();
				if(!isOpen) {
					toggleIsOpen(true);
				} else if(event.key === "Enter" &&  highlightedIndex >= 0) {
					// Logic to select the highlighted item
					const item = items[highlightedIndex] as ReactElement<MenuItemProps>;
					if(item.props.value !== undefined) {
						handleSelect(item.props.value);
					}
				}
				break;
			case "Escape":
				handleClose();
				break;
		}
	};

	const handleClose = () => {
		toggleIsOpen(false);
		setHighlightedIndex(-1);
	};

	const handleOpen = () => {
		if(disabled) {
			return;
		}
		toggleIsOpen(previous => !previous);
	};

	const handleSelect = (newValue: string) => {
		onChange?.(newValue);
		toggleIsOpen(false);
	};

	const activeDescendantId = highlightedIndex >= 0
		? `${menuId}-option-${highlightedIndex}`
		: undefined;

	return (
		<div
			ref={ref}
			className={CssUtils.mergeClasses(
				"relative",
				fullWidth && "w-full",
				className
			)}>
			<Button
				{...buttonProps}
				ref={anchorRef}
				aria-activedescendant={activeDescendantId}
				aria-controls={menuId}
				aria-expanded={isOpen}
				aria-haspopup={variant === "select" ? "listbox" : "menu"}
				disabled={disabled}
				endIcon={
					<Icon
						name="chevron-down"
						className={CssUtils.mergeClasses(
							"transition-transform duration-200",
							"text-black dark:text-white",
							isOpen && "rotate-180"
						)}
					/>
				}
				fullWidth={fullWidth}
				id={triggerId}
				onClick={handleOpen}
				onKeyDown={handleKeyDown}
				role={variant === "select" ? "combobox" : "button"}
				textTransform="none">
				<Typography
					className="justify-between"
					component="span"
					variant="body2"
					weight="medium">
					{label}
				</Typography>
			</Button>

			<Menu
				{...restMenuProps}
				aria-labelledby={triggerId}
				anchorRef={anchorRef}
				className={CssUtils.mergeClasses(
					menuClassName
				)}
				highlightedIndex={highlightedIndex}
				id={menuId}
				onChange={handleSelect}
				onClose={handleClose}
				onHighlightedIndexChange={setHighlightedIndex}
				open={isOpen}
				role={variant === "select" ? "listbox" : "menu"}>
				{children}
			</Menu>
		</div>
	);
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
