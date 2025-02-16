import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ImmutablePlaygroundAttributes } from "@/playground/components/common";

import {FormControl as RegularFormControl} from "../../regular";
import { NodeRenderer, Props } from "../../../common";

const FormControl = ({
    node,
    onNodeChange
}: Props) => {
    const handleChildNodeChange = useCallback((modifiedChildNode: ImmutablePlaygroundAttributes) => {
        console.log("tagged-FormControl-handleControlNodeChange: vals =", {
            modifiedChildNode: modifiedChildNode?.toJS(),
            node: node?.toJS()
        });
        // onNodeChange?.(node!.set("additionalAttributes", updatedAttributes));
    }, [node, onNodeChange]);
    return (
        <RegularFormControl>
            {
                node?.get("children").map((child: ImmutablePlaygroundAttributes) => (
                    <NodeRenderer key={child.get("id")} node={child} onNodeChange={handleChildNodeChange} />
                ))
            }
        </RegularFormControl>
    );
};

FormControl.displayName = getDisplayName(FormControl);

FormControl.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};


export default memo(FormControl);
