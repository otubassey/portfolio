import { ForwardedRef, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/pages/ui/decorator";
import { ClassesUtil } from "@/pages/ui/utils";
import List from "@/pages/ui/widgets/list/list";

import NavigationListItem from "./navigationListItem";
import { HEADER_NAV_BAR_NAVIGATION } from "./navigation.constants";
import { NavigationSelectEventHandler, NavigationType } from "./navigation.types";

type ClassNameProp = {
    root?: string;
    list?: {
        root?: string;
        item?: string;
    };
};

export type NavigationProps = {
    className?: ClassNameProp | null,
    onNavigate?: NavigationSelectEventHandler | null,
    navigationItem?: NavigationType | null
};

NavigationList.PropTypes = {
    className: PropTypes.shape({
        root: PropTypes.string,
        list: PropTypes.shape({
            root: PropTypes.string,
            item: PropTypes.string
        })
    })
};

function NavigationList({
    className = null,
    onNavigate = null,
    navigationItem = null
}: NavigationProps, ref: ForwardedRef<HTMLElement>) {
    return (
        <nav ref={ref} className={ClassesUtil.defaultIfFalsy(className?.root, "")}>
            <List className="pt-8">
                {
                    HEADER_NAV_BAR_NAVIGATION.map(navigation => (
                        <NavigationListItem
                            key={navigation}
                            label={navigation}
                            onClick={onNavigate}
                            value={navigation}
                            selected={navigationItem[navigation].display}
                        />
                    ))
                }
            </List>
        </nav>
    );
}

export default memo(forwardRef<HTMLElement, NavigationProps>(withDisplayName<NavigationProps>()(NavigationList)));
