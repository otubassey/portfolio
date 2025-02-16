import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { getDisplayName } from "@/hwiui/decorator";
import {ImmutablePlaygroundAttributes, PlaygroundUtils } from "@/playground/components/common";

import {FormControlLabel as RegularFormControlLabel} from "../../regular";
import { NodeRenderer, Props } from "../../../common";

function getAttribute(
    elementName: string,
    attributes?: Immutable.List<ImmutablePlaygroundAttributes>
): ImmutablePlaygroundAttributes | null {
    if(!attributes?.size) {
        return null;
    }
    return attributes.find(attribute => attribute.get("elementName") === elementName) ?? null;
}

const FormControlLabel = ({
    node,
    onNodeChange
}: Props) => {
    const handleControlNodeChange = useCallback((modifiedAttributeNode: ImmutablePlaygroundAttributes) => {
        const updatedAttributes = PlaygroundUtils.getAdditionalAttributes(node)
            .map((attribute: ImmutablePlaygroundAttributes) => (
                attribute.get("id") === modifiedAttributeNode.get("id")
                    ? modifiedAttributeNode
                    : attribute
            ));
        const modifiedNode = node!
            .set("additionalAttributes", updatedAttributes)
            .set("value", modifiedAttributeNode.get("value"));
        onNodeChange?.(modifiedNode);
    }, [node, onNodeChange]);
    const controlNode = getAttribute("control", node?.get("additionalAttributes"));
    const labelNode = getAttribute("label", node?.get("additionalAttributes"));
    const labelPlacementNode = getAttribute("labelPlacement", node?.get("additionalAttributes"));
    if(!controlNode) {
        return null;
    }
    return (
        <RegularFormControlLabel
            control={<NodeRenderer node={controlNode} onNodeChange={handleControlNodeChange} />}
            label={labelNode?.get("value")}
            labelPlacement={labelPlacementNode?.get("value")}
        />
    );
};

FormControlLabel.displayName = getDisplayName(FormControlLabel);

FormControlLabel.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default memo(FormControlLabel);
