"use client";

import { useContext } from "react";

import AppContext from "./context";

const useApplicationContext = () => {
	const context = useContext(AppContext);

	if(!context) {
		throw new Error("useApplicationContext must be used within an AppContextProvider");
	}

	return context;
};

export default useApplicationContext;
