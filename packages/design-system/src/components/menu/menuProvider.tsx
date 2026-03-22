"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import MenuContext from "./context";

interface MenuProviderProps<T> {
	children: ReactNode;
	highlightedIndex?: number;
	initialValue?: T;
	menuId?: string;
	onChange: (value: T) => void;
	onHighlightedIndexChange: (index: number) => void;
}

export function MenuProvider<T>({
	children,
	highlightedIndex = -1,
	initialValue,
	menuId,
	onChange,
	onHighlightedIndexChange
}: MenuProviderProps<T>) {
	const itemCountRef = useRef(0);
	const [selected, setSelected] = useState<T | undefined>(initialValue);

	const getNextIndex = useCallback(() => {
		const current = itemCountRef.current;
		itemCountRef.current += 1;
		return current;
	}, []);

	const handleSelect = (value: T) => {
		setSelected(value);
		onChange?.(value);
	};

	useEffect(() => {
		itemCountRef.current = 0;
	}, [children]);

	return (
		<MenuContext value={{
			getNextIndex,
			highlightedIndex,
			menuId,
			selected,
			handleHighlightedIndexChange: onHighlightedIndexChange,
			handleSelect}}>

			{children}

		</MenuContext>
	);
}

export default MenuProvider;
