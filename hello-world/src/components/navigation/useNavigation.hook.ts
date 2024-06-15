import { MutableRefObject, ReactNode, useCallback, useEffect, useReducer } from "react";
import debounce from "debounce";

import { useRefs } from "@/ui/hooks";

import {NAVIGATION} from "./navigation.constants";
import { NavigationType } from "./navigation.types";

type OnNavigation = (navigationType: NavigationType) => void;

export type NavigationState = {
    [key in NavigationType]: {
        ref: MutableRefObject<HTMLElement> | null,
        display: boolean
    }
};

type OnScrollNavigation = (navigation: NavigationState) => void;

type Navigation = [NavigationState, (index: number | string) => (element: ReactNode) => void];

const INITIAL_NAVIGATION_STATE: NavigationState = {
    [NAVIGATION.EXPERIENCES]: {
        ref: {current: null},
        display: false
    },
    [NAVIGATION.HOME]: {
        ref: {current: null},
        display: false
    },
    [NAVIGATION.PROJECTS]: {
        ref: {current: null},
        display: false
    },
    [NAVIGATION.SETTINGS]: {
        ref: {current: null},
        display: false
    },
    [NAVIGATION.SKILLS]: {
        ref: {current: null},
        display: false
    }
} as const;

const Actions = {
    INITIALIZE: "Initialize",
    UPDATE: "Update"
} as const;

type Payload = {
    selectedNavigation?: NavigationType | null;
    refs?: MutableRefObject<HTMLElement> | null;
};

type Action = {
    type: typeof Actions[keyof typeof Actions] | null;
    payload: Payload;
};

function updateRefs(state: NavigationState, refs?: MutableRefObject<HTMLElement> | null): NavigationState {
    if(refs?.current) {
        return {
            ...state,
            [NAVIGATION.EXPERIENCES]: {...state[NAVIGATION.EXPERIENCES], ref: {current: refs.current[NAVIGATION.EXPERIENCES]}},
            [NAVIGATION.HOME]: {...state[NAVIGATION.HOME], ref: {current: refs.current[NAVIGATION.HOME]}},
            [NAVIGATION.PROJECTS]: {...state[NAVIGATION.PROJECTS], ref: {current: refs.current[NAVIGATION.PROJECTS]}},
            [NAVIGATION.SKILLS]: {...state[NAVIGATION.SKILLS], ref: {current: refs.current[NAVIGATION.SKILLS]}}
        };
    }
    return state;
}

function updateState(state: NavigationState, selectedNavigation?: NavigationType | null): NavigationState {
    if(NAVIGATION.EXPERIENCES === selectedNavigation) {
        return {
            ...state,
            [NAVIGATION.EXPERIENCES]: {...state[NAVIGATION.EXPERIENCES], display: true},
            [NAVIGATION.HOME]: {...state[NAVIGATION.HOME], display: false},
            [NAVIGATION.PROJECTS]: {...state[NAVIGATION.PROJECTS], display: false},
            [NAVIGATION.SETTINGS]: {...state[NAVIGATION.SETTINGS], display: false},
            [NAVIGATION.SKILLS]: {...state[NAVIGATION.SKILLS], display: false}
        };
    }
    if(NAVIGATION.HOME === selectedNavigation) {
        return {
            ...state,
            [NAVIGATION.EXPERIENCES]: {...state[NAVIGATION.EXPERIENCES], display: false},
            [NAVIGATION.HOME]: {...state[NAVIGATION.HOME], display: true},
            [NAVIGATION.PROJECTS]: {...state[NAVIGATION.PROJECTS], display: false},
            [NAVIGATION.SETTINGS]: {...state[NAVIGATION.SETTINGS], display: false},
            [NAVIGATION.SKILLS]: {...state[NAVIGATION.SKILLS], display: false}
        };
    }
    if(NAVIGATION.PROJECTS === selectedNavigation) {
        return {
            ...state,
            [NAVIGATION.EXPERIENCES]: {...state[NAVIGATION.EXPERIENCES], display: false},
            [NAVIGATION.HOME]: {...state[NAVIGATION.HOME], display: false},
            [NAVIGATION.PROJECTS]: {...state[NAVIGATION.PROJECTS], display: true},
            [NAVIGATION.SETTINGS]: {...state[NAVIGATION.SETTINGS], display: false},
            [NAVIGATION.SKILLS]: {...state[NAVIGATION.SKILLS], display: false}
        };
    }
    if(NAVIGATION.SETTINGS === selectedNavigation) {
        // Since the settings modal can be displayed over any selected nav, 
        // this toggles its display state while preserving the currently displayed nav'd to section
        const toggledDisplay = !state[NAVIGATION.SETTINGS].display;
        return {
            ...state,
            [NAVIGATION.SETTINGS]: {...state[NAVIGATION.SETTINGS], display: toggledDisplay}
        };
    }
    if(NAVIGATION.SKILLS === selectedNavigation) {
        return {
            ...state,
            [NAVIGATION.EXPERIENCES]: {...state[NAVIGATION.EXPERIENCES], display: false},
            [NAVIGATION.HOME]: {...state[NAVIGATION.HOME], display: false},
            [NAVIGATION.PROJECTS]: {...state[NAVIGATION.PROJECTS], display: false},
            [NAVIGATION.SETTINGS]: {...state[NAVIGATION.SETTINGS], display: false},
            [NAVIGATION.SKILLS]: {...state[NAVIGATION.SKILLS], display: true}
        };
    }
    return state;
}

function reducer(currentState: NavigationState, {type, payload}: Action): NavigationState {
    switch(type) {
        case Actions.INITIALIZE: {
            const withUpdatedInitialState = updateState(currentState, payload?.selectedNavigation);
            return updateRefs(withUpdatedInitialState, payload?.refs);
        }
        case Actions.UPDATE: {
            const result = updateState(currentState, payload?.selectedNavigation);
            return result;
        }
        default:
            throw Error("Unknown navigation action: " + type);
    }
}

function useNavigation(initialNavigation: NavigationType | null, onScrollIntoView: (val: string) => void): [OnNavigation, Navigation] {
    const [refs, setRefs] = useRefs({} as Record<NavigationType, HTMLElement>);
    const [state, dispatcher] = useReducer(reducer, INITIAL_NAVIGATION_STATE);

    const navigate: OnNavigation = useCallback((selectedNavigation: NavigationType | null) => {
        dispatcher({type: Actions.UPDATE, payload: {selectedNavigation}});
    }, []);

    const scrollIntoView: OnScrollNavigation = useCallback((navigationState: NavigationState) => {
        const [name, selectedNavigationValue] = Object.entries(navigationState)
            .find(([navigation, value]) => navigation !== NAVIGATION.SETTINGS && value.display);

        if(selectedNavigationValue.ref?.current) {
            selectedNavigationValue.ref.current.scrollIntoView({ behavior: "smooth" });
            onScrollIntoView?.(name);
        }
    }, [onScrollIntoView]);

    useEffect(() => {
        dispatcher({type: Actions.INITIALIZE, payload: {refs, selectedNavigation: initialNavigation}});
    }, [initialNavigation, refs]);

    useEffect(() => {
        if(state !== INITIAL_NAVIGATION_STATE) {
            scrollIntoView(state);
        }
    }, [state]);

    useEffect(() => {
        const debouncedResizeHandler = debounce(() => {
            scrollIntoView(state);
        }, 500);
        const handleResize = () => {
            debouncedResizeHandler();
        };
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize);
    }, [state]);

    return [navigate, [state, setRefs]];
}

export default useNavigation;
