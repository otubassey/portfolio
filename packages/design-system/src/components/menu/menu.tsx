"use client";

import { AriaRole, CSSProperties, HTMLAttributes, ReactNode, RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useFloatingElement } from "../../hooks";
import { CssUtils } from "../../utils";

import MenuProvider from "./menuProvider";

export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
	anchorRef: RefObject<HTMLElement | null>;
	children: ReactNode;
	onChange: (value: any) => void;
	onClose: () => void;
	onHighlightedIndexChange: (index: number) => void;
	open: boolean;
	className?: string;
	highlightedIndex?: number;
	ref?: RefObject<HTMLUListElement>;
	role?: "menu" | "listbox";
	style?: CSSProperties;
}

const Menu = ({
	anchorRef,
	children,
	id,
	onChange,
	onClose,
	onHighlightedIndexChange,
	open = false,
	className = "",
	highlightedIndex = -1,
	defaultValue,
	ref: externalRef,
	role = "menu",
	style: styleProp,
	...props
}: MenuProps) => {
	const internalRef = useRef<HTMLUListElement>(null);
	const menuRef = (externalRef as RefObject<HTMLUListElement | null>) || internalRef;

	const { style: listStyle } = useFloatingElement(anchorRef, {
		isOpen: Boolean(open),
		offset: 4,
		type: "menu"
	});

	useEffect(() => {
		if(!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const anchorElement = anchorRef.current;
			// Close if click is NOT on the menu and NOT on the trigger button
			if(menuRef.current && !menuRef.current.contains(target) &&
				anchorElement && !anchorElement.contains(target)) {
				onClose?.();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open, onClose, anchorRef, menuRef]);

	if(!open) return null;

	const menuContent = (
		<MenuProvider
			highlightedIndex={highlightedIndex}
			initialValue={defaultValue}
			menuId={id}
			onChange={onChange}
			onHighlightedIndexChange={onHighlightedIndexChange}>

			<ul
				{...props}
				ref={menuRef}
				className={CssUtils.mergeClasses(
					"z-ps-menu min-w-[160px] py-1 bg-white dark:bg-gray-800 border border-gray-200",
					"dark:border-gray-700 rounded-lg shadow-lg overflow-hidden",
					"animate-in fade-in zoom-in-95 duration-100",
					className
				)}
				role={(role === "listbox" ? "listbox" : "menu") as AriaRole}
				style={{
					...listStyle,
					...styleProp,
					boxSizing: "border-box", // Prevents border/padding from growing beyond anchor width
					maxHeight: "80vh",
					overflowY: "auto"
				}}>

				{children}

			</ul>
		</MenuProvider>
	);

	return createPortal(menuContent, document.body);
};

Menu.displayName = "Menu";

export default Menu;
