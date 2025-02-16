import { memo } from "react";

import { Divider, Grid2 } from "@mui/material";

import { NavigationSection } from "@/app/playground/navigation";
import { displayName, Section } from "@/packages/hwiui";
import { StringUtils } from "@/packages/hwiutils";

import { LinkButton } from "../../linkButton";
import PageName from "../../pageName";
import { useLayoutPage } from "../../context";

type NavigationProps = {
    activePathName: string;
};

const Navigation = ({
    activePathName
}: NavigationProps) => {
    const {activeNavigationItem, onNavigationItemChange} = useLayoutPage();
    return (
        <Grid2 component="nav" sx={{display: "grid", gap: 2}}>
            <Section>
                Page Navigation
                <Grid2 container>
                    {
                        Object.values(PageName).map((page) => (
                            <Grid2 key={page} size="auto">
                                <LinkButton
                                    page={page}
                                    selected={StringUtils.includesIgnoreCase(activePathName, page)}
                                />
                            </Grid2>
                        ))
                    }
                </Grid2>
            </Section>
            <Divider />
            <NavigationSection activeItem={activeNavigationItem} onChange={onNavigationItemChange} />
        </Grid2>
    )
};

export default memo(displayName()(Navigation));
