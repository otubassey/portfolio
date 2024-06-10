import { ElementType, ForwardedRef, ReactEventHandler, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import {ClassesUtil} from "@/ui/utils";
import { Link } from "@/ui/widgets/link/";

import { ICON_NAMES } from "./icon.constants";
import { IconName, SVGIconProps } from "./icon.types";

import {
    AddIcon,
    ArrowBackIOSIcon,
    ArrowForwardIOSIcon,
    CasesIcon,
    CloseIcon,
    FastForwardIcon,
    FastRewindIcon,
    GitHubIcon,
    HistoryIcon,
    HomeIcon,
    LinkedInIcon,
    OpenInNewIcon,
    PauseCircleIcon,
    PlayCircleIcon,
    PsychologyIcon,
    RestartAltIcon,
    SadFaceEmojiIcon,
    SettingsIcon,
    WorkHistoryIcon
} from ".";
import { withDisplayName } from "@/ui/decorator";

const Color = {
    DEFAULT: "default",
    PRIMARY: "primary",
    SECONDARY: "secondary"
} as const;

const ColorClassesByColor = {
    [Color.DEFAULT]: "hover:bg-grayLight",
    [Color.PRIMARY]: "bg-primaryLight hover:bg-primaryMain",
    [Color.SECONDARY]: "hover:bg-secondaryLight",
} as const;

const getIconByName = (icon: IconName): ElementType => {
    const mapping = ({
        [ICON_NAMES.ADD]: AddIcon,
        [ICON_NAMES.ARROW_BACK_IOS]: ArrowBackIOSIcon,
        [ICON_NAMES.ARROW_FORWARD_IOS]: ArrowForwardIOSIcon,
        [ICON_NAMES.CASES]: CasesIcon,
        [ICON_NAMES.CLOSE]: CloseIcon,
        [ICON_NAMES.FAST_FORWARD]: FastForwardIcon,
        [ICON_NAMES.FAST_REWIND]: FastRewindIcon,
        [ICON_NAMES.GITHUB]: GitHubIcon,
        [ICON_NAMES.HISTORY]: HistoryIcon,
        [ICON_NAMES.HOME]: HomeIcon,
        [ICON_NAMES.LINKED_IN]: LinkedInIcon,
        [ICON_NAMES.OPEN_IN_NEW]: OpenInNewIcon,
        [ICON_NAMES.PAUSE_CIRCLE]: PauseCircleIcon,
        [ICON_NAMES.PLAY_CIRCLE]: PlayCircleIcon,
        [ICON_NAMES.PSYCHOLOGY]: PsychologyIcon,
        [ICON_NAMES.RESTART_ALT]: RestartAltIcon,
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
    componentProps?: {[key: string]: any};
    color?: typeof Color[keyof typeof Color]
    href?: string | null;
    icon?: IconName;
    iconProps?: SVGIconProps;
    onClick?: ReactEventHandler<HTMLElement>;
    size?: typeof Size[keyof typeof Size];
};

IconButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    componentProps: PropTypes.object,
    color: PropTypes.oneOf(Object.values(Color)),
    href: PropTypes.string,
    icon: PropTypes.oneOf(Object.values(ICON_NAMES)),
    iconProps: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(Object.values(Size))
};

function IconButton({
    children = null,
    className = null,
    color,
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
    const colorClass = color ? ColorClassesByColor[color] : ColorClassesByColor[Color.DEFAULT];
    return (
        <Component
            ref={ref}
            className={ClassesUtil.concat("group cursor-pointer rounded-full p-3 m-1 block hover:shadow-2xl", className, colorClass)}
            onClick={onClick}
            {...componentProps}
            {...otherProps}>
            {
                Boolean(icon)
                    ? <IconComponent
                        description={description}
                        svg={{className: "fill-primaryContrastText", stroke: "none", ...(svg ?? {})}}
                        title={title}
                        {...(otherIconProps ?? {})}
                    />
                    : children
            }
        </Component>
    );
}

export default forwardRef<Element, IconProps>(withDisplayName()(IconButton));
