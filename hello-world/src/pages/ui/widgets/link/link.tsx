import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

export type LinkType = {
    rel: string;
    href: string;
};

type LinkProps = {
    children?: ReactNode;
    value?: LinkType | null
};

Link.PropTypes = {
    children: PropTypes.node,
    value: PropTypes.shape({
        rel: PropTypes.string,
        href: PropTypes.string
    })
};

function Link({children = null, value = null, ...otherProps}: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) {
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
}

export default forwardRef<HTMLAnchorElement, LinkProps>(Link);
