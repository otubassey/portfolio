import { ReactNode } from "react";

import { Typography } from "@mui/material";
import { displayName } from "@/packages/hwiui";

type PresentationContainerContentTextProps = {
    children?: ReactNode;
};

const PresentationContainerContentText = ({
    children
}: PresentationContainerContentTextProps) => {
    return (
        <Typography>{children}</Typography>
    );
};

export default displayName()(PresentationContainerContentText);
