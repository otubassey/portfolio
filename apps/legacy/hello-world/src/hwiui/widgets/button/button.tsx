import { ForwardedRef, forwardRef, ReactEventHandler, ReactNode } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import ButtonBase, {ButtonBaseAttributes} from "./buttonBase";
import { ValuesOf } from "../common";
import { IconName, Icon } from "../icon";

export const ButtonColor = {
    ERROR: "error",
    INFO: "info",
    INHERIT: "inherit",
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    WARNING: "warning"
} as const;

export const ButtonSize = {
    LARGE: "large",
    MEDIUM: "medium",
    SMALL: "small"
} as const;

export const ButtonVariant = {
    CONTAINED: "contained",
    OUTLINED: "outlined",
    TEXT: "text"
} as const;

const getErrorClassName = (
    variant: ValuesOf<typeof ButtonVariant>,
    disabled: boolean,
    disableRipple: boolean
): string | null => {
    let value = null;
    if(variant === ButtonVariant.CONTAINED) {
        value = disabled
            ? "bg-error-actionDisabled text-error-contrastText"
            : "bg-error text-error-contrastText hover:bg-error-dark hover:shadow-lg active:shadow-lg";
    }
    if(variant === ButtonVariant.OUTLINED) {
        value = disabled
            ? "border border-[currentColor] text-error-actionDisabled"
            : "border border-[currentColor] text-error hover:bg-error-actionHover";
    }
    if(variant === ButtonVariant.TEXT) {
        value = disabled
            ? "text-error-actionDisabled"
            : "text-error hover:bg-error-actionHover";
    }
    return value ? `${value}${!disabled && !disableRipple ? " active:bg-error-actionActive" : ""}` : null;
};

const getInfoClassName = (
    variant: ValuesOf<typeof ButtonVariant>,
    disabled: boolean,
    disableRipple: boolean
): string | null => {
    let value = null;
    if(variant === ButtonVariant.CONTAINED) {
        value = disabled
            ? "bg-info-actionDisabled text-info-contrastText"
            : "bg-info text-info-contrastText hover:bg-info-dark hover:shadow-lg active:shadow-lg";
    }
    if(variant === ButtonVariant.OUTLINED) {
        value = disabled
            ? "border border-[currentColor] text-info-actionDisabled"
            : "border border-[currentColor] text-info hover:bg-info-actionHover";
    }
    if(variant === ButtonVariant.TEXT) {
        value = disabled
            ? "text-info-actionDisabled"
            : "text-info hover:bg-info-actionHover";
    }
    return value ? `${value}${!disabled && !disableRipple ? " active:bg-info-actionActive" : ""}` : null;
};

const getInheritClassName = (
    variant: ValuesOf<typeof ButtonVariant>,
    disabled: boolean,
    disableRipple: boolean
): string | null => {
    let value = null;
    if(variant === ButtonVariant.CONTAINED) {
        value = disabled
            ? "bg-inherit text-inherit"
            : "bg-inherit text-inherit hover:bg-inherit hover:shadow-lg active:shadow-lg";
    }
    if(variant === ButtonVariant.OUTLINED) {
        value = disabled
            ? "border border-inherit text-inherit"
            : "border border-inherit text-inherit hover:bg-inherit";
    }
    if(variant === ButtonVariant.TEXT) {
        value = disabled
            ? "text-inherit hover:bg-inherit"
            : "text-inherit hover:bg-inherit";
    }
    return value ? `${value}${!disabled && !disableRipple ? " active:bg-inherit" : ""}` : null;
};

const getPrimaryClassName = (
    variant: ValuesOf<typeof ButtonVariant>,
    disabled: boolean,
    disableRipple: boolean
): string | null => {
    let value = null;
    if(variant === ButtonVariant.CONTAINED) {
        value = disabled
            ? "bg-primary-actionDisabled text-primary-contrastText"
            : "bg-primary text-primary-contrastText hover:bg-primary-dark hover:shadow-lg active:shadow-lg";
    }
    if(variant === ButtonVariant.OUTLINED) {
        value = disabled
            ? "border border-[currentColor] text-primary-actionDisabled"
            : "border border-[currentColor] text-primary hover:bg-primary-actionHover";
    }
    if(variant === ButtonVariant.TEXT) {
        value = disabled
            ? "text-primary-actionDisabled"
            : "text-primary hover:bg-primary-actionHover";
    }
    return value ? `${value}${!disabled && !disableRipple ? " active:bg-primary-actionActive" : ""}` : null;
};

