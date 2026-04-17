import { useContext } from "react";

import AppDetailsContext from "./context";

const useAppDetails = () => {
	const context = useContext(AppDetailsContext);

	if(!context) {
		throw new Error("useAppDetails must be used within an AppDetailsProvider");
	}

	return context;
};

export default useAppDetails;
