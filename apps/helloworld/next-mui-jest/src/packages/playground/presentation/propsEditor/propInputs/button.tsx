import { ForwardedRef, forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Alert, Button as MUIButton } from "@mui/material";

import { displayName } from "@/packages/hwiui";
import { ButtonPlaygroundAttributesRecord } from "@/packages/playground";
import { PropInputProps } from "../types";

type ButtonProps = Omit<PropInputProps, "componentMapping" | "node"> & {
    node: ButtonPlaygroundAttributesRecord;
};

const Button = ({
    node,
    onNodeChange
}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const handleClick = useCallback(() => {
        onNodeChange?.(node);
    }, [node, onNodeChange]);
    if(!node) {
        return <Alert severity="warning">Invalid Button Node</Alert>;
    }
    return (
        <MUIButton
            ref={ref}
            color={node.get("color")}
            disabled={node.get("disabled") ?? false}
            endIcon={node.get("endIcon")}
            fullWidth={node.get("fullWidth")}
            onClick={handleClick}
            size={node.get("size")}
            startIcon={node.get("startIcon")}
            variant={node.get("variant")}>
            {node.get("label")}
        </MUIButton>
    );
};

Button.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default memo(forwardRef<HTMLButtonElement, ButtonProps>(displayName()(Button)));
