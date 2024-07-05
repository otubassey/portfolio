"use client";

import { Children, ForwardedRef, Fragment, ReactNode, cloneElement, forwardRef, isValidElement, useCallback } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { useToggle } from "@/ui/hooks";
import { ClassesUtil, DeviceType, DeviceTypes } from "@/ui/utils";

const PrimaryIconButtonPositions = {
    BOTTOM_RIGHT: "Bottom Right",
    TOP_LEFT: "Top Left"
} as const;

const ActionIconButtonDirections = {
    DOWN: "Down",
    LEFT: "Left",
    RIGHT: "Right",
    UP: "Up"
} as const;

const CLASSNAMES = {
    root: {
        [PrimaryIconButtonPositions.BOTTOM_RIGHT]: "bottom-0 right-0 m-3 fixed",
        [PrimaryIconButtonPositions.TOP_LEFT]: "top-0 left-0 m-3 fixed"
    },
    menu: {
        root: {
            [ActionIconButtonDirections.DOWN]: "group flex flex-col",
            [ActionIconButtonDirections.LEFT]: "group flex flex-row-reverse",
            [ActionIconButtonDirections.RIGHT]: "group flex",
            [ActionIconButtonDirections.UP]: "group flex flex-col-reverse"
        },
        primaryItem: {
            [DeviceTypes.DESKTOP]: {
                root: "fill-primaryContrastText group-hover:rotate-90 transition transition-all duration-[0.6s]"
            },
            [DeviceTypes.MOBILE]: {
                active: "group rotate-90",
                inactive: "group rotate-0",
                common: "fill-primaryContrastText transition transition-all duration-[0.6s]"
            }
        },
        secondaryItem: {
            [DeviceTypes.DESKTOP]: {
                root: "hidden bg-grayLight self-center group-hover:block hover:bg-grayMain"
            },
            [DeviceTypes.MOBILE]: {
                common: "bg-grayLight self-center hover:bg-grayMain active:bg-grayMain",
                hide: "hidden",
                show: "group block"
            }
        },
    }
} as const;

function getPrimaryClassNames(deviceType: DeviceType, displaySecondaryIcons: boolean) {
    if(deviceType === DeviceTypes.MOBILE) {
        const mobileClassNames = CLASSNAMES.menu.primaryItem[DeviceTypes.MOBILE];
        return ClassesUtil.concat(mobileClassNames.common, displaySecondaryIcons ? mobileClassNames.active : mobileClassNames.inactive);
    }
    return CLASSNAMES.menu.primaryItem[DeviceTypes.DESKTOP].root;
}

function getSecondaryClassName(deviceType: DeviceType, displaySecondaryIcons: boolean) {
    if(deviceType === DeviceTypes.MOBILE) {
        const mobileClassNames = CLASSNAMES.menu.secondaryItem[DeviceTypes.MOBILE];
        return ClassesUtil.concat(mobileClassNames.common, displaySecondaryIcons ? mobileClassNames.show : mobileClassNames.hide);
    }
    return CLASSNAMES.menu.secondaryItem[DeviceTypes.DESKTOP].root;
}

const PrimaryIconButtonPositionsByActionIconButtonDirection = {
    [ActionIconButtonDirections.DOWN]: PrimaryIconButtonPositions.TOP_LEFT,
    [ActionIconButtonDirections.LEFT]: PrimaryIconButtonPositions.BOTTOM_RIGHT,
    [ActionIconButtonDirections.RIGHT]: PrimaryIconButtonPositions.TOP_LEFT,
    [ActionIconButtonDirections.UP]: PrimaryIconButtonPositions.BOTTOM_RIGHT,
} as const;

type Direction = typeof ActionIconButtonDirections[keyof typeof ActionIconButtonDirections];

type Props = {
    children?: ReactNode;
    className?: string;
    deviceType?: DeviceType;
    direction?: Direction;
    primaryIcon?: ReactNode;
};

SpeedDial.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    deviceType: PropTypes.oneOf(Object.values(DeviceTypes)),
    direction: PropTypes.oneOf(Object.values(ActionIconButtonDirections)),
    primaryIcon: PropTypes.node
};

function SpeedDial({
    children = null,
    className,
    deviceType,
    direction,
    primaryIcon = null
}: Props, ref: ForwardedRef<HTMLDivElement>) {
    const [displaySecondaryIcons, toggleDisplaySecondaryIcons] = useToggle(false);
    const actionIconButtonsDirection = direction ?? ActionIconButtonDirections.UP;
    const primaryIconButtonPosition = PrimaryIconButtonPositionsByActionIconButtonDirection[actionIconButtonsDirection] ?? PrimaryIconButtonPositions.BOTTOM_RIGHT;
    const handleIconButtonClickFactory = useCallback(onClickCallback => (...args) => {
        toggleDisplaySecondaryIcons(previousState => {
            return !previousState;
        });
        // bubble up the event handling
        onClickCallback?.(...args);
    }, [toggleDisplaySecondaryIcons]);
    return (
        <div ref={ref} className={ClassesUtil.concat(CLASSNAMES.root[primaryIconButtonPosition], className)}>
            <div className={CLASSNAMES.menu.root[actionIconButtonsDirection]}>
                {
                    primaryIcon
                        ? cloneElement(
                            primaryIcon,
                            {
                                ...primaryIcon.props,
                                iconProps: {svg: {
                                    className: getPrimaryClassNames(deviceType, displaySecondaryIcons)
                                }},
                                onClick: handleIconButtonClickFactory(primaryIcon.props.onClick)
                            }
                        )
                        : primaryIcon
                }
                {
                    Children.map(children, (child, index) => (
                        <Fragment key={index}>
                            {
                                isValidElement(child)
                                    ? cloneElement(child, {
                                        ...child.props,
                                        className: getSecondaryClassName(deviceType, displaySecondaryIcons),
                                        onClick: handleIconButtonClickFactory(child.props.onClick)
                                    })
                                    : child
                            } 
                        </Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default forwardRef<HTMLDivElement, Props>(withDisplayName<Props>()(SpeedDial));
