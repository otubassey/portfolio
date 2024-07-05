"use client";

import { memo, useCallback } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { DeviceType, DeviceTypes } from "@/ui/utils";
import { ICON_NAMES, IconButton } from "@/ui/widgets/icon";
import { SpeedDial } from "@/ui/widgets/speedDial";

import { MobileFabNavigationLabels, NonMobileFabNavigationLabels, NavigationLabel } from "./navigation.constants";
import { NavigationSelectEventHandler, NavigationLabelType } from "./navigation.types";

const CLASSNAMES = {
    mobile: {
        root: "block sm:hidden"
    },
    nonMobile: {
        root: "hidden sm:block"
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
    deviceType: DeviceType;
    onNavigate?: NavigationSelectEventHandler | null;
};

NavigationFAB.propTypes = {
    deviceType: PropTypes.oneOf(Object.values(DeviceTypes)),
    onNavigate: PropTypes.func
};

function NavigationFAB({deviceType, onNavigate}: Props) {
    const handleOnSelectFactory = useCallback((navigation: NavigationLabelType) => () => {
        onNavigate?.(navigation);
    }, [onNavigate]);
    return (
        <>
            <SpeedDial
                className={CLASSNAMES.nonMobile.root}
                deviceType={deviceType}
                direction="Up"
                primaryIcon={<IconButton color="primary" icon="Add" />}>
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
                deviceType={deviceType}
                direction="Up"
                primaryIcon={<IconButton color="primary" icon="Add" />}>
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
