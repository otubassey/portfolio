"use client";

import { withDisplayName } from "@/ui/decorator";
import { ICON_NAMES } from "@/ui/widgets/icon";
import IconButton from "@/ui/widgets/icon/iconButton";
import { memo, ReactElement, Reducer, SyntheticEvent, useCallback, useEffect, useReducer } from "react";

export const ON_CHANGE_STATUS = Object.freeze({
    PAUSE: "pause",
    PLAY: "play",
    RESTART: "restart"
});

const STATUS = Object.freeze({
    NEXT: "next",
    NONE: "none",
    PAUSE: "pause",
    PLAY: "play",
    PREVIOUS: "previous",
    RESTART: "restart",
    STOP: "stop"
});

export type ControllerStatus = typeof STATUS[keyof typeof STATUS];
export type ControllerOnChangeStatus = typeof ON_CHANGE_STATUS[keyof typeof ON_CHANGE_STATUS];

type State = {
    showPause: boolean;
    showPlay: boolean;
    showRestart: boolean;
    status: ControllerStatus;
};

const INITIAL_CONTROLLER_STATE: State = {
    showPause: false,
    showPlay: true,
    showRestart: false,
    status: STATUS.NONE
} as const;

function controllerStateReducer(previousState: State, action: ControllerStatus): State {
    if(action === STATUS.PREVIOUS) {
        // clicking this should do the ff:
        // 1. it should go to the previous staggered display
        // 2. should display the pause button
        return {...previousState, status: STATUS.PREVIOUS, showPause: true, showPlay: false, showRestart: false};
    }
    if(action === STATUS.NEXT) {
        // clicking this should do the ff:
        // 1. it should go to the next staggered display
        // 2. should display the pause button
        return {...previousState, status: STATUS.NEXT, showPause: true, showPlay: false, showRestart: false};
    }
    if(action === STATUS.NONE) {
        return INITIAL_CONTROLLER_STATE;
    }
    if(action === STATUS.PAUSE) {
        // clicking this should do the ff:
        // 1. it should pause the staggered display
        // 2. should display the play button
        return {...previousState, status: STATUS.PAUSE, showPause: false, showPlay: true, showRestart: false};
    }
    if(action === STATUS.PLAY) {
        // clicking this should do the ff:
        // 1. it should go to the next staggered display
        // 2. should display the pause button
        return {...previousState, status: STATUS.PLAY, showPause: true, showPlay: false, showRestart: false};
    }
    if(action === STATUS.RESTART) {
        // clicking this should do the ff:
        // 1. it should restart the tween
        // 2. the pause button should be displayed
        return {...previousState, status: STATUS.RESTART, showPause: true, showPlay: false, showRestart: false};
    }
    if(action === STATUS.STOP) {
        // clicking this should do the ff:
        // 1. it should stop/kill the tween
        // 2. the restart button should be displayed
        return {...previousState, status: STATUS.STOP, showPause: false, showPlay: false, showRestart: true};
    }
    return previousState;
}

type OnControllerHandler = (event: SyntheticEvent<HTMLElement, Event>) => void;

type OnControllerChangeHandler = (event: SyntheticEvent<HTMLElement, Event>, status: ControllerOnChangeStatus) => void;

type ControllerProps = {
    active: boolean;
    onPrevious?: OnControllerHandler;
    onChange?: OnControllerChangeHandler;
    onNext?: OnControllerHandler;
    // onStop?: UIEventHandler<HTMLButtonElement>;
    status?: ControllerStatus;
};

function Controller({active = false, onPrevious, onChange, onNext}: ControllerProps): ReactElement<ControllerProps> {
    const [controllerState, dispatchControllerStateChange] = useReducer<Reducer<State, ControllerStatus>>(controllerStateReducer, INITIAL_CONTROLLER_STATE);

    const handlePreviousClick = useCallback((event: SyntheticEvent<HTMLElement, Event>) => {
        dispatchControllerStateChange(STATUS.PREVIOUS);
        onPrevious?.(event);
    }, [onPrevious]);
    const handleNextClick = useCallback((event: SyntheticEvent<HTMLElement, Event>) => {
        dispatchControllerStateChange(STATUS.NEXT);
        onNext?.(event);
    }, [onNext]);
    const handlePauseClick = useCallback((event: SyntheticEvent<HTMLElement, Event>) => {
        dispatchControllerStateChange(STATUS.PAUSE);
        onChange?.(event, STATUS.PAUSE);
    }, [onChange]);
    const handlePlayClick = useCallback((event: SyntheticEvent<HTMLElement, Event>) => {
        dispatchControllerStateChange(STATUS.PLAY);
        onChange?.(event, STATUS.PLAY);      
    }, [onChange]);
    const handleRestartClick = useCallback((event: SyntheticEvent<HTMLElement, Event>) => {
        dispatchControllerStateChange(STATUS.RESTART);
        onChange?.(event, STATUS.RESTART);
    }, [onChange]);

    useEffect(() => {
        if(active) {
            dispatchControllerStateChange(STATUS.PLAY);
        } else {
            dispatchControllerStateChange(STATUS.STOP);
        }
        return () => {
            dispatchControllerStateChange(STATUS.NONE);
        };
    }, [active]);

    return (
        <div className="inline-flex justify-center">
            <IconButton icon={ICON_NAMES.FAST_REWIND} onClick={handlePreviousClick} />
            {
                controllerState.showPause &&
                <IconButton className="bg-primary-main" icon={ICON_NAMES.PAUSE} onClick={handlePauseClick} />
            }
            {
                controllerState.showPlay &&
                <IconButton className="bg-primary-main" icon={ICON_NAMES.PLAY} onClick={handlePlayClick} />
            }
            {
                controllerState.showRestart &&
                <IconButton className="bg-primary-main" icon={ICON_NAMES.RESTART} onClick={handleRestartClick} />
            }
            <IconButton icon={ICON_NAMES.FAST_FORWARD} onClick={handleNextClick} />
        </div>
    );
}

export default memo(withDisplayName<ControllerProps>()(Controller));
