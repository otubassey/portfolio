import { ChangeEvent, memo, useCallback } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

import {Select as RegularSelect} from "../regular"
import { Props } from "../../common";

type SelectProps = Props & {
    displayEmpty?: boolean;
    emptyLabel?: string;
};

const Select = ({
    children,
    displayEmpty,
    emptyLabel,
    node,
    onNodeChange
}: SelectProps) => {
    const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        onNodeChange(node!.set("value", event.target.value ?? null));
    }, [node, onNodeChange]);
    const handleFocus = useCallback(() => {
        onNodeChange(node!);
    }, [node, onNodeChange]);
    if(!node) {
        return "Invalid Select Node";
    }
    return (
        <RegularSelect
            displayEmpty={displayEmpty}
            emptyLabel={emptyLabel}
            onChange={handleChange}
            onFocus={handleFocus}
            title={node.get("displayName")}
            value={node.get("value")}>
            {children}
        </RegularSelect>
    );
};

Select.displayName = getDisplayName(Select);

Select.propTypes = {
    children: PropTypes.node,
    displayEmpty: PropTypes.bool,
    emptyLabel: PropTypes.string,
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default memo(Select);
