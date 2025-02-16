import { ForwardedRef, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

import { IconName, Icon, SVGIconProps } from "@/hwiui/widgets/icon";
import ButtonBase, {ButtonBaseAttributes} from "./buttonBase";
import { ClassesUtils } from "@/hwiutils";
import { ValuesOf } from "../common";

export const IconButtonColor = {
    DEFAULT: "default",
    ERROR: "error",
    INFO: "info",
    INHERIT: "inherit",
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    WARNING: "warning"
} as const;

export const IconButtonSize = {
    LARGE: "large",
    MEDIUM: "medium",
    SMALL: "small"
} as const;

const getDefaultClassName = (disabled: boolean, disableRipple: boolean): string | null => {
    if(disabled) {
        return "text-typography-actionDisabled";
    }
    return disableRipple
        ? "text-typography hover:bg-typography-actionHover"
        : "text-typography hover:bg-typography-actionHover active:bg-typography-actionActive";
};

const getErrorClassName = (disabled: boolean, disableRipple: boolean): string | null => {
    if(disabled) {
        return "text-error-actionDisabled";
    }
    return disableRipple
        ? "text-error hover:bg-error-actionHover"
        : "text-error hover:bg-error-actionHover active:bg-error-actionActive";
};

const getInfoClassName = (disabled: boolean, disableRipple: boolean): string | null => {
    if(disabled) {
        return "text-info-actionDisabled";
    }
    return disableRipple
        ? "text-info hover:bg-info-actionHover"
        : "text-info hover:bg-info-actionHover active:bg-info-actionActive";
};

const getInheritClassName = (disabled: boolean, disableRipple: boolean): string | null => {
    if(disabled) {
        return "text-typography-actionDisabled";
    }
    return disableRipple
        ? "text-typography-textPrimary hover:bg-typography-actionHover"
        : "text-typography-textPrimary hover:bg-typography-actionHover active:bg-typography-actionActive";
};

const getPrimaryClassName = (disabled: boolean, disableRipple: boolean): string | null => {
    if(disabled) {
        return "text-primary-actionDisabled";
    }
    return disableRipple
        ? "text-primary hover:bg-primary-actionHover"
        : "text-primary hover:bg-primary-actionHover active:bg-primary-actionActive";
};

const getSecondaryClassName = (disabled: boolean, disableRipple: boolean): string | null => {
    if(disabled) {
        return "text-secondary-actionDisabled";
    }
    return disableRipple
        ? "text-secondary hover:bg-secondary-actionHover"
        : "text-secondary hover:bg-secondary-actionHover active:bg-secondary-actionActive";
};

const getSuccessClassName = (disabled: boolean, disableRipple: boolean): string | null => {
    if(disabled) {
        return "text-success-actionDisabled";
    }
    return disableRipple
        ? "text-success hover:bg-success-actionHover"
        : "text-success hover:bg-success-actionHover active:bg-success-actionActive";
};

const getWarningClassName = (disabled: boolean, disableRipple: boolean): string | null => {
    if(disabled) {
        return "text-warning-actionDisabled";
    }
    return disableRipple
        ? "text-warning hover:bg-warning-actionHover"
        : "text-warning hover:bg-warning-actionHover active:bg-warning-actionActive";
};

const getClassName = (
    color: ValuesOf<typeof IconButtonColor> | string,
    disabled: boolean,
    disableRipple: boolean
): string => {
    const mapping: {[key in ValuesOf<typeof IconButtonColor> | string]: string | null} = {
        [IconButtonColor.DEFAULT]: getDefaultClassName(disabled, disableRipple),
        [IconButtonColor.ERROR]: getErrorClassName(disabled, disableRipple),
        [IconButtonColor.INFO]: getInfoClassName(disabled, disableRipple),
        [IconButtonColor.INHERIT]:getInheritClassName(disabled, disableRipple),
        [IconButtonColor.PRIMARY]: getPrimaryClassName(disabled, disableRipple),
        [IconButtonColor.SECONDARY]: getSecondaryClassName(disabled, disableRipple),
        [IconButtonColor.SUCCESS]: getSuccessClassName(disabled, disableRipple),
        [IconButtonColor.WARNING]: getWarningClassName(disabled, disableRipple)
    };

    return mapping[color] ?? color;
};

type IconButtonClasses = {
    root?: string;
    icon?: string;
};

type IconButtonProps = ButtonBaseAttributes & {
    classes?: IconButtonClasses;
    color?: ValuesOf<typeof IconButtonColor> | string;
    disableRipple?: boolean;
    disabled?: boolean;
    href?: string | null; // TODO: fix this
    name: ValuesOf<typeof IconName>;
    iconProps?: SVGIconProps;
    size?: ValuesOf<typeof IconButtonSize> | string;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
    classes,
    color,
    disableRipple = false,
    disabled = false,
    name,
    iconProps,
    onClick,
    size: sizeProp,
    ...buttonProps
}: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const size = sizeProp ?? IconButtonSize.MEDIUM;
    const className = getClassName(color ?? IconButtonColor.DEFAULT, disabled, disableRipple);
    return (
        <ButtonBase
            ref={ref}
            aria-label={name}
            className={ClassesUtils.merge("rounded-full p-2", className, [classes?.root])}
            disabled={disabled}
            onClick={onClick}
            {...buttonProps}>
            <Icon
                className={classes?.icon}
                name={name}
                size={size}
                {...iconProps}
            />
        </ButtonBase>
    );
});

IconButton.displayName = getDisplayName(IconButton);

IconButton.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf(Object.values(IconButtonColor))
    ]),
    disableRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.oneOf(Object.values(IconName)),
    iconProps: PropTypes.object,
    onClick: PropTypes.func,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf(Object.values(IconButtonSize))
    ])
};

export default IconButton;
