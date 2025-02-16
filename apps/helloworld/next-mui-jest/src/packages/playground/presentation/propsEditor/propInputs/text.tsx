import { ForwardedRef, forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

import { displayName } from "@/packages/hwiui";
import { TextPlaygroundAttributesRecord } from "@/packages/playground";
import { PropInputProps } from "../types";

type Props = Omit<PropInputProps, "componentMapping" | "node"> & {
    node: TextPlaygroundAttributesRecord;
};

// TODO: implement htmlFor
const Text = ({
    node,
    onNodeChange
}: Props, ref: ForwardedRef<HTMLParagraphElement>) => {
    const handleClick = useCallback(() => {
        onNodeChange?.(node);
    }, [node, onNodeChange]);
    return (
        <Typography
            ref={ref}
            color={node.get("disabled") ? "textDisabled" : (node.get("color") ?? "")}
            onClick={node.get("clickable") && !node.get("disabled") ? handleClick : undefined}
            sx={{cursor: node.get("clickable") && !node.get("disabled") && "pointer"}}>
            {String(node.get("label", "--"))}
        </Typography>
    );
};

Text.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default memo(forwardRef<HTMLParagraphElement, Props>(displayName()(Text)));
