import { MutableRefObject, useCallback, useEffect, useMemo, useReducer } from "react";
import debounce from "debounce";

import { useRefs } from "@/ui/hooks";
import {DeviceTypes, getDeviceType} from "@/ui/utils/device/";

import {NavigationLabel} from "../navigation.constants";
import { NavigationLabelType } from "../navigation.types";

type OnNavigation = (navigationType: NavigationLabelType) => void;

type NavigationItem = {
    ref: MutableRefObject<HTMLElement> | null;
    display: boolean;
};

export type NavigationState = {
    [key in NavigationLabelType]: NavigationItem
};

type Navigation = [NavigationState, OnNavigation];

const InitialNavigationItem: NavigationItem = {
    ref: {current: null},
    display: false
} as const;

const InitialNavigationState: NavigationState = {
    [NavigationLabel.EXPERIENCES]: InitialNavigationItem,
    [NavigationLabel.HOME]: InitialNavigationItem,
    [NavigationLabel.PROJECTS]: InitialNavigationItem,
    [NavigationLabel.SETTINGS]: InitialNavigationItem,
    [NavigationLabel.SKILLS]: InitialNavigationItem
} as const;

const ReducerActionType = {
    INITIALIZE: "Initialize",
    UPDATE: "Update"
} as const;

type Payload = {
    selectedNavigation?: NavigationLabelType | null;
    refs?: MutableRefObject<HTMLElement> | null;
};

type Action = {
    type: typeof ReducerActionType[keyof typeof ReducerActionType] | null;
    payload: Payload;
};

function updateRefs(state: NavigationState, refs?: MutableRefObject<HTMLElement> | null): NavigationState {
    if(refs?.current) {
        return {
            ...state,
            [NavigationLabel.EXPERIENCES]: {...state[NavigationLabel.EXPERIENCES], ref: {current: refs.current[NavigationLabel.EXPERIENCES]}},
            [NavigationLabel.HOME]: {...state[NavigationLabel.HOME], ref: {current: refs.current[NavigationLabel.HOME]}},
            [NavigationLabel.PROJECTS]: {...state[NavigationLabel.PROJECTS], ref: {current: refs.current[NavigationLabel.PROJECTS]}},
            [NavigationLabel.SKILLS]: {...state[NavigationLabel.SKILLS], ref: {current: refs.current[NavigationLabel.SKILLS]}}
        };
    }
    return state;
}

function updateState(state: NavigationState, selectedNavigation?: NavigationLabelType | null): NavigationState {
    const toggleDisplay = (label: NavigationLabelType) => ({
        ...state,
        [NavigationLabel.EXPERIENCES]: {...state[NavigationLabel.EXPERIENCES], display: NavigationLabel.EXPERIENCES === label},
        [NavigationLabel.HOME]: {...state[NavigationLabel.HOME], display: NavigationLabel.HOME === label},
        [NavigationLabel.PROJECTS]: {...state[NavigationLabel.PROJECTS], display: NavigationLabel.PROJECTS === label},
        [NavigationLabel.SETTINGS]: {...state[NavigationLabel.SETTINGS], display: NavigationLabel.SETTINGS === label},
        [NavigationLabel.SKILLS]: {...state[NavigationLabel.SKILLS], display: NavigationLabel.SKILLS === label}
    });

    if(NavigationLabel.EXPERIENCES === selectedNavigation) {
        return toggleDisplay(NavigationLabel.EXPERIENCES);
    }
    if(NavigationLabel.HOME === selectedNavigation) {
        return toggleDisplay(NavigationLabel.HOME);
    }
    if(NavigationLabel.PROJECTS === selectedNavigation) {
        return toggleDisplay(NavigationLabel.PROJECTS);
    }
    if(NavigationLabel.SETTINGS === selectedNavigation) {
        // Since the settings modal can be displayed over any selected nav, 
        // this toggles its display state while preserving the currently displayed nav'd to section
        const toggledDisplay = !state[NavigationLabel.SETTINGS].display;
        return {
            ...state,
            [NavigationLabel.SETTINGS]: {...state[NavigationLabel.SETTINGS], display: toggledDisplay}
        };
    }
    if(NavigationLabel.SKILLS === selectedNavigation) {
        return toggleDisplay(NavigationLabel.SKILLS);
    }
    return state;
}

