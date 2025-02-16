import { ChangeEvent, ForwardedRef, forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Alert, Box } from "@mui/material";

import { displayName } from "@/packages/hwiui";
import { PlaygroundAttributesRecord } from "@/packages/playground";
import ChoiceInput from "./choiceInput";
import onChangeDispatcher from "./onChangeDispatcher";
import { useChoiceGroup } from "../choiceGroup";
import Fragment from "../fragment";
import { PropInputProps } from "../../types";

type Props = Omit<PropInputProps, "node" | "onNodeChange"> & {
    node: PlaygroundAttributesRecord;
    checked?: boolean;
    multiple?: boolean;
    onNodeChange?: (previous: PlaygroundAttributesRecord, current: PlaygroundAttributesRecord) => void;
};

const Choice = ({
    node,
    componentMapping,
    checked = false,
    multiple = false,
    onNodeChange: onNodeChangeProp
}: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const choiceGroupContext = useChoiceGroup();
    const onNodeChange = onChangeDispatcher(onNodeChangeProp, choiceGroupContext?.onNodeChange);
    const handleChoiceInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onNodeChange?.(node, node.set("checked", event.target.checked));
    }, [node, onNodeChange]);
    const handleFragmentNodeChange = useCallback((fragmentNode: PlaygroundAttributesRecord) => {
        const previousCheckedState = node.get("checked", false);
        let updatedChecked = true;
        if(node.get("type", null) === "checkbox" || multiple) {
            updatedChecked = !previousCheckedState;
        }
        const updatedChildren = node?.get("children")?.map((childNode: PlaygroundAttributesRecord) => (
            childNode.get("id") === fragmentNode.get("id")
                ? fragmentNode
                : childNode
        ));
        const modifiedNode = node.set("checked", updatedChecked).set("children", updatedChildren);
        onNodeChange?.(node, modifiedNode);
    }, [multiple, node, onNodeChange]);
    if(!node) {
        return <Alert severity="warning">Invalid Choice Node</Alert>;
    }
    return (
        <Box ref={ref} sx={{alignItems: "center", display: "flex"}}>
            <ChoiceInput
                checked={checked}
                multiple={multiple}
                node={node}
                onChange={handleChoiceInputChange}
            />
            <Fragment
                componentMapping={componentMapping}
                node={node}
                onNodeChange={!node.get("disabled") ? handleFragmentNodeChange : null}
            />
        </Box>
    );
};

Choice.propTypes = {
    node: PropTypes.object,
    componentMapping: PropTypes.object,
    checked: PropTypes.bool,
    multiple: PropTypes.bool,
    onNodeChange: PropTypes.func
};

export default memo(forwardRef<HTMLDivElement, Props>(displayName()(Choice)));
