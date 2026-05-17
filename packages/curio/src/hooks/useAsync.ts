"use client";

import { useReducer, useEffect, useCallback } from "react";

import { BaseError, FalloutError } from "@otuekong-portfolio/common";

import useIsMounted from "./useIsMounted";

interface AsyncState<T> {
	/** Whether the async operation is currently in progress */
	isLoading: boolean;
	/** Error object if the operation failed, null otherwise */
	error: BaseError | null;
	/** Data returned from the async operation, null if not yet successful */
	data: T | null;
}

enum AsyncActionType {
	PENDING = "PENDING",
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
}

type AsyncAction<T> =
	| { type: AsyncActionType.PENDING }
	| { type: AsyncActionType.SUCCESS; payload: T }
	| { type: AsyncActionType.ERROR; payload: BaseError };

interface UseAsyncOptions<P extends any[]> {
	/** Whether to require manual execution. Defaults to false (auto-runs on mount). */
	manual?: boolean;
	/** Parameters to pass when auto-running on mount. Only used when manual is false. */
	initialParams?: P;
}

interface UseAsyncReturn<T, P extends Array<any>> extends AsyncState<T> {
	/** Function to manually execute the async operation */
	execute: (...params: P) => void;
}

function asyncReducer<T>(state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> {
	switch (action.type) {
		case AsyncActionType.PENDING:
			return {
				isLoading: true,
				data: null,
				error: null
			};
		case AsyncActionType.SUCCESS:
			return {
				data: action.payload,
				error: null,
				isLoading: false
			};
		case AsyncActionType.ERROR:
			return {
				error: action.payload,
				data: null,
				isLoading: false
			};
		default:
			return state;
	}
}

const INITIAL_STATE: AsyncState<any> = {
	data: null,
	error: null,
	isLoading: false
} as const;

function useAsync<T, P extends Array<any> = []>(
	asyncFunction: (...params: P) => Promise<T>,
	options: UseAsyncOptions<P> = {}
): UseAsyncReturn<T, P> {
	const [state, dispatch] = useReducer(asyncReducer<T>, INITIAL_STATE);

	const isMounted = useIsMounted();

	const { initialParams, manual = false } = options;

  	const execute = useCallback((...params: P): void => {
    	dispatch({ type: AsyncActionType.PENDING });

	    asyncFunction(...params)
			.then((response) => {
				if(isMounted.current) {
					dispatch({ type: AsyncActionType.SUCCESS, payload: response });
				}
			})
			.catch((error) => {
				if(!isMounted.current) return;

				let errorPayload: BaseError;

				if(error instanceof BaseError) {
					errorPayload = error;
				} else if(error instanceof Error) {
					errorPayload = new FalloutError(error.message);
				} else {
					errorPayload = new FalloutError(String(error));
				}

				dispatch({ type: AsyncActionType.ERROR, payload: errorPayload });
			});
    }, [asyncFunction, isMounted]);

	useEffect(() => {
		if(!manual) {
			if(initialParams) {
				execute(...initialParams);
			} else {
				execute(...([] as unknown as P));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialParams, manual]);

	return {
		data: state.data,
		error: state.error,
		execute,
		isLoading: state.isLoading
	};
}

useAsync.displayName = "useAsync";

export default useAsync;
