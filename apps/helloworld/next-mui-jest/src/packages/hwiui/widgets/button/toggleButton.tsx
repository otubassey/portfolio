import { ForwardedRef, forwardRef, memo, ReactNode } from "react";
import PropTypes from "prop-types";

import { ToggleButton as MuiToggleButton, ToggleButtonProps } from "@mui/material";

import { displayName } from "../../decorator";

export type ToggleButtonAttributes = ToggleButtonProps & {
    defaultNode?: ReactNode;
    selectedNode?: ReactNode;
};

const ToggleButton = ({
    children,
    defaultNode,
    selected,
    selectedNode,
    ...toggleButtonProps
}: ToggleButtonAttributes, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
        <MuiToggleButton ref={ref} selected={selected} {...toggleButtonProps}>
            {selected ? selectedNode : defaultNode}
            {children}
        </MuiToggleButton>
    );
};

ToggleButton.propTypes = {
    defaultNode: PropTypes.node,
    selected: PropTypes.bool,
    selectedNode: PropTypes.node
};

export default memo(forwardRef<HTMLButtonElement, ToggleButtonAttributes>(displayName()(ToggleButton)));
