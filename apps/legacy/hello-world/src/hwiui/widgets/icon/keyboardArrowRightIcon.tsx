import { ForwardedRef, ReactElement, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

const KeyboardArrowRightIcon = forwardRef<SVGElement, SVGIconProps>(({
    description,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGElement>): ReactElement<SVGIconProps> => {
    return (
        <SVGBase
            ref={ref}
            description={description || "KeyboardArrowRight Icon"}
            title={title || "keyboardArrowRight"}
            {...otherProps}>
            <path
                d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
            />
        </SVGBase>
    );
});

KeyboardArrowRightIcon.displayName = getDisplayName(KeyboardArrowRightIcon);

KeyboardArrowRightIcon.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    role: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default KeyboardArrowRightIcon;
