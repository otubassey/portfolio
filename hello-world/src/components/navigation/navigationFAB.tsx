"use client";

import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ICON_NAMES, IconButton } from "@/ui/widgets/icon";
import { SpeedDial } from "@/ui/widgets/speedDial";

import { MobileFabNavigationLabels, NonMobileFabNavigationLabels, NavigationLabel } from "./navigation.constants";
import { NavigationSelectEventHandler, NavigationLabelType } from "./navigation.types";

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
    [NavigationLabel.EXPERIENCES]: ICON_NAMES.WORK_HISTORY,
    [NavigationLabel.HOME]: ICON_NAMES.HOME,
    [NavigationLabel.PROJECTS]: ICON_NAMES.CASES,
    [NavigationLabel.SETTINGS]: ICON_NAMES.SETTINGS,
    [NavigationLabel.SKILLS]: ICON_NAMES.PSYCHOLOGY
} as const;

export type Props = {
    onNavigate?: NavigationSelectEventHandler | null;
};

NavigationFAB.propTypes = {
    onNavigate: PropTypes.func
};

function NavigationFAB({onNavigate}: Props) {
    const handleOnSelectFactory = useCallback((navigation: NavigationLabelType) => () => {
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
                    NonMobileFabNavigationLabels.map(navigation => (
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
                    MobileFabNavigationLabels.map(navigation => (
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
