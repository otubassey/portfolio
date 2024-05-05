"use client";

import { memo, useCallback } from "react";

import { withDisplayName } from "@/ui/decorator";
import { FAB_MOBILE_SCREEN_NAVIGATION, FAB_NON_MOBILE_SCREEN_NAVIGATION, NAVIGATION } from "./navigation.constants";

import { ICON_NAMES, IconButton } from "@/ui/widgets/icon";
import { SpeedDial } from "@/ui/widgets/speedDial";
import { NavigationSelectEventHandler, NavigationType } from "./navigation.types";

const IconNamesByNavigation = {
    [NAVIGATION.EXPERIENCES]: ICON_NAMES.WORK_HISTORY,
    [NAVIGATION.HOME]: ICON_NAMES.HOME,
    [NAVIGATION.PROJECTS]: ICON_NAMES.CASES,
    [NAVIGATION.SETTINGS]: ICON_NAMES.SETTINGS,
    [NAVIGATION.SKILLS]: ICON_NAMES.PSYCHOLOGY
} as const;

export type NavigationFABProps = {
    onNavigate?: NavigationSelectEventHandler | null,
    selectedNavigation?: NavigationType | null
};

function NavigationFAB({onNavigate}: NavigationFABProps) {
    const handleOnSelectFactory = useCallback((navigation: NavigationType) => () => {
        onNavigate?.(navigation);
    }, [onNavigate]);
    return (
        <>
            <SpeedDial
                className="hidden sm:block fixed"
                direction="Up"
                primaryIcon={
                    <IconButton
                        icon="Add"
                        className="bg-primaryMain"
                        iconProps={{svg: {className: "fill-primaryContrast group-hover:rotate-90 transition  transition-all duration-[0.6s]"}}}
                    />
                }>
            {/* <SpeedDial className="hidden sm:block fixed" primaryIcon={<IconButton icon="Add" className="bg-primary" />} direction="Up"> */}
            {/* <SpeedDial className="hidden sm:block fixed" primaryIcon={<IconButton icon="Add" className="bg-[#f9a825]" />} direction="Up"> */}
                {
                    // FAB_NON_MOBILE_SCREEN_NAVIGATION.map(navigation => (
                    //     <IconButton
                    //         key={navigation}
                    //         icon={IconNamesByNavigation[navigation]}
                    //         onClick={handleOnSelectFactory(navigation)}
                    //     />
                    // ))

                    FAB_MOBILE_SCREEN_NAVIGATION.map(navigation => (
                        <IconButton
                            key={navigation}
                            icon={IconNamesByNavigation[navigation]}
                            onClick={handleOnSelectFactory(navigation)}
                        />
                    ))
                }
            </SpeedDial>
            <SpeedDial
                className="block sm:hidden"
                direction="Up"
                primaryIcon={
                    <IconButton
                        icon="Add"
                        className="bg-primaryMain"
                        iconProps={{svg: {className: "fill-primaryContrast group-hover:rotate-90 transition transition-all duration-[0.6s]"}}}
                    />
                }>
                {
                    FAB_MOBILE_SCREEN_NAVIGATION.map(navigation => (
                        <IconButton
                            key={navigation}
                            icon={IconNamesByNavigation[navigation]}
                            onClick={handleOnSelectFactory(navigation)}
                        />
                    ))
                }
            </SpeedDial>
        </>
    );
}

export default memo(withDisplayName<NavigationFABProps>()(NavigationFAB));
