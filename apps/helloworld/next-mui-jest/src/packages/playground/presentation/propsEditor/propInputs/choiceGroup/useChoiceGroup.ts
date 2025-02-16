"use client";

import { useContext } from "react";
import ChoiceGroupContext from "./choiceGroupContext";

function useChoiceGroup() {
    return useContext(ChoiceGroupContext);
}

export default useChoiceGroup