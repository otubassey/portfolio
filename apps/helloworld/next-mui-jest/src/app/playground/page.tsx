"use client";

import { memo } from "react";

import { Grid2 } from "@mui/material";

import { Dashboard } from "./dashboard";
import { NavigationSection } from "./navigation";
import { useLayoutPage } from "../shared";

const Playground = () => {
    const {activeNavigationItem, onNavigationItemChange} = useLayoutPage();
    return (
        <>
            {/* Non-Mobile Screens */}
            <Grid2
                container
                spacing={1}
                sx={{
                    display: {
                        md: "flex",
                        xs: "none"
                    }
                }}>
                <Grid2 size={3}>
                    <NavigationSection
                        activeItem={activeNavigationItem}
                        onChange={onNavigationItemChange}
                    />
                </Grid2>
                <Grid2 size={9}>
                    <Dashboard item={activeNavigationItem} />
                </Grid2>
            </Grid2>

            {/* Mobile Screens */}
            <Grid2 size={12} sx={{display: { xs: "flex", md: "none"}}}>
                <Dashboard item={activeNavigationItem} />
            </Grid2>
        </>
    );
};

export default memo(Playground);
