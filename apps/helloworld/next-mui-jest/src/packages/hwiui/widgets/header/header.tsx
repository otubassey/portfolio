import { ElementType, memo, ReactNode } from "react";

import { Typography, TypographyProps } from "@mui/material";

import { displayName } from "../../decorator";

type HeaderAttributes = {
    children?: ReactNode;
    component?: ElementType;
    title?: string;
    TypographyProps?: TypographyProps;
};

const Header = ({
    children,
    component,
    title,
    TypographyProps
}: HeaderAttributes) => {
    // TODO: add dynamic variant
    const Component = component || "header";
    return (
        <Component>
            {
                title &&
                <Typography sx={{paddingX: 3, paddingY: 2}} variant="h2" {...TypographyProps}>{title}</Typography>
            }
            {children}
        </Component>
    );
};

export default memo(displayName()(Header));
