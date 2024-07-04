"use client";

import { memo, MutableRefObject, ReactElement, Reducer, useCallback, useEffect, useReducer, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { PaginationActions, useToggle } from "@/ui/hooks";
import { CarouselControllerProps } from "@/ui/widgets/carousel";
import { ICON_NAMES, IconButton } from "@/ui/widgets/icon";

const STATUS = Object.freeze({
    PAUSE: "pause",
    PLAY: "play",
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
    status: STATUS.STOP
} as const;

function useGAPAnimation(containerRef?: MutableRefObject<HTMLDivElement>, containerItemClassName?: string): [() => void, [gsap.core.Tween | null, boolean]] {
    const [isTweenActive, toggleIsTweenActive] = useToggle(false);
    const [tween, setTween] = useState<gsap.core.Tween | null>(null);
    const [reloadId, setReloadId] = useState(null);

    const animate = useCallback(() => {
        setReloadId(Symbol("UI.HELLO-WORLD-SNIPPETS.USE-GAP-ANIMATION.RELOAD-ID"));
    }, []);

    useGSAP(() => {
        if(reloadId) {
            const createdTween = gsap.fromTo(`.${containerItemClassName}`,
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
            setTween(createdTween);
        }
    }, {dependencies: [reloadId], revertOnUpdate: true, scope: containerRef});

    return [animate, [tween, isTweenActive]];
}

function controllerStateReducer(previousState: State, action: ControllerStatus): State {
    if(action === STATUS.PAUSE) {
        return {
            ...previousState,
            showPause: false,
            showPlay: true,
            showRestart: false,
            status: STATUS.PAUSE
        };
    }
    if(action === STATUS.PLAY) {
        return {
            ...previousState,
            showPause: true,
            showPlay: false,
            showRestart: false,
            status: STATUS.PLAY
        };
    }
    if(action === STATUS.RESTART) {
        return {
            ...previousState,
            showPause: false,
            showPlay: false,
            showRestart: true,
            status: STATUS.RESTART
        };
    }
    if(action === STATUS.STOP) {
        return INITIAL_CONTROLLER_STATE;
    }
    return previousState;
}

Controller.propTypes = {
    containerProps: PropTypes.shape({
        ref: PropTypes.shape({
            current: PropTypes.node
        }),
        itemClassName: PropTypes.string
    }),
    onPageChange: PropTypes.func,
    page: PropTypes.shape({
        count: PropTypes.number,
        current: PropTypes.number
    })
};

function Controller({
    containerProps,
    onPageChange,
    page
}: CarouselControllerProps): ReactElement<CarouselControllerProps> {
    const [controllerState, dispatchControllerStateChange] = useReducer<Reducer<State, ControllerStatus>>(controllerStateReducer, INITIAL_CONTROLLER_STATE);
    const [animate, [tween, isTweenActive]] = useGAPAnimation(containerProps?.ref, containerProps?.itemClassName);

    const handleNextClick = useCallback(() => {
        onPageChange?.({type: PaginationActions.NEXT});
    }, [onPageChange]);

    const handlePauseClick = useCallback(() => {
        dispatchControllerStateChange(STATUS.PAUSE);
        tween?.pause();
    }, [tween]);

    const handlePlayClick = useCallback(() => {
        dispatchControllerStateChange(STATUS.PLAY);
        tween?.resume();
    }, [tween]);

    const handlePreviousClick = useCallback(() => {
        onPageChange?.({type: PaginationActions.PREVIOUS});
    }, [onPageChange]);

    const handleRestartClick = useCallback(() => {
        onPageChange?.({type: PaginationActions.RESET});
    }, [onPageChange]);

    useEffect(() => {
        animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        if(isTweenActive) {
            dispatchControllerStateChange(STATUS.PLAY);
        } else {
            if(!page.isLast) {
                handleNextClick();
                dispatchControllerStateChange(STATUS.STOP);
            } else {
                dispatchControllerStateChange(STATUS.RESTART);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTweenActive]);

    return (
        <div className="inline-flex justify-center">
            <IconButton disabled={!page || page.isFirst} icon={ICON_NAMES.FAST_REWIND} onClick={handlePreviousClick} />
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
            <IconButton disabled={!page || page.isLast} icon={ICON_NAMES.FAST_FORWARD} onClick={handleNextClick} />
        </div>
    );
}

export default memo(withDisplayName()(Controller));
