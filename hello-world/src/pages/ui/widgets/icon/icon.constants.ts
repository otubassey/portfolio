import { SVGIconProps } from "./icon.types";

export const ICON_NAMES = {
    ADD: "Add",
    CASES: "Cases",
    CLOSE: "Close",
    FAST_FORWARD: "FastForward",
    FAST_REWIND: "FastRewind",
    GITHUB: "GitHub",
    HISTORY: "History",
    HOME: "Home",
    LINKED_IN: "LinkedIn",
    OPEN_IN_NEW: "OpenInNew",
    PAUSE: "Pause",
    PLAY: "Play",
    PSYCHOLOGY: "Psychology",
    RESTART: "Restart",
    SAD_FACE_EMOJI: "SadFaceEmoji",
    SETTINGS: "Settings",
    WORK_HISTORY: "WorkHistory"
} as const;

export const DEFAULT_ICON_PROP: SVGIconProps = {
    svg: {
        // className: "fill-slate-600",
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