const getSecondaryClassName = (
    variant: ValuesOf<typeof ButtonVariant>,
    disabled: boolean,
    disableRipple: boolean
): string | null => {
    let value = null;
    if(variant === ButtonVariant.CONTAINED) {
        value = disabled
            ? "bg-secondary-actionDisabled text-secondary-contrastText"
            : "bg-secondary text-secondary-contrastText hover:bg-secondary-dark hover:shadow-lg active:shadow-lg";
    }
    if(variant === ButtonVariant.OUTLINED) {
        value = disabled
            ? "border border-[currentColor] text-secondary-actionDisabled"
            : "border border-[currentColor] text-secondary hover:bg-secondary-actionHover";
    }
    if(variant === ButtonVariant.TEXT) {
        value = disabled
            ? "text-secondary-actionDisabled"
            : "text-secondary hover:bg-secondary-actionHover";
    }
    return value ? `${value}${!disabled && !disableRipple ? " active:bg-secondary-actionActive" : ""}` : null;
};

const getSuccessClassName = (
    variant: ValuesOf<typeof ButtonVariant>,
    disabled: boolean,
    disableRipple: boolean
): string | null => {
    let value = null;
    if(variant === ButtonVariant.CONTAINED) {
        value = disabled
            ? "bg-success-actionDisabled text-success-contrastText"
            : "bg-success text-success-contrastText hover:bg-success-dark hover:shadow-lg active:shadow-lg";
    }
    if(variant === ButtonVariant.OUTLINED) {
        value = disabled
            ? "border border-[currentColor] text-success-actionDisabled"
            : "border border-[currentColor] text-success hover:bg-success-actionHover";
    }
    if(variant === ButtonVariant.TEXT) {
        value = disabled
            ? "text-success-actionDisabled"
            : "text-success hover:bg-success-actionHover";
    }
    return value ? `${value}${!disabled && !disableRipple ? " active:bg-success-actionActive" : ""}` : null;
};

const getWarningClassName = (
    variant: ValuesOf<typeof ButtonVariant>,
    disabled: boolean,
    disableRipple: boolean
): string | null => {
    let value = null;
    if(variant === ButtonVariant.CONTAINED) {
        value = disabled
            ? "bg-warning-actionDisabled text-warning-contrastText"
            : "bg-warning text-warning-contrastText hover:bg-warning-dark hover:shadow-lg active:shadow-lg";
    }
    if(variant === ButtonVariant.OUTLINED) {
        value = disabled
            ? "border border-[currentColor] text-warning-actionDisabled"
            : "border border-[currentColor] text-warning hover:bg-warning-actionHover";
    }
    if(variant === ButtonVariant.TEXT) {
        value = disabled
            ? "text-warning-actionDisabled"
            : "text-warning hover:bg-warning-actionHover";
    }
    return value ? `${value}${!disabled && !disableRipple ? " active:bg-warning-actionActive" : ""}` : null;
};

const getClassName = (
    color: ValuesOf<typeof ButtonColor> | string,
    variant: ValuesOf<typeof ButtonVariant>,
    disabled: boolean,
    disableRipple: boolean
): string => {
    const mapping: {[key in ValuesOf<typeof ButtonColor> | string]: string | null} = {
        [ButtonColor.ERROR]: getErrorClassName(variant, disabled, disableRipple),
        [ButtonColor.INFO]: getInfoClassName(variant, disabled, disableRipple),
        [ButtonColor.INHERIT]:getInheritClassName(variant, disabled, disableRipple),
        [ButtonColor.PRIMARY]: getPrimaryClassName(variant, disabled, disableRipple),
        [ButtonColor.SECONDARY]: getSecondaryClassName(variant, disabled, disableRipple),
        [ButtonColor.SUCCESS]: getSuccessClassName(variant, disabled, disableRipple),
        [ButtonColor.WARNING]: getWarningClassName(variant, disabled, disableRipple)
    };

    return mapping[color] ?? color;
};

