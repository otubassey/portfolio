"use client";

import { useContext } from "react";

import NavigationContext from "./context";

const useNavigation = () => {
	const context = useContext(NavigationContext);

	if(!context) {
		throw new Error("useNavigation must be used within an NavigationContextProvider");
	}

	return context;
};

export default useNavigation;
