import { ChangeEvent, ForwardedRef, forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Alert, Switch as MuiSwitch } from "@mui/material";

import { displayName } from "@/packages/hwiui";
import { BooleanUtils } from "@/packages/hwiutils";
import { InputPlaygroundAttributesRecord } from "@/packages/playground";

import { PropInputProps } from "../types";

type Props = Omit<PropInputProps, "node"> & {
    node: InputPlaygroundAttributesRecord;
};

const Switch = ({
    node,
    onNodeChange
}: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onNodeChange(node
            .set("checked", event.target.checked)
            .set("value", BooleanUtils.isBoolean(event.target.value, true) ? event.target.checked : event.target.value)
        );
    }, [node, onNodeChange]);
    if(!node) {
        return <Alert severity="warning">Invalid Choice Node</Alert>;
    }
    return (
        <MuiSwitch
            ref={ref}
            checked={node.get("checked") ?? false}
            disabled={node.get("disabled") ?? false}
            onChange={handleChange}
            required={node.get("required") ?? false}
            value={node.get("value")}
        />
    );
};

Switch.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default memo(forwardRef<HTMLButtonElement, Props>(displayName()(Switch)));
