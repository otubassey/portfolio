"use client";

import { createContext } from "react";

export interface MenuContextType<T> {
	getNextIndex: () => number;
	handleHighlightedIndexChange: (index: number) => void;
	handleSelect: (value: T) => void;
	highlightedIndex: number;
	selected: T | undefined;
	menuId?: string;
}

const MenuContext = createContext<MenuContextType<any> | null>(null);

export default MenuContext;
