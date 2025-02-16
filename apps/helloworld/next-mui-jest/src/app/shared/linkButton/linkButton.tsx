import { memo } from "react";

import Link from "next/link";

import { Typography, styled } from "@mui/material";

import { displayName } from "@/packages/hwiui";
import { StringUtils, ValuesOf } from "@/packages/hwiutils";
import PageName from "../pageName";

const NextLink = styled(Link, {
    name: "HwiNextLink"
})({
    alignItems: "center",
    display: "inline-flex",
    padding: "5px 15px"
});

type LinkButtonAttributes = {
    page: ValuesOf<typeof PageName>;
    selected: boolean;
};

const LinkButton = ({
    page,
    selected
}: LinkButtonAttributes) => {
    return (
        <NextLink href={`/${StringUtils.toLowerCase(page)}`}>
            <Typography color={selected ? "textPrimary" : "inherit"}>{page}</Typography>
        </NextLink>
    );
};

export default memo(displayName()(LinkButton));
