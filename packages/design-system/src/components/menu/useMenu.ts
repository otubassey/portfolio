"use client";

import { useContext } from "react";

import MenuContext, { MenuContextType } from "./context";

const useMenu = <T>() => {
	const context = useContext(MenuContext);

	if(!context) {
		throw new Error("useMenu must be used within a MenuProvider");
	}

	return context as MenuContextType<T>;
};

export default useMenu;
