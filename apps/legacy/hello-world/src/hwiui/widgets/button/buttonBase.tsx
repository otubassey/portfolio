import { ReactNode, ElementType, forwardRef, ForwardedRef, ReactEventHandler, isValidElement, HTMLProps, Children, Fragment, MouseEventHandler } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import { Typography } from "../typography";

type ButtonBaseClasses = {
    root?: string;
    typography?: string;
};

export type ButtonBaseAttributes = HTMLProps<HTMLButtonElement> & {
    children?: ReactNode;
    classes?: ButtonBaseClasses;
    component?: ElementType;
    onClick?: (MouseEventHandler<HTMLButtonElement> & ReactEventHandler<HTMLElement>);
};

// TODO: work on the following next:
// 1. Icons getting the right fill colors
// 2. hover styling
// 3. click styling
// 4. same for icons
// 5. refactor the playground to list all components and widgets
const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseAttributes>(({
    children,
    classes,
    component: Component = "button",
    disabled = false,
    onClick,
    type,
    ...otherButtonProps
}: ButtonBaseAttributes, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
        <Component
            ref={ref}
            className={ClassesUtils.merge(
                "inline-flex items-center m-2",
                [classes?.root],
                [
                    Component !== "button" && "cursor-pointer",
                    disabled && "cursor-not-allowed"
                ],
            )}
            disabled={disabled}
            type={type || "button"}
            onClick={onClick}
            {...otherButtonProps}>
            {Children.map(children, (child, index) => Boolean(child) && (
                <Fragment key={index}>
                    {
                        isValidElement(child)
                            ? child
                            : (
                                <Typography
                                    className={classes?.typography}
                                    variant="button">
                                    {child}
                                </Typography>
                            )
                    }
                </Fragment>
            ))}
        </Component>
    );
});

ButtonBase.displayName = getDisplayName(ButtonBase);

ButtonBase.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.shape({
        root: PropTypes.string,
        typography: PropTypes.string
    }),
    component: PropTypes.elementType,
    onClick: PropTypes.func
};

export default ButtonBase;
