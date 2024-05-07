import { ElementType, ForwardedRef, ReactEventHandler, ReactNode, forwardRef } from "react";

import {ClassesUtil} from "@/ui/utils";
import { Link } from "../link";
import { IconName, SVGIconProps } from "./icon.types";
import { ICON_NAMES } from "./icon.constants";

import {
    AddIcon,
    CasesIcon,
    CloseIcon,
    FastForwardIcon,
    FastRewindIcon,
    GitHubIcon,
    HistoryIcon,
    HomeIcon,
    LinkedInIcon,
    OpenInNewIcon,
    PauseIcon,
    PlayIcon,
    PsychologyIcon,
    RestartIcon,
    SadFaceEmojiIcon,
    SettingsIcon,
    WorkHistoryIcon
} from ".";
import { withDisplayName } from "../../decorator";

const Color = {
    DEFAULT: "default",
    INFO: "info",
    INHERIT: "inherit",
    PRIMARY: "primary",
    SECONDARY: "secondary"
} as const;

const getIconByName = (icon: IconName): ElementType => {
    const mapping = ({
        [ICON_NAMES.ADD]: AddIcon,
        [ICON_NAMES.CASES]: CasesIcon,
        [ICON_NAMES.CLOSE]: CloseIcon,
        [ICON_NAMES.FAST_FORWARD]: FastForwardIcon,
        [ICON_NAMES.FAST_REWIND]: FastRewindIcon,
        [ICON_NAMES.GITHUB]: GitHubIcon,
        [ICON_NAMES.HISTORY]: HistoryIcon,
        [ICON_NAMES.HOME]: HomeIcon,
        [ICON_NAMES.LINKED_IN]: LinkedInIcon,
        [ICON_NAMES.OPEN_IN_NEW]: OpenInNewIcon,
        [ICON_NAMES.PAUSE]: PauseIcon,
        [ICON_NAMES.PLAY]: PlayIcon,
        [ICON_NAMES.PSYCHOLOGY]: PsychologyIcon,
        [ICON_NAMES.RESTART]: RestartIcon,
        [ICON_NAMES.SAD_FACE_EMOJI]: SadFaceEmojiIcon,
        [ICON_NAMES.SETTINGS]: SettingsIcon,
        [ICON_NAMES.WORK_HISTORY]: WorkHistoryIcon
    });
    return mapping[icon] ?? SadFaceEmojiIcon;
};

const Size = {
    SMALL: "sm",
    MEDIUM: "md",
    LARGE: "lg"
} as const;

type IconProps = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
    componentProps?: any;
    color?: typeof Color[keyof typeof Color]
    href?: string | null;
    icon?: IconName;
    iconProps?: SVGIconProps;
    onClick?: ReactEventHandler<HTMLElement>;
    size?: typeof Size[keyof typeof Size];
};

function IconButton({
    children = null,
    className = null,
    component = null,
    componentProps = null,
    href = null,
    icon,
    iconProps,
    onClick,
    size,
    ...otherProps
}: IconProps, ref: ForwardedRef<Element>) {
    let Component = href ? Link : component;
    if(!Component) {
        Component = "button";
    }
    const IconComponent = icon ? getIconByName(icon) : null;
    const {description, svg, title, ...otherIconProps} = iconProps ?? {};
    return (
        <Component
            ref={ref}
            className={ClassesUtil.concat("group cursor-pointer rounded-full p-3 m-3 block hover:shadow-2xl hover:shadow-slate-500/50", className)}
            onClick={onClick}
            {...componentProps}
            {...otherProps}>
            {
                Boolean(icon)
                    ? <IconComponent
                        description={description}
                        svg={{className: "group-hover:fill-slate-200 fill-primaryLight", stroke: "none", ...(svg ?? {})}}
                        title={title}
                        {...(otherIconProps ?? {})}
                    />
                    : children
            }
        </Component>
    );
}

export default forwardRef<Element, IconProps>(withDisplayName()(IconButton));
