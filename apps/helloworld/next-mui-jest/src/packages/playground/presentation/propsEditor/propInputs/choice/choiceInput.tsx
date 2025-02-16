import { ChangeEvent, ForwardedRef, forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Checkbox as MUICheckbox, Radio as MUIRadio} from "@mui/material";

import { displayName } from "@/packages/hwiui";
import { PlaygroundAttributesRecord } from "@/packages/playground";
import { PropInputProps } from "../../types";

type Props = Omit<PropInputProps, "componentMapping" | "node" | "onNodeChange"> & {
    node: PlaygroundAttributesRecord;
    checked?: boolean;
    multiple?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>, node: PlaygroundAttributesRecord) => void;
};

const ChoiceInput = ({
    node,
    checked: checkedProp = false,
    multiple = false,
    onChange
}: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        onChange?.(event, node.set("checked", checked));
    }, [node, onChange]);
    const InputComponent = multiple ? MUICheckbox : MUIRadio;
    return (
        <InputComponent
            ref={ref}
            checked={checkedProp || node.get("checked", false)}
            disabled={node.get("disabled", false)}
            id={node.get("id")}
            inputProps={{
                "aria-label": node.get("label", "")
            }}
            name={node.get("name", "")}
            onChange={handleChange}
            required={node.get("required", false)}
            value={node.get("value", null)}
        />
    );
};

ChoiceInput.propTypes = {
    node: PropTypes.object,
    checked: PropTypes.bool,
    multiple: PropTypes.bool,
    onChange: PropTypes.func
};

export default memo(forwardRef<HTMLButtonElement, Props>(displayName()(ChoiceInput)));
