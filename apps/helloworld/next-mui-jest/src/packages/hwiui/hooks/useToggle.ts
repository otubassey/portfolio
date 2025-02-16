"use client";

import { Dispatch, ReducerAction, ReducerState, useReducer } from "react";

type State<S, A> = (prevState: S, action?: A) => S;

function toggleReducer(currentState: boolean, newValue?: any) {
    return typeof newValue === "boolean" ? newValue : !currentState;
}

function useToggle(initialState?: boolean): [ReducerState<State<boolean, any>>, Dispatch<ReducerAction<State<boolean, any>>>] {
    return useReducer<State<boolean, any>>(toggleReducer, Boolean(initialState));
}

export default useToggle;