const RemSizesBySize: {[key: string]: string} = {
    [ButtonSize.LARGE]: "1.375rem",
    [ButtonSize.MEDIUM]: "1.25rem",
    [ButtonSize.SMALL]: "1.125rem"
} as const;

const TypographySizeClassNameBySize = {
    [ButtonSize.LARGE]: "text-base",
    [ButtonSize.MEDIUM]: "text-sm",
    [ButtonSize.SMALL]: "text-xs"
};

type ButtonClasses = {
    icon: string;
    root: string;
    typography: string;
};

export type ButtonAttributes = ButtonBaseAttributes & {
    children?: ReactNode;
    className?: string;
    classes?: ButtonClasses;
    color?: ValuesOf<typeof ButtonColor> | string;
    disabled?: boolean;
    disableRipple?: boolean;
    endIcon?: ReactNode | ValuesOf<typeof IconName>;
    fullWidth?: boolean;
    onClick?: ReactEventHandler;
    size?: ValuesOf<typeof ButtonSize> | string;
    startIcon?: ReactNode | ValuesOf<typeof IconName>;
    variant?: ValuesOf<typeof ButtonVariant>;
};

const Button = forwardRef<HTMLButtonElement, ButtonAttributes>(({
    children,
    className: classNameProp,
    classes,
    color: colorProp,
    disabled = false,
    disableRipple = false,
    endIcon,
    fullWidth = false,
    onClick,
    size: sizeProp,
    startIcon,
    variant: variantProp,
    ...buttonProps
}: ButtonAttributes, ref: ForwardedRef<HTMLButtonElement>) => {
    const hasIcon = Boolean(startIcon || endIcon);
    const variant = variantProp ?? ButtonVariant.TEXT;
    const size = sizeProp ?? ButtonSize.MEDIUM;
    const color = colorProp ?? ButtonColor.PRIMARY;
    const className = getClassName(color, variant, disabled, disableRipple);
    return (
        <ButtonBase
            ref={ref}
            classes={{
                root: ClassesUtils.merge(
                    [classes?.root],
                    classNameProp,
                    "rounded-md py-2 gap-x-0.5",
                    [
                        fullWidth && "w-full p-3",
                        !startIcon && !endIcon && "px-4",
                        Boolean(startIcon) && "pl-3 pr-4",
                        Boolean(endIcon) && "pl-4 pr-3",
                        hasIcon && "justify-around"
                    ],
                    className
                ),
                typography: ClassesUtils.merge(
                    "rounded-inherit text-inherit",
                    TypographySizeClassNameBySize[size],
                    classes?.typography
                )
            }}
            disabled={disabled}
            onClick={onClick}
            {...buttonProps}>
            {
                Boolean(startIcon) &&
                <>
                    {
                        typeof startIcon === "string"
                            ? (
                                <Icon
                                    name={startIcon!}
                                    className={ClassesUtils.merge("fill-current", [classes?.icon])}
                                    size={RemSizesBySize[size]}
                                />
                            )
                            : startIcon
                    }
                </>
            }
            {children}
            {
                Boolean(endIcon) &&
                <>
                    {
                        typeof endIcon === "string"
                            ? (
                                <Icon
                                    name={endIcon!}
                                    className={ClassesUtils.merge("fill-[currentColor]", [classes?.icon])}
                                    size={RemSizesBySize[size]}
                                />
                            )
                            : endIcon
                    }
                </>
            }
        </ButtonBase>
    );
});

Button.displayName = getDisplayName(Button);

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.shape({
        icon: PropTypes.string,
        root: PropTypes.string,
        typography: PropTypes.string
    }),
    color: PropTypes.oneOfType([
        PropTypes.oneOf(Object.values(ButtonColor)),
        PropTypes.string,
    ]),
    disableRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    endIcon: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.oneOf(Object.values(IconName))
    ]),
    fullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOfType([
        PropTypes.oneOf(Object.values(ButtonSize)),
        PropTypes.string
    ]),
    startIcon: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.oneOf(Object.values(IconName))
    ]),
    variant: PropTypes.oneOf(Object.values(ButtonVariant))
};

export default Button;
