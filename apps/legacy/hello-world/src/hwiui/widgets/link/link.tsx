import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

export type LinkType = {
    rel: string;
    href: string;
};

type Props = {
    children?: ReactNode;
    value?: LinkType | null;
};

const Link = forwardRef<HTMLAnchorElement, Props>(({
    children = null,
    value = null,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
    return (
        <a
            ref={ref}
            aria-label={`Navigating to ${value?.rel} on a new tab`}
            href={value?.href}
            target="_blank"
            rel="noreferrer"
            {...otherProps}>
            {children}
        </a>
    );
});

Link.displayName = getDisplayName(Link);

Link.propTypes = {
    children: PropTypes.node,
    value: PropTypes.shape({
        rel: PropTypes.string,
        href: PropTypes.string
    })
};

export default Link;
