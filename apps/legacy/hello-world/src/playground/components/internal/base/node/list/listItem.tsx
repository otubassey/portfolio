import PropTypes from "prop-types";

import { getDisplayName, namedMemo } from "@/hwiui/decorator";
import { ListItem as HWIUIListItem } from "@/hwiui/widgets/list";

import {FormControlLabel} from "../form";
import { Props } from "../../../common";

const ListItem = ({node, onNodeChange}: Props) => {
    if(!node) {
        return "Invalid ListItem Node";
    }
    return (
        <HWIUIListItem className="grid grid-cols-2 w-full border border-red-500">
            <FormControlLabel
                node={node}
                onNodeChange={onNodeChange}
            />
        </HWIUIListItem>
    );
};

ListItem.displayName = getDisplayName(ListItem);

ListItem.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default namedMemo(ListItem);
