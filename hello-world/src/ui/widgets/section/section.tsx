import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";
import {Elevation, Elevations, getPaperRootStyle} from "@/ui/widgets/paper/";
import { Title, TitlePropsType } from "@/ui/widgets/title";

const CLASSNAMES = {
    title: {
        sticky: "sticky top-0 z-20 mb-4 py-5 backdrop-blur md:relative md:top-auto md:mx-auto md:w-full md:px-0 md:py-0 md:opacity-0"
    }
} as const;

type ClassesProps = {
    root?: string;
    title?: string;
};

type Props = {
    classes?: ClassesProps;
    children?: ReactNode;
    elevation?: Elevation;
    hasStickyHeader?: boolean;
    title?: string;
    titleProps?: TitlePropsType;
};

Section.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.shape({
        root: PropTypes.string,
        title: PropTypes.string
    }),
    hasStickyHeader: PropTypes.bool,
    elevation: PropTypes.oneOf(Object.values(Elevations)),
    title: PropTypes.string,
    titleProps: PropTypes.object
};

function Section({
    children,
    classes,
    elevation,
    hasStickyHeader = false,
    title,
    titleProps,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLElement>) {
    return (
        <section ref={ref} className={ClassesUtil.concat(classes?.root, getPaperRootStyle(elevation))} {...otherProps}>
            {
                title &&
                <Title
                    aria-label={title}
                    className={ClassesUtil.concat(classes?.title, {[CLASSNAMES.title.sticky]: hasStickyHeader})}
                    {...(titleProps ?? {})}>
                    {title}
                </Title>
            }
            {children}
        </section>
    );
}

export default forwardRef<HTMLElement, Props>(withDisplayName<Props>()(Section));
