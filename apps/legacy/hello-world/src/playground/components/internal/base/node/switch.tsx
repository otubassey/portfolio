import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import {Switch as HWIUISwitch} from "@/hwiui/widgets/switch";

import { Props } from "../../common";

const Switch = ({node, onNodeChange}: Props) => {
    const handleChange = useCallback(() => {
        onNodeChange(node!.set("value", Boolean(!node?.get("value"))));
    }, [node, onNodeChange]);
    if(!node) {
        return "Invalid Switch Node";
    }
    return (
        <HWIUISwitch checked={node.get("value") ?? false} onChange={handleChange} />
    );
};

Switch.displayName = getDisplayName(Switch);

Switch.propTypes = {
    children: PropTypes.node,
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default memo(Switch);
