import { ElementType, ForwardedRef, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

import { IconColor, IconName, IconSize } from "./icon.constants";
import { SVGIconProps } from "./icon.types";

import {
    AddIcon,
    ArrowBackIOSIcon,
    ArrowForwardIOSIcon,
    CasesIcon,
    CloseIcon,
    ExpandLessIcon,
    ExpandMoreIcon,
    FastForwardIcon,
    FastRewindIcon,
    GitHubIcon,
    HistoryIcon,
    HomeIcon,
    KeyboardArrowDown,
    KeyboardArrowRight,
    LinkedInIcon,
    OpenInNewIcon,
    PauseCircleIcon,
    PlayCircleIcon,
    PsychologyIcon,
    RestartAltIcon,
    RestoreIcon,
    SadFaceEmojiIcon,
    SettingsIcon,
    WorkHistoryIcon
} from ".";
import { ClassesUtils } from "@/hwiutils";
import { ValuesOf } from "../common";

export type IconProps = {
    color?: ValuesOf<typeof IconColor> | string;
    className?: string;
    name?: ValuesOf<typeof IconName>;
    size?: ValuesOf<typeof IconSize> | string;
    otherSvgProps?: Omit<SVGIconProps, "height" | "name" | "width">;
};

const ColorClassesByColor: {[key: string]: string} = {
    [IconColor.DISABLED]: "text-action-disabled",
    [IconColor.ERROR]: "text-error",
    [IconColor.INFO]: "text-info",
    [IconColor.INHERIT]: "inherit",
    [IconColor.PRIMARY]: "text-primary",
    [IconColor.SECONDARY]: "text-secondary",
    [IconColor.SUCCESS]: "text-success",
    [IconColor.WARNING]: "text-warning"
} as const;

function getColor(color?: IconProps["color"]): IconProps["color"] {
    if(!color) {
        return ColorClassesByColor[IconColor.INHERIT];
    }
    const matchedColor = ColorClassesByColor[color];
    if(!matchedColor && typeof color === "string") {
        return color;
    }
    return matchedColor;
}

const RemSizesBySize: {[key: string]: string} = {
    [IconSize.INHERIT]: "inherit",
    [IconSize.LARGE]: "2.4rem",
    [IconSize.MEDIUM]: "2.1rem",
    [IconSize.SMALL]: "1.8rem"
} as const;

function getRemSize(size: IconProps["size"]): IconProps["size"] {
    if(!size) {
        return RemSizesBySize[IconSize.MEDIUM];
    }
    const matchedSize = RemSizesBySize[size];
    if(!matchedSize && typeof size === "string") {
        return size;
    }
    return matchedSize;
}

const getIconByName = (icon?: ValuesOf<typeof IconName>): ElementType => {
    const mapping = ({
        [IconName.ADD]: AddIcon,
        [IconName.ARROW_BACK_IOS]: ArrowBackIOSIcon,
        [IconName.ARROW_FORWARD_IOS]: ArrowForwardIOSIcon,
        [IconName.CASES]: CasesIcon,
        [IconName.CLOSE]: CloseIcon,
        [IconName.EXPAND_LESS]: ExpandLessIcon,
        [IconName.EXPAND_MORE]: ExpandMoreIcon,
        [IconName.FAST_FORWARD]: FastForwardIcon,
        [IconName.FAST_REWIND]: FastRewindIcon,
        [IconName.GITHUB]: GitHubIcon,
        [IconName.HISTORY]: HistoryIcon,
        [IconName.HOME]: HomeIcon,
        [IconName.KEYBOARD_ARROW_DOWN]: KeyboardArrowDown,
        [IconName.KEYBOARD_ARROW_RIGHT]: KeyboardArrowRight,
        [IconName.LINKED_IN]: LinkedInIcon,
        [IconName.OPEN_IN_NEW]: OpenInNewIcon,
        [IconName.PAUSE_CIRCLE]: PauseCircleIcon,
        [IconName.PLAY_CIRCLE]: PlayCircleIcon,
        [IconName.PSYCHOLOGY]: PsychologyIcon,
        [IconName.RESTART_ALT]: RestartAltIcon,
        [IconName.RESTORE]: RestoreIcon,
        [IconName.SAD_FACE_EMOJI]: SadFaceEmojiIcon,
        [IconName.SETTINGS]: SettingsIcon,
        [IconName.WORK_HISTORY]: WorkHistoryIcon
    });
    return icon ? mapping[icon] : SadFaceEmojiIcon;
};

const Icon = forwardRef<SVGElement, IconProps>(({
    color: colorProp,
    className,
    name,
    size,
    ...otherSvgProps
}: IconProps, ref: ForwardedRef<SVGElement>) => {
    const IconComponent = getIconByName(name);
    const color = getColor(colorProp);
    const remSize = getRemSize(size);
    return (
        <IconComponent
            ref={ref}
            className={ClassesUtils.merge(color, className)}
            fill="currentColor"
            height={remSize}
            width={remSize}
            {...(otherSvgProps ?? {})}
        />
    );
});

Icon.displayName = getDisplayName(Icon);

Icon.propTypes = {
    color: PropTypes.oneOf(Object.values(IconColor)),
    className: PropTypes.string,
    name: PropTypes.oneOf(Object.values(IconName)),
    size: PropTypes.oneOf(Object.values(IconSize))
};

export default Icon;
