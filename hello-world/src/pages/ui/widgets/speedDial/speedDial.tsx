import { ForwardedRef, Fragment, ReactNode, cloneElement, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/pages/ui/decorator";

import { ClassesUtil } from "../../utils";

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
        }
    }
} as const;

const PrimaryIconButtonPositionsByActionIconButtonDirection = {
    [ActionIconButtonDirections.DOWN]: PrimaryIconButtonPositions.TOP_LEFT,
    [ActionIconButtonDirections.LEFT]: PrimaryIconButtonPositions.BOTTOM_RIGHT,
    [ActionIconButtonDirections.RIGHT]: PrimaryIconButtonPositions.TOP_LEFT,
    [ActionIconButtonDirections.UP]: PrimaryIconButtonPositions.BOTTOM_RIGHT,
} as const;

type Direction = typeof ActionIconButtonDirections[keyof typeof ActionIconButtonDirections];

type SpecialDialProps = {
    children?: ReactNode;
    className?: string;
    direction?: Direction;
    primaryIcon?: ReactNode;
};

SpeedDial.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(ActionIconButtonDirections)),
    primaryIcon: PropTypes.node
};

function SpeedDial({children = null, className, direction, primaryIcon = null}: SpecialDialProps, ref: ForwardedRef<HTMLDivElement>) {
    const actionIconButtonsDirection = direction ?? ActionIconButtonDirections.UP;
    const primaryIconButtonPosition = PrimaryIconButtonPositionsByActionIconButtonDirection[actionIconButtonsDirection] ?? PrimaryIconButtonPositions.BOTTOM_RIGHT;
    return (
        <div ref={ref} className={ClassesUtil.concat(CLASSNAMES.root[primaryIconButtonPosition], className)}>
            <div className={CLASSNAMES.menu.root[actionIconButtonsDirection]}>
                {primaryIcon}
                {
                    children?.map((child, index) => (
                        <Fragment key={index}>
                            {cloneElement(child, {className: "hidden group-hover:block self-center", ...child.props})} 
                        </Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default forwardRef<SpecialDialProps, HTMLDivElement>(withDisplayName<SpecialDialProps>()(SpeedDial));
