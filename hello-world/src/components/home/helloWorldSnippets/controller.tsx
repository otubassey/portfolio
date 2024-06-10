"use client";

import { Dispatch, memo, MutableRefObject, ReactElement, Reducer, useCallback, useEffect, useReducer, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { PaginationActions, PaginationDispatcherAction, PaginationPage, useToggle } from "@/ui/hooks";
import { ICON_NAMES, IconButton } from "@/ui/widgets/icon";

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

function useGAPAnimation(pageItemRef: MutableRefObject<HTMLDivElement[]>, toggleIsTweenActive): [gsap.core.Tween, () => void] {
    const [reloadId, setReloadId] = useState(null);
    const [tween, setTween] = useState<gsap.core.Tween | null>(null);
    useGSAP(() => {
        const gsapTween = gsap.fromTo(pageItemRef.current!,
            {
                y: 100,
                x: 0,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                delay: 1,
                duration: 7,
                onStart: () => {
                    toggleIsTweenActive(true);
                },
                onComplete: () => {
                    toggleIsTweenActive(false);
                }
            }
        );
        setTween(gsapTween);
    }, [reloadId])
    const animate = useCallback(() => {
        setReloadId(Symbol("UI.HELLO-WORLD-SNIPPETS.USE-GAP-ANIMATION.RELOAD-ID"));
    }, []);
    return [tween, animate];
}

function controllerStateReducer(previousState: State, action: ControllerStatus): State {
    if(action === STATUS.PREVIOUS) {
        // clicking this should do the ff:
        // 1. display the previously displayed content
        // 2. display the pause button
        return {...previousState, status: STATUS.PREVIOUS, showPause: true, showPlay: false, showRestart: false};
    }
    if(action === STATUS.NEXT) {
        // clicking this should do the ff:
        // 1. display the next content
        // 2. display the pause button
        return {...previousState, status: STATUS.NEXT, showPause: true, showPlay: false, showRestart: false};
    }
    if(action === STATUS.NONE) {
        return INITIAL_CONTROLLER_STATE;
    }
    if(action === STATUS.PAUSE) {
        // clicking this should do the ff:
        // 1. pause the display of subsequent contents
        // 2. display the play button
        return {...previousState, status: STATUS.PAUSE, showPause: false, showPlay: true, showRestart: false};
    }
    if(action === STATUS.PLAY) {
        // clicking this should do the ff:
        // 1. conitnue with displaying subseqent contents
        // 2. display the pause button
        return {...previousState, status: STATUS.PLAY, showPause: true, showPlay: false, showRestart: false};
    }
    if(action === STATUS.RESTART) {
        // clicking this should do the ff:
        // 1. restart displaying contents from the first
        // 2. display pause button
        return {...previousState, status: STATUS.RESTART, showPause: true, showPlay: false, showRestart: false};
    }
    if(action === STATUS.STOP) {
        // clicking this should do the ff:
        // 1. stop/kill a particular displayed content's tween
        // 2. display the restart button
        return {...previousState, status: STATUS.STOP, showPause: false, showPlay: false, showRestart: true};
    }
    return previousState;
}

type Props = {
    onPageChange?: Dispatch<PaginationDispatcherAction>;
    page?: PaginationPage;
    pageItemRef?: MutableRefObject<HTMLDivElement[]>;
};

Controller.propTypes = {
    onPageChange: PropTypes.func,
    page: PropTypes.shape({
        count: PropTypes.number,
        current: PropTypes.number
    }),
    pageItemRef: PropTypes.shape({
        current: PropTypes.array
    })
};

function Controller({
    onPageChange,
    page,
    pageItemRef
}: Props): ReactElement<Props> {
    const [controllerState, dispatchControllerStateChange] = useReducer<Reducer<State, ControllerStatus>>(controllerStateReducer, INITIAL_CONTROLLER_STATE);
    const [isTweenActive, toggleIsTweenActive] = useToggle(false);
    const [tween, animate] = useGAPAnimation(pageItemRef, toggleIsTweenActive);

    const handleNextClick = useCallback(() => {
        dispatchControllerStateChange(STATUS.NEXT);
        onPageChange?.({type: PaginationActions.NEXT});
        animate();
    }, [animate, onPageChange]);

    const handlePauseClick = useCallback(() => {
        dispatchControllerStateChange(STATUS.PAUSE);
        tween?.pause();
    }, [tween]);

    const handlePlayClick = useCallback(() => {
        dispatchControllerStateChange(STATUS.PLAY);
        tween?.resume();
    }, [tween]);

    const handlePreviousClick = useCallback(() => {
        dispatchControllerStateChange(STATUS.PREVIOUS);
        onPageChange?.({type: PaginationActions.PREVIOUS});
        animate();
    }, [animate, onPageChange]);

    const handleRestartClick = useCallback(() => {
        dispatchControllerStateChange(STATUS.RESTART);
        onPageChange?.({type: PaginationActions.RESET});
        animate();
    }, [animate, onPageChange]);

    useEffect(() => {
        if(isTweenActive) {
            dispatchControllerStateChange(STATUS.PLAY);
        }
        if(!isTweenActive && page?.current !== page?.count) {
            handleNextClick();
        }
        if(!isTweenActive && page?.current === page?.count) {
            dispatchControllerStateChange(STATUS.STOP);
        }
        return () => {
            dispatchControllerStateChange(STATUS.NONE);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTweenActive]);

    return (
        <div className="inline-flex justify-center">
            <IconButton icon={ICON_NAMES.FAST_REWIND} onClick={handlePreviousClick} />
            {
                controllerState.showPause &&
                <IconButton icon={ICON_NAMES.PAUSE_CIRCLE} onClick={handlePauseClick} />
            }
            {
                controllerState.showPlay &&
                <IconButton icon={ICON_NAMES.PLAY_CIRCLE} onClick={handlePlayClick} />
            }
            {
                controllerState.showRestart &&
                <IconButton icon={ICON_NAMES.RESTART_ALT} onClick={handleRestartClick} />
            }
            <IconButton icon={ICON_NAMES.FAST_FORWARD} onClick={handleNextClick} />
        </div>
    );
}

export default memo(withDisplayName()(Controller));
