import { SVGIconProps } from "./icon.types";

export const ICON_NAMES = {
    ADD: "Add",
    ARROW_BACK_IOS: "ArrowBackIOS",
    ARROW_FORWARD_IOS: "ArrowForwardIOS",
    CASES: "Cases",
    CLOSE: "Close",
    FAST_FORWARD: "FastForward",
    FAST_REWIND: "FastRewind",
    GITHUB: "GitHub",
    HISTORY: "History",
    HOME: "Home",
    LINKED_IN: "LinkedIn",
    OPEN_IN_NEW: "OpenInNew",
    PAUSE_CIRCLE: "PauseCircle",
    PLAY_CIRCLE: "PlayCircle",
    PSYCHOLOGY: "Psychology",
    RESTART_ALT: "RestartAlt",
    SAD_FACE_EMOJI: "SadFaceEmoji",
    SETTINGS: "Settings",
    WORK_HISTORY: "WorkHistory"
} as const;

export const DEFAULT_ICON_PROP: SVGIconProps = {
    svg: {
        className: "currentColor",
        fill: "none",
        fillOpacity: 1,
        height: "2rem",
        stroke: "currentColor",
        strokeOpacity: 1,
        strokeWidth: "2",
        width: "2rem"
    }
} as const;
