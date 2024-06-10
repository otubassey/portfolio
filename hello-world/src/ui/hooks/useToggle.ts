import { Reducer, useReducer } from "react";

function toggleReducer(currentState: boolean, newValue: any) {
    return typeof newValue === "boolean" ? newValue : !currentState;
}

function useToggle(initialValue?: boolean) {
    return useReducer<Reducer<boolean, any>>(toggleReducer, Boolean(initialValue));
}

export default useToggle;
