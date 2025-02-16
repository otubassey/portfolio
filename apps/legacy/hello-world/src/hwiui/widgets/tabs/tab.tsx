"use client";

import { ChangeEvent, ForwardedRef, MouseEventHandler, ReactElement, ReactEventHandler, ReactNode, forwardRef, useCallback } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import { ButtonBase } from "../button";
import { Typography } from "../typography";

function mapTypographyColor(selected?: boolean, disabled?: boolean) {
    if(disabled) {
        return "disabled";
    }
    return selected ? "primary" : "inherit";
}

function mapTypographyColorClassName(selected?: boolean, disabled?: boolean) {
    if(disabled) {
        return "text-typography-textPrimary";
    }
    return selected ? "text-primary" : "text-inherit";
}

type ClassesAttributes = {
    root?: string;
    indicator?: string;
    typography?: string;
};

type TabProps = {
    children: ReactNode;
    className?: string | null;
    classes?: ClassesAttributes;
    disabled?: boolean;
    onClick?: (MouseEventHandler<HTMLButtonElement> & ReactEventHandler<HTMLButtonElement>);
    label?: ReactNode;
    selected?: boolean;
    value?: any;
};

const Tab = forwardRef<HTMLButtonElement, TabProps>(({
    className = null,
    classes,
    children,
    disabled = false,
    onClick,
    label = null,
    selected = false,
    value = null,
    ...otherProps
}: TabProps, ref: ForwardedRef<HTMLButtonElement>): ReactElement => {
    console.log("tagged-Tab: vals =", {
        label,
        selected,
        value
    });
    const handleClick = useCallback((event: ChangeEvent<HTMLButtonElement>) => {
        const modifiedEvent = {
            ...event,
            target: {
                ...event.target,
                value
            }
        };
        onClick?.(modifiedEvent);
    }, [onClick, value]);
    return (
        <ButtonBase
            ref={ref}
            classes={{
                root: ClassesUtils.merge(
                    // "w-full",
                    mapTypographyColorClassName(selected, disabled),
                    classes?.root,
                    className,
                    [!disabled && (selected ? "active:bg-primary-actionActive" : "active:bg-action-active")]
                ),
                typography: ClassesUtils.merge(
                    mapTypographyColor(selected, disabled),
                    classes?.typography
                )
            }}
            disabled={disabled}
            {...otherProps}
            onClick={handleClick}>
            {children}
            {
                typeof label === "string"
                    ? <Typography color={mapTypographyColor(selected, disabled)} variant="button">{label}</Typography>
                    : label
            }
        </ButtonBase>
    );
    // return (
    //     <div className={ClassesUtils.merge(
    //         "inline-grid cursor-pointer",
    //         classes?.root,
    //         className,
    //         [selected && !disabled ? "active:bg-primary-actionActive" : "active:bg-action-active"]
    //         )}>
    //         <ButtonBase
    //             ref={ref}
    //             disabled={disabled}
    //             {...otherProps}
    //             onClick={handleClick}>
    //             {children}
    //             {
    //                 typeof label === "string"
    //                     ? <Typography color={mapTypographyColor(selected, disabled)} variant="button">{label}</Typography>
    //                     : label
    //             }
    //         </ButtonBase>
    //         {/* { // TODO: move this to tabs and fix orientation
    //             selected && !disabled &&
    //             <span className={ClassesUtils.merge("h-0.5 w-full bg-primary", classes?.indicator)}></span>
    //         } */}
    //     </div>
    // );
});

Tab.displayName = getDisplayName(Tab);

Tab.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    label: PropTypes.node,
    selected: PropTypes.bool,
    value: PropTypes.any
};

export default Tab;
