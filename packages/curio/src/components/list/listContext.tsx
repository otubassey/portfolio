"use client";

import { createContext, useContext } from "react";

import { INITIAL_LIST_STYLE_VALUE, ListStylePosition, ListStyleType } from "./constants";

export type ListContextValue = {
    listStylePosition: typeof ListStylePosition[keyof typeof ListStylePosition];
    listStyleType: typeof ListStyleType[keyof typeof ListStyleType];
};

export const ListContext = createContext<ListContextValue>(INITIAL_LIST_STYLE_VALUE);

export const useListContext = (): ListContextValue => {
	const context = useContext<ListContextValue>(ListContext);
	if(!context) throw new Error("useListContext must be used within a List");
	return context;
};
