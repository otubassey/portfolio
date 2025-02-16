"use client";

import { ForwardedRef, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import List from "@/hwiui/widgets/list/list";

import NavigationListItem from "./navigationListItem";
import { HeaderNavBarNavigationLabels } from "./navigation.constants";
import { NavigationState } from "./hooks/useNavigation";
import { NavigationSelectEventHandler, NavigationLabelType } from "./navigation.types";

type ClassNameProp = {
    root?: string;
    list?: {
        root?: string;
        item?: string;
    };
};

export type Props = {
    className?: ClassNameProp | null;
    onNavigate?: NavigationSelectEventHandler | null;
    navigationItem?: NavigationState | null;
};

const NavigationList = forwardRef<HTMLElement, Props>(({
    className = null,
    onNavigate = null,
    navigationItem = null
}: Props, ref: ForwardedRef<HTMLElement>) => {
    return (
        <nav ref={ref} className={className?.root}>
            <List className="pt-8">
                {
                    HeaderNavBarNavigationLabels.map((navigation: NavigationLabelType) => (
                        <NavigationListItem
                            key={navigation}
                            label={navigation}
                            onClick={onNavigate}
                            value={navigation}
                            selected={(navigationItem?.[navigation as keyof NavigationLabelType] as NavigationState).display}
                        />
                    ))
                }
            </List>
        </nav>
    );
});

NavigationList.displayName = getDisplayName(NavigationList);

NavigationList.propTypes = {
    className: PropTypes.shape({
        root: PropTypes.string,
        list: PropTypes.shape({
            root: PropTypes.string,
            item: PropTypes.string
        })
    }),
    onNavigate: PropTypes.func,
    navigationItem: PropTypes.object
};

export default memo(NavigationList);