function reducer(currentState: NavigationState, {type, payload}: Action): NavigationState {
    switch(type) {
        case ReducerActionType.INITIALIZE: {
            const withUpdatedInitialState = updateState(currentState, payload?.selectedNavigation);
            return updateRefs(withUpdatedInitialState, payload?.refs);
        }
        case ReducerActionType.UPDATE: {
            const result = updateState(currentState, payload?.selectedNavigation);
            return result;
        }
        default:
            throw Error("Unknown navigation action: " + type);
    }
}

/**
 * This is a React Hook that handles navigation for this application (for both mobile and non-mobile screens). Navigation is handled differently in 
 * mobile and non-mobile screens.
 * 
 * In non-mobile screens, navigation buttons are used to determine what information section needs to be displayed or hidden. The name of the section
 * is used as an identifier to help make that determination.
 * 
 * In mobile screens, there are two ways to navigate through the different sections
 * 1. scrolling
 * 2. FAB
 * 
 * There are currenly 5 navigation use-cases that are being handled by this hook:
 * 1. Mobile screen navigation (through the FAB) - the ref for each section is used to scroll the desired section into view
 * 2. Non-Mobile screen navigation through the nav buttons - the name for each section is used to hide/show the desired section
 * 3. A toggle between both screen types - this makes sure the user is navigated to whatever section they were at. To achieve that,
 *                                         both the ref and name are used
 *
 * @param initialNavigation - The value you want the navigation state to be initially. It can either be of type 
 *                            `null` or {@link NavigationLabelType}. This argument is ignored after the initial render.
 * @returns an array with exactly 2 values:
 * 1. The navigation handler
 * 2. 
 */

// (index: number | string) => (element: ReactNode) => void
function useNavigation(initialNavigation: NavigationLabelType | null): [MutableRefObject<{[key in NavigationLabelType]: HTMLElement}>, Navigation] {
    const [refs, setRefs] = useRefs({} as Record<NavigationLabelType, HTMLElement>);
    const [state, dispatcher] = useReducer(reducer, InitialNavigationState);

    const [navigationLabel, navigationItem]: [string | NavigationLabelType, NavigationItem] = useMemo(() => (
        Object.entries<NavigationItem>(state)
            .find((entry) => entry[0] !== NavigationLabel.SETTINGS && entry[1].display) ?? [null, null]
    ), [state]);

    // responsible for scrolling elements into view in mobile devices
    const scrollIntoView = useCallback((element: HTMLElement) => {
        const deviceType = getDeviceType();
        const isMobile = deviceType === DeviceTypes.MOBILE;
        if(isMobile && element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    const navigate = useCallback((selectedNavigationType: NavigationLabelType | null) => {
        dispatcher({type: ReducerActionType.UPDATE, payload: {selectedNavigation: selectedNavigationType}});
        scrollIntoView(refs.current?.[selectedNavigationType]);
    }, [refs, scrollIntoView]);

    useEffect(() => {
        dispatcher({type: ReducerActionType.INITIALIZE, payload: {refs, selectedNavigation: initialNavigation}});
    }, [initialNavigation, refs]);

    useEffect(() => {
        const debouncedResizeHandler = debounce(() => {
            scrollIntoView(navigationItem?.ref?.current);
        }, 500);
        const handleResize = () => {
            const deviceType = getDeviceType();
            const isMobile = deviceType === DeviceTypes.MOBILE;
            if(isMobile) {
                debouncedResizeHandler();
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return [setRefs, [state, navigate]];
}

export default useNavigation;
