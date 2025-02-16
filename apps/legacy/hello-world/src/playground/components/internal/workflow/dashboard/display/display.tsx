import { memo } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

import DisplayNodeRenderer from "./displayNodeRenderer";
import {ImmutablePlaygroundAttributes} from "../../../../common";

type Props = {
    node: ImmutablePlaygroundAttributes | null;
};

const Display = ({node}: Props) => {
    return (
        <DisplayNodeRenderer node={node} />
    );
};

Display.displayName = getDisplayName(Display);

Display.propTypes = {
    node: PropTypes.object
};

export default memo(Display);
