"use client";

import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ICON_NAMES, IconButton } from "@/ui/widgets/icon";
import { SpeedDial } from "@/ui/widgets/speedDial";

import { FAB_MOBILE_SCREEN_NAVIGATION, FAB_NON_MOBILE_SCREEN_NAVIGATION, NAVIGATION } from "./navigation.constants";
import { NavigationSelectEventHandler, NavigationType } from "./navigation.types";

const CLASSNAMES = {
    mobile: {
        root: "block sm:hidden",
        primaryIcon: "fill-primaryContrastText group-hover:rotate-90 transition transition-all duration-[0.6s]"
    },
    nonMobile: {
        root: "hidden sm:block",
        primaryIcon: "fill-primaryContrastText group-hover:rotate-90 transition transition-all duration-[0.6s]"
    }
} as const;

const IconNamesByNavigation = {
    [NAVIGATION.EXPERIENCES]: ICON_NAMES.WORK_HISTORY,
    [NAVIGATION.HOME]: ICON_NAMES.HOME,
    [NAVIGATION.PROJECTS]: ICON_NAMES.CASES,
    [NAVIGATION.SETTINGS]: ICON_NAMES.SETTINGS,
    [NAVIGATION.SKILLS]: ICON_NAMES.PSYCHOLOGY
} as const;

export type Props = {
    onNavigate?: NavigationSelectEventHandler | null;
};

NavigationFAB.propTypes = {
    onNavigate: PropTypes.func
};

function NavigationFAB({onNavigate}: Props) {
    const handleOnSelectFactory = useCallback((navigation: NavigationType) => () => {
        onNavigate?.(navigation);
    }, [onNavigate]);
    return (
        <>
            <SpeedDial
                className={CLASSNAMES.nonMobile.root}
                direction="Up"
                primaryIcon={
                    <IconButton
                        icon="Add"
                        color="primary"
                        iconProps={{svg: {className: CLASSNAMES.nonMobile.primaryIcon}}}
                    />
                }>
                {
                    FAB_NON_MOBILE_SCREEN_NAVIGATION.map(navigation => (
                        <IconButton
                            key={navigation}
                            icon={IconNamesByNavigation[navigation]}
                            onClick={handleOnSelectFactory(navigation)}
                        />
                    ))
                }
            </SpeedDial>
            <SpeedDial
                className={CLASSNAMES.mobile.root}
                direction="Up"
                primaryIcon={
                    <IconButton
                        icon="Add"
                        color="primary"
                        iconProps={{svg: {className: CLASSNAMES.mobile.primaryIcon}}}
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

export default memo(withDisplayName<Props>()(NavigationFAB));
