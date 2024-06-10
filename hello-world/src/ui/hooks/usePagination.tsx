import { Dispatch, Reducer, useCallback, useEffect, useReducer } from "react";

const Defaults = {
    INITIAL_INDEX: 0,
    ITEM_COUNT: 0,
    ITEMS_PER_PAGE: 1,
    PAGE_NUMBER: 1
} as const;

export type Page = {
    count: number;
    current: number;
};

export type Pagination = {
    endIndex: number;
    page: Page;
    startIndex: number;
};

type State = Pagination & {
    itemCount: number;
};

const getInitialState = (itemCount: number, itemsPerPage: number): State => {
    const count = Math.max(Math.ceil(itemCount / itemsPerPage), Defaults.PAGE_NUMBER);
    const {currentPage, endIndex, startIndex} = calculatePagination({current: Defaults.PAGE_NUMBER, count}, itemsPerPage).initial();
    return ({
        endIndex,
        itemCount,
        page: {
            count,
            current: currentPage
        },
        startIndex
    });
};

export const ACTIONS = {
    PREVIOUS: "Previous",
    NEXT: "Next",
    RESET: "Reset"
} as const;

export type PaginationDispatcherAction = {
    type: typeof ACTIONS[keyof typeof ACTIONS];
    itemCount?: number;
    itemsPerPage?: number;
};

type PaginationIndexes = {
    currentPage: number;
    endIndex: number;
    startIndex: number;
};

function calculatePagination(page: Page, itemsPerPage: number) {
    return {
        increment: (upperBoundValue: number): PaginationIndexes => {
            const newCurrentPage = (page.current + 1) > page.count
                ? page.count
                : page.current + 1;
            const startIndex = Math.max(newCurrentPage - 1, Defaults.INITIAL_INDEX) * itemsPerPage;
            return ({
                currentPage: newCurrentPage,
                endIndex: Math.min(startIndex + itemsPerPage, upperBoundValue),
                startIndex
            });
        },
        decrement: (lowerBoundValue: number): PaginationIndexes => {
            const newCurrentPage = (page.current - 1) < lowerBoundValue
                ? lowerBoundValue
                : page.current - 1;
            const startIndex = Math.max(newCurrentPage - 1, Defaults.INITIAL_INDEX) * itemsPerPage;
            return ({
                currentPage: newCurrentPage,
                endIndex: Math.max(startIndex + itemsPerPage, lowerBoundValue),
                startIndex
            });
        },
        initial: (): PaginationIndexes => {
            const pageIndex = Math.max(page.current - 1, Defaults.INITIAL_INDEX);
            const startIndex = pageIndex * itemsPerPage;
            return ({
                currentPage: page.current,
                endIndex: startIndex + itemsPerPage,
                startIndex
            });
        }
    };
}

function paginationReducer(currentState: State, {type, itemCount, itemsPerPage}: PaginationDispatcherAction): State {
    if(type === ACTIONS.PREVIOUS) {
        const {currentPage, endIndex, startIndex} = calculatePagination(currentState.page, itemsPerPage).decrement(Defaults.PAGE_NUMBER);
        return {
            ...currentState,
            endIndex,
            startIndex,
            page: {
                ...currentState.page,
                current: currentPage
            }
        };
    }
    if(type === ACTIONS.NEXT) {
        const {currentPage, endIndex, startIndex} = calculatePagination(currentState.page, itemsPerPage).increment(itemCount);
        return {
            ...currentState,
            endIndex,
            startIndex,
            page: {
                ...currentState.page,
                current: currentPage
            }
        };
    }
    if(type === ACTIONS.RESET) {
        return getInitialState(itemCount, itemsPerPage);
    }
    return currentState;
}

function usePagination(itemCount?: number, itemsPerPage?: number): [Pagination, Dispatch<PaginationDispatcherAction>] {
    const itemsInPageCount = itemsPerPage ?? Defaults.ITEMS_PER_PAGE;
    const itemSize = itemCount ?? Defaults.ITEM_COUNT;
    const [state, dispatcher] = useReducer<Reducer<State, PaginationDispatcherAction>>(paginationReducer, getInitialState(itemSize, itemsInPageCount));

    useEffect(() => {
        dispatcher({type: ACTIONS.RESET, itemCount: itemSize, itemsPerPage: itemsInPageCount});
    }, [itemSize, itemsInPageCount]);

    const handler = useCallback((action: PaginationDispatcherAction) => {
        dispatcher({...action, itemCount: itemSize, itemsPerPage: itemsInPageCount});
    }, [itemSize, itemsInPageCount]);

    return [state, handler];
}

export default usePagination;
