import { ForwardedRef, forwardRef, ReactNode } from "react";
import PropTypes from "prop-types";

import { getDisplayName, namedMemo } from "@/hwiui/decorator";

import Icon from "./icon";
import { IconName } from "./icon.constants";
import { SVGIconProps } from "./icon.types";
import { ValuesOf } from "../common";

type Props = SVGIconProps & {
    isExpanded: boolean;
    collapseIcon?: ReactNode | ValuesOf<typeof IconName>;
    disabled?: boolean;
    expandIcon?: ReactNode | ValuesOf<typeof IconName>;
};

const ExpandIcon = forwardRef(({
    isExpanded: isExpandedProp = false,
    collapseIcon: collapseIconProp,
    disabled = false,
    expandIcon: expandIconProp,
    ...otherProps
}: Props, ref: ForwardedRef<SVGElement>) => {
    const collapseIcon = collapseIconProp ?? IconName.EXPAND_MORE;
    const expandIcon = expandIconProp ?? IconName.EXPAND_LESS;
    const {color, ...otherIconProps} = otherProps ?? {};
    const iconColor = disabled ? "disabled" : color;
    const isExpanded = !disabled && isExpandedProp;
    if(isExpanded) {
        return (
            <>
                {
                    typeof expandIcon === "string"
                        ? (
                            <Icon
                                ref={ref}
                                className="fill-current"
                                color={iconColor}
                                name={expandIcon}
                                {...otherIconProps}
                            />
                        )
                        : expandIcon
                }
            </>
        );
    }
    return (
        <>
            {
                typeof collapseIcon === "string"
                    ? (
                        <Icon
                            ref={ref}
                            className="fill-current"
                            color={iconColor}
                            name={collapseIcon}
                            {...otherIconProps}
                        />
                    )
                    : collapseIcon
            }
        </>
    );
});

ExpandIcon.displayName = getDisplayName(ExpandIcon);

ExpandIcon.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    collapseIcon: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.oneOf(Object.values(IconName))
    ]),
    disabled: PropTypes.bool.isRequired,
    expandIcon: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.oneOf(Object.values(IconName))
    ])
};

export default namedMemo(ExpandIcon);
