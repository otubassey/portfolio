import { ForwardedRef, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import List from "@/ui/widgets/list/list";

import NavigationListItem from "./navigationListItem";
import { HEADER_NAV_BAR_NAVIGATION } from "./navigation.constants";
import { NavigationState } from "./useNavigation.hook";
import { NavigationSelectEventHandler, NavigationType } from "./navigation.types";

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

function NavigationList({
    className = null,
    onNavigate = null,
    navigationItem = null
}: Props, ref: ForwardedRef<HTMLElement>) {
    return (
        <nav ref={ref} className={className?.root}>
            <List className="pt-8">
                {
                    HEADER_NAV_BAR_NAVIGATION.map((navigation: NavigationType) => (
                        <NavigationListItem
                            key={navigation}
                            label={navigation}
                            onClick={onNavigate}
                            value={navigation}
                            selected={(navigationItem?.[navigation as keyof NavigationType] as NavigationState).display}
                        />
                    ))
                }
            </List>
        </nav>
    );
}

export default memo(forwardRef<HTMLElement, Props>(withDisplayName()(NavigationList)));
