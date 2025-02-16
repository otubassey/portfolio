import { ForwardedRef, forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Alert, FormControl, InputLabel, MenuItem as MuiMenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";
import {List as ImmutableList} from "immutable";

import { displayName } from "@/packages/hwiui";
import { InputPlaygroundAttributesRecord, PlaygroundAttributesRecord } from "@/packages/playground";
import { PropInputProps } from "../types";

const NONE_MENU_ITEM_VALUE = "none";

function findChildNodeById(node: InputPlaygroundAttributesRecord, nodeId: string) {
    if(!node?.get("children")?.size || !nodeId) {
        return null;
    }
    return node.get("children")
        ?.find((child: PlaygroundAttributesRecord) => child.get("id") === nodeId)
        ?? null;
}

function mapValue(node: InputPlaygroundAttributesRecord) {
    if(node.get("multiple")) {
        if(ImmutableList.isList(node.get("value")) && node.get("value").size > 0) {
            const selectedIds = node.get("value")
                .map((child: PlaygroundAttributesRecord) => child.get("id", ""));
            return selectedIds.toJS();
        }
        return [NONE_MENU_ITEM_VALUE];
    }
    return node.get("value")
        ? node.getIn(["value", "id"])
        : NONE_MENU_ITEM_VALUE;
}

type Props = Omit<PropInputProps, "node"> & {
    node: InputPlaygroundAttributesRecord;
};

const Select = ({
    node,
    onNodeChange
}: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const handleMultipleSelectChange = useCallback((event: SelectChangeEvent) => {
        let selectedItems: Array<string> = Array.isArray(event.target.value)
            ? event.target.value
            : [];
        const index = selectedItems.indexOf(NONE_MENU_ITEM_VALUE);
        if(index === 0) {
            selectedItems = selectedItems.filter((item) => item !== NONE_MENU_ITEM_VALUE);
        }
        if(index > 0) {
            selectedItems = [];
        }
        const matchingNodes = selectedItems
            .map((item) => findChildNodeById(node, item))
            .filter(Boolean);
        onNodeChange(node.set("value", ImmutableList(matchingNodes)));
    }, [node, onNodeChange]);
    const handleSingleSelectChange = useCallback((event: SelectChangeEvent) => {
        let selectedItem: string = event.target.value;
        if(selectedItem === NONE_MENU_ITEM_VALUE) {
            selectedItem = "";
        }
        const matchingNode = findChildNodeById(node, selectedItem);
        onNodeChange(node.set("value", matchingNode));
    }, [node, onNodeChange]);
    const handleChange = useCallback((event: SelectChangeEvent) => {
        if(node.get("multiple")) {
            handleMultipleSelectChange(event);
        } else {
            handleSingleSelectChange(event);
        }
    }, [handleMultipleSelectChange, handleSingleSelectChange]);
    if(!node) {
        return <Alert severity="warning">Invalid Select Node</Alert>;
    }
    return (
        <FormControl ref={ref} sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={`${node.get("id")}-label`}>{node.get("title")}</InputLabel>
            <MuiSelect
                displayEmpty
                disabled={node.get("disabled") ?? false}
                id={node.get("id")}
                inputProps={{ "aria-label": node.get("label") }}
                labelId={`${node.get("id")}-label`}
                multiple={node.get("multiple")}
                onChange={handleChange}
                required={node.get("multiple") ?? false}
                value={mapValue(node)}>
                <MuiMenuItem value={NONE_MENU_ITEM_VALUE}>
                    <em>None</em>
                </MuiMenuItem>
                {node.get("children")?.map(child => (
                    <MuiMenuItem
                        key={child.get("id", "")}
                        value={child.get("id", "") ?? ""}>
                        {child.get("label") ?? "--"}
                    </MuiMenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

Select.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default memo(forwardRef<HTMLDivElement, Props>(displayName()(Select)));
