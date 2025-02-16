import { ForwardedRef, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import { HwiuiIcon as BaseHwiuiIcon, displayName } from "@/packages/hwiui";
import { IconPlaygroundAttributesRecord } from "@/packages/playground";

type Props = {
    node: IconPlaygroundAttributesRecord;
};

const HwiuiIcon = ({
    node
}: Props, ref: ForwardedRef<SVGSVGElement>) => {
    return (
        <BaseHwiuiIcon ref={ref} name={node.get("name")} />
    );
};

HwiuiIcon.propTypes = {
    node: PropTypes.object
};

export default memo(forwardRef<SVGSVGElement, Props>(displayName()(HwiuiIcon)));
