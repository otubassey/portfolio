import { memo } from "react";
import PropTypes from "prop-types";

import { displayName } from "@/packages/hwiui";
import { FragmentPlaygroundAttributesRecord } from "@/packages/playground/shared";

import ComponentPropsNodeRenderer from "../componentPropsNodeRenderer";
import { PropInputProps } from "../types";

type Props = Omit<PropInputProps, "node"> & {
    node: FragmentPlaygroundAttributesRecord;
};

const Fragment = ({
    node,
    onNodeChange,
    componentMapping
}: Props) => {
    if(!node) {
        return null;
    }
    return (
        node.get("children")?.map((childNode) => (
            <ComponentPropsNodeRenderer
                key={childNode.get("id", "")}
                componentMapping={componentMapping}
                node={childNode}
                onNodeChange={onNodeChange}
            />
        ))
    );
};

Fragment.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func,
    componentMapping: PropTypes.object
};

export default memo(displayName()(Fragment));
