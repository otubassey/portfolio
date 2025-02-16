import { ForwardedRef, forwardRef, ReactNode } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

import { ValuesOf } from "@/packages/hwiutils";
import { displayName } from "../../decorator";

const Divider = {
    BOTH: "both",
    BOTTOM: "bottom",
    NONE: "none",
    TOP: "top"
} as const;

type SectionContentAttributes = {
    children?: ReactNode;
    disableGutters?: boolean;
    divider?: ValuesOf<typeof Divider>;
};

const SectionContent = ({
    children,
    disableGutters,
    divider // TODO: to be implemented
}: SectionContentAttributes, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <Box
            ref={ref}
            sx={{
                display: "grid",
                paddingX: !disableGutters ? 2 : 0
            }}>
            {children}
        </Box>
    );
};

SectionContent.propTypes = {
    children: PropTypes.node,
    disableGutters: PropTypes.bool,
    divider: PropTypes.oneOf(Object.values(Divider))
};

export default forwardRef<HTMLDivElement, SectionContentAttributes>(displayName()(SectionContent));
