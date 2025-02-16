"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { CSSObject, Drawer as MuiDrawer, Grid2, Theme, styled } from "@mui/material";
import { usePathname } from "next/navigation";

import { displayName, useToggle } from "@/packages/hwiui";
import {AppBar} from "../appBar";
import {Navigation, SettingsSection} from "../drawer";

const openedMixin = (theme: Theme, width?: string | number): CSSObject => ({
    ...(width ? {width} : {}),
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden"
});

const Drawer = styled(MuiDrawer, {
    name: "HwiMuiDrawer"
})(({ theme, sx }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": openedMixin(theme, sx?.width)
            }
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": closedMixin(theme)
            }
        }
    ]
}));

type DashboardAttributes = {
    children?: ReactNode;
};

const Dashboard = ({
    children
}: DashboardAttributes) => {
    const activePathName = usePathname();
    const [isNavigationMenuSelected, toggleIsNavigationMenuSelected] = useToggle(false);
    const [isSettingsSelected, toggleIsSettingsSelected] = useToggle(false);
    const handleNavigationMenuChange = useCallback((_, selected: boolean) => {
        toggleIsNavigationMenuSelected(selected);
    }, []);
    const handleSettingsChange = useCallback((_, selected: boolean) => {
        toggleIsSettingsSelected(selected);
    }, []);
    useEffect(() => {
        toggleIsNavigationMenuSelected(false);
        toggleIsSettingsSelected(false);
    }, [activePathName]);
    useEffect(() => {
        if(isNavigationMenuSelected && isSettingsSelected) {
            toggleIsSettingsSelected(false);
        }
    }, [isNavigationMenuSelected]);
    useEffect(() => {
        if(isSettingsSelected && isNavigationMenuSelected) {
            toggleIsNavigationMenuSelected(false);
        }
    }, [isSettingsSelected]);
    return (
        <>
            <AppBar
                activePathName={activePathName}
                isNavigationMenuSelected={isNavigationMenuSelected}
                isSettingsSelected={isSettingsSelected}
                onNavigationMenuChange={handleNavigationMenuChange}
                onSettingsChange={handleSettingsChange}
            />
            <Grid2 component="main" container sx={{border: "1px solid red", height: "calc(100vh - 100px)", overflow: "hidden", transform: "translateZ(0)"}}>

                {/* Mobile Screens */}
                <Grid2 size={{ xs: 12 }} sx={{display: {xs: isNavigationMenuSelected ? "flex" : "none", md: "none"}}}>
                    <Drawer
                        anchor="left"
                        ModalProps={{
                            keepMounted: true
                        }}
                        open={isNavigationMenuSelected}
                        sx={{
                            width: "100%"
                        }}
                        variant="persistent">
                        <Navigation activePathName={activePathName} />
                    </Drawer>
                </Grid2>
                <Grid2 size={{ xs: 12 }} sx={{display: { xs: (isNavigationMenuSelected || isSettingsSelected) ? "none" : "flex", md: "none"}}}>
                    {children}
                </Grid2>
                <Grid2 size={{ xs: 12 }} sx={{ display: {xs: isSettingsSelected ? "flex" : "none", md: "none"} }}>
                    <Drawer
                        anchor="right"
                        ModalProps={{
                            keepMounted: true
                        }}
                        variant="persistent"
                        open={isSettingsSelected}
                        sx={{
                            width: "100%"
                        }}>
                        <SettingsSection />
                    </Drawer>
                </Grid2>
                
                {/* Non-Mobile Screens */}
                <Grid2 size={12}>
                    <Grid2 size="auto" sx={{ flexGrow: 1, display: { xs: "none", md: "grid" }, border: "1px solid blue"}}>
                        {children}
                    </Grid2>
                    <Grid2 size="auto" sx={{ flexGrow: 0.02, display: { xs: "none", md: isSettingsSelected ? "flex" : "none" }, border: "1px solid green"}}>
                        <Drawer
                            anchor="right"
                            ModalProps={{
                                keepMounted: true
                            }}
                            variant="persistent"
                            open={isSettingsSelected}>
                            <SettingsSection />
                        </Drawer>
                    </Grid2>
                </Grid2>

            </Grid2>
        </>
    );
};

export default displayName()(Dashboard);
